<template>
  <v-main class="pa-10">
    <v-row>

      <v-col cols="12" md="12" v-if="$validasesion($store,{ sinregistro:false, logeado:true, permisos:2 })">
        <h2 class="primary--text"   v-if="$validasesion($store,{ sinregistro:false, logeado:true, permisos:2 })" >Administrar Reflexiones</h2>
        
        <listablog tipo="REFLEXIONES" imagen="false"  :userId="this.datosUsuario.id"  titulo="" subtitulos="Administrar reflexiones"  :addslot="true"  >

            <editorblog tipo="REFLEXIONES" v-if="$validasesion($store,{ sinregistro:false, logeado:true, permisos:1 })"  @updatepost="updatepost.memorias=$event" imagen="false"   ></editorblog>
      
        </listablog>

      </v-col>  






    </v-row>
  </v-main>
</template>
<script>
import {mapState} from 'vuex'
import listablog from '~/components/listado-blog/listado-blog.vue'
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
        recomendacion:"",
       
      },
       idnext:"",
     
      datapage: {
        permisos: 0,
        logeado: false
      }
    };
  },
   computed:{
        ...mapState(['datosUsuario'])
      },
  mounted(){
    if(this.datosUsuario.userlogin===true){
      this.idnext=this.datosUsuario.id
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
