<template>
<v-dialog  persistent  v-model="validsesion" width="250">
    <div  style="background-color:#e93976; width:100%; height:100%; text-align: center;">
 <img src="images/loader/loader5.gif" width="100%"  />
</div>
    </v-dialog>
</template>

<script>

import { mapActions } from "vuex";
export default {
  data() {
    return {
      validsesion: false
    };
  },
  methods: {
    ...mapActions(["autenticarUsuario"]),
    start() {
      this.validsesion = true
    },
    finish() {
      this.validsesion = false
    }
  },
  beforeUpdate(){
  },
  updated(){
    this.$nextTick(function () {
    // Código que se ejecutará solo después
    // de que se haya vuelto a renderizar toda la vista
  })
  },
  mounted() {
    this.$nextTick(() => {
   this.$nuxt.$loading.start()
      this.autenticarUsuario().then((data) => {
        console.log(data)
        console.log('autenticando')
      setTimeout(()=>{this.$nuxt.$loading.finish()}, 500)  
      });



  

    });
  }
};
</script>