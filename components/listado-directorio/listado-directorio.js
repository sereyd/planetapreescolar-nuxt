import { mapState, mapMutations, mapActions } from 'vuex'
import subirImagen from "@/components/subirimagen/subirimagen.vue";

export default {
    data() {
      return {
        creadirectorio: false,
        esDirectorioValido: true,
        datosDirectorio:{
          titulo:"",
          descripcion:"",
          link:"",
          urlImagen:"",
        },
        foldercode:"",
        
        
      };
    },
    
    computed: {
      ...mapState(['datosUsuario', 'directorios','urlimg']),
    },
    components: {
      subirImagen,
    },

    methods: {
    ...mapMutations(["almacenarFotoStorage","actualizaImgUpload","actualizarDirectorios"]),
      async validarFormularioDirectorio () {
        this.esDirectorioValido =this.$refs.formDirectorio.validate();
  
        
        console.log(this.esDirectorioValido)
        if(this.esDirectorioValido)
        {
          this.rutaStorage();
        }
  
      },
      rutaStorage(){
        // this.porcentaje = 100;
        this.foldercode = this.foldercode === "" ? this.$codegenerate() : this.foldercode ;
        const ubi = `directorio/${this.datosUsuario.id}/${this.foldercode}/`;
        this.almacenarFotoStorage(ubi);
      },
      async almacenarDirectorioCollection(){
        if(this.urlimg !== "" && this.urlimg !== "none")
          this.datosDirectorio.urlImagen = this.urlimg

        

        //SE OBTIENE EL ID DEL USUARIO LOGEADO 
        const {id} = this.datosUsuario;
        let nuevoDirectorio = {
            fecha:  Date.now(),
            idCreador: id,
            titulo: this.datosDirectorio.titulo,
            descripcion: this.datosDirectorio.descripcion,
            link: this.datosDirectorio.link,
            urlImagen: this.datosDirectorio.urlImagen,
            // tags: this.tags
          }
          // nuevoRecurso.recomendado = nuevo

        try {
          // console.log(nuevoRecurso);
          await this.$fireStore.collection("directorio").add(nuevoDirectorio);
          // this.listaD.push(this.datosDirectorio)
          this.actualizarDirectorios(nuevoDirectorio);
          // this.actualizarDirectorio([]);

          // this.$emit('updateListaR',this.listaR)
          // this.$emit('updateRefresh',!this.refreshPost)
          this.resetDatos();
          // this.esCrear = false;


          
        } catch (error) {
          console.log(error);
        }
      
      },
      resetDatos(){
      
      
      
        this.datosDirectorio= {
         titulo: "",descripcion:"" ,
         urlImagen: "",  link:"",
        };
        this.foldercode="";
        this.creadirectorio = false;
      },
    },
    watch: {
      async urlimg() {
        
            await this.almacenarDirectorioCollection();
  
      }
    },
    props:{
      listaD:{
        type: Array,
        default: () => []
      },
    }
    
    
  };
  