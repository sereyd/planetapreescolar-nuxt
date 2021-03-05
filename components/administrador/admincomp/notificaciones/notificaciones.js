import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    data(){
        return {
            abrenot:false,
            usernotselect:{},
            optionUsuarios:[],
            iconos:[
                {
                  text:'delete',
                  value:'mdi-delete'
                },
                {
                    text:'alerta',
                    value:'mdi-alert'
                  },
                  {
                    text:'cuenta',
                    value:'mdi-account'
                  },
                  {
                    text:'correo',
                    value:'mdi-email'
                  }
                
            ],
            valid:false,
            mensajeerror:"",
            num:0,
            mensajesucces:""
        }
    },
    computed:{
        // ...mapState(['datosUsuario']),
        ...mapState(['configAll']),
        cargausuarios(){
            if(this.userobject){
                this.optionUsuarios=[...this.userobject]
            }
        }
    },
    methods:{
        ...mapActions(['creaNotificacion']),
        validaDatos(){
           this.num=0
            if(this.userobject.user===''){
                this.num++
            }    
            if(this.userobject.text===''){
                this.num++
            }    
            if(this.userobject.icon===''){
                this.num++
            }    
            if(this.userobject.link===''){
                this.num++
            }    
            if(this.num===0){
                this.valid=true
            }
        },
        enviarNotificacion(){
            this.validaDatos()
            if(this.valid===true){

            this.creaNotificacion(this.usernotselect)
            this.usernotselect={}

            this.mensajesucces="Mensaje envíado correctamente"
            setTimeout(()=>{
                this.mensajesucces=""
            },3000)

            }else{
                this.mensajeerror="debe ingresar el texto, seleccionar el icono e ingresar el link para continuar"
                setTimeout(()=>{
                    this.mensajeerror=""
                },3000)
            }
        },
    },
    props:{
        userobject:{
            type:Array,
            default:()=>{
                return []
            }
        }
    }
}