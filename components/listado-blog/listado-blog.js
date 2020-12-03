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
              urlRecurso:[],
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
        this.vistapost.urlRecurso = p.urlRecurso ? p.urlRecurso : [];
        this.fechaVisual = format(this.vistapost.fecha , "dd  MMMM yyyy", {locale: es});


       if(this.vistapost.tipoRecurso !== 'none' && this.vistapost.tipoRecurso !== 'link')
       {
         const xhr = new XMLHttpRequest();
         xhr.responseType = 'blob';
         xhr.onload = (event) => {
           // console.log(xhr.response);
           const blob = xhr.response;
           console.log(blob)
           const res = blob.type.split("/");
           const typeFile = res[1];
           if(this.vistapost.tipoRecurso !== "audio" && this.vistapost.tipoRecurso !== "image" )
            this.nombreFile = this.vistapost.titulo+'.'+this.vistapost.tipoRecurso;
           else
            this.nombreFile = this.vistapost.titulo+'.'+typeFile;

          console.log(this.nombreFile);

 
           this.urlFileB = URL.createObjectURL(blob, {
             type: blob.type
           });
           console.log(this.urlFileB)
           this.spinner = false;

 
         };
         xhr.open('GET', p.urlRecurso[0]);
         xhr.send();
       }
       else if(this.vistapost.tipoRecurso === 'link')
       {
         let {urlRecurso} = this.vistapost;
        const embed = urlRecurso[0].replace("watch?v=", "embed/");
        this.linkembed = embed;
       }

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
      postSeleccionado,
      postGeneral,
      fechaComponent,
    },
    async mounted(){
      console.log(this.subtipo)
        // if(this.esBusqueda)
        // {
        //   console.log("BUACANDOOOO")
        //   const clave = this.datoBuscar.toLowerCase().normalize("NFD");
        //   let recursos = [...this.blogpost.filter(recurso =>
        //     (
        //       recurso.tags.includes(clave) && 
        //       ( 
        //         (recurso.edopost === "publico" || 
        //         ( recurso.edopost === "privado" && recurso.idCreador === this.datosUsuario.id ) )&&
        //         recurso.tipo === this.subtipo
        //       ) 
        //     )
        //   )]

        //   this.$emit('updateBlogpost',recursos)
            
           
        // }


    },
    computed: {
      ...mapState(['datosUsuario','itemsmenu','descargarFree']),
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