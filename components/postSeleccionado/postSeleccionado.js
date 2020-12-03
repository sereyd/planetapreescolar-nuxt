import { audioPlayer, videoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/vue-md-player.css'
import { mapState, mapActions, mapMutations } from "vuex";
import { format } from 'date-fns'
import { es } from 'date-fns/locale';
import Spinner from '~/components/spinner.vue'

export default{
    data(){
        return {
            // dialogPost:false,
            // viewpost:false,
            // viewothers: false,
            // fechaVisual:"",

            //DATA PARA COMENTARIOS
            esComentarioValido: true,
            comentarios:[],
            datosComentario:{
              idUsuario:"",
              comentario:"",
              nombreUsuario:"",
              urlImagen:""
            },


            linkembed:"",

            dialogPlanes:false,
        }
    },
    methods:{
      ...mapActions(['changeRecursosFavoritos']),
      contadorDescargar(descargasDia){
        console.log(descargasDia);
        console.log(this.vistapost)
        const {idRecurso} = this.vistapost;
        const {id} = this.datosUsuario;

        if(this.vistapost.premium === true && this.datosUsuario.estadoMembresia !== 'active')
        {
          descargasDia.usadas.push(idRecurso);
          descargasDia.disponibles= this.descargarFree;
          //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
          let descargasFreeRef = this.$fireStore.collection("usuarios").doc(id);
          
          //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
          descargasFreeRef.update({
            descargasDia
          })
          .then(() => {
           
            console.log(this.$refs.downloadFile)
            // this.$refs.downloadFile.click();
            // this.$refs.downloadFile.download();
  
            console.log("UPDATE DESCARGAR LIMITE")
   
          })
          .catch((error) => {
              console.error("ErroR al agregar nuevo comentario: ", error);
          });
        }


        
      },


      //  METODOS PARA COMENTARIOS
      async agregarComentario(){
        const {id, nombre, apellido, urlImagen} = this.datosUsuario;
        
        this.datosComentario.idUsuario = id;
        this.datosComentario.nombreUsuario = `${nombre} ${apellido}`;
        this.datosComentario.urlImagen = urlImagen;
        //OBTENEMOS EL ID DEL RECURSO (MEMORIA, RELFEXION, RECOMENDACION, ETC)
        const {idRecurso} = this.vistapost;
        this.vistapost.comentarios.push({...this.datosComentario});

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        let recursoComentariosRef = this.$fireStore.collection("CATEGORIAS").doc(idRecurso);
        
        //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
        recursoComentariosRef.update({
             comentarios: [...this.vistapost.comentarios]
        })
        .then(() => {
          this.datosComentario.idUsuario = "";
          this.datosComentario.nombreUsuario = "";
          this.datosComentario.urlImagen = "";
          // this.datosComentario.comentario = "";
          // this.esComentarioValido = true;
          this.$refs.formComentario.reset();

          console.log("reset data")
 
        })
        .catch((error) => {
            console.error("ErroR al agregar nuevo comentario: ", error);
        });

      },
      validarFormularioComentario(){
        // console.log("revision")
        this.esComentarioValido =this.$refs.formComentario.validate();
        if(this.esComentarioValido)
          this.agregarComentario();
        // console.log("biennnn")
      },

    },
    props:{
      subtipo:{
        default:()=>{
            return 'BLOG'
        }
      },
        
        vistapost:{
          type: Object,
          default: () => {}
        },
        spinner:{
            default:()=>{
                return false;
            }
        },
        fechaVisual:{
            default:()=>{
                return 'BLOG'
            }
        },
        urlFileB:{
          default:()=>{
            return 'BLOG'
          }
        },
        nombreFile:{
          default:()=>{
            return 'BLOG'
          }
        },
        

        
        
    },
    components:{
      videoPlayer,
      audioPlayer,
      Spinner,
    },
    computed: {
      ...mapState(['datosUsuario','itemsmenu','descargarFree']),
      
      cargarecomendacion(){
        let limit=150
        let loncadena=this.vistapost.contenido.length
        let suspensivos=" ..."
        let contenido=this.vistapost.contenido.substr(0,limit)
        // console.log(this.vistapost.contenido)
        // console.log(contenido)
        if(loncadena<limit){
            suspensivos=""
        }
        return contenido+suspensivos
    }
    },
}