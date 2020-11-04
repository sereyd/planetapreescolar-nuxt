import { mapState, mapActions, mapMutations } from "vuex";

import { VueEditor } from "vue2-editor";
import subirImagen from "@/components/subirimagen/subirimagen.vue";
import Spinner from '~/components/spinner.vue'
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
      formRecurso: true,
      datosRecurso: {
        titulo: "",
        fecha: "",
        edopost: "",
        urlImagen: "",
        user:"",
        contenido:"",
        tipoRecurso:"",
        urlRecurso:""
      },

      //DATA PARA CARGA DE RECURSOS
      barraProgreso: 0,
      urlFile: null,
      file: null,
      // tipoFile: "",
      tipoFile:"",
      completado: false,
      esRecursoValido: true,
      typeFileFull: "",
      
      //DATA PARA BARRA DE PROGRESO UPLOAD
      cargando: false,
      interval: {},
      porcentaje: 0,
      bytesTotal: 0,
      bytesTranferidos: 0,

  
    };
  },
  computed: {
    ...mapState(["urlimg", "datosUsuario"])
  },
  methods: {
    ...mapMutations(["almacenarFotoStorage"]),
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
      // await this.updateFile();

      if(this.completado)
      {
        console.log("Vamos a subir el nuevo recurso a FIRESTORE");

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        const {id} = this.datosUsuario;
        // if(this.tipoFile === "imagen"){
        //   this.datosRecurso.urlRecurso = this.urlFile
        //   this.datosRecurso.tipoRecurso = 
        // }
        

        this.datosRecurso = {
          ...this.datosRecurso,
          fecha:  format(new Date(), 'yyyy-MM-dd'),
          user: id,
          urlImagen: this.tipoFile === 'image' ? this.urlFile : '',
          // idRecurso: '',
          tipoRecurso: this.tipoFile,
          urlRecurso: this.urlFile,
        }

        try {
          console.log("HACIENDO PUSH A LA LISTA R")
          console.log(this.datosRecurso)
          await this.$fireStore.collection(this.tipo).add(this.datosRecurso);
          this.listaR.push(this.datosRecurso)
          console.log(this.datosRecurso)
          // alert("antes de reset")
          // this.$emit('updateListaR',this.listaR)

          this.$refs.formRecurso.reset();
          console.log(this.datosRecurso)
          // alert("despues de reset con $refs")

          this.datosRecurso= {
            titulo: "",
            fecha: "",
            edopost: "",
            urlImagen: "",
            user:"",
            contenido:"",
            tipoRecurso:"",
            urlRecurso:""
          },
          this.file = null;

          console.log(this.datosRecurso)
          // alert("despues de reset con obj")


          
        } catch (error) {
          console.log(error);
        }

        
      }
      else{
        console.log("NO SE PUDO SUBIR EL RECURSO")
      }

    },

    async changeFile(){
      // this.cargando = true;
      // this.porcentaje = 0;
      // console.log(this)
      // console.log(this.$refs)
      console.log(this.file)
      if(this.file)
      {

        //SE CREA URL DEL ARCHIVO QUE SE SUBIRA
        this.urlFile = URL.createObjectURL(this.file);
        // console.log(this.urlFile);
        console.log(this.file);

        //SE OBTIENE EL TIPO DE ARCHIVO
        const res = this.file.type.split("/");
        this.tipoFile = res[0];
        this.typeFileFull = this.file.type;

        //SE OBTIENE EL TAMAÑO DE ARCHIVO Y SE DIVIDE DE MANERA QUE SE OBTENGA EN MB
        this.bytesTranferidos = (this.file.size / 1000000).toFixed(2);
        // const r = (6085966 / 1000000).toFixed(2);
        // console.log(r+" MBs")
      }
  },

  async updateFile(){
      this.cargando = true
      this.porcentaje = 0;
      const ubi = `${this.tipo}/${this.tipoFile}s/`;
      console.log(ubi)
      // async almacenarFotoStorage(state,ubi){
      console.log("entra al fotoStorage: "+ this.urlFile)

      const file =  this.file;
      const metadata = {
      contentType: this.typeFileFull
      // contentType: 'video/*'
      };


      //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
      if(file){

          try {
              //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

              let storageRef = this.$fireStorage.ref(ubi);
              let uploadTask = storageRef.child(file.name).put(file, metadata);

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
                  .then( (downloadURL) => {
                      this.urlFile = downloadURL     
                      // console.log('File available at', downloadURL);
                      console.log("saliendo fotoStorage: "+ this.urlFile)
                      // this.cargando = false;
                      this.completado = true;
                      
                      this.almacenarRecursoCollection();

                  });
              });

          } catch (error) {
              console.log(error)
          }
      }else{
          this.urlFile= this.urlFile === 'none' ? "" : "none"
      }


    },
    validarFormularioRecurso () {
      this.esRecursoValido =this.$refs.formRecurso.validate();
      if(this.esRecursoValido)
        this.updateFile()
      // console.log("valido")
  },
  },
  mounted() {
    this.datablog.user = this.datosUsuario.id;
    console.log(this.listaR)

  },
  components: {
    subirImagen,
    VueEditor,
    Spinner
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
      default:[],
    },
  },
  watch: {
    urlimg() {
      console.log("WATCHHHHH")
      if (this.urlimg) {
        if (this.datablog.titulo && this.datablog.edopost) {
          this.datablog.urlImagen = this.urlimg;
          this.guardaenstore();
        }
      }
    }
  }
};
