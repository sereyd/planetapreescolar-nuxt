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
        urlImagen: "",
        contenido:"",
        tipoRecurso:"",
        urlRecurso:"",
        comentarios:[],
        idCreador:"",
        nombreCreador:"",
        tags:[]
      },
      materia: "",
      grado: "",
      esUrlimgR: false,

      //DATA PARA CARGA DE RECURSOS
      barraProgreso: 0,
      urlFile: null,
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
      porcentaje: 0,
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
      tipoVideo: "",
      tiposVideoList: ["link","file"],

  
    };
  },
  computed: {
    ...mapState(["urlimg", "datosUsuario"]),
    tituloCrear(){
      let tipoM = "";
      if(this.tipo === "REFLEXIONES")
      {
        tipoM= "Nueva reflexión";
        this.tipoRecursoFile = "audio/mp3, image/png,image/jpeg , video/mp4"
        this.labelFile="Seleccione archivo"
      }
      else if(this.tipo === "RECOMENDACION")
      {
        tipoM= "Nueva recomendación";
        this.tipoRecursoFile = "audio/mp3, image/png,image/jpeg , video/mp4"
        this.labelFile="Seleccione archivo"
      }
      else if(this.tipo === "MEMORIA")
      {
        tipoM= "Nueva memoria";
        this.tipoRecursoFile = "audio/mp3, image/png,image/jpeg , video/mp4"
        this.labelFile="Seleccione archivo"
      }
      else if(this.tipo === "BLOG")
      {
        tipoM= "Nuevo blog";
        this.tipoRecursoFile = "audio/mp3, image/png,image/jpeg , video/mp4"
        this.labelFile="Seleccione archivo"
      }
      else if(this.tipo === "AUDIOS")
      {
        tipoM= "Nuevo audio";
        this.tipoRecursoFile = "audio/*"
        this.labelFile="Seleccione audio"
      }
      else if(this.tipo === "VIDEOS")
      {
        tipoM= "Nuevo video";
        this.tipoRecursoFile = "video/mp4"
        this.labelFile="Seleccione video"
      }
      else if(this.tipo === "IMAGENES")
      {
        tipoM= "Nueva imagen";
        this.tipoRecursoFile = "image/*"
        this.labelFile="Seleccione imagen"
      }
      return tipoM;
    }
  },
  methods: {
    ...mapMutations(["almacenarFotoStorage","actualizaurlimg","actualizaImgUpload"]),
    creanuevopost() {
      this.mensajeError1 = "";
      if (this.datablog.titulo && this.datablog.edopost) {
        this.editar = false;
        this.creablog = true;
      } else {
        this.mensajeError1 = "Ingrese todos los datos para continuar";

        setTimeout(() => {
          this.mensajeError1 = "";
        }, 2000);
      }
    },
    guardaPost() {
      try {
      } catch (e) {
        console.error(e);
      }
    },
    cerrar() {
      this.creablog = false;
      this.editar = true;
    },
    async guardarPost() {
      try {
        if (this.imagen === "true") {
          if (this.preview) {
            this.almacenarFotoStorage(
              this.tipo+"/" + this.datosUsuario.foldercode
            );
          } else {
            this.guardaenstore();
          }
        }else{
          this.guardaenstore();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async guardaenstore() {
      try {
        var date=new Date();
        this.datablog.fecha=date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear();
        var numhora=date.getSeconds()+date.getMilliseconds()
        await this.$fireStore.collection(this.tipo).add(this.datablog);
        this.creablog = false;
            this.datablog.urlImagen=""
            this.datablog.edopost=""
            this.datablog.fecha=""
            this.datablog.titulo=""
            this.datablog.contenido=""
        this.$emit('updatepost',numhora)
      } catch (e) {
        console.error(e);
      }
    },

    //METODOS PARA LA CARGA DE RECURSOS A FIREBASE
    async almacenarRecursoCollection(){
      // console.log("this.completado")
      // console.log(this.completado)
      // alert("completadooo");
      if(this.completado)
      {

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        const {id, nombre, apellido, lvluser} = this.datosUsuario;
        // if(this.tipoFile === "imagen"){
        //   this.datosRecurso.urlRecurso = this.urlFile
        //   this.datosRecurso.tipoRecurso = 
        // }
        let nuevoRecurso = {};
        
        if(this.tipo === "RECOMENDACION")
          nuevoRecurso = {
            ...this.datosRecurso,
            fecha:  Date.now(),
            tipoRecurso: this.tipoFile,
            urlRecurso: this.urlFile,
            idCreador: id,
            nombreCreador: `${nombre} ${apellido}`,
            materia: this.materia,
            grado: this.grado,
            tipoCreador: lvluser === 2 ? 'administrador' : 'usuario',
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
            // tags: this.tags
          }

        try {
          await this.$fireStore.collection(this.tipo).add(nuevoRecurso);
          this.listaR.push(this.datosRecurso)
          this.$emit('updateListaR',this.listaR)
          this.resetDatos();



          
        } catch (error) {
          console.log(error);
        }

        
      }
      // else{
      //   // console.log("NO SE PUDO SUBIR EL RECURSO")
      // }

    },

    async changeFile(){
      this.typeFileFull = "none";

      // this.cargando = true;
      // this.porcentaje = 0;
      if(this.file)
      {

        //SE CREA URL DEL ARCHIVO QUE SE SUBIRA
        this.urlFile = URL.createObjectURL(this.file);
        // console.log(this.urlFile);
        // console.log(this.file);

        //SE OBTIENE EL TIPO DE ARCHIVO
        const res = this.file.type.split("/");
        this.tipoFile = res[0];
        this.typeFileFull = this.file.type;

        //SE OBTIENE EL TAMAÑO DE ARCHIVO Y SE DIVIDE DE MANERA QUE SE OBTENGA EN MB
        this.bytesTranferidos = (this.file.size / 1000000).toFixed(2);
        // const r = (6085966 / 1000000).toFixed(2);
        // console.log(r+" MBs")
      }
      // console.log(this.$refs.formRecurso)
      // this.$refs.formRecurso.reset();

  },

  async updateFile(){
      // console.log("listaR VALIDACION")
      // console.log(this.listaR)
      this.datosRecurso.foldercode =this.$codegenerate();
      const ubi = `${this.tipo}/${this.datosUsuario.id}/${this.datosRecurso.foldercode}/`;

      this.cargando = true;
      this.updatedCollection = false;
      this.porcentaje = 0;
      // const ubi = `${this.tipo}/${this.tipoFile}s/`;
      // console.log("folder del recurso: "+this.datosRecurso.foldercode);

      // console.log("UBICACION DE RECURSO: ",ubi)
      // console.log("entra al fotoStorage: "+ this.urlFile)

      const file =  this.file;
      const metadata = {
      contentType: this.typeFileFull
      // contentType: 'video/*'
      };
      // await this.almacenarFotoStorage(ubi);
      


      //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
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
                      this.urlFile = downloadURL     
                      // console.log('File available at', downloadURL);
                      // console.log("saliendo fotoStorage: "+ this.urlFile)
                      // this.cargando = false;
                      this.completado = true;
                      // console.log("listaR then de update")
                      // console.log(this.listaR)
                      this.almacenarFotoStorage(ubi);

                      
                      // this.almacenarRecursoCollection();

                  });
              });

          } catch (error) {
              console.log(error)
          }
      }else{
          // tipoFile
          if(this.tipoVideo === "link")
          {
            const {urlRecurso} = this.datosRecurso;
            this.urlFile = urlRecurso;
            this.tipoFile = "link";
          }
          else
          {

            this.urlFile = "none";
            this.tipoFile = "none";
          }

          // this.urlFile = "none";
          // this.urlFile= this.urlFile === 'none' ? "" : "none";
          this.porcentaje = 100;
          this.completado = true;
          this.almacenarFotoStorage(ubi);
      }


    },
    validarFormularioRecurso () {
      this.esRecursoValido =this.$refs.formRecurso.validate();
      console.log("this.esRecursoValido")
      console.log(this.esRecursoValido)
      console.log("this.datosRecurso.tags.length")
      console.log(this.datosRecurso.tags.length)
      
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
        console.log("tags validos")
        this.updateFile()
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

      console.log(this.tipo);
      if(this.tipo === "RECOMENDACION")
        this.esBlog = true;
      else
        this.esBlog = false;

      // if(TtipoVideo === 'file')
      
      if(this.tipo === "VIDEOS")
        this.tipoVideo = "";
      else
        this.tipoVideo = "file";

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
      this.tipoVideo = "";
      
      this.file = null;
      this.urlFile= null;
      this.tipoFile="";
      this.typeFileFull= "";
      this.updatedCollection = true;

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
    imagen: {
      type: String,
      default: "true"
    },
    listaR:{
      type: Array,
      default: () => []
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
