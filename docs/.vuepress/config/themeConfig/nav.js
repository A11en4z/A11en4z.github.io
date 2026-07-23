const briefNav = require('./brief-nav.js')

module.exports = [
  { text: '首页', link: '/' },
  {
    text: 'AI 资讯',
    link: '/pages/brief-reader/',
    items: briefNav,
  },
  {
    text: '运维笔记',
    link: '/cloud/',
    items: [
      { text: '云原生目录', link: '/cloud/' },
      { text: 'K8S', link: '/cloud/#K8S' },
      { text: 'Docker', link: '/cloud/#Docker' },
    ],
  },
  { text: '分类', link: '/categories/' },
  { text: '标签', link: '/tags/' },
  { text: '归档', link: '/archives/' },
  {
    text: '更多',
    items: [
      { text: 'AI 资讯归档', link: '/pages/brief-archive/' },
      { text: '从 Obsidian 导入', link: '/pages/obsidian-import/' },
      { text: 'GitHub', link: 'https://github.com/a11en4z/a11en4z.github.io' },
    ],
  },
]
