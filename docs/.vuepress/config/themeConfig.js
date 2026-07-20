const nav = require('./themeConfig/nav.js')

module.exports = {
  nav,
  sidebarDepth: 2,
  logo: '/img/avatar.jpg',
  repo: 'a11en4z/a11en4z.github.io',
  searchMaxSuggestions: 10,
  lastUpdated: '上次更新',
  editLinks: true,
  docsDir: 'docs',
  docsBranch: 'main',
  editLinkText: '编辑此页',
  searchPlaceholder: '搜索笔记...',

  category: true,
  tag: true,
  archive: true,

  sidebar: { mode: 'structuring', collapsable: false },
  pageStyle: 'line',
  updateBar: {
    showToArticle: true,
  },
  author: {
    name: 'Allen',
    link: 'https://github.com/a11en4z',
  },
  blogger: {
    avatar: '/img/avatar.jpg',
    name: 'Allen',
    slogan: 'Rainy days and razor blades',
  },
  social: {
    icons: [
      {
        iconClass: 'icon-github',
        title: 'GitHub',
        link: 'https://github.com/a11en4z',
      },
      {
        iconClass: 'icon-erji',
        title: '博客',
        link: 'https://a11en4z.github.io',
      },
    ],
  },
  footer: {
    createYear: 2025,
    copyrightInfo:
      'Allen | <a href="https://github.com/a11en4z/a11en4z.github.io" target="_blank">MIT License</a>',
  },
}
