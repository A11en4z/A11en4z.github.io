module.exports = [
  ['link', { rel: 'icon', href: '/favicon.png' }],
  ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ['meta', { name: 'robots', content: 'noindex, nofollow, noarchive' }],
  ['meta', { name: 'googlebot', content: 'noindex, nofollow' }],
  [
    'meta',
    {
      name: 'keywords',
      content: 'Allen Space, Kubernetes, K8S, 云原生, Docker, 博客, 知识库, Obsidian',
    },
  ],
  ['meta', { name: 'theme-color', content: '#11a8cd' }],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  [
    'script',
    {
      language: 'javascript',
      type: 'text/javascript',
      src: '/js/pgmanor-self.js',
    },
  ],
]
