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
    name:"listaDirectorio",

    
    computed: {
      ...mapState(['datosUsuario', 'directorios','urlimg']),
    },
    components: {
      subirImagen,
    },

    methods: {
    ...mapMutations(["almacenarFotoStorage","actualizaImgUpload","actualizarDirectorios"]),
      openD(){
        console.log("abrir")
        this.creadirectorio = true
        console.log(this.creadirectorio)
      },
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
        console.log(this.directorios)
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
            foldercode: this.foldercode 
            // tags: this.tags
          }
          // nuevoRecurso.recomendado = nuevo

        try {
          // console.log(nuevoRecurso);
          await this.$fireStore.collection("directorio").add(nuevoDirectorio);
          // this.listaD.push(this.datosDirectorio)
          const payload = {
            type: "agregar",
            data: nuevoDirectorio
          }
          this.actualizarDirectorios(payload);
          console.log(this.directorios)

          // this.actualizarDirectorio([]);

          // this.$emit('updateListaR',this.listaR)
          // this.$emit('updateRefresh',!this.refreshPost)
          this.resetDatos();
          // this.esCrear = false;


          
        } catch (error) {
          console.log(error);
        }
      
      },

      async eliminarPromo(data){
        if (confirm("¿Deseas eliminar esta promoción?") === true) {
          // console.log("ELIMINADO")
          // console.log(data);
          const {foldercode, tipo, idPromo} = data;
          const {id} = this.datosUsuario
          const ruta = `directorio/${id}/${foldercode}`;
          // console.log(ruta)
          // console.log(data)
          // this.eliminarDirectorio(idPromo);

          // console.log(ruta)
  
          var storageRef = this.$fireStorage.ref();
          // Create a reference 
          var mountainsRef = storageRef.child(ruta);
          
          // Now we get the references of these files
          mountainsRef.listAll().then( (result) => {

              result.items.forEach( (file) => {
                // console.log(file)le
                 file.delete();

              });

              // console.log("terminadmos de recorrer")
  
              //BORRANDO POST SELECCIONADO
              this.$fireStore.collection("directorio").doc(idPromo).delete()
              .then(() => {
                // console.log(idPromo)

                const payload = {
                  type: "eliminar",
                  data: idPromo
                }
                
                this.actualizarDirectorios(payload);
  
  
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
  
          }).catch( (error) => {
            console.log(error);
              alert("ALGO SALIO MAL")
  
          });
  
        } else {
          console.log("SALVADO")
  
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
  