<template>
  <v-app>

   <!----Menu lateral------>
  <loader />
  <menulateral/>
      <!----Espacio de carga de vistas------>
      <v-main class="ma-0 pa-0">
        
        <nuxt />
      </v-main>
      <!----Espacio de carga de vistas------>


  </v-app>
</template>

<script>
  import menulateral from '~/components/menulateral/menulateral.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import loader from '~/components/loader/loader.vue'

export default {
  data () {
    return {
      drawer: null,
      validsesion:true,
      // dialog: false,
        items: [
          { title: 'Home', icon: 'mdi-dashboard' },
          { title: 'About', icon: 'mdi-question_answer' },
          { title: 'Register', icon: 'mdi-question_answer' },
        ],
    }
  },
  computed:{
    ...mapState(['dialog', 'test'])
  },
  methods:{

    ...mapMutations(['abrirRegistro']),
    
  },
  components:{
    menulateral,
    loader
  } 
  
}
</script>