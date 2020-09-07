<template>
  <v-dialog v-model="validsesion" width="250">
    <v-card>
      <v-card-text style="text-align:center;" class=" pa-5">

         <v-progress-circular
     :size="70"
     :width="7"
     color="primary"
     indeterminate
   ></v-progress-circular>
<h2 class="melon--text">Espere un momento</h2>
      </v-card-text>
      </v-card>
  </v-dialog>
  <template>
<script>
    import {mapState,mapAction} from 'vuex'
export default {
    data(){
        return{

        }
    },
    created(){
    this.autenticarUsuario()
    .then((data)=>{
      setTimeout(()=>{
         this.validsesion=false
      },2500)
      
    })
  }
}
</script>
