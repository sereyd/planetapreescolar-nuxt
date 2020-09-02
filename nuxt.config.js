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
      { href:"https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap", rel:"stylesheet" }    
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
    '@/plugins/validasesion.js'
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
  ],
  firebase: {
    config:{
      production: {
      apiKey: "AIzaSyAFKFFc5NQ8LAiR0KB_FVkUP3s3JEP9jCw",
      authDomain: "planetapreescolar-39350.firebaseapp.com",
      databaseURL: "https://planetapreescolar-39350.firebaseio.com",
      projectId: "planetapreescolar-39350",
      storageBucket: "planetapreescolar-39350.appspot.com",
      messagingSenderId: "1085237806661",
      appId: "1:1085237806661:web:8bf6f3d51794c3a88d452c",
      measurementId: "G-MTG60YV1RZ"
      },
      development: {
        apiKey: "AIzaSyB8GyvM9PdvjufoAyEZv2uRQLVhVQM-Z-o",
        authDomain: "educadorafirebase.firebaseapp.com",
        databaseURL: "https://educadorafirebase.firebaseio.com",
        projectId: "educadorafirebase",
        storageBucket: "educadorafirebase.appspot.com",
        messagingSenderId: "4922270561",
        appId: "1:4922270561:web:d12332e6277b143e5c9b20",
        measurementId: "G-E7Y6JTQG51"
      }
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
    
      font: {
        family: 'Montserrat' 
      },
      icons:  {
        iconfont: 'mdi',
      }
    
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {

  }
  }
