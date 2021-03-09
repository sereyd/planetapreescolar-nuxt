<template>
    <v-row class="ma-0 pa-0">
<v-col cols="12" md="6" class="ma-0 pa-6"   >
<v-main>

<h1 class="primary--text">Inicia sesión</h1>

<!---componente de login---->
    <login/>
<!---componente de login---->

</v-main>
    </v-col>
    <v-col cols="12" md="6" class="ma-0 pa-0 primary">
       <img src="pantallas/2Inicio de Sesion.png" width="100%" />
    </v-col>
    
    </v-row>

</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import login from '~/components/login/login.vue'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            datapage:{ 
                sinregistro:true
                }
        }
    },
    methods:{
        ...mapMutations(['cambiaLoading'])
    },
    mounted(){
         this.cambiaLoading('inicia')
    setTimeout(()=>{
      console.log
  this.cambiaLoading('finaliza')
    },2000)
    },
    components:{
        login
    },
    mixins:[validasitio]
}
</script>