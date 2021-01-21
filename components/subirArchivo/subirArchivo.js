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

      console.log("SE ESTAN MONTANDO LOS COMPONENTES FILE")
    console.log(this.urlFileEdit)

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
      
      console.log("this.ubi")
      console.log(this.ubi)
      console.log("this.foldercode")
      console.log(this.foldercode)
      console.log("this.file")
      console.log(this.file)

      console.log("this.nick")
      console.log(this.nickFile)

      console.log("this.urlFileEdit")
      console.log(this.urlFileEdit)
      //SI SE CREARA UN NUEVO RECURSO
      if(!this.file && this.foldercode === "")
      {
        folder = this.$codegenerate()
        this.$emit("updateFoldercode",folder);
        console.log("folder era vacio")
        console.log(folder)

        this.ubi = `${this.subtipo}/${this.datosUsuario.id}/${folder}/`;
        console.log("ubicacion final")
        console.log(this.ubi)

      }
      //SI SE CAMBIA EL ARCHIVO Y EL RECURSO AUN NO SE CREA O CUANDO SE DESEA EDITAR UN RECURSO
      else if((this.file || !this.file) && this.foldercode !== "")
      {
        this.ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.foldercode}/`;
        console.log("ubicacion final")
        console.log(this.ubi)
        folder  = this.foldercode
      }
      //SI SE CIERRA EL DIALOG CUANDO ESTAS CREANDO UN NUEVO RECURSOS
      else if (this.file && this.foldercode === ""){
        let arrayUbi =  this.ubi.split("/");
        folder = arrayUbi[2];

      }
     



      // if(this.ubi === "")
      // {
      //   // this.foldercode = this.$codegenerate();
        
      //   console.log("this.foldercode")
      //   console.log(this.foldercode)
      //   if(this.foldercode === "")
      //   {
      //     folder = this.$codegenerate()
      //     this.$emit("updateFoldercode",folder);
      //     console.log("folder era vacio")
      //     console.log(folder)
      //   }
      //   else{
      //     folder = this.foldercode;
      //     console.log("folder no vacio")
      //     console.log(folder)
      //   }

      //   this.ubi = `${this.subtipo}/${this.datosUsuario.id}/${folder}/`;
      //   console.log("ubicacion final")
      //   console.log(this.ubi)

      // }
      // else{
      //   let arrayUbi =  this.ubi.split("/");
      //   folder = arrayUbi[2];
      // }

      // console.log("UBICACION")
      // console.log(this.ubi)
      // alert("STOPPP");

      this.completado = false;
      this.cargando = true;
      this.porcentaje = 0;

     

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

      console.log("this.fileInterno")
      console.log(this.fileInterno)

      if(typeof this.fileInterno !== 'undefined')
      {

        this.$emit("updateFile", this.fileInterno);
  
        let file =  this.fileInterno;
        const typeFileFull = file.type;
        // console.log(typeFileFull)
        const metadata = {
        contentType: typeFileFull
        };
  
        
        try {
            //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
  
            let storageRef = this.$fireStorage.ref(this.ubi);
            console.log("nombre del archivo")
            console.log(this.nickFile+"_"+folder);
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
      }
      else{

        this.cargando = false;
      }

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
