<template>
  <v-main class="pa-10">
    <v-row>
      <v-col cols="12" md="12"> </v-col>
      <v-col cols="12" md="12" v-if="datosUsuario.lvluser === 2">
        <h2>Mis Reflexiones</h2>

        <cargablog tipo="CATEGORIAS" subtipo="reflexion"   :listaR="reflexiones" >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="reflexion" 
            @updateListaR="reflexiones=$event"
            :listaR="reflexiones"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.reflexiones=$event"  imagen="false" ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12" v-if="datosUsuario.lvluser === 2">
        <h2>Mis Planeaciones</h2>

        <cargablog tipo="CATEGORIAS" subtipo="planeacion"  :listaR="planeaciones"  >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="planeacion"   
            @updateListaR="planeaciones=$event"
            :listaR="planeaciones"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.planeaciones=$event"   ></editorblog>
          </template>
        </cargablog>

      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser === 2">
        <h2>Mis Actividades</h2>

        <cargablog tipo="CATEGORIAS" subtipo="recurso"  :listaR="recursos"  >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="recurso"   
            @updateListaR="recursos=$event"
            :listaR="recursos"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.actividades=$event"   ></editorblog>
          </template>
        </cargablog>

      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser === 1">
        <h2>Mis Memorias</h2>
        <cargablog tipo="CATEGORIAS" subtipo=" memoria"  :listaR="memorias" >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="memoria"  
            @updateListaR="memorias=$event"
            :listaR="memorias"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.memorias=$event"    ></editorblog>
          </template>
        </cargablog>
      </v-col>  
      <v-col cols="12" md="12" v-if="datosUsuario.lvluser === 1">
        <h2>Mis Blogs</h2>
        <cargablog tipo="CATEGORIAS" subtipo="blog"  :listaR="blog" >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="blog"  
            @updateListaR="blog=$event"
            :listaR="blog"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      updatepost:{
        memorias:"",
        blog:"",
        reflexiones:"",
        recomendacion:""
      },
      // {
        memorias:[],
        blog:[],
        // actividades:[],
        reflexiones:[],
        planeaciones:[],
        recursos:[],

      // },
      datapage: {
        permisos: 1,
        logeado: true
      },
      refreshPost: false,
    };
  },
  components: {
    editorblog,
    cargablog
  },
  computed: {
    ...mapState(['datosUsuario']),
  },
  mounted() {
    this.cargaPost();
  },
  methods:{
    async cargaPost() {
        this.memorias=[];
        this.blog=[];
        this.reflexiones=[];
        this.planeaciones=[];
        this.recursos=[];
    // console.log(this.tipo)
    // console.log(this.$store.state.datosUsuario.id)
    let datos = {};
    let tipo = "CATEGORIAS";
      
      try {
        // const usuarioQuery =  this.$fireStore.collection('usuarios').where("correo", "==", user.email);

        // console.log(this)
        // console.log(this.$fireStore)
        // tipo = this.datosUsuario.lvluser === 2 ? "ACTIVIDADES" : "CATEGORIAS";
        

        await this.$fireStore
          .collection(tipo)
          .where("idCreador", "==",this.$store.state.datosUsuario.id)
          // .where("tipo","==",this.tipo)  
          .get()
          .then((data) => {
            data.forEach((doc) => {
              let data = doc.data();
              data.tags = data.tags ? data.tags : [];
              data.favoritos = data.favoritos ? data.favoritos : [];
              data.sinopsis= data.sinopsis ? data.sinopsis : "";

              delete data['idRecurso'];


              datos = {
                idRecurso: doc.id,
                ...data
              }

              
                if(datos.tipo === "memoria")
                  this.memorias.push(datos)

                else if(datos.tipo === "blog")
                  this.blog.push(datos)
              
                else if(datos.tipo === "reflexion")
                  this.reflexiones.push(datos)

                if(datos.tipo === "planeacion")
                  this.planeaciones.push(datos)

                else if(datos.tipo === "recurso")
                  this.recursos.push(datos)

              

              

              // this.listaR.push(datos);
                // console.log("Carga tipo: "+this.tipo)
                // console.log(doc.data())
              // this.listaR.push(doc.data());
            });

            console.log("this.reflexiones")
            console.log(this.reflexiones)
              console.log("this.planeaciones")
              console.log(this.planeaciones)
              console.log("this.recursos")
              console.log(this.recursos)
              console.log("this.blog")
              console.log(this.blog)
              console.log("this.memorias")
              console.log(this.memorias)
            // console.log(this.listaR)
          });
      } catch (e) {
        console.log(e);
      }

  
    },
  },
  watch: {
  async refreshPost() {
        // this.verResultados= false;
        console.log("REFRESH LISTA DE RECURSOS")
        await this.cargaPost();
    },

  },
  mixins: [validasitio]
};
</script>
