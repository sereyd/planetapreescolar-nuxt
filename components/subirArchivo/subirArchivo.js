import { mapMutations, mapState } from "vuex"
export default {
  data() {
    return {
        completado: false,
        cargando: false,
        porcentaje: 0,
        ubi: "",
        fileInterno: null,
        urlFile:"",

    };
  },
  computed:{
      ...mapState(['datosUsuario']),
  },
   async mounted() {
    await this.fileCreado();
  },
  methods: {
    ...mapMutations([""]),
    async fileCreado(){
      var response = null;
      var data = null;
      var metadata = {};

    //   console.log("SE ESTAN MONTANDO LOS COMPONENTES FILE")
    // console.log(this.urlFileEdit)

    if(this.urlFileEdit !== "")
      {
 
          // console.log(this.file)
          // console.log(this.fileInterno)
            response = await fetch(this.urlFileEdit);
            data = await response.blob();
            metadata = {
              type: 'application/pdf '
            };
            this.fileInterno = new File([data], "archivoCargado", metadata);

          //   console.log(this.file)
          // console.log(this.fileInterno)

      }

    },
    async changeFile(){

      // console.log("CAMBIADO FILE")
      let folder =""
      
      if(!this.file && this.foldercode === "")
      {
        folder = this.$codegenerate()
        this.$emit("updateFoldercode",folder);

        this.ubi = `${this.subtipo}/${this.datosUsuario.id}/${folder}/`;

      }
      //SI SE CAMBIA EL ARCHIVO Y EL RECURSO AUN NO SE CREA O CUANDO SE DESEA EDITAR UN RECURSO
      else if((this.file || !this.file) && this.foldercode !== "")
      {
        this.ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.foldercode}/`;
        folder  = this.foldercode
      }
      //SI SE CIERRA EL DIALOG CUANDO ESTAS CREANDO UN NUEVO RECURSOS
      else if (this.file && this.foldercode === ""){
        let arrayUbi =  this.ubi.split("/");
        folder = arrayUbi[2];

      }

      this.completado = false;
      this.cargando = true;
      this.porcentaje = 0;

      if(typeof this.fileInterno !== 'undefined')
      {

        this.$emit("updateFile", this.fileInterno);
  
        let file =  this.fileInterno;
        const typeFileFull = file.type;
        const metadata = {
        contentType: typeFileFull
        };
  
        
        try {
            //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
  
            let storageRef = this.$fireStorage.ref(this.ubi);
            let uploadTask = storageRef.child(this.nickFile+"_"+folder).put(file, metadata);
  
            await uploadTask.on('state_changed', // or 'state_changed'
            (snapshot) => {
                this.porcentaje = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
  
            },(error) => {
                console.log("ERROR")
                console.log(error)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL()
                .then( async(downloadURL) => {
                    this.urlFile = downloadURL;
                    this.$emit("updateUrlFile", this.urlFile);
  
                    
                    this.cargando = false;
                });
            });
  
        } catch (error) {
            console.log(error)
        }
      }
      else{

        this.cargando = false;
      }

    },

    
  },
  props:{
    subtipo:{
      default:()=>{
          return 'BLOG'
      }
    },
    nickFile:{
      default:()=>{
        return ''
      }
    },
    filesAccepts:{
      default:()=>{
        return ''
      }
    },
    file:{
        default: () => null
    },
    label:{
      default:()=> "Seleccione archivo válido"
    },
    foldercode:{
      default:()=> ""
    },
    urlFileEdit:{
      default:()=> ""
    },
    reglas:[]
},
};
