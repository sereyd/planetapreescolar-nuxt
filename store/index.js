import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      test:'prueba store con state 1'

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
