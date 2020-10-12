<template>
  <v-main class="pa-10">
    <v-row>
      <v-col cols="12" md="12"> </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Reflexiones</h2>

        <cargablog>
          <template v-slot:header>
            <editorblog tipo="REFLEXION" />
          </template>
        </cargablog>
      </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Memorias</h2>
        <v-row>
          <v-col cols="12" md="3">
            <editorblog tipo="MEMORIA" imagen="false" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="12">
        <h2>Mi Blog</h2>
        <v-row>
          <v-col cols="12" md="3">
            <editorblog tipo="BLOG" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import validasitio from "@/mixins/validasitio.js";
import editorblog from "~/components/blog-editor/blog-editor.vue";
import cargablog from "~/components/carga-blog/carga-blog.vue";
export default {
  data() {
    return {
      datapage: {
        permisos: 1,
        logeado: true
      }
    };
  },
  components: {
    editorblog,
    cargablog
  },
  mixins: [validasitio]
};
</script>
