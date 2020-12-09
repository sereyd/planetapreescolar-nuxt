let observer
import Vuex from "vuex";
// import router from '@/router/index'
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
          visible: true
        },
        {
          title: "Foro",
          icon: "mdi-forum",
          link: "",
          link: "/foro",
          visible: true
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
          visible: true
        },
        {
          title: "Calendario",
          icon: "mdi-calendar",
          link: "/calendario",
          visible: true
        },
        {
          title: "Cuenta",
          icon: "mdi-account",
          link: "/perfil",
          logeado: true,
          permisos: 0,
          visible: false
        },
        {
          title: "Mis Memorias",
          icon: "mdi-table-edit",
          link: "/memorias",
          logeado: true,
          permisos: 1,
          visible: false
        },
        {
          title: "Mis publicaciones",
          icon: "mdi-folder-multiple",
          link: "/publicaciones",
          logeado: true,
          permisos: 1,
          visible: true
        },
        {
          title: "Administrador",
          icon: "mdi-speedometer",
          link: "/administrador",
          logeado: true,
          permisos: 2,
          visible: true
        },
        // {
        //   title: "Recursos",
        //   icon: "mdi-cloud",
        //   link: "/recursos",
        //   logeado: true,
        //   permisos: 2,
        //   visible: true
        // }, 
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
        estadoMembresia:"",
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
        clave: "",
        tipo: ""
      },
      recursosBusqueda: [],
      recursos: ["BLOG", "MEMORIA", "RECOMENDACION", "REFLEXIONES"],

      //DATA PARA CARGA DE RECURSOS
      listaRecursos:{
        memorias:[],
        blog:[],
        reflexiones:[],
        recomendacion:[],
      },
      ///  notificaciones
      itemsnotifi:[
        //{ icon:'mdi-alert', title: 'Alerta de Mensaje', link:"#" }
    ],

      /// menu flotante

      menufix:false,
      recursosFavoritos:[],

      //LINKS DE DOMINIO (PRODUCCION Y DESARROLLO)
      // dominio:"http://localhost:3000",
      dominio:"https://educadora.cf",

      //APIS DEVELOP Y PRODUCCION
      urlAPI: "https://stripe-checkout-api.herokuapp.com",
      // urlAPI: "http://localhost:4242",
      descargarFree: 1,
      // data para ver lista completa de post
      misPost:[],
      otrosPost:[],
    }),
    actions: {
      async loginStore(context, data) {
        context.commit("cambiastatusSesion", data);
      },
      scrollmenu({state}){

        if(window.scrollY>200){ 

          state.menufix=true 
          
        }else{ 
          state.menufix=false
      
          }
          console.log(state.menufix)
        },

      actualizarGrupos(context, data) {
        context.state.grupo = data;
      },
      actualizarAlumnos(context, data) {
        context.state.datosUsuario.alumnos = data;
      },
  async creaNotificacion({state},data){
    
    var idnot=state.datosUsuario.id

    if(data.user!==''){
      idnot=data.user
    }
      var addnotificacion= await this.$fireStore.collection('Notificaciones').doc(idnot).collection('notify').add({
        icon:data.icon, 
        title: data.text,
        link:data.link,
        date:new Date(),
        status:0
      })
  },    
  async tomanotificaciones({state}){
    let tomaNotifi=this.$fireStore.collection('Notificaciones').doc(state.datosUsuario.id).collection('notify').where('status','==',0)
    tomaNotifi.onSnapshot((data)=>{
      state.itemsnotifi=data.docs
    })
  },    
  async eliminarImagen(context,data){
        let nombreArchivo=data
        let dirsep=nombreArchivo.split("/")
        let dirsep2=dirsep[7].split('?')
        let respdir1=dirsep2[0].replace(/%2F/gi,'/')
        let respdir2=respdir1.replace(/%20/gi,' ')
        console.log(respdir2)
        let desertRef =  await this.$fireStorage.ref().child(respdir2);
        // Delete the file
       desertRef.delete().then(function() {
          console.log('imagen eliminada')
          return true;
        }).catch(function(error) {
          console.error('imagen no eliminada')
          return false;
        });
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
        await this.$fireAuth.onAuthStateChanged( user => {
          // console.log(user)
          if(user)
            {
              let datos = {};
              const usuarioQuery =  this.$fireStore.collection('usuarios').where("correo", "==", user.email);
              usuarioQuery.get()
              .then(async (querySnapshot) => {
                querySnapshot.forEach( async(doc) => {
                  let data = doc.data();
                  // console.log(doc.data());
                  // console.log(doc.data);
                  // console.log(doc.data.grupos);

                  //CREAR DATOS EN VACIO PARA EVITAR ERRORES EN LA VISTA
                  data.grupo = data.grupo ? data.grupo : {};
                  data.idMembresia = data.idMembresia ? data.idMembresia : "";
                  data.estadoMembresia = data.estadoMembresia ? data.estadoMembresia : "";
                  data.idCliente = data.idCliente ? data.idCliente : "";
                  data.idSuscripcion = data.idSuscripcion ? data.idSuscripcion : "";
                  

                  // console.log(grups);
                    // console.log(doc.id)
                       datos = {
                        id: doc.id,
                        // idMembresia:"",

                        // grupo:{},
                        ...data
                      }
                      // console.log(datos)
                      // context.commit("cambiastatusSesion",datos);
                  });

                  datos.estadoMembresia = datos.lvluser === 2 ? "active" : "";

                  //REVISAR ESTADO DE LA SUSCRIPCIÓN MIENTRAS NO SEA USUARIO ADMIN
                  if(datos.lvluser === 1)
                    await fetch(context.state.urlAPI+"/check-suscripcion?suscripcionId=" + datos.idSuscripcion)
                    .then((result)=>{
                      return result.json()
                    })
                    .then(async(suscripcion)=>{

                      // console.log(suscripcion)
                      if(suscripcion.error)
                      {

                        console.log(suscripcion)
                        console.log("SUSCRIPCION NO VÁLIDA")
                        datos.estadoMembresia = "canceled";
                        console.log(datos)
                  
                        const response = await fetch(context.state.urlAPI+"/obtenerFechaActual")
                        

                        const d = await response.json();
                        console.log(d)

                        if(!datos.descargasDia)
                        {
                          datos.descargasDia = 
                          {
                            disponibles: context.state.descargarFree,
                            usadas: [],
                            fecha: d.fecha
                          }
                        }
                        else if(d.fecha !== datos.descargasDia.fecha)
                        {
                          console.log("el dia cambiooooooo")
                          datos.descargasDia.disponibles= context.state.descargarFree,
                          datos.descargasDia.usadas = [];
                          datos.descargasDia.fecha = d.fecha;
                        }
                      }
                      else{

                        datos.estadoMembresia = suscripcion.status;
                      }

                    })
                    .catch((err)=>{
                      console.log('Error al verificar suscripción', err);
                    });

                  context.commit("cambiastatusSesion",datos);

              })
              .catch((error) =>{
                  console.log("Error: ", error);
              });
          }
        });
        return true;
      },

      changeRecursosFavoritos({state}, dato)
      {
        if(!state.datosUsuario.userlogin)
        {
          console.log("necesitas iniciar sesión")
          this.$router.push("/login");
        }
        else
        {

          const {idRecurso} = dato.key;
          // console.log(dato)
          // alert("antes")
          if(dato.estado === "add")
            dato.key.favoritos.push(state.datosUsuario.id);
          else
            dato.key.favoritos = dato.key.favoritos.filter( r => state.datosUsuario.id !== r)

          let recursoListo = {...dato.key};
          // console.log(recursoListo)

          recursoListo.idRecurso = "";

          let recursoRef = this.$fireStore.collection(dato.tipo).doc(idRecurso);
        
          //SE ACTUALIZA EN FIREBASE EL CAMPO DE FAVORITOS
          recursoRef.update(recursoListo)
          .then(() => {
            state.recursosFavoritos.push(recursoListo);
     
          })
          .catch((error) => {
              console.error("ErroR al agregar nuevo comentario: ", error);
          });
        }

        // console.log(dato)


        
      },

      async obtenerRecursos(context) {
        context.state.recursosBusqueda = [];
        let datos = {};
        try {
          // console.log(context.state.datosBusqueda);

          if (context.state.datosBusqueda.tipo === "todos") {
            console.log(context.state.datosBusqueda.tipo)
            await this.$fireStore
              .collection("CATEGORIAS")
              .get()
              .then(data => {
                console.log(data);
                data.forEach(doc => {
                  let data = doc.data();
                    //CREAR DATOS EN VACIO PARA EVITAR ERRORES EN LA VISTA
                  data.tags = data.tags ? data.tags : [];
                  data.favoritos = data.favoritos ? data.favoritos : [];


                  datos = {
                    idRecurso: doc.id,
                    ...data
                  }
                  context.state.recursosBusqueda.push(datos);
                  
                });
              });

            // // console.log("obtener Todos los Recursos")
            // context.state.recursos.map(async (recu) => {
            //   // console.log("santes de then")
            //   await this.$fireStore
            //     .collection(recu)
            //     .get()
            //     .then(data => {
            //       // console.log("santes de foreach")

            //       // console.log(data);
            //       data.forEach(doc => {
            //         let data = doc.data();
            //         //CREAR DATOS EN VACIO PARA EVITAR ERRORES EN LA VISTA
            //         data.tags = data.tags ? data.tags : [];
            //         data.favoritos = data.favoritos ? data.favoritos : [];
            //         delete data['idRecurso'];

            //         datos = {
            //           idRecurso: doc.id,
            //           ...data
            //         }
            //         context.state.recursosBusqueda.push(datos);
            //         // console.log("context.state.recursosBusqueda")
            //         // console.log(context.state.recursosBusqueda)
            //         // alert("averrr")
            //       });
            //       // console.log("context.state.recursosBusqueda")
            //       // console.log(context.state.recursosBusqueda)
            //     });
            // });
          // return context.state.recursosBusqueda;

          } else {
            // context.state.datosBusqueda.tipo
            console.log(context.state.datosBusqueda.tipo)
            await this.$fireStore
              .collection("CATEGORIAS")
              .where('tipo','==',context.state.datosBusqueda.tipo)
              .get()
              .then(data => {
                console.log(data);
                data.forEach(doc => {
                  let data = doc.data();
                    //CREAR DATOS EN VACIO PARA EVITAR ERRORES EN LA VISTA
                  data.tags = data.tags ? data.tags : [];
                  data.favoritos = data.favoritos ? data.favoritos : [];


                  datos = {
                    idRecurso: doc.id,
                    ...data
                  }
                  context.state.recursosBusqueda.push(datos);
                  // console.log("context.state.recursosBusqueda")
                  // console.log(context.state.recursosBusqueda)
                  // alert("averrr")
                });
              });
              // console.log("context.state.recursosBusqueda")
              // console.log(context.state.recursosBusqueda)
          // return context.state.recursosBusqueda;

          }

          // return context.state.recursosBusqueda;
        } catch (e) {
          console.log(e);
        }
        return context.state.recursosBusqueda;
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
        console.log("entra al fotoStorage fotostorageAsyng: " + state.imgupload);
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
        cerrarconexion(){
          console.log('action close conexion')
          observer()
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
        console.log("entra al fotoStorage almacenarFotoStorage: " + state.imgupload);
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
      cambiastatusSesion(state,data){
        console.log(data)

        if(data.salida===true){
          state.datosUsuario.userlogin=data.login
          state.datosUsuario.lvluser=data.lvl
          state.datosUsuario.nombre = ""
          state.datosUsuario.apellido = ""
          state.datosUsuario.correo = ""
          state.datosUsuario.id = ""

          state.datosUsuario.grupo =  {};
          state.datosUsuario.idMembresia = "";
          state.datosUsuario.estadoMembresia = "";
          state.datosUsuario.idCliente = "";
          state.datosUsuario.idSuscripcion = "";
          state.datosUsuario.importeSuscripcion = "";
          state.datosUsuario.tipoSuscripcion = "";
        }else{
          state.datosUsuario = data;
        }
        console.log(state.datosUsuario);
      },
      async  tomaDatosActualizados(state){
        await this.$fireStore.collection('usuarios').where('id','==',state.datosUsuario.id).get()
        .then((data)=>{
          console.log('update store con firebase')
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