<template>
  <v-app>

      <loader />
         <menulateral />
<v-row>
  
<v-col cols="12" md="2" v-show="vistaValida"   class="viewmobil primary">   
  <!----Menu lateral------>
  <v-list dense class="primary" > 

      <v-list-item
        v-for="item in itemsmenu"
        :key="item.title"
        link
        :to="item.link"
        v-if="$validasesion($store,item) && item.visible===true"
      >
        <v-list-item-icon >
          <v-icon class="white--text">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</v-col>

<v-col  cols="12" :md="vistaValida ? 10 : 12" >


      <!----Espacio de carga de vistas------>
      <v-main class="ma-0 pa-0">
        
        <nuxt />


      </v-main>
</v-col>
</v-row>     
      <!----Espacio de carga de vistas------>

<alertas />

  </v-app>
</template>
<style scoped>
/*   vista mobil */
.viewmobil{
  display:inline-block;
}
@media (max-width:959px){


.viewmobil{
    display: none;
}


}
</style>
<script>
  import menulateral from '~/components/menulateral/menulateral.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import loader from '~/components/loader/loader.vue'
  import alertas from "~/components/alertas/alertas.vue"
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
    ...mapState(['dialog', 'test','itemsmenu','vistaValida','mensajealerta','staleras','tpalert'])
  },
  methods:{

    ...mapMutations(['abrirRegistro']),
    
  },
  components:{
    menulateral,
    loader,
    alertas
  } 
  
}
</script>