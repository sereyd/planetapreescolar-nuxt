<template>
  <v-main>
    <h2>Administrador de Landing Page</h2>

    <v-btn class="melon white--text" @click="addpage = true">
      Crear Nueva Pagina
    </v-btn>


<h3>Lista de sitios</h3>
  <v-data-table :items="sitiosLp" :headers="sitioHeader">

    <template v-slot:item.url='{ item }' >
     <a :href="protocolo+'//'+host+'/v/'+item.url" target="_blank" > {{protocolo+'//'+host+'/v/'+item.url}}</a>
    </template>
  
    <template v-slot:item.editar='{item}'>

       <v-btn class="melon white--text" @click="editarpub(item)"><v-icon>mdi-pencil-outline</v-icon></v-btn>
      <v-btn class="melon white--text" @click="eliminapub(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>

  </v-data-table>




    <v-dialog
      v-model="addpage"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="primary white--text">
          Nueva Landing Page<v-spacer></v-spacer>
          <v-btn class="primary white--text" @click="cerrarPagEditor()"
            >Cerrar</v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Ingrese el titulo de la pagina"
            v-model="datalp.titulo"
          >
           
          </v-text-field>
          <v-text-field
            label="url-del-sitio "
            readonly
            v-model="creaurlsitio"
          >
             <template v-slot:append>
              <v-btn class="melon white--text" @click="validaUrl()"> Validar url</v-btn>
            </template>

          </v-text-field>
          <v-label class="primary white--text" v-if="fase1===true">
            {{ urldesitio }}
          </v-label>

          <br />
          <v-combobox
            v-if="fase1===true"
            v-model="datalp.tags"
            hide-selected
            label="Ingrese las palabras clave de busqueda para los buscadores"
            multiple
            small-chips
            solo
          >
          </v-combobox>
          <br />

          <VueEditor
          v-if="fase1===true"
            class="elevation-3 rounded-lg"
            v-model="datalp.contenido"
          ></VueEditor>
          <br /><br />
          <v-dialog v-model="pregCont" max-width="700">
            <v-card >
              <v-card-title class="melon white--text">
                  La url y titulo ya están en uso.  ¿desea carga los datos?<br />
                </v-card-title>
              <v-card-text class="pt-5 pb-5 text-center">
              
                <v-btn class="primary white--text" @click="cargaDatosExitente()">Cargar Datos</v-btn>
                <v-btn class="melon white--text" @click="limpiadatos()"> Ingresar un nuevo titulo </v-btn>

              </v-card-text>
            </v-card>
          </v-dialog>
          <v-btn class="melon white--text" v-if="fase1===true" @click="guardarCambios()"
            >Guardar Cambios</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-main>
</template>
<script>
import validasitio from "@/mixins/validasitio.js";
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      datapage: {
        permisos: 3,
        logeado: true
      },
      protocolo:"",
      host:"",
      addpage: false,
      datalp: {
        url: ""
      },

      sitioweb: "",
      fase1:false,
      pregCont:false,
      sitiosLp:[],
      sitioHeader:[
        {
          text:'Titulo',
          value:'titulo'
        },
        {
          text:'Url',
          value:'url'
        },
        {
          text:'Editar',
          value:'editar'
        }
      ]
    };
  },
  computed: {
    urldesitio() {
      var sitioweb = window.location.href.replace("landingpage", "v");
      if (!this.datalp.url) {
        this.datalp.url = "";
      }
      sitioweb = sitioweb + "/" + this.datalp.url;
      this.datalp.fullurl=sitioweb
      return sitioweb;
    },
    creaurlsitio() {
      var urlSitio = this.datalp.titulo;
      if (this.datalp.titulo) {
        urlSitio = urlSitio.toLowerCase();
        urlSitio = urlSitio.replaceAll(" ", "-");
        urlSitio = urlSitio.replaceAll("á", "a");
        urlSitio = urlSitio.replaceAll("é", "e");
        urlSitio = urlSitio.replaceAll("í", "i");
        urlSitio = urlSitio.replaceAll("ó", "o");
        urlSitio = urlSitio.replaceAll("ú", "u");
      } else {
        urlSitio = "";
      }
      this.datalp.url = urlSitio;
      return urlSitio;
    }
  },
  components: {
    VueEditor
  },
  mounted(){
    this.cargaSitios()
    this.protocolo=window.location.protocol
    this.host=window.location.host
  },
  methods: {
    editarpub(p){
      this.datalp=p
      this.addpage=true
      this.fase1=true
    },
    eliminapub(p){
        this.$fireStore.collection('landingpage').doc(p.iddoc).delete()
        setTimeout(()=>{
          this.cargaSitios()
        },1000)
        
    },
    cerrarPagEditor(){
      this.fase1=false
      this.addpage=false
      this.datalp={}
    },
    async validaUrl(){
       await this.$fireStore
        .collection("landingpage")
        .where("url", "==", this.datalp.url)
        .get()
        .then((data) => {
        if(data.docs.length>0){
          this.pregCont=true
          this.datalp=data.docs[0].data()
      
        }else{
          this.fase1=true
        }
        })

    },
     limpiadatos(){
        this.fase1=false
        this.pregCont=false
      this.datalp={
        url: ""
      }
    },
    cargaDatosExitente(){
      this.fase1=true
      this.pregCont=false
    },
    async guardarCambios() {
      await this.$fireStore
        .collection("landingpage")
        .where("url", "==", this.datalp.url)
        .get()
        .then(data => {
          if(data.docs.length>0){
          data.docs.forEach(di => {
            console.log('actualiza datos')
              this.$fireStore.collection("landingpage").doc(di.id).update(this.datalp)
          });
            } else {
              console.log('crea nuevo registro')
               this.$fireStore.collection('landingpage').add(this.datalp)
            }

            this.addpage=false
            this.fase1=false
            this.datalp={}
              setTimeout(()=>{
                this.cargaSitios()
            },1000)
        
        });
      
    },
    async cargaSitios(){

       this.sitiosLp=[]

      await this.$fireStore.collection('landingpage').get()
      .then((data)=>{
        data.docs.forEach((ld)=>{
          var payload=ld.data()
              payload.iddoc=ld.id
           this.sitiosLp.push(payload)
           
        })
           
      })
    }
  },
  mixins: [validasitio]
};
</script>
