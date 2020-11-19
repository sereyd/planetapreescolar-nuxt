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
              comentarios:[],
              // creador:{}
            },
            fechaVisual:"",

            //DATA PARA COMENTARIOS
            esComentarioValido: true,
            comentarios:[],
            datosComentario:{
              idUsuario:"",
              comentario:"",
              nombreUsuario:"",
              urlImagen:""
            },

            //PARA DESCARGAR RECURSO
            file: null,
        }
    },
    methods:{
      ...mapActions(['changeRecursosFavoritos']),
      muestrapost(p){
        console.log(p)
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

        // this.file = new File(p.urlRecurso);

        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = function(event) {
        //   var blob = xhr.response;
        //   console.log(blob)
        // };
        // xhr.open('GET', p.urlRecurso);
        // xhr.send();


        // xhr.send()

        // console.log("this.file")
        // console.log(this.file)
      },
      editapost(t){
        this.edit=true
        this.editpost=t
      },
      async  cargabaseGral(){
        try {
          if(!this.esCompleto)
            await this.$fireStore
              .collection(this.tipo).orderBy("fecha", "desc").limit(4)
              .get()
              .then((data) => {
                data.forEach((doc) => {
                  let data = doc.data();
                  data.tags = data.tags ? data.tags : [];
                  data.favoritos = data.favoritos ? data.favoritos : [];
                  delete data['idRecurso'];


                  const datos = {
                      idRecurso: doc.id,
                      ...data
                    }
                  this.blogpost.push(datos);
                });
                  // this.blogpost = [...this.blogpost].slice(0,4);
                // console.log(this.blogpost);
              });
            else
              await this.$fireStore
                .collection(this.tipo).orderBy("fecha", "desc")
                .get()
                .then((data) => {
                  data.forEach((doc) => {
                    let data = doc.data();
                    data.tags = data.tags ? data.tags : [];
                    data.favoritos = data.favoritos ? data.favoritos : [];
                    delete data['idRecurso'];


                    const datos = {
                        idRecurso: doc.id,
                        ...data
                      }
                    this.blogpost.push(datos);
                  });
                    // this.blogpost = [...this.blogpost].slice(0,4);
                  // console.log(this.blogpost);
                });
          } catch (e) {
            console.log(e);
          }
        },


    async  cargabaseUser(){
      try { 
        if(!this.esCompleto)
        {
          console.log("no completo")
          await this.$fireStore
            .collection(this.tipo)
            .where("idCreador","==",this.userId)
            .get()  
            .then((data) => {
              data.forEach((doc) => {
                let data = doc.data();
                data.tags = data.tags ? data.tags : [];
                data.favoritos = data.favoritos ? data.favoritos : [];
                delete data['idRecurso'];


                const datos = {
                    idRecurso: doc.id,
                    ...data
                  }
                this.blogpost.push(datos);
              });
                // this.blogpost = [...this.blogpost].slice(0,4);
            });
        }
        else{
          console.log(" completo")

          await this.$fireStore
          .collection(this.tipo)
          .where("idCreador","==",this.userId)
          .get()  
          .then((data) => {
            data.forEach((doc) => {
              let data = doc.data();
              data.tags = data.tags ? data.tags : [];
              data.favoritos = data.favoritos ? data.favoritos : [];
              delete data['idRecurso'];


              const datos = {
                  idRecurso: doc.id,
                  ...data
                }
              this.blogpost.push(datos);
            });
              // this.blogpost = [...this.blogpost].slice(0,4);
          });
        }

          } catch (e) {
                console.log(e);
              }
            },


            async  cargabaseExclude(){
                try {
                  if(!this.esCompleto)
                    await this.$fireStore
                      .collection(this.tipo)
                      .where("idCreador","!=",this.idexclude)
                      .get()
                      .then((data) => {
                        data.forEach((doc) => {
                          let data = doc.data();
                          data.tags = data.tags ? data.tags : [];
                          data.favoritos = data.favoritos ? data.favoritos : [];
                          delete data['idRecurso'];


                          const datos = {
                              idRecurso: doc.id,
                              ...data
                            }
                          this.blogpost.push(datos);
                        });
                          // this.blogpost = [...this.blogpost].slice(0,4);
                      });
                    else
                      await this.$fireStore
                      .collection(this.tipo)
                      .where("idCreador","!=",this.idexclude)
                      .get()
                      .then((data) => {
                        data.forEach((doc) => {
                          let data = doc.data();
                          data.tags = data.tags ? data.tags : [];
                          data.favoritos = data.favoritos ? data.favoritos : [];
                          delete data['idRecurso'];


                          const datos = {
                              idRecurso: doc.id,
                              ...data
                            }
                          this.blogpost.push(datos);
                        });
                          // this.blogpost = [...this.blogpost].slice(0,4);
                      });
                  } catch (e) {
                    console.log(e);
                  }
                },

      //  METODOS PARA COMENTARIOS
      async agregarComentario(){
        const {id, nombre, apellido, urlImagen} = this.datosUsuario;
        
        this.datosComentario.idUsuario = id;
        this.datosComentario.nombreUsuario = `${nombre} ${apellido}`;
        this.datosComentario.urlImagen = urlImagen;
        console.log(this.datosComentario)
        console.log(this.tipo)
        console.log(this.vistapost);
        //OBTENEMOS EL ID DEL RECURSO (MEMORIA, RELFEXION, RECOMENDACION, ETC)
        const {idRecurso} = this.vistapost;
        this.vistapost.comentarios.push({...this.datosComentario});

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        let recursoComentariosRef = this.$fireStore.collection(this.tipo).doc(idRecurso);
        
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
      descargarRecurso(link){

      },

      //AGREGAR O QUITAR DE FAVORITOS
      // changeFavorito(estado, recurso){


      //   if(estado === "add")
      //     recurso.favoritos.push(this.datosUsuario.id);
      //   else
      //     recurso.favoritos = recurso.favoritos.filter( r => this.datosUsuario.id !== r)

        
        


      // }
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
        },
        esCompleto:{
          type: Boolean,
          default: true,
        },
        esBusqueda:{
          type: Boolean,
          default: false,
        },
        esFavoritos:{
          type: Boolean,
          default: false,
        },
        datoBuscar:{
          type:String,
          default:""
        }
    },
    components:{
      VueEditor,
      videoPlayer,
      audioPlayer,
    },
    async mounted(){
        // console.log("this.blogpost")
        
        // console.log("Es completo: "+this.esCompleto);
        if(this.userId==='' && this.idexclude===''){
           await this.cargabaseGral()
        }
        if(this.userId){
            await this.cargabaseUser()
        }
        if(this.idexclude){
           await this.cargabaseExclude()    
        }

        // console.log(this.esBusqueda)
        // console.log(this.blogpost)
        if(this.esBusqueda)
        {
          // console.log(this.titulo)
          // console.log("dato a buscar en todas las listas")
          const clave = this.datoBuscar.toLowerCase().normalize("NFD");
          // console.log(clave)
          let recursos = [... this.blogpost];
          // console.log("RECURSOS")
          // console.log(recursos)
          this.blogpost = [...recursos.filter(recurso =>
            recurso.tags.includes(clave) 
          )]

          // console.log("FILTRADOS")
          // console.log(this.blogpost)
            
           
        }

        if(this.esFavoritos)
        {

          //const favs = recetas.data.filter( receta =>(receta.votantes.includes(usuario.correo)) );
          let recursos = [... this.blogpost];
          this.blogpost = [...recursos.filter(recurso =>
            recurso.favoritos.includes(this.datosUsuario.id) 
          )]
          // console.log("FAVORITOS DE: "+this.tipo);
          // console.log(this.blogpost);
        }
        

    },
    computed: {
      ...mapState(['datosUsuario','itemsmenu']),
      fechaVisualC(vm, payload){
        console.log(vm)
        console.log(payload)
        // const fecha = format(payload, "dd 'de' MMMM 'de' yyyy", {locale: es});
        // console.log(fecha)
        return vm;
      }
    },
}