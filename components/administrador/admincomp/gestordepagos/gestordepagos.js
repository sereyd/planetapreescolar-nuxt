export default {
    data(){
        return {

            usuarios:[],
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
                },
                   
            ],
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
            lvls:[{value: 1, text: "Gratis"}, {value: 2, text: "Premium"}, {value: 3, text: "Admin"}],
            usuarioEditable:[],
            search:"",
            dialog: false,//DATA PARA ELA VENTANA  EMERGENTE DE EDITAR USUARIO
            valid: false,  //DATA PARA VALIDAR EL FORMULARIO,
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
            ],
            dialogDes:false,
            optionUsuarios:[],
            tipos:['Miss','Maestra'],
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
        validarFormulario() {
            const vd = this.$refs.form.validate();
            console.log('validando formulario')
            console.log(vd)
            this.valid = vd;
            if(this.valid)
            this.editarUsuario();
        },

        abrirVentana (usuario) {
            this.usuarioEditable = usuario;
            this.dialog = true
          },
     
    },
    props:{
        usuar:{
            type:Array,
            default:()=>{
                return []
            }
        }
    }
}