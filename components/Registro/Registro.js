import { mapState, mapMutations, mapActions } from 'vuex'
export default{
    data(){
        return {
            titulo: "Registro",
            tipoUsuario:[
                {tipo:'Educador', icon:'mdi-format-list-bulleted-square'},
                {tipo:'Tutor', icon:'mdi-android'}
            ],
            registro: false,
            tipoResgistro: '',
            
            tipos:['Miss','Maestra'],
            imagen: null
        }
    }, 
    computed:{
        ...mapState(['dialog', 'tipoUsuarioR','faseFormulario','datosUsuario','errorFase2', 'errorFase3',
        'nombreReglas','apellidoReglas','correoReglas','passwordReglas','correoReglas2', 'valid'])
    },
    // computed:{
    //     ...mapState(['test'])
    //   },
    methods:{
        ...mapMutations(['abrirRegistro','elegirRegistro','siguienteFormulario','atrasFormulario','validate']),
        // ...mapActions(['revisarForm2']),
        focus(){
            const imagen_input = document.getElementById('imagen_input');
            imagen_input.click()   
        },
        revisarDatos(){
            console.log(this.datosUsuario);
        }
       
    },
    // mounted(){
    //     this.getElement()
    // }
}