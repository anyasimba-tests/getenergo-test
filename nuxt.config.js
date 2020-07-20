export default {
  mode: 'universal',
  vue: {
    config: {
      productionTip: true,
    }
  },
  head: {
    title: 'getenergo-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'getenergo test' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  axios: {
    proxy: true,
  },
  router: {
    base: '/',
    extendRoutes (routes) {
      return [
        ...routes,
        {
          name: 'catalog',
          path: '/catalog/:category(.*)',
          component: '~/pages/catalog',
        },
      ]
    }
  },
  proxy: {
      '/api': {
          target: 'http://api.holypony.ru/',
          pathRewrite: { '^/api/': '' },
      }
  },
  server: {
      host: '0.0.0.0',
      port: 3001,
  },
  loading: { color: '#3B8070' },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ],
  plugins: ['@/plugins/axios-accessor'],
  modules: [
    '@nuxtjs/axios',
  ],
}

