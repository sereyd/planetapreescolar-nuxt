export default{
    data(){
        return {
            datosuser:[],
            cabecera:[{
                text:'Nombre',
                value:'nombre'
            },
            {
                text:'Correo',
                value:'correo'
            },
            {
                text:'Contraseña',
                value:'password'
            },
            {
                text:'Editar',
                value:'action'
            }    
        ]
        }
    },
    methods:{
        async getElement(){ 
            //// carga datos de usuario 

            try{
                this.datosuser=[]
                const dtuser=await this.$fireStore.collection('usuarios').get()
                dtuser.forEach(doc=>{
                this.datosuser.push(doc.data())
           
          })
            }catch(error){
              console.log(error)
            }
          }
    },
    mounted(){
        this.getElement()
    }
}