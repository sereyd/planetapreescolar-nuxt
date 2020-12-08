import { mapMutations, mapState } from "vuex"
export default {
  data() {
    return {
      imagen: null,
      urlImagenPrevia: "",

        file:null,
        completado: false,
        cargando: false,
        porcentaje: 0,
        ubi: ""

    };
  },
  props: {
    ejecimagen: false,
    tpimg: {
      type: String,
      default: "avatar"
    },
    titulo: {
      type: String,
      default: "Foto de Pefil"
    },
    datosRecurso:{
        type: Object,
        default: () => {}
    },
  },
  computed:{
      ...mapState(['datosUsuario']),
  },
  methods: {
    ...mapMutations([""]),

    async changeWord(){

        if(this.ubi === "")
        {
          this.datosRecurso.foldercode =this.$codegenerate();
          this.ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecurso.foldercode}/`;
  
        }
  
        console.log("UBICACION")
        console.log(this.ubi)
  
        this.completado = false;
        this.cargando = true;
        this.porcentaje = 0;
  
        let file =  this.file;
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
  
                let storageRef = this.$fireStorage.ref(this.ubi);
                let uploadTask = storageRef.child("word_"+this.datosRecurso.foldercode).put(file, metadata);
  
                await uploadTask.on('state_changed', // or 'state_changed'
                (snapshot) => {
                    this.porcentaje = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
  
                },(error) => {
                    console.log("ERROR")
                    console.log(error)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then( async(downloadURL) => {
                        this.urlFile[0] = downloadURL;
                        console.log('File available at', downloadURL);
                        console.log('URLFILE', this.urlFile);
                        this.cargando = false;
                    });
                });
  
            } catch (error) {
                console.log(error)
            }
        }
      },
  
    /* LANZA EL FOCUS PARA SELECCIONAR LA IMAGEN DE PERFIL */
    focus() {
      this.$refs.fileupload.click();
    },

    /* VISTA PREVIA DE LA IMAGEN DE PERFIL SELECCIONADA */
    async change() {
      this.urlImagenPrevia = URL.createObjectURL(
        this.$refs.fileupload.files[0]
      );
      this.imagen = this.$refs.fileupload.files[0];
      this.$emit("updateImg", this.urlImagenPrevia);
      this.actualizaImgUpload(this.$refs.fileupload.files[0]);
    }
  }
};
