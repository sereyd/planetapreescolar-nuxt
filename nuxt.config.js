import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
     
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {  href:"https://fonts.googleapis.com/css2?family=Montserrat&display=swap", rel:"stylesheet" } ,
      { href:"https://fonts.googleapis.com/css?family=Material+Icons", rel:"stylesheet"},
      { href:"https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",  rel:"stylesheet" }   
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/validasesion.js',
    '@/plugins/codegenerate.js',
    '@/plugins/v-calendar.js',
    '@/plugins/comparativa.js'
    // { src: '~plugins/v-calendar.js', ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    'nuxt-stripe-module'
  ],
  stripe: {
    publishableKey: 'pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx',
  },
  env: {
    publishStripeKey: 'pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx',
  },
  firebase: {
    config:{
      apiKey: "AIzaSyB8GyvM9PdvjufoAyEZv2uRQLVhVQM-Z-o",
      authDomain: "educadorafirebase.firebaseapp.com",
      databaseURL: "https://educadorafirebase.firebaseio.com",
      projectId: "educadorafirebase",
      storageBucket: "educadorafirebase.appspot.com",
      messagingSenderId: "4922270561",
      appId: "1:4922270561:web:d12332e6277b143e5c9b20",
      measurementId: "G-E7Y6JTQG51"
    
      },
    services: {
      auth: true, // Just as example. Can be any other service.
      firestore:true,
      storage: true
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss','font-awesome/css/font-awesome.min.css'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#ad227d',
          melon:'#ff6c5c',
          verylight:'#ebe4eb',
          secondary: '#c93b98',
          greysh:'#484848',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      },
     
    },
      icons:  {
        iconfont: 'mdi',
      },
  customVariables: ['~/assets/scss/variables.scss'],
  treeShake: true,
  defaultAssets: false
     
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {

  }
  }
