<template>
    <v-main>
        <v-row>
      <v-col cols="12" md="12"> </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Audios</h2>

        <cargablog tipo="AUDIOS"   :listaR="audios" >
          <template v-slot:header>
            <editorblog tipo="AUDIOS" 
            @updateListaR="audios=$event"
            :listaR="audios"
            @updatepost="updatepost.audios=$event"  imagen="false" ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Videos</h2>

        <cargablog tipo="VIDEOS"  :listaR="videos"  >
          <template v-slot:header>
            <editorblog tipo="VIDEOS"   
            @updateListaR="videos=$event"
            :listaR="videos"
            @updatepost="updatepost.videos=$event"   ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Imagenes</h2>
        <cargablog tipo="IMAGENES"  :listaR="imagenes" >
          <template v-slot:header>
            <editorblog tipo="IMAGENES"  
            @updateListaR="imagenes=$event"
            :listaR="imagenes"
            @updatepost="updatepost.imagenes=$event"    ></editorblog>
          </template>
        </cargablog>
      </v-col>  
      
    </v-row>
    </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
// import grupos from '~/components/grupos/grupos.vue'
import editorblog from "~/components/blog-editor/blog-editor.vue";
import cargablog from "~/components/carga-blog/carga-blog.vue";
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            datapage:{
                permisos:2,
                logeado:true
            },

            updatepost:{
                memorias:"",
                blog:"",
                reflexiones:"",
                recomendacion:"",
                videos:"",
                audios:"",
                imagenes:"",
            },
            // {
                memorias:[],
                blog:[],
                reflexiones:[],
                recomendacion:[],

                videos:[],
                audios:[],
                imagenes:[],
        }
    },
    methods:{
    // ...mapMutations(['guardarVistaValida']),
    },
    created() {
        // this.guardarVistaValida(true); 
    },
    components:{
        // grupos
        editorblog,
        cargablog
    },
    mixins:[validasitio]
}
</script>
