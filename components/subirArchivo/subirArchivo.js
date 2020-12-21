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
      
      console.log(this.ubi)
      if(this.ubi === "")
      {
        // this.foldercode = this.$codegenerate();
        
        console.log(this.foldercode)
        if(this.foldercode === "")
        {
          folder = this.$codegenerate()
          this.$emit("updateFoldercode",folder);
        }
        else{
          folder = this.foldercode;
        }

        this.ubi = `${this.subtipo}/${this.datosUsuario.id}/${folder}/`;

      }

      console.log("UBICACION")
      console.log(this.ubi)
      // alert("STOPPP");

      this.completado = false;
      this.cargando = true;
      this.porcentaje = 0;

     

      this.$emit("updateFile", this.fileInterno);

      //SE OBTIENE EL TIPO DE ARCHIVO
      // let res = this.file.type.split("/");
      
      // if(res[0] === "application")
      // {
      //   console.log("appl")
      //   res = this.file.name.split(".");
      //   console.log(res)
      //   res[0] = res[1];
      // }
      // this.$emit("updateTipoFile", res[0]);


      
      let file =  this.fileInterno;
      const typeFileFull = file.type;
      console.log(typeFileFull)
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
                  console.log('File available at', downloadURL);
                  console.log('URLFILE', this.urlFile);
                  this.$emit("updateUrlFile", this.urlFile);

                  
                  this.cargando = false;
              });
          });

      } catch (error) {
          console.log(error)
      }
      // this.cargando = false;
      // this.porcentaje = 100;

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
