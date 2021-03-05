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
    },
    cargasitios(){
 
        this.sitiosLp=this.sitios
      
    }
  },
  components: {
    VueEditor
  },
  mounted(){

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
   
            },1000)
        
        });
      
    },
  
  },
  props:{
    sitios:{
      type:Array,
      default:()=>{
        return []
      }
    }
  }

};