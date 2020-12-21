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
      customToolbar: [
        [{ 'font': [] }],
        [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        [{ 'header': 1 }, { 'header': 2 }],
        ['blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'video', 'formula'],
        [{ 'direction': 'rtl' }],
        ['clean'],
      ],
      //DATA PARA CREAR NUEVO RECURSO
      creaRecurso: false,
      datosRecurso: {
        foldercode:"",
        titulo: "",
        fecha: "",
        edopost: "",
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
        permisoadmin: true,
        // descargas: 0,
        // visualizaciones: 0,
        // descargas: [],
        // visualizaciones: [],
      },
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
        v => !!v || 'Sinopsis es requerido',
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
      else if(this.subtipo === "interactivo")
      {
        tipoM= "Nuevo interactivo";
        this.tipoRecursoFile = "audio/mp3"
        this.labelFile="Seleccione archivo"
        // this.tipoRecursoSelect ="file"
      }
      else if(this.subtipo === "otro")
      {
        tipoM= "Nuevo recurso";
        this.tipoRecursoFile = ".pdf"
        this.labelFile="Seleccione archivo"
        // this.tipoRecursoSelect ="file"
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

      console.log("this.completado blogEditor")
      console.log(this.completado)
      console.log("this.listo blogEditor")
      console.log(this.listo)
      if(this.completado && this.listo)
      {
        console.log("LISTO PARA CREAR NUEVO");

        if(this.urlimg !== "" && this.urlimg !== "none")
          this.datosRecurso.urlImagen = this.urlimg

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        const {id, nombre, apellido, lvluser} = this.datosUsuario;
        let nuevoRecurso = {};
        // console.log("subtipo", this.subtipo)
        
        // if(this.subtipo === "recurso" || this.subtipo === "planeacion")
          nuevoRecurso = {
            ...this.datosRecurso,
            fecha:  Date.now(),
            tipoRecurso: this.tipoFile,
            urlVista: this.subtipo === 'materialdidactico' ? this.urlDescargable : this.urlVista,
            urlDescargable: this.urlDescargable,
            idCreador: id,
            nombreCreador: `${nombre} ${apellido}`,
            materia: this.materia,
            grado: this.grado,
            sinopsis: this.sinopsis,
            tipoCreador: lvluser === 2 ? 'administrador' : 'usuario',
            tipo: this.subtipo,
            // tags: this.tags
          }
        // else
        //   nuevoRecurso = {
        //     ...this.datosRecurso,
        //     fecha:  Date.now(),
        //     tipoRecurso: this.tipoFile,
        //     urlVista: this.urlVista,
        //     urlDescargable: this.urlDescargable,
        //     idCreador: id,
        //     nombreCreador: `${nombre} ${apellido}`,
        //     tipoCreador: lvluser === 2 ? 'administrador' : 'usuario',
        //     tipo: this.subtipo,
        //     // tags: this.tags
        //   }

        try {
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

    
    

  
  //METODOS PARA MULTIPLES ARCHIVOS
  // remove (index) {
  //   this.files.splice(index, 1)
  //   this.filesArray.splice(index, 1)
  // },
  // inputChanged () {
  //   console.log(this.currFiles)
    
  //   this.typeFileFull = "none";
  //   if(this.currFiles.length === 0)
  //   {
  //     console.log("no hay nada")
  //     this.files= [];
  //     this.filesArray= [];
  //   }
  //   else{

  //     let res = this.currFiles[0].type.split("/");
  //     if(res[0] === "application")
  //     {
  //       console.log("appl")
  //       res = this.currFiles[0].name.split(".");
  //       console.log(res)
  //       res[0] = res[1];
  //     }
  
  //     // this.cargando = true;
  //     // this.porcentaje = 0;
  //       if(this.files)
  //       {
  
  //         //SE CREA URL DEL ARCHIVO QUE SE SUBIRA
  //         this.filesArray.push( {
  //           urlFile: URL.createObjectURL(this.currFiles[0]),
  //           typeFileFull: this.currFiles[0].type,
  //           bytesTranferidos: (this.currFiles[0].size / 1000000).toFixed(2),
  //           tipoFile: res[0],
            
  //         })
  //       }
  //     this.files = [
  //       ...this.files,
  //       ...this.currFiles,
  //     ]
  //     console.log(this.files)
  //     console.log(this.filesArray)
  //   }

  // },

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
        console.log("tags NO validos")

        this.msjTag = "Necesita agregar por lo menos un tag"
      }

      else if(this.esRecursoValido && this.datosRecurso.tags.length > 0)
      {
        this.tagsValido = true;
        this.msjTag = ""
        // console.log("tags validos")
        // this.datosRecurso.foldercode = this.datosRecurso.foldercode === "" ? this.$codegenerate() : this.datosRecurso.foldercode ;
        // const ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecurso.foldercode}/`;
   
        if(this.tipoRecursoSelect === "link")
        {
          this.tipoFile = "link";
        }
        this.cargaFinal();
        
  
        
      }

        // console.log("HO HAY ERRORES")
    },
    verificarTags(){
      if(this.datosRecurso.tags.length === 0)
      {
        this.tagsValido = false;
        console.log("tags NO validos")

        this.msjTag = "Necesita agregar por lo menos un tag"
      }
      else{
        this.tagsValido = true;
        console.log("tags NO validos")

        this.msjTag = ""
      }
    },
    abrirDialog(){

      // console.log(this.subtipo);
      if(this.tipo === "RECOMENDACION")
        this.esBlog = true;
      else
        this.esBlog = false;

      // if(TtipoRecursoSelect === 'file')
      if(this.subtipo === "reflexion")
        this.tipoRecursoSelect = "";

      this.creaRecurso=true
    },
    resetDatos(){
      console.log(this.datosRecurso)
      // alert("DATOS RECURSO");
      // console.log("RESETENADO TODA LA DATA UTILIZADA ")
      // this.$refs.formRecurso.reset();
      // this.datosRecurso.tags.length
      this.datosRecurso= {foldercode:"",titulo: "",fecha: "",edopost: "",urlImagen: "",contenido:"",tipoRecurso:"",urlRecurso:"",comentarios:[],tags: [],idCreador:"",nombreCreador:"",};
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
      this.creaRecurso = false;
    },

  },
  mounted() {
    // this.datablog.user = this.datosUsuario.id;
    this.datosRecurso.idCreador = this.datosUsuario.id;
    // console.log(this.listaR)

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
  },
  watch: {
    async urlimg() {
      // console.log("urlR")
      // console.log(this.esUrlimgR)

      // if(!this.esUrlimgR)
      // {
        console.log("NO SE ESTA RESETEANDO")
        // this.datablog.urlImagen = this.urlimg;
        // this.datosRecurso.urlImagen = this.urlimg
        // console.log(this.esCrear)

        // if(this.esCrear)
        // {
        //   this.esCrear = false;
        //   console.log(this.esCrear)
          await this.almacenarRecursoCollection();

        // }
      // }
      // else{
      //   this.esUrlimgR = false; 
      // }
    }
  }
};
