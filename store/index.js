import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      test:'prueba store con state',
      counter: 0,
      dialog: false,
      tipoUsuarioR: '',
      faseFormulario: 1,
      datosUsuario:{
        tipo: '',
        nombre: '',
        apellido: '',
        correo: '',
        confirmarCorreo: '',
        password: '',
        confirmarPassword:'',
        celular: '',
        experiencia: '',
        pais: '',
        cuidad: '',
      },
    correo2: "dddd",
    //validacion form
    valid: true,
    nombreReglas: [
      v => !!v || 'Nombre es requerido',
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    apellidoReglas: [
      v => !!v || 'Nombre es requerido',
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    correoReglas: [
      v => !!v || 'correo es requerido',
      v => /.+@.+\..+/.test(v) || 'Correo no válido',
    ],
    correoReglas2: [
      v => !!v || 'correo es requerido',
      v => /.+@.+\..+/.test(v) || 'Correo no válido',
      v => (v != console.log(state.datosUsuario.correo)) || 'El correo debe ser el mismo',
    ],
    passwordReglas: [
      v => !!v || 'contraseña es requerida',
      v => (v && v.length >= 8) || 'Contraseña debe ser 8 o más caracteres',
    ],
    errorFase2: true,
    errorFase3: true

    }),
    actions:{
      // revisarForm2(state){
      // if (state.datosUsuario.nombre !== '' && state.datosUsuario.tipo !== '' && state.datosUsuario.apellido !== '' 
      // && state.datosUsuario.correo !== '' && state.datosUsuario.confirmarCorreo !== '' 
      // && state.datosUsuario.password !== '' && state.datosUsuario.confirmarPassword !== '')
      // {
      //   state.errorFase2 = false
      // }
      // else{
      //   state.errorFase2 = true
      // }
      // console.log(state.errorFase2)
      // return errorFase2;
      // }
    },
    mutations: {
      increment(state) {
        state.counter++
      },
      abrirRegistro(state) {
        state.dialog = !state.dialog;
      },
      elegirRegistro(state, tipoUser){
        state.tipoUsuarioR = tipoUser;
        state.faseFormulario++; 
      },
      siguienteFormulario(state){
        if(state.datosUsuario.nombre !== '' && state.datosUsuario.tipo !== '' && state.datosUsuario.apellido !== '' 
        && state.datosUsuario.correo !== '' && state.datosUsuario.confirmarCorreo !== '' 
        && state.datosUsuario.password !== '' && state.datosUsuario.confirmarPassword !== '')
        state.faseFormulario++;
        else{
          alert("Necesita llenar todos los campos")
        }
      },
      atrasFormulario(state){
        // alert(state.faseFormulario)
        //state.faseFormulario= state.faseFormulario > 1 ? state.faseFormulario = state.faseFormulario - 1 : 1
        if(state.faseFormulario === 2)
        {
          state.faseFormulario--;
          state.tipoUsuarioR='';
        }else if(state.faseFormulario === 3){
          state.faseFormulario--;
        }
      },

      //VALIDACION
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    }
  })
}

export default createStore
