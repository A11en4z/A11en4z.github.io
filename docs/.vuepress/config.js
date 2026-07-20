const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
  theme: 'vdoing',
  title: 'Allen Space',
  description: 'Every things is gonna be all right — 知识库 & 博客',
  // 仓库名为 a11en4z.github.io，站点根路径用 '/'
  base: '/',
  markdown: {
    lineNumbers: true,
  },
  head,
  plugins,
  themeConfig,
}
