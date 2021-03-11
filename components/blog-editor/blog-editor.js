import { mapState, mapActions, mapMutations } from "vuex";

import { VueEditor } from "vue2-editor";
import subirImagen from "@/components/subirimagen/subirimagen.vue";
import subirFile from "@/components/subirArchivo/subirArchivo.vue"
import Spinner from '~/components/spinner.vue'
import InputTag from 'vue-input-tag'
// import subirImagen from '~/components/subirimagen.vue"
import { format } from 'date-fns'
// import { es } from 'date-fns/locale';

export default {
  data() {
    return {
      editar: false,
      uploadimg: false,
      creablog: false,
      mensajeError1: "",
      preview: "",
      customToolbar: [],
      //DATA PARA CREAR NUEVO RECURSO
      creaRecurso: false,
      datosRecurso: {
        foldercode:"",
        titulo: "",
        fecha: "",
        edopost: "publico",
        premium: false,
        recomendado: false,
        urlImagen: "",
        contenido:"",
        tipoRecurso:"",
        urlRecurso:[],
        urlVista:"",
        // urlLink: "",
        comentarios:[],
        idCreador:"",
        nombreCreador:"",
        tags:[],
        permisoadmin: false,
      },
      usarnombre: true,
      esCrear: true,
      materia: "",
      grado: "",
      sinopsis: "",
      esUrlimgR: false,

      //DATA PARA CARGA DE RECURSOS
      barraProgreso: 0,
      urlFile: ["",""],
      urlDescargable:"",
      urlVista:"",
      // urlLink: "",
      file: null,
      fileVista: null,
      fileDescargable: null,
      tipoFile:"",
      completado: false,
      listo: false,
      esRecursoValido: true,
      typeFileFull: "",
      // imagenF: null,

      //DATA PARA BARRA DE PROGRESO UPLOAD
      cargando: false,
      interval: {},
      porcentaje: 60,
      bytesTotal: 0,
      bytesTranferidos: 0,
      updatedCollection: false,

      esBlog: false,
      tagsValido: null,
      msjTag: "",
      
      tipoRecursoFile: "",
      labelFile:"",
      
      //TIPO DE VIDEO
      // esVideo: false,
      tipoRecursoSelect: "",
      tiposRecursoList: ["link","file"],

      //PARA SUBIR MULTIPLES ARCHIVOS
      currFiles: [],
      files: [],
      filesArray:[],

      showicon:false,

      // REGLAS PARA FORMULARIO
      sinopsisReglas: [
        v => !!v || 'Sinopsis es requerida',
        v => (v && v.length <= 500) || 'Sinopsis debe tener menos de 500 caracteres',
      ],
  
    };
  },
  computed: {
    ...mapState(["urlimg", "datosUsuario"]),
    tituloCrear(){
      let tipoM = "";
      if(this.subtipo === "reflexion")
      {
        tipoM= "Nueva reflexión";
        this.tipoRecursoFile = "audio/mp3, image/png,image/jpeg "
        this.labelFile="Seleccione archivo"
      }
      if(this.subtipo === "planeacion")
      {
        tipoM= "Nueva planeación";
        this.tipoRecursoFile = ".doc, .docx, .pdf"
        this.labelFile="Seleccione archivo"
        this.tipoRecursoSelect ="file"

      }
      else if(this.subtipo === "materialdidactico")
      {
        tipoM= "Nuevo material didáctico";
        this.tipoRecursoFile = "image/*, .ppt, .pptx, .pdf"
        this.labelFile="Seleccione archivo"
        this.tipoRecursoSelect ="file"
      }
      else if(this.subtipo === "hojatrabajo")
      {
        tipoM= "Nueva hoja de trabajo";
        this.tipoRecursoFile = "image/*, .ppt, .pptx, .pdf"
        this.labelFile="Seleccione archivo"
        this.tipoRecursoSelect ="file"
      }
      else if(this.subtipo === "hojailustrar")
      {
        tipoM= "Nueva hoja para ilustrar";
        this.tipoRecursoFile = "image/*, .ppt, .pptx, .pdf"
        this.labelFile="Seleccione archivo"
        this.tipoRecursoSelect ="file"
      }
      else if(this.subtipo === "interactivo")
      {
        tipoM= "Nuevo interactivo";
        this.tipoRecursoFile = "audio/mp3, .ppt, .pptx, ppsx"
        this.labelFile="Seleccione archivo"
        this.tipoRecursoSelect ="audio"
      }
      else if(this.subtipo === "otro")
      {
        tipoM= "Nuevo recurso";
        this.tipoRecursoFile = ".pdf"
        this.labelFile="Seleccione archivo"
        this.tipoRecursoSelect ="file"
      }
      else if(this.subtipo === "memoria")
      {
        tipoM= "Nueva memoria";
        this.tipoRecursoFile = "audio/mp3, image/png,image/jpeg"
        this.labelFile="Seleccione archivo"
      }
      else if(this.subtipo === "blog")
      {
        tipoM= "Nuevo blog";
        this.tipoRecursoFile = "audio/mp3, image/png,image/jpeg"
        this.labelFile="Seleccione archivo"
      }
      return tipoM;
    }
  },
  methods: {
    ...mapMutations(["almacenarFotoStorage","actualizaImgUpload","agregarCategorias","actualizarCategorias"]),
    
    //METODOS PARA LA CARGA DE RECURSOS A FIREBASE
    async almacenarRecursoCollection(){
      // this.datosRecurso.recomendado = false;
      // console.log("this.datosRecurso antes de almacenar");
      // console.log(this.datosRecurso);

      
      if(this.completado && this.listo)
      {
        // console.log("LISTO PARA CREAR NUEVO");

        if(this.urlimg !== "" && this.urlimg !== "none")
          this.datosRecurso.urlImagen = this.urlimg

        if(this.subtipo === 'blog' || this.subtipo === 'memoria' || this.subtipo === 'reflexion')
          this.datosRecurso.permisoadmin = true;

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        const {id, nombre, apellido, lvluser} = this.datosUsuario;
        let nuevoRecurso = {};
          nuevoRecurso = {
            ...this.datosRecurso,
            fecha:  Date.now(),
            tipoRecurso: this.tipoRecursoSelect,
            urlVista: this.subtipo === 'materialdidactico' ? this.urlDescargable : this.urlVista,
            urlDescargable: this.urlDescargable,
            idCreador: id,
            nombreCreador: this.usarnombre  ? `${nombre} ${apellido}` : "Planeta Preescolar",
            materia: this.materia,
            grado: this.grado,
            sinopsis: this.sinopsis,
            tipoCreador: lvluser >= 3 ? 'administrador' : 'usuario',
            tipo: this.subtipo,
            // tags: this.tags
          }
          // nuevoRecurso.recomendado = nuevo

        try {
          // console.log(nuevoRecurso);
          await this.$fireStore.collection(this.tipo).add(nuevoRecurso);
          this.listaR.push(this.datosRecurso)
          this.actualizarCategorias([]);

          // this.$emit('updateListaR',this.listaR)
          this.$emit('updateRefresh',!this.refreshPost)
          this.resetDatos();
          // this.esCrear = false;


          
        } catch (error) {
          console.log(error);
        }
      }
    },

    cargaFinal(){
      // this.porcentaje = 100;
      this.datosRecurso.foldercode = this.datosRecurso.foldercode === "" ? this.$codegenerate() : this.datosRecurso.foldercode ;
      const ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecurso.foldercode}/`;
      this.completado = true;
      this.listo = true;
      this.almacenarFotoStorage(ubi);
    },
  

 
    async validarFormularioRecurso () {
      this.esRecursoValido =this.$refs.formRecurso.validate();

      if(this.datosRecurso.tags.length === 0)
      {
        this.tagsValido = false;
        this.msjTag = "Necesita agregar por lo menos un tag"
      }

      else if(this.esRecursoValido && this.datosRecurso.tags.length > 0)
      {
        this.tagsValido = true;
        this.msjTag = ""
        if(this.subtipo === "interactivo" && this.tipoRecursoSelect === "file")
          this.tipoRecursoSelect = "audio"

        if(this.tipo)
        this.cargaFinal();
        
  
        
      }

    },
    verificarTags(){
      if(this.datosRecurso.tags.length === 0)
      {
        this.tagsValido = false;

        this.msjTag = "Necesita agregar por lo menos un tag"
      }
      else{
        this.tagsValido = true;

        this.msjTag = ""
      }
    },
    abrirDialog(){

      if(this.tipo === "RECOMENDACION")
        this.esBlog = true;
      else
        this.esBlog = false;

      // if(TtipoRecursoSelect === 'file')
      if(this.subtipo === "reflexion")
        this.tipoRecursoSelect = "";
      this.usarnombre =  this.datosUsuario.lvluser >=3 ? false : true;

      this.creaRecurso=true
    },
    resetDatos(){
      
      

        
        
      this.usarnombre= true,
      this.materia ="";
      this.grado ="";
      this.sinopsis ="";
      this.tipoRecursoSelect = "";
    
      this.urlDescargable="";
      this.urlVista="";
      this.fileVista = null;
      this.fileDescargable = null;

      this.file = null;
      this.urlFile= ["",""];
      this.tipoFile="";
      this.typeFileFull= "";
      this.updatedCollection = true;

      this.completado = false;
      this.listo = false;

      this.bytesTotal=0;
      this.bytesTranferidos=0;
      // this.esUrlimgR = true;
      // this.esCrear = true;


      this.actualizaImgUpload("");
      this.$refs.formRecurso.reset();
      // this.datosRecurso.recomendado = false;
      this.datosRecurso= {
        foldercode:"",titulo: "",fecha: "",edopost: "publico",urlImagen: "",contenido:"",tipoRecurso:"",
        urlRecurso:"",comentarios:[],tags: [],idCreador:"",nombreCreador:"",premium: false,
        recomendado: false, permisoadmin: false,
      };
      this.creaRecurso = false;
    },

  },
  mounted() {
    // this.datablog.user = this.datosUsuario.id;
    this.datosRecurso.idCreador = this.datosUsuario.id;



  },
  components: {
    subirImagen,
    VueEditor,
    Spinner,
    InputTag,
    subirFile,
  },
    props: {
    tipo: {
      type: String,
      default: "BLOG"
    },
    subtipo: {
      type: String,
      default: "BLOG"
    },
    imagen: {
      type: String,
      default: "true"
    },
    listaR:{
      type: Array,
      default: () => []
    },
    refreshPost:{
      type: Boolean,
      default: false,
    },
    etreglas:{
      type:String,
      default:""
    },
    limitWH:{
      type:Object,
      default:()=>{
        return {
        width:0,
        height:0
        }
      }
    }
  },
  watch: {
    async urlimg() {
      
          await this.almacenarRecursoCollection();

    }
  }
};
