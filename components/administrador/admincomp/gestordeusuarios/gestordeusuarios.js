import {mapState, mapMutations} from 'vuex'
export default{
    data(){
        return {
            fullScreenUsuarios: false,
            usuarioEditable: {
                nombre: '',
                apellido: '',
                tipo: '',
                correo: '',
                lvluser: '',
            },
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
            dialog:false,
            search:"",
            usuarios:[],
            dialog: false,//DATA PARA ELA VENTANA  EMERGENTE DE EDITAR USUARIO
            valid: false,  //DATA PARA VALIDAR EL FORMULARIO,
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
            ],
            tipos:['Miss','Maestra'],
            lvls:[{value: 1, text: "Gratis"}, {value: 2, text: "Premium"}, {value: 3, text: "Admin"}]
        }
    },
    computed:{
        cargauser(){
            if(this.usuar){
                this.usuarios=this.usuar
            }
        }
    },
    methods:{
        ...mapMutations(['cambiaLoading']),
        abrirVentana (usuario) {
            this.usuarioEditable = usuario;
            this.dialog = true
          },
        
        editarUsuario() {
            //SE OBTIENE EL CAMPO ID DEL USUARIO A EDITAR
            const {id} = this.usuarioEditable;
            //SE REALIZA LLA BUSQUEDA POR MEDIO DE SU ID
            console.log(this.usuarioEditable)
            this.$fireStore.collection('usuarios').doc(id).update(this.usuarioEditable)
            this.dialog=false
        },
        validarFormulario() {
            const vd = this.$refs.form.validate();
            console.log('validando formulario')
            console.log(vd)
            this.valid = vd;
            if(this.valid)
            this.editarUsuario();
        }
    },
    props:{
        usuar:{
            type:[Array],
            default:()=>{
                return []
            }
        }
    }
}