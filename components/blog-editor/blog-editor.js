import { mapState, mapActions, mapMutations } from "vuex";

import { VueEditor } from "vue2-editor";
import subirImagen from "@/components/subirimagen/subirimagen.vue";
import Spinner from '~/components/spinner.vue'
import InputTag from 'vue-input-tag'
// import subirImagen from '~/components/subirimagen.vue"
import { format } from 'date-fns'
// import { es } from 'date-fns/locale';

export default {
  data() {
    return {
      editar: false,
      datablog: {
        urlImagen: "",
        fecha:"",
        edopost: "",
        premium: false,
        recomendado: false,
        titulo: "",
        contenido: "",
        user: ""
      },
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
      // formRecurso: true,
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
        comentarios:[],
        idCreador:"",
        nombreCreador:"",
        tags:[]
      },
      materia: "",
      grado: "",
      sinopsis: "",
      esUrlimgR: false,

      //DATA PARA CARGA DE RECURSOS
      barraProgreso: 0,
      urlFile: ["",""],
      urlLink: "",
      file: null,
      // tipoFile: "",
      tipoFile:"",
      completado: false,
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

      ubiWP:"",

      completadoW: false,
      cargandoW: false,
      porcentajeW: 0,
      fileWord:null,


      completadoP: false,
      cargandoP: false,
      porcentajeP: 0,
      filePDF:null,

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
      else if(this.subtipo === "recurso")
      {
        tipoM= "Nueva actividad";
        this.tipoRecursoFile = "audio/mp3, image/png, image/jpg, .ppt, .pptx, .pdf"
        this.labelFile="Seleccione archivo"
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
    // creanuevopost() {
    //   this.mensajeError1 = "";
    //   if (this.datablog.titulo && this.datablog.edopost) {
    //     this.editar = false;
    //     this.creablog = true;
    //   } else {
    //     this.mensajeError1 = "Ingrese todos los datos para continuar";

    //     setTimeout(() => {
    //       this.mensajeError1 = "";
    //     }, 2000);
    //   }
    // },
    // guardaPost() {
    //   try {
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
    // cerrar() {
    //   this.creablog = false;
    //   this.editar = true;
    // },
    // async guardarPost() {
    //   try {
    //     if (this.imagen === "true") {
    //       if (this.preview) {
    //         this.almacenarFotoStorage(
    //           this.tipo+"/" + this.datosUsuario.foldercode
    //         );
    //       } else {
    //         this.guardaenstore();
    //       }
    //     }else{
    //       this.guardaenstore();
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
    // async guardaenstore() {
    //   try {
    //     var date=new Date();
    //     this.datablog.fecha=date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear();
    //     var numhora=date.getSeconds()+date.getMilliseconds()
    //     await this.$fireStore.collection(this.tipo).add(this.datablog);
    //     this.creablog = false;
    //         this.datablog.urlImagen=""
    //         this.datablog.edopost=""
    //         this.datablog.fecha=""
    //         this.datablog.titulo=""
    //         this.datablog.contenido=""
    //     this.$emit('updatepost',numhora)
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },

    //METODOS PARA LA CARGA DE RECURSOS A FIREBASE
    async almacenarRecursoCollection(){
      if(this.completado)
      {

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        const {id, nombre, apellido, lvluser} = this.datosUsuario;
        let nuevoRecurso = {};
        // console.log("subtipo", this.subtipo)
        
        if(this.subtipo === "recurso" || this.subtipo === "planeacion")
          nuevoRecurso = {
            ...this.datosRecurso,
            fecha:  Date.now(),
            tipoRecurso: this.tipoFile,
            urlRecurso: this.urlFile,
            idCreador: id,
            nombreCreador: `${nombre} ${apellido}`,
            materia: this.materia,
            grado: this.grado,
            sinopsis: this.sinopsis,
            tipoCreador: lvluser === 2 ? 'administrador' : 'usuario',
            tipo: this.subtipo,
            // tags: this.tags
          }
        else
          nuevoRecurso = {
            ...this.datosRecurso,
            fecha:  Date.now(),
            tipoRecurso: this.tipoFile,
            urlRecurso: this.urlFile,
            idCreador: id,
            nombreCreador: `${nombre} ${apellido}`,
            tipoCreador: lvluser === 2 ? 'administrador' : 'usuario',
            tipo: this.subtipo,
            // tags: this.tags
          }

        try {
          await this.$fireStore.collection(this.tipo).add(nuevoRecurso);
          this.listaR.push(this.datosRecurso)
          this.actualizarCategorias([]);

          // this.$emit('updateListaR',this.listaR)
          this.$emit('updateRefresh',!this.refreshPost)
          this.resetDatos();

          
        } catch (error) {
          console.log(error);
        }
      }
    },

    async changeWord(){

      if(this.ubiWP === "")
      {
        this.datosRecurso.foldercode =this.$codegenerate();
        this.ubiWP = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecurso.foldercode}/`;

      }

      console.log("UBICACION")
      console.log(this.ubiWP)

      this.completadoW = false;
      this.cargandoW = true;
      this.porcentajeW = 0;

      let file =  this.fileWord;
      console.log(file)
      const typeFileFull = file.type;
      console.log(typeFileFull)
      const metadata = {
      contentType: typeFileFull
      };

      // file = null;

      //VERIFICAR QUE EXISTA ARCHIVO PARA SUBIR
      if(file){
        console.log("FILE VALIDO")
          try {
              //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

              let storageRef = this.$fireStorage.ref(this.ubiWP);
              let uploadTask = storageRef.child("word_"+this.datosRecurso.foldercode).put(file, metadata);

              await uploadTask.on('state_changed', // or 'state_changed'
              (snapshot) => {
                  this.porcentajeW = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );

              },(error) => {
                  console.log("ERROR")
                  console.log(error)
              }, () => {
                  uploadTask.snapshot.ref.getDownloadURL()
                  .then( async(downloadURL) => {
                      this.urlFile[0] = downloadURL;
                      console.log('File available at', downloadURL);
                      console.log('URLFILE', this.urlFile);
                      this.cargandoW = false;
                  });
              });

          } catch (error) {
              console.log(error)
          }
      }
    },

    async changePDF(){

      if(this.ubiWP === "")
      {
        this.datosRecurso.foldercode =this.$codegenerate();
        this.ubiWP = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecurso.foldercode}/`;

      }

      console.log("UBICACION")
      console.log(this.ubiWP)

      this.completadoP = false;
      this.cargandoP = true;
      this.porcentajeP = 0;

      let file =  this.filePDF;
      console.log(file)
      const typeFileFull = file.type;
      console.log(typeFileFull)
      const metadata = {
      contentType: typeFileFull
      };

      
      try {
          //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

          let storageRef = this.$fireStorage.ref(this.ubiWP);
          let uploadTask = storageRef.child("pdf_"+this.datosRecurso.foldercode).put(file, metadata);

          await uploadTask.on('state_changed', // or 'state_changed'
          (snapshot) => {
              this.porcentajeP = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );

          },(error) => {
              console.log("ERROR")
              console.log(error)
          }, () => {
              uploadTask.snapshot.ref.getDownloadURL()
              .then( async(downloadURL) => {
                  this.urlFile[1] = downloadURL;
                  console.log('File available at', downloadURL);
                  console.log('URLFILE', this.urlFile);
                  this.cargandoP = false;
              });
          });

      } catch (error) {
          console.log(error)
      }

    },
    cambio(){
      this.porcentajeW = 0;
      this.cargandoW = false;
    },

    async changeFile(){
      this.typeFileFull = "none";

      // this.cargando = true;
      // this.porcentaje = 0;
      if(this.file)
      {

        //SE CREA URL DEL ARCHIVO QUE SE SUBIRA
        this.urlFile[0] = URL.createObjectURL(this.file);
        this.urlFile[1] = URL.createObjectURL(this.file);
        // console.log(this.urlFile);
        // console.log(this.file);

        //SE OBTIENE EL TIPO DE ARCHIVO
        let res = this.file.type.split("/");
        

        // let res = this.currFiles[0].type.split("/");
        if(res[0] === "application")
        {
          console.log("appl")
          res = this.file.name.split(".");
          console.log(res)
          res[0] = res[1];
        }
          this.tipoFile = res[0];
          this.typeFileFull = this.file.type; 
        

        console.log(this.tipoFile)
        console.log(this.typeFileFull)
        console.log(this.urlFile)

        //SE OBTIENE EL TAMAÑO DE ARCHIVO Y SE DIVIDE DE MANERA QUE SE OBTENGA EN MB
        this.bytesTranferidos = (this.file.size / 1000000).toFixed(2);
        // const r = (6085966 / 1000000).toFixed(2);
        // console.log(r+" MBs")
      }
      // console.log(this.$refs.formRecurso)
      // this.$refs.formRecurso.reset();

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
  

  async updateFile(fileL, ubi){
      this.cargando = true;
      this.updatedCollection = false;
      this.porcentaje = 0;

      const file =  this.file;
      // let files =  this.files;
      // let contFiles =  0;
      const metadata = {
      contentType: this.typeFileFull
      // contentType: 'video/*'
      };

      //VERIFICAR QUE EXISTA ARCHIVO PARA SUBIR
      if(file){

          try {
              //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

              let storageRef = this.$fireStorage.ref(ubi);
              let uploadTask = storageRef.child("recurso_"+this.datosRecurso.foldercode).put(file, metadata);

              await uploadTask.on('state_changed', // or 'state_changed'
              (snapshot) => {
                  this.porcentaje = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
                  // console.log('Upload is ' + this.porcentaje + '% done');
                  this.bytesTranferidos = ( snapshot.bytesTransferred / 1000000).toFixed(2);
                  this.bytesTotal = ( snapshot.totalBytes / 1000000).toFixed(2);

              },(error) => {
                  console.log("ERROR")
                  console.log(error)
              }, () => {
              // Upload completed successfully, now we can get the download URL
                  uploadTask.snapshot.ref.getDownloadURL()
                  .then( async(downloadURL) => {
                      // this.urlFile = [downloadURL];
                      this.urlFile[0] = downloadURL;
                      this.urlFile[1] = downloadURL;
                      console.log('File available at', downloadURL);
                      console.log('URLFILE', this.urlFile);
                      this.completado = true;
                      this.almacenarFotoStorage(ubi);

                  });
              });

          } catch (error) {
              console.log(error)
          }
      }else{
          // tipoFile
          if(this.tipoRecursoSelect === "link")
          {
            // const {urlRecurso} = this.datosRecurso;
            this.urlFile[0] = this.urlLink;
            this.urlFile[1] = this.urlLink;
            this.tipoFile = "link";
          }
          else if(this.fileWord || this.filePDF)
          {

            this.tipoFile = "docx/pdf";
          }
          else
          {

            this.urlFile = ["",""];
            this.tipoFile = "none";
          }

          this.porcentaje = 100;
          this.completado = true;
          this.almacenarFotoStorage(ubi);
      }

    
    },
    async validarFormularioRecurso () {
      this.esRecursoValido =this.$refs.formRecurso.validate();
      // console.log("this.esRecursoValido")
      // console.log(this.esRecursoValido)
      // console.log("this.datosRecurso.tags.length")
      // console.log(this.datosRecurso.tags.length)
      
      if(this.datosRecurso.tags.length === 0)
      {
        this.tagsValido = false;
        console.log("tags NO validos")

        this.msjTag = "Necesita agregar por lo menos un tag"
      }

      if(this.esRecursoValido && this.datosRecurso.tags.length > 0)
      {
        this.tagsValido = true;
        this.msjTag = ""
        // console.log("tags validos")
        let files =  this.files;
        this.datosRecurso.foldercode = this.datosRecurso.foldercode === "" ? this.$codegenerate() : this.datosRecurso.foldercode ;
        const ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecurso.foldercode}/`;
   
            // console.log(files)
            // console.log(ubi)
            await this.updateFile(files, ubi)
  
        
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
      // console.log("RESETENADO TODA LA DATA UTILIZADA ")
      this.$refs.formRecurso.reset();
      // this.datosRecurso.tags.length
      this.datosRecurso= {
        foldercode:"",
        titulo: "",
        fecha: "",
        edopost: "",
        urlImagen: "",
        contenido:"",
        tipoRecurso:"",
        urlRecurso:"",
        comentarios:[],
        tags: [],
        idCreador:"",
        nombreCreador:"",
      },
      this.materia ="";
      this.grado ="";
      this.sinopsis ="";
      this.tipoRecursoSelect = "";
      
      this.file = null;
      this.urlFile= ["",""];
      this.tipoFile="";
      this.typeFileFull= "";
      this.updatedCollection = true;

      this.filePDF = null;
      this.fileWord = null;

      this.completado = false;
      this.bytesTotal=0;
      this.bytesTranferidos=0;
      this.esUrlimgR = true;

      this.actualizaImgUpload("");
    },

  },
  mounted() {
    this.datablog.user = this.datosUsuario.id;
    // console.log(this.listaR)

  },
  components: {
    subirImagen,
    VueEditor,
    Spinner,
    InputTag,
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

      // if (this.urlimg) {
        // if (this.datablog.titulo && this.datablog.edopost) {
      // console.log("SE ESTA RESETEANDO LA URL DE LA IMAGEN DE PORTADA: ",this.esUrlimgR)

      if(!this.esUrlimgR)
      {
        // console.log("NO SE ESTA RESETEANDO")
        this.datablog.urlImagen = this.urlimg;
        this.datosRecurso.urlImagen = this.urlimg
        await this.almacenarRecursoCollection();
      }
      else{

        this.esUrlimgR = false; 
      }
        // }
      // }
    }
  }
};
