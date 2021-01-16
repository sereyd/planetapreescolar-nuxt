import { VueEditor } from "vue2-editor";
import { audioPlayer, videoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/vue-md-player.css'
import { mapState, mapActions, mapMutations } from "vuex";
import { format } from 'date-fns'
import { es } from 'date-fns/locale';
import Spinner from '~/components/spinner.vue'
import fechaComponent from '~/components/fecha.vue'
import postSeleccionado from '~/components/postSeleccionado/postSeleccionado.vue'
import postGeneral from '~/components/postGeneral/postGeneral.vue'


export default{
    data(){
        // name:"listablog",
        return {
           
            dialogPost:false,
            // viewpost:false,
            // viewothers: false,
            vistapost:{
              comentarios:[],
              urlVista:"",
              urlDescargable:"",
              // creador:{}
            },
            fechaVisual:"",

            //PARA DESCARGAR RECURSO
            nombreFile: "",
            urlFileB: "",
            spinner:true,

            linkembed:"https://www.youtube.com/embed/AddqzrFdR4Q",

            // dialogPlanes:false,
        }
    },
    methods:{
      ...mapActions(['changeRecursosFavoritos']),
      ...mapMutations(['changeViewOthers','changeViewPost','changeDialogPost']),
      muestrapost(p){
        console.log(p);
        // const fec = p.fecha.toString();
        // // console.log(fec)
        // var fechaNueva = fec.slice(0, 10);
        // // console.log(fechaNueva);
        // const fechaN = parseInt(fechaNueva);
        // console.log("FECHA DEL POST");
        // console.log(fechaN);
        
        // //FECHA ACTUAL
        // var now = Date.now() 
        // // console.log(now);
        // const fa = now.toString();
        // // console.log(fa)
        // var faNueva = fa.slice(0, 10);
        // // console.log(faNueva);
        // const fechaAN = parseInt(faNueva);
        // console.log("FECHA ACTUAL");
        // console.log(fechaAN);


        this.linkembed = "";

        this.spinner = true;
        this.dialogPost=true;
        // this.changeDialogPost(true);
        // this.viewothers = true;
        this.changeViewOthers(true);
        this.vistapost=p
        this.vistapost.tipoRecurso = p.tipoRecurso ? p.tipoRecurso : 'image';
        this.vistapost.urlVista = p.urlVista ? p.urlVista : "";
        this.vistapost.urlDescargable = p.urlDescargable ? p.urlDescargable : "";
        this.fechaVisual = format(this.vistapost.fecha , "dd  MMMM yyyy", {locale: es});
        // console.log(this.subtipo)
        // console.log(this.vistapost.tipo)

        const {tipo} =this.vistapost;

        if(tipo !=='planeacion' && tipo !=='materialdidactico' && tipo !=='hojatrabajo' && tipo !=='interactivo' && tipo !=='otro')
        {
          // this.viewothers = false;
          this.changeViewOthers(false);

          // this.viewpost = true;
          this.changeViewPost(true);


        }

      if(this.vistapost.tipoRecurso === 'link')
       {
        // console.log("this.vistapost");
        // console.log(this.vistapost);
         let {urlVista} = this.vistapost;
        const embed = urlVista.replace("watch?v=", "embed/");
        this.linkembed = embed;
        // console.log(this.linkembed);
       }


       if(this.vistapost.tipoRecurso !== 'none'  && this.vistapost.tipoRecurso !== '')
       {
        
         const xhr = new XMLHttpRequest();
         xhr.responseType = 'blob';
         xhr.onload = (event) => {
           // console.log(xhr.response);
           const blob = xhr.response;
           console.log(blob)
           const res = blob.type.split("/");
          //  console.log("res")
          //  console.log(res)
           const typeFile = res[1];
           if(blob.type === "application/pdf")
           {
            this.nombreFile = this.vistapost.titulo+'.pdf';
           }
           else if(blob.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
           {
            this.nombreFile = this.vistapost.titulo+'.docx';
           }
           else if(blob.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation")
           {
            this.nombreFile = this.vistapost.titulo+'.pptx';
           }
           else if(this.vistapost.tipoRecurso !== "audio" && this.vistapost.tipoRecurso !== "image" )
            this.nombreFile = this.vistapost.titulo+'.'+this.vistapost.tipoRecurso;
           else
            this.nombreFile = this.vistapost.titulo+'.'+typeFile;

          // console.log(this.nombreFile);

 
           this.urlFileB = URL.createObjectURL(blob, {
             type: blob.type
           });
          //  console.log(this.urlFileB)
           this.spinner = false;

 
         };

          if( p.urlDescargable !== "none" && p.urlDescargable !== "")
          {
            xhr.open('GET', p.urlDescargable);
            xhr.send();
          }
        }
     

      },

      cerrarDialog(){
        this.dialogPost = false; 
        // this.changeDialogPost(false);
        this.changeViewPost(false); 
        this.changeViewOthers(false);
      },
      

    },
    props:{
        tipo:{
            default:()=>{
                return 'BLOG'
            }
        },
        subtipo:{
          default:()=>{
              return 'BLOG'
          }
        },
        
        blogpost:{
          type: Array,
          default: () => []
        },
        titulo:{
            default:()=>{
                return "titulo";
            }
        },
        linkmas:{
            default:()=>{
                return "#";
            }
        },
        subtitulos:{
            default:()=>{
                return "";
            }
        },
        userId:{
            type:String,
            default:""
        },
        idexclude:{
            type:String,
            default:""
        },
        addslot:{
            type:Boolean,
            default:false
        },
        imagen:{
          type:String,
          default:"true"
        },
        esCompleto:{
          type: Boolean,
          default: true,
        },
        esFavoritos:{
          type: Boolean,
          default: false,
        },
    },
    components:{
      VueEditor,
      videoPlayer,
      audioPlayer,
      Spinner,
      fechaComponent,
      postSeleccionado: () => import('~/components/postSeleccionado/postSeleccionado.vue'),
      postGeneral: () => import('~/components/postGeneral/postGeneral.vue'),
    },
    // async mounted(){


    // },
    computed: {
      ...mapState(['datosUsuario','itemsmenu','descargarFree','viewothers','viewpost']),
      cargarecomendacion(){
        var limit=350
        var loncadena= this.reflexionSeleccionada.contenido.length
        var suspensivos="..."
        var contenido= this.reflexionSeleccionada.contenido.substr(0,limit)
        if(loncadena<limit){
            suspensivos=""
        }
        return contenido+suspensivos
    },
    cantidadComentarios(comentarios){
      console.log(comentarios);
      let comen = comentarios.filter(com => com.valido === true);
      return comen.length;
    },
    
    },
}