import Vuex from 'vuex'
// var correoglobal=""
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      pubActive:{},
      itemsmenu: [
        { title: "Inicio", icon: "mdi-home", link: "/",visible:true },
        { title: "Actividades", icon: "mdi-human", link: "actividades",visible:false },
        { title: "Foro", icon: "mdi-forum", link: "", link: "foro",visible:false },
        { title: "Tienda", icon: "mdi-tag", link: "", link: "tienda",visible:true },
        { title: "Mis Grupos", icon: "mdi-account-multiple", link: "grupos",  logeado: true,
        permisos: 0,visible:true },
        { title: "Directorio", icon: "mdi-book-multiple", link: "directorio",visible:false },
        { title: "Calendario", icon: "mdi-calendar", link: "calendario",visible:false },
        {
          title: "Cuenta",
          icon: "mdi-account",
          link: "perfil",
          logeado: true,
          permisos: 0,
          visible:false
        },
        {
          title: "Mis Memorias",
          icon: "mdi-table-edit",
          link: "memorias",
          logeado: true,
          permisos: 1,
          visible:false
          
        },
        { 
          title: "Administrador",
          icon: "mdi-speedometer",
          link: "administrador",
          logeado: true,
          permisos: 2,
          visible:true
        },/*
        {
          title: "Checkout",
          icon: "mdi-speedometer",
          link: "checkout",
          logeado: true,
          permisos: 0
        },*/
        { title: "Salir", 
          icon: "mdi-exit-to-app", 
          link: "exit", 
          logeado:true,
          permisos:0,
          visible:false
        },
      ],
      datosUsuario:
        {
          tipo: null,
          nombre: '',
          apellido: '',
          urlImagen:'',
          userlogin:false,
          lvluser:0,
          grupos:[],
          idMembresia:"",
          vercorreo:false
        },
      connection:{},
      imgupload:"",
      urlimg:"",
      stripeObj: null,
      linktienda:"https://tiendasereyd.ml",


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
                  let data = doc.data();
                  // console.log(doc.data());
                  // console.log(doc.data);
                  // console.log(doc.data.grupos);
                  data.grupos = data.grupos ? data.grupos : [];
                  // console.log(grups);
                    // console.log(doc.id)
                      const datos = {
                        id: doc.id,
                        idMembresia:"",

                        // grupos:[],
                        ...data
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
      selectpub(state,pub){
        state.pubActive=pub
      },  
      guardaDatosUsuarioStore(state,data){
        state.datosUsuario=data
      },
      guardarStripeObj(state, data){
        state.stripeObj = data
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
