



<template>
<v-main class="px-10" >

  
    <v-row >
      <v-col cols="12">
        <buscador :esBuscando ="buscando" @updateBuscando="buscando=$event"/>

<loaderDate :loader="loading"  />

      </v-col>
  
      <v-col
        cols="12"
        md="12"
       
      >
        <h2
          class="primary--text"
          >
          Mis recursos recomendados
        </h2>

        <listablog
          blogpost="recomendado" @updateBlogpost="misPost=$event"
          tipo="CATEGORIAS"  subtipo="recomendacion"
          :userId="this.datosUsuario.id"
          titulo=""
          subtitulos=""
          :addslot="true"
        >
          <!-- <editorblog
            tipo="CATEGORIAS"
            v-if="
              $validasesion($store, {
                sinregistro: false,
                logeado: true,
                permisos: 1
              })
            "
            @updatepost="updatepost.misMemorias = $event"
          ></editorblog> -->
        </listablog>
      </v-col>

   

      <!-- <v-col
        cols="12"
        md="12"
        
      >

        <listablog
          blogpost="otrospost" @updateBlogpost="otrosPost=$event"
          tipo="CATEGORIAS"  subtipo="recomendacion"
          titulo=""
          subtitulos=""
        />

      </v-col> -->
    </v-row>

     <div style="width:100%; height:0px;"></div>
  </v-main>
        
</template>

<script>
import validasitio from '@/mixins/validasitio.js'
// import grupos from '~/components/grupos/grupos.vue'
// import editorblog from "~/components/blog-editor/blog-editor.vue";
// import cargablog from "~/components/carga-blog/carga-blog.vue";
import listablog from "~/components/listado-blog/listado-blog.vue";
import buscador from '~/components/buscador/buscador.vue'
import loaderDate from "~/components/loaderDate/loaderDate.vue"

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            datapage:{
                permisos:0,
                logeado:false
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
            buscando: false,

        }
    },
    methods:{
    ...mapActions(['cargaBasePost']),
    async cargaPost(){
      await this.cargaBasePost("recomendados");

    },
    },
    async created() {
        // this.guardarVistaValida(true); 
      // console.log(this.misPost)
      await this.cargaPost();
      // console.log(this.misPost)


    },
    components:{
        // grupos
        // editorblog,
        // cargablog,
        listablog,
        buscador,
        loaderDate
        //TreeFolderContents: () => import('./tree-folder-contents.vue')
    },
    computed:{
      ...mapState(["datosUsuario","misPost","otrosPost","loading"])

    }
}

</script>
