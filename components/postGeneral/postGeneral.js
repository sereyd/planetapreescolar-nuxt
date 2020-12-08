import { mapState, mapActions, mapMutations } from "vuex";
import listablog from '~/components/listado-blog/listado-blog.vue'

// import { format } from 'date-fns'
// import { es } from 'date-fns/locale';

export default{
    data(){
        return {
            relacionados:[],
            bandera: false,

            //DATA PARA COMENTARIOS
            esComentarioValido: true,
            comentarios:[],
            datosComentario:{
              idUsuario:"",
              comentario:"",
              nombreUsuario:"",
              urlImagen:""
            },
            allpost:[],
            cont:0,
        }
    },
    async mounted() {
        console.log("RELACIONADOS")
        console.log(this.bandera)
        console.log(this.posts)
        console.log(this.vistapost)
        // this.guardarVistaValida(true); 
        await this.cargabaseGral()
        this.bandera = true
        console.log(this.bandera)
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
                      console.log(this.subtipo)
                      if(this.subtipo === "recomendacion")
                      {
                          if(
                             ( datos.tipo === "planeacion" || datos.tipo === "recurso" )  && 
                              ( datos.edopost === "publico" || 
                                  (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) 
                              ) &&
                              this.vistapost.idRecurso !== datos.idRecurso
                          )
                          {

                            this.relacionados = [
                              ...this.relacionados,
                              datos]
                              
                          }
                      }
                      else{

                        if(
                              datos.tipo === this.subtipo  && 
                              ( datos.edopost === "publico" || 
                                  (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) 
                              ) &&
                              this.vistapost.idRecurso !== datos.idRecurso
                          )
                          {

                            this.relacionados = [
                              ...this.relacionados,
                              datos]
                          }
                      }

    
                    
                      // this.posts.push(datos);
                      conta++;
                    });
                    this.relacionados = this.relacionados.slice(0, 4);
                    console.log("this.RELACIONADOS solo 4 elelemntos")
                    console.log(this.relacionados)
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
    },
    components:{
        listablog: () => import('~/components/listado-blog/listado-blog.vue')
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
    }
    },
}