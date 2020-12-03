import { mapState, mapActions, mapMutations } from "vuex";
import listablog from '~/components/listado-blog/listado-blog.vue'

// import { format } from 'date-fns'
// import { es } from 'date-fns/locale';

export default{
    data(){
        return {
            relacionados:[],
            bandera: false,
        }
    },
    async mounted() {
        console.log("RELACIONADOS")
        console.log(this.bandera)
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
                      delete data['idRecurso'];
    
    
                      const datos = {
                          idRecurso: doc.id,
                          ...data
                      }
                      console.log(this.subtipo)
                      if(
                            datos.tipo === this.subtipo  && 
                            ( datos.edopost === "publico" || 
                                (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) 
                            ) &&
                            this.vistapost.idRecurso !== datos.idRecurso
                        )
                        this.relacionados = [
                          ...this.relacionados,
                          datos]
    
                    
                      // this.blogpost.push(datos);
                    });
                    this.relacionados = this.relacionados.slice(0, 4);
                    console.log("this.RELACIONADOS solo 4 elelemntos")
                    console.log(this.relacionados)
                  });
              } catch (e) {
                console.log(e);
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
        listablog
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