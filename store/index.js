import Vuex from "vuex";
// var correoglobal=""
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      pubActive: {},
        ///// manoejo de alertas
        mensajealerta:"",
        staleras:false,
        tpalert:'red',

      itemsmenu: [
        { title: "Inicio", icon: "mdi-home", link: "/", visible: true },
        {
          title: "Actividades",
          icon: "mdi-human",
          link: "/actividades",
          visible: false
        },
        {
          title: "Foro",
          icon: "mdi-forum",
          link: "",
          link: "/foro",
          visible: false
        },
        {
          title: "Tienda",
          icon: "mdi-tag",
          link: "",
          link: "/tienda",
          visible: true
        },
        {
          title: "Mis Grupos",
          icon: "mdi-account-multiple",
          link: "/grupos",
          logeado: true,
          permisos: 0,
          visible: true
        },
        {
          title: "Directorio",
          icon: "mdi-book-multiple",
          link: "/directorio",
          visible: false
        },
        {
          title: "Calendario",
          icon: "mdi-calendar",
          link: "/calendario",
          visible: false
        },
        {
          title: "Cuenta",
          icon: "mdi-account",
          link: "perfil",
          logeado: true,
          permisos: 0,
          visible: false
        },
        {
          title: "Mis Memorias",
          icon: "mdi-table-edit",
          link: "memorias",
          logeado: true,
          permisos: 1,
          visible: false
        },
        {
          title: "Publicaciones",
          icon: "mdi-account",
          link: "/publicaciones",
          logeado: true,
          permisos: 1,
          visible: true
        },
        {
          title: "Administrador",
          icon: "mdi-speedometer",
          link: "administrador",
          logeado: true,
          permisos: 2,
          visible: true
        } /*
        {
          title: "Checkout",
          icon: "mdi-speedometer",
          link: "checkout",
          logeado: true,
          permisos: 0
        },*/,
        {
          title: "Salir",
          icon: "mdi-exit-to-app",
          link: "exit",
          logeado: true,
          permisos: 0,
          visible: false,
        
        }
      ],
      datosUsuario: {
        tipo: null,
        nombre: "",
        apellido: "",
        urlImagen: "",
        userlogin: false,
        lvluser: 0,
        grupo: {
          materias: []
          // alumnos:[],
        },
        idMembresia: "",
        vercorreo: false
      },
      connection: {},
      imgupload: "",
      urlimg: "",
      stripeObj: null,
      linktienda: "https://tiendasereyd.ml",

      vistaValida: true,
      grupo: {},
      clasesCreadas: [],

      //DATA PARA BUSQUEDA
      datosBusqueda: {
        clave: "dia",
        tipo: ""
      },
      recursosBusqueda: [],
      recursos: ["BLOG", "MEMORIA", "RECOMENDACION", "REFLEXIONES"],

      //DATA PARA CARGA DE RECURSOS
      listaRecursos: {
        memorias: [],
        blog: [],
        reflexiones: [],
        recomendacion: []
      }
    }),
    actions: {
      async loginStore(context, data) {
        context.commit("cambiastatusSesion", data);
      },

      actualizarGrupos(context, data) {
        context.state.grupo = data;
      },
      actualizarAlumnos(context, data) {
        context.state.datosUsuario.alumnos = data;
      },
      async autenticarUsuario(context) {
        console.log("Verificando si hay sesion abierta");

        context.commit("compruebaConexion", "usuarios");
        setTimeout(() => {
          console.log(context.state.connection);
        }, 2000);
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
        await this.$fireAuth.onAuthStateChanged(user => {
          console.log(user);
          if (user) {
            const usuarioQuery = this.$fireStore
              .collection("usuarios")
              .where("correo", "==", user.email);
            usuarioQuery
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  let data = doc.data();
                  // console.log(doc.data());
                  // console.log(doc.data);
                  // console.log(doc.data.grupos);
                  data.grupo = data.grupo ? data.grupo : {};
                  // console.log(grups);
                  // console.log(doc.id)
                  const datos = {
                    id: doc.id,
                    idMembresia: "",

                    // grupo:{},
                    ...data
                  };
                  console.log(datos);
                  context.commit("cambiastatusSesion", datos);
                });
              })
              .catch(function(error) {
                console.log("Error: ", error);
              });
          }
        });
        return true;
      },

      async obtenerRecursos(context) {
        context.state.recursosBusqueda = [];
        try {
          console.log(context.state.datosBusqueda);

          if (context.state.datosBusqueda.tipo === "Todos los recursos") {
            // console.log("obtener Todos los Recursos")
            context.state.recursos.map(async recu => {
              // console.log("santes de then")
              await this.$fireStore
                .collection(recu)
                .get()
                .then(data => {
                  // console.log("santes de foreach")

                  // console.log(data);
                  data.forEach(doc => {
                    context.state.recursosBusqueda.push(doc.data());
                    // console.log("context.state.recursosBusqueda")
                    // console.log(context.state.recursosBusqueda)
                    // alert("averrr")
                  });
                });
            });
          } else {
            await this.$fireStore
              .collection(context.state.datosBusqueda.tipo)
              .get()
              .then(data => {
                // console.log(data);
                data.forEach(doc => {
                  context.state.recursosBusqueda.push(doc.data());
                  // console.log("context.state.recursosBusqueda")
                  // console.log(context.state.recursosBusqueda)
                  // alert("averrr")
                });
              });
          }

          return context.state.recursosBusqueda;
        } catch (e) {
          console.log(e);
        }
      },
      obtenerTodosRecursos(context) {
        // console.log("obtenerRecursos")
        context.state.recursos.map(recu => {
          this.$fireStore
            .collection(recu)
            .get()
            .then(data => { 
              // console.log(data);
              data.forEach(doc => {
                context.state.recursosBusqueda.push(doc.data());
                // console.log("context.state.recursosBusqueda")
                // console.log(context.state.recursosBusqueda)
                // alert("averrr")
              });
            });
        });
      },
      async fotostorageAsync({state},ubi){
        console.log("entra al fotoStorage: " + state.imgupload);
        let urlimagen=""
        const file = state.imgupload;
        const metadata = {
          contentType: "image/jpeg"
        };

        //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
        if (file) {
          // console.log("entroo")
          try {
            //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
            let storageRef = this.$fireStorage.ref(ubi);
            await storageRef.child(file.name).put(file, metadata);
            //SE OBTIENE LA URL DE LA IMAGEN DE PERFIL Y SE AGREGA AL OBJETO DE USUARIO
            await storageRef
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                state.urlimg = url
                urlimagen=url
                ///// manda instruccion de foto en lo que tendra el link de la foto con la url de la imagen
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          urlimagen = state.urlimg === "none" ? "" : "none";
       state.urlimg  = urlimagen
          ///// manda instruccion de foto en lo que tendra el link de la foto en none
        }
        ///console.log("entra al fotoStorage: " + state.urlimg);
        //// limpia todos los datos 
        return urlimagen
        }
    },
    mutations: {
      cleanImgStore(state){
        state.imgupload="";
        state.urlimg="";
      },
      alertconfig(state,data){
        state.staleras=data.st
        state.tpalert=data.tp
        state.mensajealerta=data.mensaje
      },
      actualizarClasesCreadas(state, data) {
        state.clasesCreadas = [...state.clasesCreadas, data];
        console.log("clasesCreadas");
        console.log(state.clasesCreadas);
      },
      selectpub(state, pub) {
        state.pubActive = pub;
      },
      guardaDatosUsuarioStore(state, data) {
        state.datosUsuario = data;
      },
      guardarStripeObj(state, data) {
        state.stripeObj = data;
      },
      actualizaurlimg(state, data) {
        state.urlimg = data;
      },
      guardarVistaValida(state, data) {
        // alert("Cambnio"+ data)

        state.vistaValida = data;
        // alert("Cambnio"+ state.vistaValida)
      },
      async almacenarFotoStorage(state, ubi) {
        console.log("entra al fotoStorage: " + state.imgupload);
        let urlimagen=""
        const file = state.imgupload;
        const metadata = {
          contentType: "image/jpeg"
        };

        //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
        if (file) {
          // console.log("entroo")
          try {
            //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
            let storageRef = this.$fireStorage.ref(ubi);
            await storageRef.child(file.name).put(file, metadata);
            //SE OBTIENE LA URL DE LA IMAGEN DE PERFIL Y SE AGREGA AL OBJETO DE USUARIO
            await storageRef
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                state.urlimg = url
                urlimagen=url
                ///// manda instruccion de foto en lo que tendra el link de la foto con la url de la imagen
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          urlimagen = state.urlimg === "none" ? "" : "none";
       state.urlimg  = urlimagen
          ///// manda instruccion de foto en lo que tendra el link de la foto en none
        }
        ///console.log("entra al fotoStorage: " + state.urlimg);
        //// limpia todos los datos 
        return urlimagen
      },
      actualizaImgUpload(state, data) {
        state.imgupload = data;
      },
      cambiastatusSesion(state, data) {
        console.log(data);

        if (data.salida === true) {
          state.datosUsuario.userlogin = data.login;
          state.datosUsuario.lvluser = data.lvl;
          state.datosUsuario.nombre = "";
          state.datosUsuario.apellido = "";
          state.datosUsuario.correo = "";
        } else {
          state.datosUsuario = data;
        }
        console.log(state.datosUsuario);
      },
      async  tomaDatosActualizados(state){
        await this.$fireStore.collection('usuarios').where('id','==',state.datosUsuario.id).get()
        .then((data)=>{
         state.datosUsuario=data.docs[0].data()
        })
     },
      compruebaConexion(state, data) {
        console.log("Verificando conexion");
        console.log(data);

        if (data !== null) {
          this.$fireStore
            .collection(data)
            .get()
            .then(res => {
              state.connection = {
                [data]: {
                  empty: res.empty
                }
              };
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  });
};

export default createStore;
