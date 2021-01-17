<template>
  <div>
    Saliendo {{userlogin}}
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed:{
        ...mapState(['userlogin','datosUsuario'])
    },
  methods: {
    async metododesalida(){
      if(this.datosUsuario.userlogin===false){
        this.$router.push('/')
      }else{


      try {
        await this.$fireAuth.signOut()
        .then(data => {
            setTimeout(()=>{
                
                this.$store.commit('cambiastatusSesion',{login:false,lvl:0,salida:true})
                window.location.reload(true)
            },500 )
        });
       
      } catch (e) {
        console.log(e);
      }
      }
    }
  },
  mounted() {
    this.metododesalida();
  }
};
</script>
