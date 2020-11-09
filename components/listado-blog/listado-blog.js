import { VueEditor } from "vue2-editor";
// import audioPlayer from 'vuetify-media-player/src/components/audio-player.vue'
// import videoPlayer from 'vuetify-media-player/src/components/video-player.vue'
// import { audioPlayer } from 'vue-md-player'
// import 'vuetify-media-player/src/style.styl'
import { audioPlayer, videoPlayer } from 'vue-md-player'
import 'vue-md-player/dist/vue-md-player.css'
import { mapState, mapActions, mapMutations } from "vuex";
import { format } from 'date-fns'
import { es } from 'date-fns/locale';


export default{
    data(){
        return {
            blogpost:[],
            editpost:{},
            edit:false,
            customToolbar: [
              [{ 'font': [] }],
              [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
              [{ 'header': 1 }, { 'header': 2 }],
              ['blockquote'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'color': [] }, { 'background': [] }],
              ['link', 'video', 'formula'],
              [{ 'direction': 'rtl' }],
              ['clean'],
            ],
            viewpost:false,
            vistapost:{
              creador:{}
            },
            fechaVisual:"",
        }
    },
    methods:{
      muestrapost(p){
        // console.log(p)
        this.viewpost=true
        // var d = new Date("2015-03-25");
        // console.log(d);
        // var g = new Date(this.vistapost.fecha);
        // console.log(g);
        this.vistapost=p
        this.vistapost.tipoRecurso = p.tipoRecurso ? p.tipoRecurso : 'image';
        this.vistapost.urlRecurso = p.urlRecurso ? p.urlRecurso : p.urlImagen;
        // console.log(this.vistapost);
        this.fechaVisual = format(this.vistapost.fecha , "dd  MMMM yyyy", {locale: es});
      },
      editapost(t){
        this.edit=true
        this.editpost=t
      },
      async  cargabaseGral(){
        try {
            await this.$fireStore
              .collection(this.tipo)
              .get()
              .then((data) => {
                data.forEach((doc) => {
                  this.blogpost.push(doc.data());
                });
                // console.log(this.blogpost);
              });
          } catch (e) {
            console.log(e);
          }
        },
    async  cargabaseUser(){
        try { 
    await this.$fireStore
      .collection(this.tipo)  
      .where("idCreador","==",this.userId)  
      .get()
      .then((data) => {
        data.forEach((doc) => {
          this.blogpost.push(doc.data());
        });
      });
          } catch (e) {
                console.log(e);
              }
            },
            async  cargabaseExclude(){
                try {
                    await this.$fireStore
                      .collection(this.tipo)
                      .where("idCreador","!=",this.idexclude)
                      .get()
                      .then((data) => {
                        data.forEach((doc) => {
                          this.blogpost.push(doc.data());
                        });
                      });
                  } catch (e) {
                    console.log(e);
                  }
                }    
    },
    props:{
        tipo:{
            default:()=>{
                return 'BLOG'
            }
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
        }
    },
    components:{
      VueEditor,
      videoPlayer,
      audioPlayer,
    },
    mounted(){
        // console.log("this.blogpost")
        // console.log(this.blogpost)
        if(this.userId==='' && this.idexclude===''){
            this.cargabaseGral()
        }
        if(this.userId){
            this.cargabaseUser()
        }
        if(this.idexclude){
            this.cargabaseExclude()    
        }

    },
    computed: {
      ...mapState(['datosUsuario']),
      // fechaVisual(payload){
      //   console.log(payload)
      //   const fecha = format(payload, "dd 'de' MMMM 'de' yyyy", {locale: es});
      //   console.log(fecha)
      //   return fecha;
      // }
    },
}