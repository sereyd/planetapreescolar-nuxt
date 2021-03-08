<template>
    <v-main>
       <h1>{{titulo}}</h1>
       <br />
       {{cuerpo}}
    </v-main>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data(){
        return {
            titulo:"",
            cuerpo:""
        }
    },
     computed: {
    ...mapState(['datosUsuario','configAll', 'loading']),
  },
  mounted(){
      this.cambiaLoading('inicia')
      setTimeout(()=>{
          this.cambiaLoading('finaliza')
          this.cargaPost()
      },600)
  },
  methods:{
       ...mapMutations(['cambiaLoading','configAll']),
       cargaPost(){
           var infcont=this.configAll.content.find(cont=>cont.url==='terminos-y-condiciones')
           console.log(infcont)
           if(this.configAll.content.length===0){
            this.cargaPost()
           }else{
               this.titulo=infcont.titulo
               this.cuerpo=infcont.cuerpo
           }
       }
  }
}
</script>