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
      contadorDescargar(tipo, event){

        // console.log(tipo);
        if(this.datosUsuario.lvluser === 2 || this.datosUsuario.lvluser === 1)
        {
          let {descargas} = this.datosUsuario;
          // console.log(descargas);
          // console.log(this.vistapost)
          const {idRecurso} = this.vistapost;
          const {id} = this.datosUsuario;
          let esDescargar = false;
        
          if(tipo === "Free"  && descargas.dia.usadas.length < this.descargasConf.free)
          {
            descargas.dia.usadas.push(idRecurso);
            descargas.dia.disponibles= this.descargasConf.free;
            esDescargar = true
          }
          else if(tipo === "Plan" && this.datosSuscripcion.plan)
          {
            const {tipoSuscripcion} = this.datosSuscripcion.plan;
            let f = new Date();
            let existeMes = false;
            let mesactual = (f.getMonth() +1) + " " + f.getFullYear();
            // console.log(existeMes);
            descargas.mes.registro.map(reg => {
              if(reg.mes === mesactual)
              {
                existeMes = true;
                const descargasDisponibles = tipoSuscripcion === "mensual" ? this.descargasConf.mensual 
                : tipoSuscripcion === "trimestral" ? this.descargasConf.trimestral
                : tipoSuscripcion === "semestral" ? this.descargasConf.semestral
                :  this.descargasConf.anual
              
                // console.log("descargas disponibles: "+descargasDisponibles)
                // console.log("tipo membresia: "+tipoSuscripcion)
                if(reg.usadas.length < descargasDisponibles )
                {
                  reg.usadas.push(idRecurso);
                  esDescargar = true;
                }
              }
              
            });
            // console.log(existeMes);
            
            if(!existeMes){
              // const {disponibles} = descargas.mes;
              descargas.mes.registro = [
                ...descargas.mes.registro,
                { mes: mesactual, usadas:[idRecurso] }
              ]
              esDescargar = true;
              // descargas.mes.usadas.push(idRecurso);
            }
            // console.log(descargas);
            // console.log(descargas.mes);
          }
          if(esDescargar)
          {
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let descargasFreeRef = this.$fireStore.collection("usuarios").doc(id);
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
            descargasFreeRef.update({
              descargas
            })
            .then(() => {
              // console.log("UPDATE DESCARGAR LIMITE")
      
            })
            .catch((error) => {
                console.error("ErroR al agregar nuevo comentario: ", error);
            });
          }
          else  
          {
            event.preventDefault();
            this.dialogPlanes=true
          }
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
      ...mapState(['datosUsuario','itemsmenu','descargasConf','datosSuscripcion']),
      
      cargarecomendacion(){
        let limit=150
        let loncadena=this.vistapost.contenido.length
        let suspensivos=" ..."
        let contenido=this.vistapost.contenido.substr(0,limit)
      //  console.log(this.vistapost)
        // console.log(contenido)
        if(loncadena<limit){
            suspensivos=""
        }
        return contenido+suspensivos
      },
      esFree(){
        const {usadas, disponibles} = this.datosUsuario.descargas.dia;
        const res = usadas.length < this.descargasConf.free ?  true : false

        return res;
      },
      descargarPlan(){
        // console.log(this.datosSuscripcion)
        const {tipoSuscripcion} = this.datosSuscripcion.plan;
        const descargasDisponibles = tipoSuscripcion === "mensual" ? this.descargasConf.mensual 
          : tipoSuscripcion === "trimestral" ? this.descargasConf.trimestral
          : tipoSuscripcion === "semestral" ? this.descargasConf.semestral
          :  this.descargasConf.anual

          return descargasDisponibles
      },
    },
}