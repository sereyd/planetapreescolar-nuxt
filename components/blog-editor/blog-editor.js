
import { mapState, mapActions, mapMutations } from 'vuex'

import { VueEditor } from 'vue2-editor'
import subirImagen from '@/components/subirimagen/subirimagen.vue'
export default{
    data(){
        return {
            editar:false,
            datablog:{
                tipo:this.tipo,
                urlImagen:"",
                edopost:"",
                titulo:"",
                contenido:"",
                user:""
            },
            uploadimg:false,
            creablog:false,
            mensajeError1:""
        }
    },
    computed:{
        ...mapState(['urlimg','datosUsuario']),
    },
    methods:{
        ...mapMutations(['almacenarFotoStorage']),
        creanuevopost(){
            this.mensajeError1=""
            if(this.datablog.titulo && this.datablog.edopost){
            this.editar=false
            this.creablog=true
            }else{
                this.mensajeError1="Ingrese todos los datos para continuar"

                setTimeout(()=>{
                    this.mensajeError1=""
                },2000)
            }
        },
      
        cerrar(){
            this.creablog=false
            this.editar=true
        },
        async guardarPost(){
            
            try{

               
                if(this.imagen===true){
                 await this.almacenarFotoStorage("publicaciones/"+datosUsuario.foldercode);
                }

                await this.$fireStore.collection('publicaciones').add(this.datablog)
                this.creablog=false
                this.datablog={
                       urlImagen:this.urlimg,
                       edopost:"",
                       titulo:"",
                       contenido:""
                }

            }catch(e){
                console.error(e)
            }
        }
    },
    mounted(){
        this.datablog.user=this.datosUsuario.id
    },
    components:{
        subirImagen,
        VueEditor
      },
      props:{
          tipo:{
              type:String,
              default:'blog'
          },
          imagen:{
              type:String,
              default:"true"
          }
      }
    }