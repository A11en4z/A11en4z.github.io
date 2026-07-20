#!/usr/bin/env node
/**
 * 将 Obsidian 中的 K8S 笔记导入到 docs/01.云原生/01.K8S/
 *
 * 用法:
 *   OBSIDIAN_K8S_DIR=/path/to/vault/K8S node scripts/import-obsidian.js
 *   node scripts/import-obsidian.js /path/to/vault/K8S
 *   node scripts/import-obsidian.js /path/to/vault/K8S --dry-run
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const TARGET = path.join(ROOT, 'docs', '01.云原生', '01.K8S')
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const srcArg = args.find((a) => !a.startsWith('--'))
const SRC = path.resolve(srcArg || process.env.OBSIDIAN_K8S_DIR || '')

function fail(msg) {
  console.error(msg)
  process.exit(1)
}

if (!SRC || SRC === path.resolve('')) {
  fail(
    [
      '请指定 Obsidian K8S 笔记目录：',
      '  export OBSIDIAN_K8S_DIR="$HOME/Documents/Obsidian/Vault/K8S"',
      '  npm run import:obsidian',
      '或：',
      '  node scripts/import-obsidian.js /path/to/K8S',
    ].join('\n')
  )
}

if (!fs.existsSync(SRC) || !fs.statSync(SRC).isDirectory()) {
  fail(`源目录不存在或不是文件夹: ${SRC}`)
}

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (/\.md$/i.test(name)) out.push(full)
  }
  return out
}

function hasFrontMatter(content) {
  return content.startsWith('---\n') || content.startsWith('---\r\n')
}

function stripObsidianNoise(content) {
  // 去掉常见 Obsidian 专有 front matter 键可留给人工；这里只做轻度清理
  return content
    .replace(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '![]($1)')
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, alias) => {
      const text = alias || target
      return text
    })
}

function padIndex(n) {
  return String(n).padStart(2, '0')
}

function safeFileName(name, index) {
  const base = name.replace(/\.md$/i, '').replace(/[\\/:*?"<>|]/g, '-')
  // 若已有数字前缀则保留，否则加序号
  if (/^\d+\./.test(base)) return `${base}.md`
  return `${padIndex(index)}.${base}.md`
}

function ensureFrontMatter(content, title) {
  if (hasFrontMatter(content)) return content
  const now = new Date()
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')
  const time = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join(':')
  return [
    '---',
    `title: ${JSON.stringify(title).slice(1, -1)}`,
    `date: ${date} ${time}`,
    'categories:',
    '  - 云原生',
    '  - K8S',
    'tags:',
    '  - Kubernetes',
    '---',
    '',
    content,
  ].join('\n')
}

function copyAssets(relDir) {
  const srcDir = path.join(SRC, relDir)
  if (!fs.existsSync(srcDir)) return
  for (const name of fs.readdirSync(srcDir)) {
    if (name.startsWith('.') || /\.md$/i.test(name)) continue
    const from = path.join(srcDir, name)
    const toDir = path.join(TARGET, relDir)
    const to = path.join(toDir, name)
    if (fs.statSync(from).isDirectory()) {
      if (!dryRun) fs.mkdirSync(to, { recursive: true })
      copyAssets(path.join(relDir, name))
    } else {
      if (!dryRun) {
        fs.mkdirSync(toDir, { recursive: true })
        fs.copyFileSync(from, to)
      }
      console.log(`asset  ${path.relative(SRC, from)} -> ${path.relative(ROOT, to)}`)
    }
  }
}

const files = walk(SRC).sort((a, b) => a.localeCompare(b, 'zh'))
if (!files.length) fail(`未找到 Markdown 文件: ${SRC}`)

if (!dryRun) fs.mkdirSync(TARGET, { recursive: true })

console.log(`源目录: ${SRC}`)
console.log(`目标  : ${TARGET}`)
console.log(dryRun ? '[dry-run] 不会写入磁盘\n' : '')

files.forEach((file, i) => {
  const rel = path.relative(SRC, file)
  const title = path.basename(file, path.extname(file))
  let content = fs.readFileSync(file, 'utf8')
  content = stripObsidianNoise(content)
  content = ensureFrontMatter(content, title)

  // 扁平放入 K8S 目录，保留相对子路径作为文件名一部分，避免冲突
  const flatName = rel
    .replace(/\\/g, '/')
    .replace(/\//g, '-')
  const destName = safeFileName(flatName, i + 1)
  const dest = path.join(TARGET, destName)

  if (!dryRun) fs.writeFileSync(dest, content, 'utf8')
  console.log(`md     ${rel} -> docs/01.云原生/01.K8S/${destName}`)
})

// 复制同目录非 md 附件（图片等）
copyAssets('.')

console.log(`\n完成：共处理 ${files.length} 篇笔记${dryRun ? '（演练）' : ''}。`)
console.log('接下来: npm run dev 预览，确认后 git commit && git push')
