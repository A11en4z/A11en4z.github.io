---
title: 从 Obsidian 导入 K8S 笔记
date: 2026-07-20 09:20:00
permalink: /pages/obsidian-import/
categories: 
  - 指南
tags: 
  - Obsidian
  - 导入
article: true
sidebar: auto
---

# 从 Obsidian 导入 K8S 笔记

本站使用 [vuepress-theme-vdoing](https://doc.xugaoyi.com/)，风格与 [baby sword 的知识库](https://2290653824.github.io/other/#K8S) 同类：左侧结构化目录 + 云原生目录页锚点 `#K8S`。

## 目录约定

把 Obsidian 里的 K8S 笔记放到：

```text
docs/01.云原生/01.K8S/
  01.xxx.md
  02.yyy.md
  ...
```

Vdoing 规则：

1. 文件夹 / 文件名前的**数字序号**决定排序（`01.` `02.` …）
2. 标题优先取 Markdown front matter 的 `title`，否则用文件名
3. `docs/00.目录页/01.云原生.md` 会自动生成 [云原生目录](/cloud/)，锚点形如 `/cloud/#K8S`

## 一键导入

在仓库根目录执行（把路径换成你的 Obsidian vault）：

```bash
# 方式 1：环境变量
export OBSIDIAN_K8S_DIR="$HOME/Documents/Obsidian/你的库/K8S"
npm run import:obsidian

# 方式 2：命令行参数
node scripts/import-obsidian.js "$HOME/Documents/Obsidian/你的库/K8S"
```

脚本会：

- 把 `.md` 复制到 `docs/01.云原生/01.K8S/`
- 为缺少 front matter 的文件补上 `title` / `date` / `categories` / `tags`
- 尽量保留相对图片路径（请把附件也放进 vault 同目录或 `docs/.vuepress/public/`）

## Obsidian 写作注意

| Obsidian | 博客侧建议 |
| --- | --- |
| `[[双链]]` | 改成普通 Markdown 链接，或保持纯文本 |
| `![[embed]]` | 改为 `![](相对路径)` |
| callout `> [!note]` | 可改用 VuePress 容器 `::: tip` |
| 附件文件夹 | 复制到 `docs/01.云原生/01.K8S/assets/` 或 `docs/.vuepress/public/img/` |

## 本地预览与发布

```bash
npm install
npm run dev          # http://localhost:8080
npm run build        # 产出 docs/.vuepress/dist
```

推送到 `main` 后，GitHub Actions 会构建并部署到 `gh-pages`。请在仓库 **Settings → Pages** 将 Source 设为 **gh-pages** 分支。
