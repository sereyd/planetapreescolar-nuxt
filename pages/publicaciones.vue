<template>
  <v-main class="pa-10">
    <v-row>
      <v-col cols="12" md="12"> </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Reflexiones</h2>

        <cargablog tipo="REFLEXIONES"   :listaR="listaRecursos.reflexiones" >
          <template v-slot:header>
            <editorblog tipo="REFLEXIONES" 
            @updateListaR="listaRecursos.reflexiones=$event"
            :listaR="listaRecursos.reflexiones"
            @updatepost="updatepost.reflexiones=$event"  imagen="false" ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Recomendaciones</h2>

        <cargablog tipo="RECOMENDACION"  :listaR="listaRecursos.recomendacion"  >
          <template v-slot:header>
            <editorblog tipo="RECOMENDACION"   
            @updateListaR="listaRecursos.recomendacion=$event"
            :listaR="listaRecursos.recomendacion"

            @updatepost="updatepost.recomendacion=$event"   ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12">
        <h2>Mis Memorias</h2>
        <cargablog tipo="MEMORIA"  :listaR="listaRecursos.memorias" >
          <template v-slot:header>
            <editorblog tipo="MEMORIA"  
            @updateListaR="listaRecursos.memorias=$event"
            @updatepost="updatepost.memorias=$event"    ></editorblog>
          </template>
        </cargablog>
      </v-col>  
      <v-col cols="12" md="12">
        <h2>Mi Blog</h2>
        <cargablog tipo="BLOG"  :listaR="listaRecursos.blog" >
          <template v-slot:header>
            <editorblog tipo="BLOG"  
            @updateListaR="listaRecursos.blog=$event"
            @updatepost="updatepost.blog=$event"  ></editorblog>
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
// import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      updatepost:{
        memorias:"",
        blog:"",
        reflexiones:"",
        recomendacion:""
      },
      listaRecursos:{
        memorias:[],
        blog:[],
        reflexiones:[],
        recomendacion:[],
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
  computed: {
    // ...mapState(['']),
  },
  mixins: [validasitio]
};
</script>
