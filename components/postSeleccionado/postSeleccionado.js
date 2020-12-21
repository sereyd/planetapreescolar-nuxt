import { audioPlayer, videoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/vue-md-player.css'
import { mapState, mapActions, mapMutations } from "vuex";
import { format } from 'date-fns'
import { es } from 'date-fns/locale';
import Spinner from '~/components/spinner.vue'
import pdfviewer from '~/components/pdfviewer/pdfviewer.vue'
import comentarios from '~/components/comentarios/comentarios.vue'

////import toPdf from 'office-to-pdf'


export default{
    data(){
        return {

            //DATA PARA COMENTARIOS
            esComentarioValido: true,

            dialogPlanes:false,
        }
    },
    methods:{
      ...mapActions(['changeRecursosFavoritos','notificacionComentario']),
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
        linkembed:{
          default:()=>{
            return 'BLOG'
          }
        }, 
    },
    components:{
      videoPlayer,
      audioPlayer,
      Spinner,
      pdfviewer,
      comentarios
    },
    computed: {
      ...mapState(['datosUsuario','itemsmenu','descargarFree']),
      
      cargarecomendacion(){
        let limit=150
        let loncadena=this.vistapost.contenido.length
        let suspensivos=" ..."
        let contenido=this.vistapost.contenido.substr(0,limit)
       console.log(this.vistapost)
        // console.log(contenido)
        if(loncadena<limit){
            suspensivos=""
        }
        return contenido+suspensivos
    }
    },
}