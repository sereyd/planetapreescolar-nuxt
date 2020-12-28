import { mapState,mapActions } from 'vuex'
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
        ...mapActions(['creaNotificacion']),
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

                this.datosblog.iduser=this.datosUsuario.id
                this.datosblog.publicador=this.datosUsuario.nombre+" "+this.datosUsuario.apellido
                this.datosblog.correo=this.datosUsuario.correo
                this.datosblog.comentarios=[]
                this.datosblog.verificado=false
                this.datosblog.estrellas=[]
                this.datosblog.fechapub=new Date() 
                var datosdenotificacion={}
                   var creablog= this.$fireStore.collection('foro')
                   creablog.add(this.datosblog)
                        this.$emit('finaliza',false)
                    this.datosblog={}

                    //// toma datos de usuarios lvl 3
                    this.$fireStore.collection('usuarios').where('lvluser','==',3).get()
                    .then((dat)=>{
                      dat.docs.forEach((datos)=>{
                       
                       var datosdenotificacion={
                           user:datos.data().id,
                            icon:'mdi-text-box-check-outline', 
                            text:'se publico un nuevo foro',
                            link:'/foro',
                       }

                        this.creaNotificacion(datosdenotificacion)
                      })
                    })

                    this.$emit('actualizaforo',true)
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
