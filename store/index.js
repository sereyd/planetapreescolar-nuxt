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
        //password: '',
        // celular: '2222222222',
        // experiencia: '2',
        // pais: 'Mexico',
        // cuidad: 'Puebla',
        urlImagen:'',
        userlogin:false,
        lvluser:0
      },


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
