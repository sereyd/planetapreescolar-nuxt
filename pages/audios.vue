<template>
  <v-main class="pa-10">
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
          Mis Audios
        </h2>

        <listablog
          tipo="AUDIOS"
          :userId="this.datosUsuario.id"
          titulo=""
          subtitulos="Comparte tus audios/música con la comunidad"
          :addslot="true"
        >
          <editorblog
            tipo="AUDIOS"
            v-if="
              $validasesion($store, {
                sinregistro: false,
                logeado: true,
                permisos: 1
              })
            "
            @updatepost="updatepost.audios = $event"
          ></editorblog>
        </listablog>
      </v-col>

      <div style="width:100%; height:50px;"></div>

      <v-col
        cols="12"
        md="12"
      >

        <listablog
          tipo="AUDIOS"
          :idexclude="
            this.datosUsuario.userlogin === true ? this.datosUsuario.id : ''
          "
          titulo="Audios de otras educadoras"
          subtitulos="Audios/música para la comunidad"
        />
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import { mapState } from "vuex";
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
        recomendacion: "",
        audios:"",
      },
      idnext: "",

      datapage: {
        permisos: 0,
        logeado: false
      }
    };
  },
  computed: {
    ...mapState(["datosUsuario"])
  },
  mounted() {
    if (this.datosUsuario.userlogin === true) {
      this.idnext = this.datosUsuario.id;
    }
  },
  components: {
    editorblog,
    cargablog,
    listablog
  },
  mixins: [validasitio]
};
</script>