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
            // blogpost:[],
            // editpost:{},
            // edit:false,
            // customToolbar: [
            //   [{ 'font': [] }],
            //   [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
            //   [{ 'size': ['small', false, 'large', 'huge'] }],
            //   ['bold', 'italic', 'underline', 'strike'],
            //   [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
            //   [{ 'header': 1 }, { 'header': 2 }],
            //   ['blockquote'],
            //   [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            //   [{ 'script': 'sub'}, { 'script': 'super' }],
            //   [{ 'indent': '-1'}, { 'indent': '+1' }],
            //   [{ 'color': [] }, { 'background': [] }],
            //   ['link', 'video', 'formula'],
            //   [{ 'direction': 'rtl' }],
            //   ['clean'],
            // ],
            dialogPost:false,
            viewpost:false,
            viewothers: false,
            vistapost:{
              comentarios:[],
              urlVista:"",
              urlDescargable:"",
              // creador:{}
            },
            fechaVisual:"",

            //DATA PARA COMENTARIOS
            // esComentarioValido: true,
            // comentarios:[],
            // datosComentario:{
            //   idUsuario:"",
            //   comentario:"",
            //   nombreUsuario:"",
            //   urlImagen:""
            // },

            //PARA DESCARGAR RECURSO
            nombreFile: "",
            urlFileB: "",
            spinner:true,

            linkembed:"",

            // dialogPlanes:false,
        }
    },
    methods:{
      ...mapActions(['changeRecursosFavoritos']),
      // contadorDescargar(descargasDia){
      //   const {idRecurso} = this.vistapost;
      //   const {id} = this.datosUsuario;

      //   if(this.vistapost.premium === true && this.datosUsuario.estadoMembresia !== 'active')
      //   {
      //     descargasDia.usadas.push(idRecurso);
      //     descargasDia.disponibles= this.descargarFree;
      //     //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
      //     let descargasFreeRef = this.$fireStore.collection("usuarios").doc(id);
          
      //     //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
      //     descargasFreeRef.update({
      //       descargasDia
      //     })
      //     .then(() => {
           
      //       console.log("UPDATE DESCARGAR LIMITE")
   
      //     })
      //     .catch((error) => {
      //         console.error("ErroR al agregar nuevo comentario: ", error);
      //     });
      //   }


        
      // },
      muestrapost(p){
        console.log(p);
        this.linkembed = "";

        this.spinner = true;
        this.dialogPost=true;
        this.viewothers = true;
        this.vistapost=p
        this.vistapost.tipoRecurso = p.tipoRecurso ? p.tipoRecurso : 'image';
        this.vistapost.urlVista = p.urlVista ? p.urlVista : "";
        this.vistapost.urlDescargable = p.urlDescargable ? p.urlDescargable : "";
        this.fechaVisual = format(this.vistapost.fecha , "dd  MMMM yyyy", {locale: es});
        // console.log(this.subtipo)
        // console.log(this.vistapost.tipo)

        const {tipo} =this.vistapost;

        if(tipo !=='planeacion' && tipo !=='materialdidactico' && tipo !=='hojatrabajo' && tipo !=='interactivo')
        {
          this.viewothers = false;
          this.viewpost = true;

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
          //  console.log(blob)
           const res = blob.type.split("/");
           const typeFile = res[1];
           if(this.vistapost.tipoRecurso !== "audio" && this.vistapost.tipoRecurso !== "image" )
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

        //  console.log(p.urlDescargable)
        //  console.log(p.urlVista)
          if( p.urlDescargable !== "none" && p.urlDescargable !== "")
          {
            xhr.open('GET', p.urlDescargable);
            xhr.send();
          }
        }
      //  else if(this.vistapost.tipoRecurso === 'link')
      //  {
      //   console.log("this.vistapost");
      //   console.log(this.vistapost);
      //    let {urlVista} = this.vistapost;
      //   const embed = urlVista.replace("watch?v=", "embed/");
      //   this.linkembed = embed;
      //   console.log(this.linkembed);
      //  }

      },
      // editapost(t){
      //   this.edit=true
      //   this.editpost=t
      // },
    

      //  METODOS PARA COMENTARIOS
      // async agregarComentario(){
      //   const {id, nombre, apellido, urlImagen} = this.datosUsuario;
        
      //   this.datosComentario.idUsuario = id;
      //   this.datosComentario.nombreUsuario = `${nombre} ${apellido}`;
      //   this.datosComentario.urlImagen = urlImagen;
      //   //OBTENEMOS EL ID DEL RECURSO (MEMORIA, RELFEXION, RECOMENDACION, ETC)
      //   const {idRecurso} = this.vistapost;
      //   this.vistapost.comentarios.push({...this.datosComentario});

      //   //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
      //   let recursoComentariosRef = this.$fireStore.collection(this.tipo).doc(idRecurso);
        
      //   //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
      //   recursoComentariosRef.update({
      //        comentarios: [...this.vistapost.comentarios]
      //   })
      //   .then(() => {
      //     this.datosComentario.idUsuario = "";
      //     this.datosComentario.nombreUsuario = "";
      //     this.datosComentario.urlImagen = "";
      //     this.$refs.formComentario.reset();

      //     console.log("reset data")
 
      //   })
      //   .catch((error) => {
      //       console.error("ErroR al agregar nuevo comentario: ", error);
      //   });

      // },
      // validarFormularioComentario(){
      //   // console.log("revision")
      //   this.esComentarioValido =this.$refs.formComentario.validate();
      //   if(this.esComentarioValido)
      //     this.agregarComentario();
      //   // console.log("biennnn")
      // },

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
        // esBusqueda:{
        //   type: Boolean,
        //   default: false,
        // },
        esFavoritos:{
          type: Boolean,
          default: false,
        },
        // datoBuscar:{
        //   type:String,
        //   default:""
        // }
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
      ...mapState(['datosUsuario','itemsmenu','descargarFree']),
      cargarecomendacion(){
        var limit=350
        var loncadena= this.reflexionSeleccionada.contenido.length
        var suspensivos="..."
        var contenido= this.reflexionSeleccionada.contenido.substr(0,limit)
        if(loncadena<limit){
            suspensivos=""
        }
        return contenido+suspensivos
    }  
      // fechaVisualC(vm, payload){
      //   console.log(vm)
      //   console.log(payload)
      //   // const fecha = format(payload, "dd 'de' MMMM 'de' yyyy", {locale: es});
      //   // console.log(fecha)
      //   return vm;
      // },
    //   cargarecomendacion(){
    //     let limit=150
    //     let loncadena=this.vistapost.contenido.length
    //     let suspensivos=" ..."
    //     let contenido=this.vistapost.contenido.substr(0,limit)
    //     // console.log(this.vistapost.contenido)
    //     // console.log(contenido)
    //     if(loncadena<limit){
    //         suspensivos=""
    //     }
    //     return contenido+suspensivos
    // }
    },
}