<template>
  <v-main class="px-10" v-if="bandera">
    <v-row>
      <v-col cols="12">
        <buscador :esBuscando ="buscando" @updateBuscando="buscando=$event"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
        v-if="
          $validasesion($store, {
            sinregistro: false,
            logeado: true,
            permisos: 1
          })
        "
      >
        <h2
          class="primary--text"
          v-if="
            $validasesion($store, {
              sinregistro: false,
              logeado: true,
              permisos: 1
            })
          "
        >
          Mis otros
        </h2>

        <listablog
          :blogpost="misPost" @updateBlogpost="misPost=$event"
          tipo="CATEGORIAS"  subtipo="otro"
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

      <div style="width:100%; height:0px;"></div>

      <v-col
        cols="12"
        md="12"
      >

        <listablog
          :blogpost="otrosPost" @updateBlogpost="otrosPost=$event"
          tipo="CATEGORIAS"  subtipo="otro"
          titulo="Otros publicos"
          subtitulos="Conoce lo que pasa en el mundo de la educación inicial"
        />
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
// import grupos from '~/components/grupos/grupos.vue'
// import editorblog from "~/components/blog-editor/blog-editor.vue";
// import cargablog from "~/components/carga-blog/carga-blog.vue";
import listablog from "~/components/listado-blog/listado-blog.vue";
import buscador from '~/components/buscador/buscador.vue'

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
            bandera: false,
            buscando: false,

        }
    },
    methods:{
    ...mapActions(['cargaBasePost']),
    async cargaPost(){
      await this.cargaBasePost("otro");

    },
    },
    async created() {
        // this.guardarVistaValida(true); 
      // console.log(this.misPost)
      await this.cargaPost();
      // console.log(this.misPost)

      this.bandera = true;
    },
    components:{
        // grupos
        // editorblog,
        // cargablog,
        listablog,
        buscador
        //TreeFolderContents: () => import('./tree-folder-contents.vue')
    },
    computed:{
      ...mapState(["datosUsuario","misPost","otrosPost"])

    }
}
</script>
