<template>
  <v-main class="pa-10">
    <v-row>
      <v-col cols="12" md="12"> </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Reflexiones</h2>

        <cargablog tipo="REFLEXION"   :updatelist="updatepost.reflexiones" >
          <template v-slot:header>
            <editorblog tipo="REFLEXION" @updatepost="updatepost.reflexiones=$event"  imagen="false" ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Reflexiones</h2>

        <cargablog tipo="RECOMENDACION"  :updatelist="updatepost.recomendacion"  >
          <template v-slot:header>
            <editorblog tipo="RECOMENDACION"   @updatepost="updatepost.recomendacion=$event"   ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Memorias</h2>
        <cargablog tipo="MEMORIA"  :updatelist="updatepost.memorias" >
          <template v-slot:header>
            <editorblog tipo="MEMORIA"  @updatepost="updatepost.memorias=$event"    ></editorblog>
          </template>
        </cargablog>
      </v-col>  
      <v-col cols="12" md="12">
        <h2>Mi Blog</h2>
        <cargablog tipo="BLOG"  :updatelist="updatepost.blog" >
          <template v-slot:header>
            <editorblog tipo="BLOG"  @updatepost="updatepost.blog=$event"  ></editorblog>
          </template>
        </cargablog>
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
      updatepost:{
        memorias:"",
        blog:"",
        reflexiones:"",
        recomendacion:""
      },
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
