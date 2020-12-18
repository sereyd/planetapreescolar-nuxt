import { mapState, mapActions, mapMutations } from "vuex";
import { audioPlayer, videoPlayer } from 'vue-md-player'
import listablog from '~/components/listado-blog/listado-blog.vue'
import Spinner from '~/components/spinner.vue'
import pdfviewer from '~/components/pdfviewer/pdfviewer.vue'
import comentarios from '~/components/comentarios/comentarios.vue'




// import { format } from 'date-fns'
// import { es } from 'date-fns/locale';

export default{
    data(){
        return {
            relacionados:[],
            bandera: false,

            //DATA PARA COMENTARIOS
            esComentarioValido: true,
            // comentarios:[],
            // datosComentario:{
            //   idUsuario:"",
            //   comentario:"",
            //   nombreUsuario:"",
            //   urlImagen:""
            // },
            allpost:[],
            contador:0,
        }
    },
    async mounted() {
        // console.log("RELACIONADOS")
        // console.log(this.bandera)
        // console.log(this.posts)
        // console.log(this.vistapost)
        // this.guardarVistaValida(true); 
        await this.cargabaseGral()
        this.bandera = true
        // console.log(this.bandera)
    },
    methods: {
        verRecurso(){
            this.$emit('updateviewP',true); 
            this.$emit('updateviewO',false);
        },
        async  cargabaseGral(){
          let conta = 0;
            try {
              // if(!this.esCompleto)
                await this.$fireStore
                  .collection("CATEGORIAS").orderBy("fecha", "desc")
                  .get()
                  .then((data) => {
                    data.forEach((doc) => {
                      let data = doc.data();
                      data.tags = data.tags ? data.tags : [];
                      data.favoritos = data.favoritos ? data.favoritos : [];
                      data.sinopsis= data.sinopsis ? data.sinopsis : "";

                      delete data['idRecurso'];
    
    
                      const datos = {
                          idRecurso: doc.id,
                          ...data
                      }
                      // console.log(this.subtipo)
                      if(this.subtipo === "recomendacion")
                      {
                          if(
                             ( datos.tipo === "planeacion" || datos.tipo === "hojatrabajo" || datos.tipo === "materialdidactico" || datos.tipo === "interactivo" || datos.tipo === "otro" )  && 
                              ( datos.edopost === "publico" || 
                                  (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) 
                              ) 
                          )
                          {
                            this.relacionados = [
                              ...this.relacionados,
                              datos]

                            if(this.vistapost.idRecurso === datos.idRecurso)
                            {
                              this.contador = (this.relacionados.length - 1)
                            }
                              
                          }
                          // console.log(this.contador)
                      }
                      else{

                        if(
                              datos.tipo === this.subtipo  && 
                              ( datos.edopost === "publico" || 
                                  (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) 
                              ) 
                          )
                          {

                            this.relacionados = [
                              ...this.relacionados,
                              datos]

                            if(this.vistapost.idRecurso === datos.idRecurso)
                            {
                              this.contador = (this.relacionados.length - 1)
                            }
                            // console.log(this.contador)
                          }
                      }

    
                    
                      // this.posts.push(datos);
                      conta++;
                    });
                    // this.relacionados = this.relacionados.slice(0, 4);
                    // console.log("this.RELACIONADOS solo 4 elelemntos")
                    // console.log(this.relacionados)
                  });
              } catch (e) {
                console.log(e);
              }
            },
       

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

      sliderF(data){
        console.log(data)
        console.log(this.contador)
        // this.contador = data === "adelante" ? this.contador++ : this.contador--;
        if(data === "adelante")
          this.contador++
        else
          this.contador--
        
        console.log(this.contador)
        
        
        this.cambioUrls();

      },
      cambioUrls(){
        let postS = {...this.relacionados[this.contador]}
        console.log("POST")
        console.log(postS)
        if(postS.tipoRecurso === 'link')
        {
          let {urlVista} = postS;
          const embed = urlVista.replace("watch?v=", "embed/");
          // this.linkembed = embed;
          this.$emit("updateLinkEmbed",embed)
          console.log(this.linkembed);
        }

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
           // console.log(xhr.response);
           const blob = xhr.response;
          //  console.log(blob)
           const res = blob.type.split("/");
          //  console.log("res")
          //  console.log(res)
           const typeFile = res[1];
           if(blob.type === "application/pdf")
           {
            this.$emit("updateNombreFile",postS.titulo+'.pdf')
           }
           else if(blob.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
           {
            this.$emit("updateNombreFile",postS.titulo+'.docx')
           }
           else if(blob.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation")
           {
            this.nombreFile = this.vistapost.titulo+'.pptx';
           }
           else if(postS.tipoRecurso !== "audio" && postS.tipoRecurso !== "image" )
            this.$emit("updateNombreFile",postS.titulo+'.'+postS.tipoRecurso)
           else
           this.$emit("updateNombreFile", postS.titulo+'.'+typeFile)

            // this.nombreFile = postS.titulo+'.'+typeFile;

          // console.log("this.nombreFile");
          console.log(this.nombreFile);

 
          const urlFB = URL.createObjectURL(blob, {
            type: blob.type
          });
          console.log(urlFB)
          this.$emit("updateUrlFileB",urlFB)

          // this.spinner = false;

          
          
        }
        if( postS.urlDescargable !== "none" && postS.urlDescargable !== "")
        {
          xhr.open('GET', postS.urlDescargable);
          xhr.send();
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
        posts:{
          type: Array,
          default: () => []
        },
        viewothers:{
          default:()=>{
              return 'BLOG'
          }
        },
        viewothers:{
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
        spinner:{
          default:()=>{
              return false;
          }
      },
    },
    components:{
        listablog: () => import('~/components/listado-blog/listado-blog.vue'),
        Spinner,
        pdfviewer,
        audioPlayer,
        comentarios
        // TreeFolderContents: () => import('./tree-folder-contents.vue')
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
      },
      
    },
}