<template>


<v-row class="ma-0 pa-0">

<v-col cols="12" md="12" class="ma-0 pa-0" v-if="tipo_registro==='' "  >
    <v-row style="background-image:url('/images/fondo-lg.png'); background-size:100%;">
    
    <v-col cols="12" md="2">

    </v-col>
    <v-col cols="12" md="3"  style="cursor:pointer; text-align:center;" @click="tipo_registro='educadora'">
        <img src="/images/educadora-lg.png" width="100%" class="pointerimagen" />
        <h1 class="primary--text">Educadora</h1>
    </v-col>
     <v-col cols="12" md="2">

    </v-col>
    <v-col cols="12" md="3" style="cursor:pointer; text-align:center;"  @click="tipo_registro='padres'">
        <img src="/images/padres--lg.png" width="100%" class="pointerimagen" />
        <h1 class="primary--text">Padres</h1>
    </v-col>
    <v-col cols="12" md="2">
        
    </v-col>



    </v-row>




</v-col>



<v-col cols="12" md="6" class="ma-0 pa-6" v-if="tipo_registro!='' && tipo_registro==='educadora'"  >
<v-main>

<h1 class="primary--text"><v-icon class="primary--text" @click="tipo_registro=''"> mdi-arrow-left-bold-circle</v-icon>Regístrate Educadora</h1>

<!---componente de registro-educadora--->
<!---componente de registro-educadora--->

</v-main>


    </v-col>
    <v-col cols="12" md="6" class="ma-0 pa-0"  v-if="tipo_registro!='' && tipo_registro==='educadora'" >
    <img src="/images/img-registro.png" width="100%" />
    </v-col>
  

<v-col cols="12" md="6" class="ma-0 pa-6" v-if="tipo_registro!='' && tipo_registro==='padres'"  >
<v-main>

<h1 class="primary--text"><v-icon class="primary--text" @click="tipo_registro=''"> mdi-arrow-left-bold-circle</v-icon>Regístrate Padres</h1>

<!---componente de registro-padres--->
<!---componente de registro-padres--->

</v-main>


    </v-col>
    <v-col cols="12" md="6" class="ma-0 pa-0"  v-if="tipo_registro!='' && tipo_registro==='padres'" >
    <img src="/images/img-registro.png" width="100%" />
    </v-col>  
    </v-row>

</template>
<style scoped>


.pointerimagen:hover{
   filter:alpha(opacity==80);
   opacity:0.8;
}

</style>
<script>
import validasitio from '@/mixins/validasitio.js'
export default {
    data(){
        return {
            datapage:{ 
                sinregistro:true,
               
                },
            tipo_registro:''
        }
    },
    mixins:[validasitio]
}
</script>