import { mapState } from 'vuex'
export default {
    data(){
        return {
            datos:{},
            payload:{},
            respuesta:""
        }
    },
    computed:{
        ...mapState(['configAll','datosUsuario'])
    },
    methods:{
        enviacorreo(){
            this.respuesta={}
            this.payload={}

           this.payload={
                tipo:'prueba',
                datos:this.datos,
                url:this.configAll.url
              }
              
              ///envia correo de confirmación 

             fetch(this.configAll.mailserver+'/mailsender/',
              {
                method:'POST',
                headers:{
                  'Content-type':'applications/json'
                },
                body:JSON.stringify(this.payload)

              }
             )
             .then(res=>res.json()) 
             .then((res)=>{

                this.respuesta=res
                this.payload.tipomensaje='soporte'
                this.payload.accion='Prueba de correo de sistema'
                this.$fireStore.collection('correos').add(this.payload)
                .then(()=>{
                   
                })
           
                
            })
        }
    }
}