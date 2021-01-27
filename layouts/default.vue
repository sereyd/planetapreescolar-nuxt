<template>
  <v-app>

      <loader />
         <menulateral @abremenu="drawer=$event" />

    <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    :class="menufix===true ? ' prysec menufixednavmovil ' : 'prysec' " 
  >

    <v-list dense  class="prysec">
      <v-list-item
        v-for="item in itemsmenu"
        :key="item.title"
        link
        :to="item.link"
        v-if="$validasesion($store,item) && item.visible===true"
          active-class="font-weight-black text-caption"
      >
        <v-list-item-icon >
          <v-icon class="white--text space_elements">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>


  </v-navigation-drawer>


<v-row>
  
<v-col cols="12" md="2" v-show="vistaValida"   class="viewmobil prysec"  >   
  <!----Menu lateral------>
  <v-list dense class="prysec" :class="menufix===true ? ' prysec menufixed ' : '' " > 

      <v-list-item
        v-for="item in itemsmenu"
        :key="item.title"
        link
        :to="item.link"
        v-if="$validasesion($store,item) && item.visible===true"
        active-class="font-weight-black text-caption"
      >
        <v-list-item-icon >
          <v-icon class="white--text">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content class="white--text" >
          {{ item.title }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
</v-col>

<v-col  cols="12" :md="vistaValida ? 10 : 12" style="padding-top:0px!important; margin-top:0px!important;">


      <!----Espacio de carga de vistas------>
      <v-main class="ma-0 pa-0">
        
        <nuxt />


      </v-main>
</v-col>
</v-row>     
      <!----Espacio de carga de vistas------>

<alertas />
<input type="text" value="¡Copyright Sereyd 2021 Copia no permitida!" id="copyright" style="width:1px; position:absolute; z-index:0px; color:#fff;">
  </v-app>
</template>
<style scoped>
/*   vista mobil */
.viewmobil{
  display:inline-block;
}
.v-list-item--link{
  font-size:13px;
}
.v-list-item--link:before {
  background:none; 
}


.menufixed{
  position:fixed;  
  top:90px;
  z-index:1; 
}


.menufixednavmovil{
  position:fixed;  
  z-index:10;
}
.menunormal{
  width:100%;
  max-width:100%;
}

@media (max-width:959px){
  .viewmobil{
      display: none;
  }

}

@media  (min-width:1020px) and (max-width:1439px){
  .menufixed{
    width:100%; 
    max-width:160px;
    top:80px;
  }

}


  @media  (min-width:1440px) and (max-width:2559px){
  .menufixed{
    width:100%; 
    max-width:220px;
    top:80px;
  }

}


  @media  (min-width:2560px) and (max-width:3839px) {
  .menufixed{
    width:100%; 
    max-width:400px;
    top:80px;
  }

}

 @media  (min-width:3840px)  {
  .menufixed{
    width:100%; 
    max-width:450px;
    top:80px;
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
      drawer: false,
      validsesion:true,
      // dialog: false,
        items: [
          { title: 'Home', icon: 'mdi-dashboard' },
          { title: 'About', icon: 'mdi-question_answer' },
          { title: 'Register', icon: 'mdi-question_answer' },
        ],
    }
  },
  created(){
    window.addEventListener("keyup", e => {
   
       if(e.keyCode === 44) 
    {
      setTimeout(()=>{

  /* Get the text field */
  var copyText = document.getElementById("copyright");
  /* Select the text field */
  copyText.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text 
  alert("La copia de pantalla no esta permitida");*/
      },800)
    }
    });
  },
  computed:{
    ...mapState(['dialog', 'test','itemsmenu','vistaValida','mensajealerta','staleras','tpalert','menufix'])
  },
  methods:{

    ...mapMutations(['abrirRegistro','changeScreenPrint']),
    ...mapActions(['scrollmenu'])
  },
  components:{
    menulateral,
    loader,
    alertas
  } 
  
}
</script>