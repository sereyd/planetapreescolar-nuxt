<template>
  <div>
    Saliendo {{userlogin}}
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed:{
        ...mapState(['userlogin'])
    },
  methods: {
    async metododesalida(){
      try {
        await this.$fireAuth.signOut()
        .then(data => {
            setTimeout(()=>{
                this.$router.push('/')
                this.$store.commit('cambiastatusSesion',{login:false,lvl:0,salida:true})
            },500 )
        });

      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.metododesalida();
  }
};
</script>
