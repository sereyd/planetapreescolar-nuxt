<template>
  <v-main class="pa-10" v-if="bandera">
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
          Mis reflexiones
        </h2>

        <listablog
          :blogpost="misPost" @updateBlogpost="misPost=$event"
          tipo="CATEGORIAS"  subtipo="reflexion"
          :userId="this.datosUsuario.id"
          titulo=""
          subtitulos=""
          :addslot="true"
        >
        </listablog>
      </v-col>

      <div style="width:100%; height:50px;"></div>

      <v-col
        cols="12"
        md="12"
      >

        <!-- <listablog
          :blogpost="otrosPost" @updateBlogpost="otrosPost=$event"
          tipo="CATEGORIAS"  subtipo="reflexion"
          titulo="Reflexiones de otras educadoras"
          subtitulos="Comparte tus relexiones con la comunidad"
        /> -->
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import { mapState, mapActions } from "vuex";
import listablog from "~/components/listado-blog/listado-blog.vue";
import validasitio from "@/mixins/validasitio.js";
import editorblog from "~/components/blog-editor/blog-editor.vue";
import cargablog from "~/components/carga-blog/carga-blog.vue";
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
      bandera: false,
    };
  },
  computed: {
    ...mapState(["datosUsuario","misPost","otrosPost"])
  },
  async created() {

    await this.inialProceso();
    this.bandera = true;
  },
  components: {
    editorblog,
    cargablog,
    listablog
  },
  mixins: [validasitio],
  methods: {
    ...mapActions(['cargaBasePost']),
    async inialProceso(){
      await this.cargaBasePost("reflexion");

    },
    

  },
};
</script>
