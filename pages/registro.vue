<template>
<div class="v-dialog v-dialog--active v-dialog--fullscreen">
<v-container fluid class="  ma-0 pa-0">
  <v-row class="ma-0 pa-0  " >
    <!-- <h3>Crear cuenta como</h3> -->
    <v-col cols="12" md="12" class="ma-0 pa-0 " v-if="tipo_registro === ''">
    <div class="fondo"  >

    <h2 class="font-weight-black text-center py-4 titulo">Crear cuenta como</h2>

      <v-row
       class=" d-flex justify-center"
      >
    <!-- <h3>Crear cuenta como</h3> -->

        <!-- <v-col cols="12" md="3" class=""> </v-col> -->
        <!-- <v-col
          cols="12"
          md="3"
          style="cursor:pointer; text-align:center;"
          @click="tipo_registro = 'educadora'; esEducadora = true;"
          class=" mr-8"
        >
          <img
            src="/images/educadora-lg.png"
            width="100%"
            class="pointerimagen"
          />
          <h1 class="primary--text">Educadora</h1>
        </v-col> -->
        <!-- <v-col cols="10" md="auto" lg="1" sm="2" class=""> </v-col>  -->
        <!-- <v-col
          cols="12"
          md="3"
          style="cursor:pointer; text-align:center;"
          @click="tipo_registro = 'padres'; esEducadora = false;"
          class=" ml-8"
        >
          <img
            src="/images/padres--lg.png"
            width="100%"
            class="pointerimagen"
          />
          <h1 class="primary--text">Padres</h1>
          <strong class="text--disabled" >Próximamente</strong>
        </v-col> -->
        <!-- <v-col cols="12" md="3" class=""> </v-col> -->
      </v-row>
    </div>
    </v-col>



    <v-col
      cols="12"
      md="6"
      class="ma-0 pa-0 "
      v-if="tipo_registro != '' && tipo_registro === 'educadora'"
    >
      <!-- <v-dialog v-model="esEducadora" fullscreen > -->
      <div>
        <h3 class="primary--text  pl-15 mt-4">
          <v-icon class="primary--text" @click="$router.push('/')">
            mdi-arrow-left-bold-circle</v-icon
          >Regístrate
        </h3>
        <v-row>
          <v-col cols="12" lg="8" md="8" sm="9" class="">
            <Registro class="pa-0 ma-0"/>
          </v-col>
          <v-col cols="4" lg="4" md="4" sm="3" class=""></v-col>
        </v-row>

        <!---componente de registro-educadora--->
          
        <!---componente de registro-educadora--->
      </div>
      <!-- </v-dialog> -->
    </v-col>
    <v-col
      cols="12"
      md="6"
      class="ma-0 pa-0"
      v-if="tipo_registro != '' && tipo_registro === 'educadora'"
    >
      <img src="/images/img-registro.png" width="100%" />
    </v-col>

    <v-col
      cols="12"
      md="6"
      class="ma-0 pa-6"
      v-if="tipo_registro != '' && tipo_registro === 'padres'"
    >
      <v-main>
        <h1 class="primary--text">
          <v-icon class="primary--text" @click="tipo_registro = ''; esEducadora = false;">
            mdi-arrow-left-bold-circle</v-icon
          >Regístrate Padres
        </h1>

        <!---componente de registro-padres--->
          <!-- <Registro/> -->
        <!---componente de registro-padres--->
        
      </v-main>
    </v-col>
    <v-col
      cols="12"
      md="6"
      class="ma-0 pa-0"
      v-if="tipo_registro != '' && tipo_registro === 'padres'"
    >
      <img src="/images/img-registro.png" width="100%" />
    </v-col>
  </v-row>
  <!-- </div> -->
</v-container>
</div>
</template>
<style scoped>
*{
  padding:0;
  margin:0;
}
.pointerimagen:hover {
  filter: alpha(opacity==80);
  opacity: 0.8;
}
.fondo{
  padding: 0!important;
  margin: 0!important;
  background-image:url('/images/fondo-lg.png'); 
  background-size:100%;
}
/*
  $body-font-family: 'Montserrat', sans-serif;
$heading-font-family: 'Montserrat';
$font-size-root: 18px;
*/
.titulo{
  color: white;
  font-family: 'Montserrat';
  /* font-weight: bolder; */
}
.principal{
      background-color: white ;
      opacity: 1;
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 100;
  }
  .v-dialog{
    background-color: white!important;
  }
/* .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1
{
  padding: 0px!important;
} */

</style>
<script>
import validasitio from "@/mixins/validasitio.js";
import Registro from '~/components/registro/registro.vue';


export default {
  data() {
    return {
      datapage: {
        sinregistro: true
      },
      tipo_registro: "educadora",
      esEducadora: false,

    };
  },
  components:{
    Registro
  },
  mixins: [validasitio]
};
</script>
