<template>
  <v-main class="px-10" >
    <v-row
    
    >
      <v-col cols="12">
        <buscador :esBuscando ="buscando"  :selectopt="'Blog'" @updateBuscando="buscando=$event"/>

        
<loaderDate :loader="loading"  />
      </v-col>
 
      <v-col
        cols="12"
        md="12"
       
      >
        <!-- <h2
          class="primary--text"
          v-if="
            $validasesion($store, {
              sinregistro: false,
              logeado: true,
              permisos: 1
            })
          "
        >
          Mis Blogs
        </h2> -->

        <listablog
          blogpost="blog" @updateBlogpost="misPost=$event"
          tipo="CATEGORIAS"  subtipo="blog"
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

      <!-- <v-col
        cols="12"
        md="12"
      >

        <listablog
          blogpost="otrosPost" @updateBlogpost="otrosPost=$event"
          tipo="CATEGORIAS"  subtipo="blog"
          titulo="Blog de otras educadoras"
          subtitulos="Conoce lo que pasa en el mundo de la educación inicial"
        />
      </v-col> -->
    </v-row>
    
  </v-main>
</template>
<script>
import { mapState, mapActions } from "vuex";
import listablog from "~/components/listado-blog/listado-blog.vue";
import validasitio from "@/mixins/validasitio.js";
import editorblog from "~/components/blog-editor/blog-editor.vue";
import buscador from '~/components/buscador/buscador.vue'
import  loaderDate from '~/components/loaderDate/loaderDate.vue'

export default {
  data() {
    return {
      updatepost: {
        memorias: "",
        blog: "",
        reflexiones: "",
        recomendacion: ""
      },
      idnext: "",

      datapage: {
        permisos: 0,
        logeado: false
      },
      misMemorias:[],
      otrasMemorias:[],

      buscando: false,

    };
  },
  computed: {
    ...mapState(["datosUsuario","misPost","otrosPost","loading"])
  },
  async created() {

    await this.inialProceso();

  },
  components: {
    editorblog,
    listablog,
    buscador,
     loaderDate
  },
  mixins: [validasitio],
  methods: {
    ...mapActions(['cargaBasePost']),
    async inialProceso(){
      await this.cargaBasePost("blog");

    },
    

  },
};
</script>