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
            url:"",
            dataArray:[],
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
        }
    },
    created(){
    
      this.url=window.location.protocol+"//"+window.location.host
      
      
    },
    mounted(){
    if(this.busqueda){
        if(this.busqueda.length===0){
            setTimeout(()=>{
              this.loadBase(this.blogpost)
            },600)
        }else{
          this.loadBase(this.blogpost)
        }

    }
     if(!this.busqueda) {
        this.loadBase(this.blogpost)
     }
  
    },
    computed: {
      ...mapState(['datosUsuario','itemsmenu','descargarFree','viewothers','viewpost','configAll','baseBusqueda']),
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
      let comen = comentarios.filter(com => com.valido === true);
      return comen.length;
    },
   

    },
    methods:{
      ...mapActions(['changeRecursosFavoritos','ejecutaFiltrosBusqueda']),
      ...mapMutations(['changeViewOthers','changeViewPost','changeDialogPost','cambiaLoading','cargaBaseBusqueda']),
      loadBase(p){

        this.cambiaLoading('inicia')
        let lobas=this.$fireStore.collection('CATEGORIAS')
        let ben=""
        var val
        this.dataArray=[]

        if(this.configAll && Object.keys(this.configAll).length===0){
         setTimeout(()=>{ this.loadBase(p) },500) 
        }else{

          var sec=window.location.pathname
          let cant=this.configAll.loadlimit.find(lim=>lim.seccion===sec)
          let cantidadlimite=parseInt(cant.limite)
          var numorden=Math.floor(Math.random() * 2)
          var recomorden=Math.floor(Math.random() * 2)
          var otrospostran=Math.floor(Math.random() * 9) 

          var randsec1=Math.floor(Math.random() * 3)
          var randsec2=Math.floor(Math.random() * 3)
          var randsec3=Math.floor(Math.random() * 2)

          var randOrderby=Math.floor(Math.random() * 3)

          //// valores para realizar random 
          var orden=['asc','desc']
          var seccion1=['blog','memoria','otro']
          var seccion2=['planeacion','hojatrabajo','hojailustrar']
          var seccion3=['materialdidactico','interactivo']

          var otrosPost=['blog','memoria','otro','planeacion','hojatrabajo','hojailustrar','materialdidactico','interactivo']

          var bolearecom=[true,false]
          var orderby=['titulo','fecha','recomendado']


          if(this.busqueda.length>0){
            if(this.baseBusqueda.length===0){
          
          lobas.get()
            .then((dat)=>{
            new Promise((res)=>{
              this.cargaBaseBusqueda(dat)
              res('ok')
            })
            .then((r)=>{

              this.ejecutaFiltrosBusqueda(this.busqueda)
              .then((dat)=>{
                dat.forEach((doc) => {
                  let data = doc;
                data.tags = data.tags ? data.tags : [];
                data.favoritos = data.favoritos ? data.favoritos : [];
                data.sinopsis= data.sinopsis ? data.sinopsis : "";
                if(data.tipo !== "otro" )
                  data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
                delete data['idRecurso'];
                let datos = {
                    idRecurso: doc.id,
                    ...data
                }
                this.dataArray.push(datos)
                this.cambiaLoading('finaliza')
              });
              })
            })
           
            this.cambiaLoading('finaliza')
  console.log('callback----')
            })
          }else{
          this.ejecutaFiltrosBusqueda(this.busqueda)
          .then((dat)=>{
            dat.forEach((doc) => {
              let data = doc;
            data.tags = data.tags ? data.tags : [];
            data.favoritos = data.favoritos ? data.favoritos : [];
            data.sinopsis= data.sinopsis ? data.sinopsis : "";
            if(data.tipo !== "otro" )
              data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
            delete data['idRecurso'];
            let datos = {
                idRecurso: doc.id,
                ...data
            }
            this.dataArray.push(datos)
            this.cambiaLoading('finaliza')
          });
          })
          }

          }else{

          switch(cant.carga){
          case 'rand': ///// realiza busquedas en random
         
          switch(p){ //// seccion de recomendados realiza la busqueda de 3 secciones que tengan recomendado
            case 'recomendado':
            lobas.where('recomendado','==',true)
            lobas.where('tipo','==',seccion1[randsec1])
            lobas.where('tipo','==',seccion2[randsec2])
            lobas.where('tipo','==',seccion3[randsec3])

            .orderBy(orderby[randOrderby],orden[numorden])
            .limit(cantidadlimite).get()
            .then((dat)=>{
              dat.forEach((doc) => {
                let data = doc.data();
              data.tags = data.tags ? data.tags : [];
              data.favoritos = data.favoritos ? data.favoritos : [];
              data.sinopsis= data.sinopsis ? data.sinopsis : "";
              if(data.tipo !== "otro" )
                data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
              delete data['idRecurso'];
              let datos = {
                  idRecurso: doc.id,
                  ...data
              }
              this.dataArray.push(datos)
              this.cambiaLoading('finaliza')
            });
            })

          break; ///// cual quier otro tipo carga un random
          case 'otrosPost':
          case 'otrospost':

            lobas.where('tipo','==',otrosPost[otrospostran])
            .orderBy(orderby[randOrderby],orden[numorden])
            .limit(cantidadlimite).get()
            .then((dat)=>{
              dat.forEach((doc) => {
                let data = doc.data();
              data.tags = data.tags ? data.tags : [];
              data.favoritos = data.favoritos ? data.favoritos : [];
              data.sinopsis= data.sinopsis ? data.sinopsis : "";
              if(data.tipo !== "otro" )
                data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
              delete data['idRecurso'];
              let datos = {
                  idRecurso: doc.id,
                  ...data
              }
              this.dataArray.push(datos)
              this.cambiaLoading('finaliza')
            });
            })

          break;
          default:

            lobas.where('tipo','==',p)
            .orderBy(orderby[randOrderby],orden[numorden])
            .limit(cantidadlimite).get()
            .then((dat)=>{
              dat.forEach((doc) => {
                let data = doc.data();
              data.tags = data.tags ? data.tags : [];
              data.favoritos = data.favoritos ? data.favoritos : [];
              data.sinopsis= data.sinopsis ? data.sinopsis : "";
              if(data.tipo !== "otro" )
                data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
              delete data['idRecurso'];
              let datos = {
                  idRecurso: doc.id,
                  ...data
              }
              this.dataArray.push(datos)
              this.cambiaLoading('finaliza')
            });
            })
            break;
          
          }
          break;
          case 'lista': /////////carga en listas 
          
            switch(p){
              case 'otrosPost':
              case 'otrospost':
                console.log('carga otro post y lista')
                lobas.where('tipo','==',otrosPost[otrospostran])
                .orderBy(orderby[randOrderby],orden[numorden])
                .limit(4).get()
                .then((dat)=>{
                  dat.forEach((doc) => {
                    let data = doc.data();
                  data.tags = data.tags ? data.tags : [];
                  data.favoritos = data.favoritos ? data.favoritos : [];
                  data.sinopsis= data.sinopsis ? data.sinopsis : "";
                  if(data.tipo !== "otro" )
                    data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
                  delete data['idRecurso'];
                  let datos = {
                      idRecurso: doc.id,
                      ...data
                  }
                  this.dataArray.push(datos)
                  this.cambiaLoading('finaliza')
                });
                })

                break;
              case 'recomendado':
                console.log('se ejecuta lista y recomendado')
            lobas.where('recomendado','==',true)
            .orderBy('titulo','desc')
            .limit(cantidadlimite).get()
            .then((dat)=>{
              dat.forEach((doc) => {
                let data = doc.data();
              data.tags = data.tags ? data.tags : [];
              data.favoritos = data.favoritos ? data.favoritos : [];
              data.sinopsis= data.sinopsis ? data.sinopsis : "";
              if(data.tipo !== "otro" )
                data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
              delete data['idRecurso'];
              let datos = {
                  idRecurso: doc.id,
                  ...data
              }
              this.dataArray.push(datos)
              this.cambiaLoading('finaliza')
            });
            })

              break;
              default:

                lobas.where('tipo','==',p)
                .orderBy('titulo','desc')
                .limit(cantidadlimite).get()
                .then((dat)=>{
                  dat.forEach((doc) => {
                    let data = doc.data();
                  data.tags = data.tags ? data.tags : [];
                  data.favoritos = data.favoritos ? data.favoritos : [];
                  data.sinopsis= data.sinopsis ? data.sinopsis : "";
                  if(data.tipo !== "otro" )
                    data.premium =  typeof(data.premium) === "undefined" ? false : data.premium
                  delete data['idRecurso'];
                  let datos = {
                      idRecurso: doc.id,
                      ...data
                  }
                  this.dataArray.push(datos)
                  this.cambiaLoading('finaliza')
                });
                })

                break;
              }
            break;
        }
      }

        }
      },
      
      muestrapost(p){
        // console.log(p);
       
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

        const {tipo} =this.vistapost;
        // console.log(tipo);

        if(tipo !=='planeacion' && tipo !=='materialdidactico' && tipo !=='hojatrabajo' && tipo !=='hojailustrar' && tipo !=='interactivo' && tipo !=='otro')
        {
          // this.viewothers = false;
          this.changeViewOthers(false);

          // this.viewpost = true;
          this.changeViewPost(true);
        }

      if(this.vistapost.tipoRecurso === 'link')
       {
         let {urlVista} = this.vistapost;
        const embed = urlVista.replace("watch?v=", "embed/");
        this.linkembed = embed;
       }


       if(this.vistapost.tipoRecurso !== 'none'  && this.vistapost.tipoRecurso !== '')
       {
        
         const xhr = new XMLHttpRequest();
         xhr.responseType = 'blob';
         xhr.onload = (event) => {
           const blob = xhr.response;
           const res = blob.type.split("/");
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

           this.urlFileB = URL.createObjectURL(blob, {
             type: blob.type
           });
           
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
          type: String,
          default:""
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
        busqueda:{
          type:String,
          default:()=>{
            return ""
          }
        }
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
    

}