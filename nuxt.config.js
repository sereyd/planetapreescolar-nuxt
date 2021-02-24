import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  dev: true,
  ssr: false,
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
    title: 'Planeta Preescolar',
    script: [
      {
        // src: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js',
        // src: 'https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js',
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Descarga recursos de aprendizaje preescolar, como: planeaciones editables, hojas de trabajo, material didáctico, cantos y mucho más. Realiza tu registro trimestral, semestral o anual para mayores beneficios.'},
      { hid: 'keywords', name: 'keywords', content: 'Material educativo gratuito | Material para educadora | Libros para niños | Juegos educativos gratis | Artículos didácticos | Material educativa | Materiales de aprendizaje | Cuadernillo de trabajo | Actividad para niños | Juegos didácticos | Actividades para preescolar | Actividad para niños | Actividad para preescolar | Recursos para educación preescolar | Recursos de aprendizaje preescolar'},
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
    '@/plugins/comparativa.js',
    ///'@/plugins/i18n.js'
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
    'nuxt-stripe-module',
    'nuxt-i18n',
    'nuxt-facebook-pixel-module',
    
  ],
  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: '2871388423188636',
    autoPageView: true,
    disabled: false
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
          warning: '#FFC107',
          prysec: '#6C0040'
        },
        dark:{
          
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
