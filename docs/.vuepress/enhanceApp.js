/**
 * 站点访问门禁：仅持有口令者可浏览。
 * 口令的 SHA-256 存在 SITE_ACCESS_HASH；明文口令不入库。
 */
const SITE_ACCESS_HASH =
  '8b4d41069af6e6f9fee383abe199734bfe5e3b2b80f3306ea163a2968b5cbd3a'
const STORAGE_KEY = 'allen-space-auth-v1'

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function isAuthed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === SITE_ACCESS_HASH
  } catch (e) {
    return false
  }
}

async function tryAuth(password) {
  const hash = await sha256Hex(password)
  if (hash !== SITE_ACCESS_HASH) return false
  try {
    sessionStorage.setItem(STORAGE_KEY, SITE_ACCESS_HASH)
  } catch (e) {}
  return true
}

function mountGate() {
  if (typeof document === 'undefined') return
  if (isAuthed()) return
  if (document.getElementById('allen-access-gate')) return

  const style = document.createElement('style')
  style.textContent = `
    #allen-access-gate{
      position:fixed;inset:0;z-index:999999;
      display:flex;align-items:center;justify-content:center;
      background:linear-gradient(160deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);
      color:#e2e8f0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    }
    #allen-access-gate .box{
      width:min(92vw,380px);padding:28px 24px;border-radius:12px;
      background:rgba(15,23,42,.9);border:1px solid rgba(148,163,184,.25);
      box-shadow:0 20px 50px rgba(0,0,0,.45);
    }
    #allen-access-gate h1{margin:0 0 8px;font-size:1.35rem;font-weight:650;color:#f8fafc}
    #allen-access-gate p{margin:0 0 18px;font-size:.92rem;line-height:1.5;color:#94a3b8}
    #allen-access-gate input{
      width:100%;box-sizing:border-box;padding:12px 14px;border-radius:8px;
      border:1px solid #334155;background:#020617;color:#f1f5f9;font-size:1rem;
      outline:none;
    }
    #allen-access-gate input:focus{border-color:#38bdf8}
    #allen-access-gate button{
      margin-top:12px;width:100%;padding:12px 14px;border:0;border-radius:8px;
      background:#0ea5e9;color:#fff;font-size:1rem;font-weight:600;cursor:pointer;
    }
    #allen-access-gate button:hover{background:#0284c7}
    #allen-access-gate .err{margin-top:10px;min-height:1.2em;color:#fb7185;font-size:.88rem}
    body.allen-locked #app, body.allen-locked .theme-container{visibility:hidden !important}
  `
  document.head.appendChild(style)
  document.body.classList.add('allen-locked')

  const gate = document.createElement('div')
  gate.id = 'allen-access-gate'
  gate.innerHTML = `
    <div class="box">
      <h1>Allen Space</h1>
      <p>私有站点，请输入访问口令。仅本人可进入。</p>
      <form id="allen-access-form">
        <input id="allen-access-input" type="password" autocomplete="current-password" placeholder="访问口令" />
        <button type="submit">进入</button>
        <div class="err" id="allen-access-err"></div>
      </form>
    </div>
  `
  document.body.appendChild(gate)

  const form = gate.querySelector('#allen-access-form')
  const input = gate.querySelector('#allen-access-input')
  const err = gate.querySelector('#allen-access-err')
  setTimeout(() => input && input.focus(), 50)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    err.textContent = ''
    const ok = await tryAuth(input.value || '')
    if (!ok) {
      err.textContent = '口令不正确'
      input.select()
      return
    }
    document.body.classList.remove('allen-locked')
    gate.remove()
  })
}

function resolveParentNav(path) {
  if (!path || path === '/') return null
  if (path === '/cloud/' || path === '/cloud') {
    return { href: '/', label: '返回首页' }
  }
  if (
    path.startsWith('/pages/k8s-') ||
    path.startsWith('/pages/docker-') ||
    path === '/pages/k8s-overview/'
  ) {
    return { href: '/cloud/', label: '返回云原生目录' }
  }
  if (path.startsWith('/pages/brief-archive')) {
    return { href: '/', label: '返回首页' }
  }
  if (
    path.startsWith('/categories') ||
    path.startsWith('/tags') ||
    path.startsWith('/archives')
  ) {
    return { href: '/', label: '返回首页' }
  }

  // Prefer theme breadcrumb parent (e.g. 云原生 / K8S → catalogue anchors)
  const crumbs = Array.from(document.querySelectorAll('.breadcrumbs a')).filter(
    (a) => a.getAttribute('href') && a.getAttribute('href') !== '/',
  )
  if (crumbs.length > 0) {
    const last = crumbs[crumbs.length - 1]
    const label = (last.textContent || '').trim() || '上一级'
    return { href: last.getAttribute('href'), label: `返回 ${label}` }
  }

  return { href: '/', label: '返回首页' }
}

function mountParentBack(path) {
  const existing = document.getElementById('allen-parent-back')
  if (existing) existing.remove()

  const parent = resolveParentNav(path)
  if (!parent) return

  const bar = document.createElement('div')
  bar.id = 'allen-parent-back'
  bar.className = 'allen-parent-back'
  bar.innerHTML = `
    <a class="allen-parent-link" href="${parent.href}">← ${parent.label}</a>
    <span class="allen-parent-sep">·</span>
    <a href="/">首页</a>
  `

  const navbar = document.querySelector('header.navbar')
  if (navbar && navbar.parentNode) {
    navbar.insertAdjacentElement('afterend', bar)
  } else {
    document.body.prepend(bar)
  }
}

export default ({ router }) => {
  if (typeof window === 'undefined') return

  // /brief/* is static HTML under public/, not a VuePress page.
  // Vue Router would otherwise SPA-navigate and show theme 404.
  router.beforeEach((to, from, next) => {
    if (to.path === '/brief' || to.path.startsWith('/brief/')) {
      window.location.assign(to.fullPath)
      return
    }
    next()
  })

  const guard = () => {
    if (!isAuthed()) mountGate()
  }

  const refreshParentBack = () => {
    // Wait a tick so ArticleInfo breadcrumbs are in the DOM.
    setTimeout(() => {
      mountParentBack(window.location.pathname)
    }, 50)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      guard()
      refreshParentBack()
    })
  } else {
    guard()
    refreshParentBack()
  }

  router.afterEach((to) => {
    guard()
    setTimeout(() => mountParentBack(to.path), 50)
  })
}
