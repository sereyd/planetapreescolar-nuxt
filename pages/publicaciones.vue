<template>
  <v-main class="px-10 pt-0">
    <v-row>



      <!-- <v-col cols="12" md="12"> </v-col> -->
      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 2">
        <h2>Mis Reflexiones</h2>

        <cargablog 
          tipo="CATEGORIAS" subtipo="reflexion"   :listaR="reflexiones"
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="reflexion" 
            @updateListaR="reflexiones=$event"
            :listaR="reflexiones"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.reflexiones=$event"  imagen="false"    ></editorblog>
          </template>
        </cargablog>

      </v-col>
      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 2">
        <h2>Mis Planeaciones</h2>

        <cargablog 
          tipo="CATEGORIAS" subtipo="planeacion"  :listaR="planeaciones" 
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="planeacion"   
            @updateListaR="planeaciones=$event"
            :listaR="planeaciones"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.planeaciones=$event"  etreglas="Tamaño de portada  522px por 285px" :limitWH="{width:522, height:285}"  ></editorblog>
          </template>
        </cargablog>

      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 2">
        <h2>Mis hojas de trabajo</h2>
        <cargablog 
          tipo="CATEGORIAS" subtipo="hojatrabajo"  :listaR="hojastrabajo" 
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="hojatrabajo"   
            @updateListaR="hojastrabajo=$event"
            :listaR="hojastrabajo"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.hojastrabajo=$event" :limitWH="{ width:0, height:0}"  ></editorblog>
          </template>
        </cargablog>
      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 2">
        <h2>Mis hojas para ilustrar</h2>
        <cargablog 
          tipo="CATEGORIAS" subtipo="hojailustrar"  :listaR="hojasilustrar" 
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="hojailustrar"   
            @updateListaR="hojasilustrar=$event"
            :listaR="hojasilustrar"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.hojasilustrar=$event" :limitWH="{ width:0, height:0}"  ></editorblog>
          </template>
        </cargablog>
      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 2">
        <h2>Mi material didáctico</h2>
        <cargablog 
          tipo="CATEGORIAS" subtipo="materialdidactico"  :listaR="materialdidactico" 
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="materialdidactico"   
            @updateListaR="materialdidactico=$event"
            :listaR="materialdidactico"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.materialdidactico=$event"   etreglas="Tamaño de portada  522px por 285px" :limitWH="{width:522, height:285}"   ></editorblog>
          </template>
        </cargablog>
      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 2">
        <h2>Mis interactivos</h2>
        <cargablog 
          tipo="CATEGORIAS" subtipo="interactivo"  :listaR="interactivos" 
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="interactivo"   
            @updateListaR="interactivos=$event"
            :listaR="interactivos"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.interactivos=$event"  etreglas="Tamaño de portada  522px por 285px" :limitWH="{width:522, height:285}"    ></editorblog>
          </template>
        </cargablog>
      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 2">
        <h2>Mis otros</h2>
        <cargablog 
          tipo="CATEGORIAS" subtipo="otro"  :listaR="otros" 
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="otro"   
            @updateListaR="otros=$event"
            :listaR="otros"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.otros=$event"   ></editorblog>
          </template>
        </cargablog>
      </v-col>

      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 0">
        <h2>Mis Memorias</h2>
        <cargablog 
          tipo="CATEGORIAS" subtipo=" memoria"  :listaR="memorias"
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="memoria"  
            @updateListaR="memorias=$event"
            :listaR="memorias"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.memorias=$event"  etreglas="Tamaño de portada  522px por 285px" :limitWH="{width:522, height:285}"  ></editorblog>
          </template>
        </cargablog>
      </v-col>  
      <v-col cols="12" md="12" v-if="datosUsuario.lvluser >= 0">
        <h2>Mis Blogs</h2>
        <cargablog 
          tipo="CATEGORIAS" subtipo="blog"  :listaR="blog"
          :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
        >
          <template v-slot:header>
            <editorblog tipo="CATEGORIAS" subtipo="blog"  
            @updateListaR="blog=$event"
            :listaR="blog"
            :refreshPost="refreshPost" @updateRefresh="refreshPost=$event"
            @updatepost="updatepost.blog=$event" etreglas="Tamaño de portada  522px por 285px" :limitWH="{width:522, height:285}"  ></editorblog>
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
        planeaciones:"",
        hojastrabajo:"",
        hojasilustrar:"",
        materialdidactico:"",
        interactivos:"",
        otros:"",
      },
      // {
        memorias:[],
        blog:[],
        // actividades:[],
        reflexiones:[],
        planeaciones:[],
        hojastrabajo:[],
        hojasilustrar:[],
        materialdidactico:[],
        interactivos:[],
        otros:[],

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
        this.hojastrabajo=[];
        this.hojasilustrar=[];
        this.materialdidactico=[];
        this.interactivos=[];
        this.otros=[];
    // console.log(this.tipo)
    // console.log(this.$store.state.datosUsuario.id)
    let datos = {};
    let tipo = "CATEGORIAS";
      
      try {
        // const usuarioQuery =  this.$fireStore.collection('usuarios').where("correo", "==", user.email);

        // console.log(this)
        // console.log(this.$fireStore)
        // tipo = this.datosUsuario.lvluser === 2 || datosUsuario.lvluser >= 2 ? "ACTIVIDADES" : "CATEGORIAS";
        
      if( this.datosUsuario.lvluser >= 2){

        await this.$fireStore
          .collection(tipo)
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

                // console.log("TIPO")
                // console.log(datos.tipo)
                // console.log(datos)
                if(datos.tipo === "memoria")
                  this.memorias.push(datos)

                else if(datos.tipo === "blog")
                  this.blog.push(datos)
              
                else if(datos.tipo === "reflexion")
                  this.reflexiones.push(datos)

                else if(datos.tipo === "planeacion")
                  this.planeaciones.push(datos)

                else if(datos.tipo === "hojatrabajo")
                  this.hojastrabajo.push(datos) 
                
                else if(datos.tipo === "hojailustrar")
                  this.hojasilustrar.push(datos)

                else if(datos.tipo === "materialdidactico")
                  this.materialdidactico.push(datos)

                else if(datos.tipo === "interactivo")
                  this.interactivos.push(datos)
                
                else if(datos.tipo === "otro")
                  this.otros.push(datos)

              // this.listaR.push(datos);
                // console.log("Carga tipo: "+this.tipo)
                // console.log(doc.data())
              // this.listaR.push(doc.data());
            });

            // console.log("this.reflexiones")
            // console.log(this.reflexiones)
            //   console.log("this.planeaciones")
            //   console.log(this.planeaciones)

            //   console.log("this.hojastrabajo")
            //   console.log(this.hojastrabajo)

            //   console.log("this.materialdidactico")
            //   console.log(this.materialdidactico)

            //   console.log("this.interactivos")
            //   console.log(this.interactivos)

            //   console.log("this.otros")
            //   console.log(this.otros)

            //   console.log("this.blog")
            //   console.log(this.blog)
            //   console.log("this.memorias")
            //   console.log(this.memorias)
            // console.log(this.listaR)
          });

      }else{

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

                else if(datos.tipo === "planeacion")
                  this.planeaciones.push(datos)

                else if(datos.tipo === "hojatrabajo")
                  this.hojastrabajo.push(datos)
                
                else if(datos.tipo === "hojailustrar")
                  this.hojasilustrar.push(datos)

                else if(datos.tipo === "materialdidactico")
                  this.materialdidactico.push(datos)

                else if(datos.tipo === "interactivo")
                  this.interactivos.push(datos)

                else if(datos.tipo === "otro")
                  this.otros.push(datos)
              // this.listaR.push(datos);
                // console.log("Carga tipo: "+this.tipo)
                // console.log(doc.data())
              // this.listaR.push(doc.data());
            });

            // console.log("this.reflexiones")
            // console.log(this.reflexiones)
            //   console.log("this.planeaciones")
            //   console.log(this.planeaciones)
            //   console.log("this.recursos")
            //   console.log(this.recursos)
            //   console.log("this.blog")
            //   console.log(this.blog)
            //   console.log("this.memorias")
            //   console.log(this.memorias)
            // console.log(this.listaR)
          });

      }




      } catch (e) {
        console.log(e);
      }

  
    },
  },
  watch: {
  async refreshPost() {
        // this.verResultados= false;
        // console.log("REFRESH LISTA DE RECURSOS")
        await this.cargaPost();
    },

  },
  mixins: [validasitio]
};
</script>
