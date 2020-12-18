import { mapState } from 'vuex'
import {VueEditor} from 'vue2-editor'
import Alerta from '~/components/alertas/alertas.vue'


export default {
    data(){
        return {
            datosblog:{},
            error:[]
        }
    },
    computed:{
        ...mapState(['categoriasblog','datosUsuario']),
        cargadatosblog(){
            if(Object.keys(this.editar).length>0){
                this.datosblog=this.editar
            }else{
                this.datosblog={}
            }
        }
    },
    methods:{
        validaForm(){
            this.error=[]

            if(!this.datosblog.titulo){
                this.error.push('Ingrese el titulo del blog')
            }

            if(!this.datosblog.categoria){
                this.error.push('Seleccione la categoría')
            }

            if(!this.datosblog.cuerpo){
                this.error.push('Ingrese información en el cuerpo')
            }
            
            if(!this.datosblog.cuerpo){
                this.error.push('Seleccione la categoría')
            }
        },
        crearBlog(){
            this.validaForm()

            if(this.error.length===0){
                   var creablog= this.$fireStore.collection('foro').doc(this.datosUsuario.id).collection('publicados')
                   creablog.add(this.datosblog)


                    this.datosblog={}
            }
        },
    
    },
    components:{
        VueEditor
    },
    props:{
        editar:{},
        
    }
}
