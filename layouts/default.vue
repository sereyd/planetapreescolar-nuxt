<template>
  <v-app>

      <loader :stload="loader" />
<v-dialog fullscreen v-model="gralconfig.mantenimineto">
  <v-card>
    <v-card-title class="melon white--text">
      Sitio en Mantenimiento o contrucción
    </v-card-title>
    <v-card-text>
      Para entrar ingrese la contraseña de desarrollo
      <v-text-field type="password" label="Ingrese la contraseña"  v-model="clavedesb"></v-text-field>
      <v-btn class="primary white--text" @click="entrarMantenimiento()">Entrar</v-btn>
      {{menMant}}
    </v-card-text>
  </v-card> 
  </v-dialog>
 
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
        @click="accesclick(item.link)"
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
        @click="accesclick(item.link)"
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

          <nuxtview />
  
  
          <boletin />


      </v-main>
</v-col>
</v-row>     
      <!----Espacio de carga de vistas------>

<alertas />
<input type="text" value="¡Copyright Sereyd 2021 Copia no permitida!" id="copyright" style="width:1px; position:absolute; z-index:0px; color:#fff;">
 

  <v-footer

      class="prysec white--text"
      
    >
<v-row>
<v-col cols="12" md="3" class="text-center" >
    <h4>Planeta Preescolar</h4>
      <p style="font-size:11px;">
      Copyright  &copy; {{ new Date().getFullYear() }} Grupo Sereyd<br />
      todos los derechos reservados
      </p>
   </v-col>
  <v-col cols="12" md="3" class="text-center">
     <h4>Suscríbete</h4>
      <p style="font-size:11px;">
        <ul  style="list-style:none;">
          <li>Planes de pago</li>
          <li>Precios expresados en Pesos Mexicanos </li>
          </ul>
      </p>
  </v-col>
  <v-col cols="12" md="3" class="text-center">
        <h4>Contacto</h4>
      <p style="font-size:11px;">
        <ul style="list-style:none;">
          <li>soporte@planetapreescolar.com</li>
          <li><router-link class="white--text" to="/aviso-de-privacidad">Aviso de privacidad</router-link></li>
          <li><router-link class="white--text" to="/terminos-y-condiciones">Términos y condiciones</router-link></li>
          <li><router-link class="white--text" to="/preguntas-frecuentes">Preguntas frecuentes</router-link></li>
          </ul>
      </p>
  </v-col>
  <v-col cols="12" md="3" class="text-center">

      <h4>Siguenos</h4>
      <p style="font-size:11px;">
        Redes sociales        
      </p>



  </v-col>

<v-col cols="12" md="12" class="text-center">
  <span> Copyright  &copy; {{ new Date().getFullYear() }}  Koddy-Go</span>
</v-col>
  </v-row>

    
    
    
    </v-footer> 
 
 
 
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
  import boletin from "~/components/boletin/boletin.vue"
  import nuxtview from "~/components/nuxtview/nuxtview.vue"

    export default {

      data () {
        return {
          drawer: false,
          loader:false,
          clavedesb:"",
          menMant:"",
          gralconfig:{},
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

        this.$fireStore.collection('ConfiguracionGeneral').get()
        .then((data)=>{
         let configall=data.docs[0].data()
         configall.idCAll=data.docs[0].id
        //  console.log(configall)
          this.gralconfig=configall
          this.cargaConfiGral(configall)
          this.loader=true
        })
        
        
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

        ...mapMutations(['abrirRegistro','changeScreenPrint','cambioMantenimiento','cargaConfiGral','cambiaLoading']),
        ...mapActions(['scrollmenu']),
       workerResponseHandler: function (event) {
        console.log('[WORKER REPONSE]', event.data)
      },
        accesclick(p){
          console.log(window.location.pathname)
          console.log(p)
        if(window.location.pathname!==p){
        this.cambiaLoading('libera')
          this.$router.push(p)
          }
        },
        loadingevent(e){
       
       console.log(this.$router)
       
       },
        entrarMantenimiento(){
          if(this.clavedesb===this.configall.passmantent){
            this.cambioMantenimiento(false)
            
          }else{
            this.menMant="La contraseña no es correcta"
            setTimeout(()=>{
              this.menMant=""
            },3000)
          }
        }
      },
      components:{
        menulateral,
        loader,
        alertas,
        boletin,
        nuxtview
      },
      
    }
</script>