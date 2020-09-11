import { mapState, mapMutations, mapActions } from 'vuex'
export default{
    data(){
        return {

            //DATA DE FORMULARIO LOGIN
            usuarios:[],
            tipos:['Miss','Maestra'],
            lvls:[{value: 0, text: "Gratis"}, {value: 1, text: "Premium"}, {value: 2, text: "Admin"}],

            //DATA DE LA TABLA
            titulos:[
                {
                    text:'Foto',
                    value:'action2'
                },
                {
                    text:'Nombre',
                    value:'nombre'
                },
                {
                    text:'Apellido',
                    value:'apellido'
                },
                {
                    text:'Correo',
                    value:'correo'
                },
                
                {
                    text:'Editar',
                    value:'actions',
                    sorteable: false
                }   
            ],
            
            usuarioEditable: {
                nombre: '',
                apellido: '',
                tipo: '',
                correo: '',
                lvluser: '',
            },

            //DATA PARA FILTAR USUARIOS
            search: '',

            dialog: false,//DATA PARA ELA VENTANA  EMERGENTE DE EDITAR USUARIO
            valid: false,  //DATA PARA VALIDAR EL FORMULARIO

            /* REGLAS DEL PRIMER FORMULARIO */
            nombreReglas: [
                v => !!v || 'Nombre es requerido',
                // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
            apellidoReglas: [
                v => !!v || 'Nombre es requerido',
                // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
            nivelReglas: [
                v =>  (v >= 0 && v < 3) || 'Seleccione un nivel'
            ]

            
        }
    },
    computed:{
        // ...mapState(['datosUsuario']),
        ...mapState(['datosUsuario']),
    },
    methods:{
        // ...mapActions(['cambiarStatusOpenAdmin']),
        ...mapMutations(['cambiarStatusOpenAdmin']),

        async getElement(){ 
            try{
                this.usuarios=[]
                const dtuser=await this.$fireStore.collection('usuarios').get();
                //DESPUES DE OBTENER A LOS USUARIOS LOS ALMACENAMOS EN THIS.UUSUARIOS
                this.usuarios = dtuser.docs.map(doc=>{
                return {
                    id: doc.id, //SE LES AGREGA EL ID DEL USAURIO PARA REALIZAR LA BUSQUEDA POR SU ID
                    ...doc.data()
                    }
                });

            }catch(error){
              console.log(error)
            }
        },

        abrirVentana (usuario) {
          this.usuarioEditable = usuario;
          this.dialog = true
        },
        // SOLO SE PUEDE ELIMIINAR EL USUARIO DE LA BASE DE DATOS PERO NO DEL AUTENTHICATION
        // async eliminarUsuario (usuario) {
        //     const {id} = usuario;
        //     console.log(usuario);

        //   if (confirm('¿Seguro que desea eliminar a este usuario?')) {
        //     console.log("eliminado ALV")
        //     try {
        //         await this.$fireStore.collection('usuarios').doc(id).delete();
        //     } catch (error) {
        //         console.log(error);
        //     }

        //   } else {
        //     console.log("No ALV")
        //   }

        // },
    
        editarUsuario () {
            //SE OBTIENE EL CAMPO ID DEL USUARIO A EDITAR
            const {id} = this.usuarioEditable;
            //SE REALIZA LLA BUSQUEDA POR MEDIO DE SU ID
            this.$fireStore.collection('usuarios').doc(id).update(this.usuarioEditable)
            this.close()
        },

        validarFormulario () {
            const vd = this.$refs.form.validate();
            this.valid = vd;
            if(this.valid)
              this.guardarModificacionUsuario();
        },
    },
    mounted(){
        this.getElement()
    }
}