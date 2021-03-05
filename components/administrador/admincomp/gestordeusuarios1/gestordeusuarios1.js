export default {
    data(){
        return{
            fullScreenUsuarios3: false,
            usuario:[],
            titulos:[],
            search:"",
            usuarioEditable: {
                nombre: '',
                apellido: '',
                tipo: '',
                correo: '',
                lvluser: '',
            },
            dialog:false
        }
    },
    methods:{
        abrirVentana (usuario) {
            this.usuarioEditable = usuario;
            this.dialog = true
          },        
          async getElement(){ 
            this.cambiaLoading('inicia')
            try{
                this.usuarios=[]
                this.optionUsuarios=[]
                const dtuser=await this.$fireStore.collection('usuarios').get();
                //DESPUES DE OBTENER A LOS USUARIOS LOS ALMACENAMOS EN THIS.UUSUARIOS
                this.usuarios = dtuser.docs.map(doc=>{
                    this.optionUsuarios.push({
                        text:doc.data().nombre+" "+doc.data().apellido+": "+doc.data().correo,
                        value:doc.id
                    })

                return {
                    id: doc.id, //SE LES AGREGA EL ID DEL USAURIO PARA REALIZAR LA BUSQUEDA POR SU ID
                    ...doc.data()
                    }
                    this.cambiaLoading('finaliza')
                });
                // console.log(this.optionUsuarios)
            }catch(error){
              console.log(error)
            }

        },
    }
}