<template>
    <v-main>
          <h1 class="text-center white--text" style="font-size:1px;">Espacio creado para compartir vivencias entre
educadoras de nivel preescolar | Comunidad Planeta
Preescolar.
</h1>
        <v-row>
        <v-col cols="12" md="10" class="ma-0">
    <listaforo></listaforo>
        </v-col>
        <v-col cols="12" md="2" class="ma-0 pa-6" >
            <v-card>
        <v-card-text>
          Ads Google
        </v-card-text>
      </v-card>
        </v-col>
        </v-row>
        </v-main>
</template>
<script>
import listaforo from '~/components/listado-foro/listado-foro.vue'
export default {
    head:{
        title:" Espacio creado para compartir vivencias entre educadoras de nivel preescolar | Comunidad Planeta Preescolar."
    },
    data(){
        return {

        }
    },
    components:{
        listaforo
    },
    created(){
      
    }

}
</script>