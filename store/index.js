import Vuex from 'vuex'
// var correoglobal=""
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      datosUsuario:{
        tipo: null,
        nombre: '',
        apellido: '',
        correo: '',
        urlImagen:'',
        userlogin:false,
        lvluser:0

    },
    correo2: "",
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
        (v) => { correoglobal=v  
          return false  }
    ],
    correoReglas2: [
      v => (v === correoglobal) || 'El correo debe ser el mismo'
    ],
    passwordReglas: [
      v => !!v || 'contraseña es requerida',
      v => (v && v.length >= 8) || 'Contraseña debe ser 8 o más caracteres',
    ],
    errorFase2: true,
    errorFase3: true


    }),
    actions:{
      async loginStore (context, data){
        context.commit("cambiastatusSesion",data);
      },
    },
    mutations: {
  
      cambiastatusSesion(state,data){
        // state.datosUsuario.userlogin=data.login
        // state.datosUsuario.lvluser=data.lvl
        state.datosUsuario =  data;
      },
      
    }
  })
}

export default createStore
