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
        lvluser:0,
        grupos:[],
        vercorreo:false
      },
      connection:{},
      imgupload:"",
      urlimg:""

    }),
    actions:{
      async loginStore (context, data){
        context.commit("cambiastatusSesion",data);
      },
      actualizarGrupos(context, data){
        context.state.datosUsuario.grupos = data;
      },
      actualizarAlumnos(context, data){
        context.state.datosUsuario.alumnos = data;
      },
      async autenticarUsuario(context){

          console.log("Verificando si hay sesion abierta")
      
            context.commit("compruebaConexion",'usuarios')
            setTimeout(()=>{
              console.log(context.state.connection)
            },2000)
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
          console.log(user)
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
                      console.log(datos)
                      context.commit("cambiastatusSesion",datos);
                  });
              })
              .catch(function(error) {
                  console.log("Error: ", error);
              });
              
            }
        });
          return true
      }
    },
    mutations: {
 
      guardaDatosUsuarioStore(state,data){
        state.datosUsuario=data
      },
      actualizaurlimg(state,data){
        state.urlimg=data
      },
      async almacenarFotoStorage(state,ubi){
        console.log("entra al fotoStorage: "+ state.urlimg)

        const file =  state.imgupload;
        const metadata = {
          contentType: 'image/jpeg'
        };

        //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
        if(file){
          // console.log("entroo")
          try {
            //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
            let storageRef = this.$fireStorage.ref(ubi);
            await storageRef.child(file.name).put(file, metadata);
            //SE OBTIENE LA URL DE LA IMAGEN DE PERFIL Y SE AGREGA AL OBJETO DE USUARIO
            await storageRef.child(file.name).getDownloadURL()
            .then((url) =>{
                  state.urlimg=url     
                  ///// manda instruccion de foto en lo que tendra el link de la foto con la url de la imagen 
                }
            );
          } catch (error) {
            console.log(error)
          }
        }else{
          state.urlimg= state.urlimg === 'none' ? "" : "none"
          ///// manda instruccion de foto en lo que tendra el link de la foto en none
        }

        console.log("entra al fotoStorage: "+ state.urlimg)

      },
      actualizaImgUpload(state,data){
        state.imgupload=data
      },
      cambiastatusSesion(state,data){
        console.log(data)

        if(data.salida===true){
          state.datosUsuario.userlogin=data.login
          state.datosUsuario.lvluser=data.lvl
          state.datosUsuario.nombre = ""
          state.datosUsuario.apellido = ""
          state.datosUsuario.correo = ""
        }else{
          state.datosUsuario = data;
        }
        console.log(state.datosUsuario)

      },
    compruebaConexion(state,data){
      console.log("Verificando conexion")
      console.log(data)

        if(data!==null){
        
         this.$fireStore.collection(data).get()
          .then((res)=>{
            state.connection={
              [data]:{
              empty:res.empty
              }
            }
          })
          .catch((error)=>{
            console.log(error)
          })
        }
      }
    }
  })
}

export default createStore
