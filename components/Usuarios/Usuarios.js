import { mapState, mapMutations } from 'vuex'
export default{
    data(){
        return {
            altauser:false,
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
    computed:{
        ...mapState(['test','counter'])
    },
    // computed:{
    //     ...mapState(['test'])
    //   },
    methods:{
        ...mapMutations(['increment']),
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