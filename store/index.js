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
        lvluser:2,
        grupos:[],
      },


    }),
    actions:{
      async loginStore (context, data){
        context.commit("cambiastatusSesion",data);
      },
      actualizarGrupos(context, data){
        context.state.datosUsuario.grupos = data;
      },
      async autenticarUsuario(context){

        /*
          const usuarioAuth =  this.$fireStore.collection('usuarios').where("correo", "==", user.email).get();
              console.log(usuarioAuth.doc)
              this.datosUsuario = usuarioAuth.docs.map(doc=>{
                return {
                    id: doc.id, //SE LES AGREGA EL ID DEL USAURIO PARA REALIZAR LA BUSQUEDA POR SU ID
                    ...doc.data()
                    }
                });
        */
        await this.$fireAuth.onAuthStateChanged( user => {
          if(user)
            {
              const usuarioQuery =  this.$fireStore.collection('usuarios').where("correo", "==", user.email);
              usuarioQuery.get()
              .then((querySnapshot) => {
                  querySnapshot.forEach( (doc) => {
                    // console.log(doc.id)
                      const datos = {
                        id: doc.id,
                        // grupos:[],
                        ...doc.data()

                      }
                      // console.log(datos)
                      context.commit("cambiastatusSesion",datos);
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
