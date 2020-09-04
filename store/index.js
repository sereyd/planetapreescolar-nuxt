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
      async autenticarUsuario(context){
        await this.$fireAuth.onAuthStateChanged( user => {
          if(user)
            {
              const productoQuery =  this.$fireStore.collection('usuarios').where("correo", "==", user.email);
              productoQuery.get()
              .then((querySnapshot) => {
                  querySnapshot.forEach( (doc) => {
                      context.commit("cambiastatusSesion",doc.data());
                  });
              })
              .catch(function(error) {
                  console.log("Error: ", error);
              });
              
            }
        });
        
      }
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
