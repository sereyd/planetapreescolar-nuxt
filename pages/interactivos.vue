<template>
  <v-main class="px-10" v-if="bandera">
    <v-row
     v-if="
          $validasesion($store, {
            sinregistro: false,
            logeado: true,
            permisos: 1
          })
        "
    >
      <v-col cols="12">
        <buscador :esBuscando ="buscando" :selectopt="'Material interactivo'"  @updateBuscando="buscando=$event"/>
      </v-col>

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
          Mis interactivos
        </h2> -->

        <listablog
          blogpost="interactivo" @updateBlogpost="misPost=$event"
          tipo="CATEGORIAS"  subtipo="interactivo"
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
          tipo="CATEGORIAS"  subtipo="interactivo"
          titulo="Interactivos publicos"
          subtitulos="Conoce lo que pasa en el mundo de la educación inicial"
        />
      </v-col> -->
    </v-row>
       <v-row 
     v-if="
          $validasesion($store, {
            sinregistro: true,
            logeado: false,
            permisos: 0
          })          
        "
    >
    <v-col cols="12" md="3">
    </v-col>

       <v-col cols="12" md="6" class="text-center">
         <img src="pantallas/1Continua navegando.png" width="100%" />
         <br />
         <v-btn to="/registro" class="melon white--text">Regístrate</v-btn>
          <v-btn to="/login" class="melon white--text">Inicia Sesión</v-btn>
    </v-col> 

    <v-col cols="12" md="3">
    </v-col>

    </v-row>
  </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
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
      await this.cargaBasePost("interactivo");

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
