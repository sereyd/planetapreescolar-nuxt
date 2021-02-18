let observer
import Vuex from "vuex";
import {addMonths} from 'date-fns';
import {fromUnixTime} from 'date-fns';
import {isPast} from 'date-fns';


// import router from '@/router/index'
// var correoglobal=""
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      estados:[
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Coahuila de Zaragoza',
        'Colima',
        'Ciudad de México',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Estado de Mexico',
        'Michoacan de Ocampo',
        'Morelos',
        'Nayarit',
        'Nuevo Leon',
        'Oaxaca',
        'Puebla',
        'Queretaro de Arteaga',
        'Quintana Roo',
        'San Luis Potosi',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz de Ignacio de la Llave',
        'Yucatan',
        'Zacatecas'],
      paises:[
        {pais:"Antártida",code:"672"},
        {pais:"Arabia Saudita",code:"966"},
        {pais:"Argelia",code:"213"},
        {pais:"Argentina",code:"54"},
        {pais:"Armenia",code:"374"},
        {pais:"Aruba",code:"297"},
        {pais:"Australia",code:"61"},
        {pais:"Austria",code:"43"},
        {pais:"Azerbaiyán",code:"994"},
        {pais:"Bahamas",code:"1"},
        {pais:"Bahréin",code:"973"},
        {pais:"Bangladesh",code:"880"},
        {pais:"Barbados",code:"1"},
        {pais:"Bélgica",code:"32"},
        {pais:"Belice",code:"501"},
        {pais:"Benín",code:"229"},
        {pais:"Bermudas",code:"1"},
        {pais:"Bielorrusia",code:"375"},
        {pais:"Birmania (Myanmar)",code:"95"},
        {pais:"Bolivia",code:"591"},
        {pais:"Bosnia-Herzegovina",code:"387"},
        {pais:"Botsuana",code:"267"},
        {pais:"Brasil",code:"55"},
        {pais:"Brunéi",code:"673"},
        {pais:"Bulgaria",code:"359"},
        {pais:"Burkina Faso",code:"226"},
        {pais:"Burundi",code:"257"},
        {pais:"Bután",code:"975"},
        {pais:"Cabo Verde",code:"238"},
        {pais:"Camboya",code:"855"},
        {pais:"Camerún",code:"237"},
        {pais:"Canadá",code:"1"},
        {pais:"Chile",code:"56"},
        {pais:"China",code:"86"},
        {pais:"Chipre",code:"357"},
        {pais:"Colombia",code:"57"},
        {pais:"Comoras",code:"269"},
        {pais:"Corea del Norte",code:"850"},
        {pais:"Corea del Sur",code:"82"},
        {pais:"Costa de Marfil",code:"225"},
        {pais:"Costa Rica",code:"506"},
        {pais:"Croacia",code:"385"},
        {pais:"Cuba",code:"53"},
        {pais:"Curazao",code:"599"},
        {pais:"Dinamarca",code:"45"},
        {pais:"Djibuti",code:"253"},
        {pais:"Dominica",code:"1"},
        {pais:"Ecuador",code:"593"},
        {pais:"Egipto",code:"20"},
        {pais:"El Sáhara Español",code:"212"},
        {pais:"El Salvador",code:"503"},
        {pais:"El Vaticano",code:"39"},
        {pais:"Emiratos Árabes Unidos",code:"971"},
        {pais:"Eritrea",code:"291"},
        {pais:"Eslovaquia",code:"421"},
        {pais:"Eslovenia",code:"386"},
        {pais:"España",code:"34"},
        {pais:"Estados Unidos",code:"1"},
        {pais:"Estonia",code:"372"},
        {pais:"Etiopía",code:"251"},
        {pais:"Filipinas",code:"63"},
        {pais:"Finlandia",code:"358"},
        {pais:"Fiyi",code:"679"},
        {pais:"Francia",code:"33"},
        {pais:"Gabón",code:"241"},
        {pais:"Gambia",code:"220"},
        {pais:"Georgia",code:"995"},
        {pais:"Ghana",code:"233"},
        {pais:"Gibraltar",code:"350"},
        {pais:"Grecia",code:"30"},
        {pais:"Groenlandia",code:"299"},
        {pais:"Guadalupe",code:"590"},
        {pais:"Guam",code:"+1 671"},
        {pais:"Guatemala",code:"502"},
        {pais:"Guinea",code:"224"},
        {pais:"Guinea Ecuatorial",code:"240"},
        {pais:"Guinea-Bissáu",code:"245"},
        {pais:"Guyana",code:"592"},
        {pais:"Haití",code:"509"},
        {pais:"Holanda",code:"31"},
        {pais:"Honduras",code:"504"},
        {pais:"Hong Kong",code:"852"},
        {pais:"Hungría",code:"36"},
        {pais:"India",code:"91"},
        {pais:"Indonesia",code:"62"},
        {pais:"Irak",code:"964"},
        {pais:"Irán",code:"98"},
        {pais:"Irlanda",code:"353"},
        {pais:"Isla de Man",code:"44"},
        {pais:"Isla Norfolk",code:"672"},
        {pais:"Islandia",code:"354"},
        {pais:"Islas Caimán",code:"-344"},
        {pais:"Islas Cook",code:"682"},
        {pais:"Islas Feroe",code:"298"},
        {pais:"Islas Malvinas",code:"500"},
        {pais:"Islas Marianas del Norte",code:"+1 670"},
        {pais:"Islas Marshall",code:"692"},
        {pais:"Islas Pitcairn",code:"870"},
        {pais:"Islas Salomón",code:"677"},
        {pais:"Islas Vírgenes Británicas",code:"+1 284"},
        {pais:"Israel",code:"972"},
        {pais:"Italia",code:"39"},
        {pais:"Jamaica",code:"1"},
        {pais:"Japón",code:"81"},
        {pais:"Jordania",code:"962"},
        {pais:"Kazajistán",code:"7"},
        {pais:"Kenia",code:"254"},
        {pais:"Kirgizistán",code:"996"},
        {pais:"Kiribati",code:"686"},
        {pais:"Kosovo",code:"381"},
        {pais:"Kuwait",code:"965"},
        {pais:"Laos",code:"856"},
        {pais:"Lesoto",code:"266"},
        {pais:"Letonia",code:"371"},
        {pais:"Líbano",code:"961"},
        {pais:"Liberia",code:"231"},
        {pais:"Libia",code:"218"},
        {pais:"Liechtenstein",code:"423"},
        {pais:"Lituania",code:"370"},
        {pais:"Luxemburgo",code:"352"},
        {pais:"Macao",code:"853"},
        {pais:"Macedonia",code:"389"},
        {pais:"Madagascar",code:"261"},
        {pais:"Malasia",code:"60"},
        {pais:"Malaui",code:"265"},
        {pais:"Maldivas",code:"960"},
        {pais:"Mali",code:"223"},
        {pais:"Malta",code:"356"},
        {pais:"Marruecos",code:"212"},
        {pais:"Mauricio",code:"230"},
        {pais:"Mauritania",code:"222"},
        {pais:"México",code:"52"},
        {pais:"Micronesia",code:"691"},
        {pais:"Moldavia",code:"373"},
        {pais:"Mónaco",code:"377"},
        {pais:"Mongolia",code:"976"},
        {pais:"Montenegro",code:"382"},
        {pais:"Montserrat",code:"+1 664"},
        {pais:"Mozambique",code:"258"},
        {pais:"Namibia",code:"264"},
        {pais:"Nauru",code:"674"},
        {pais:"Nepal",code:"977"},
        {pais:"Nicaragua",code:"505"},
        {pais:"Níger",code:"227"},
        {pais:"Nigeria",code:"234"},
        {pais:"Niue",code:"683"},
        {pais:"Noruega",code:"47"},
        {pais:"Nueva Caledonia",code:"687"},
        {pais:"Nueva Zelanda",code:"64"},
        {pais:"Omán",code:"968"},
        {pais:"Pakistán",code:"92"},
        {pais:"Palau",code:"680"},
        {pais:"Panamá",code:"507"},
        {pais:"Papúa Nueva Guinea",code:"675"},
        {pais:"Paraguay",code:"595"},
        {pais:"Perú",code:"51"},
        {pais:"Polinesia Francesa",code:"689"},
        {pais:"Polonia",code:"48"},
        {pais:"Portugal",code:"351"},
        {pais:"Puerto Rico",code:"1"},
        {pais:"Qatar",code:"974"},
        {pais:"Reino Unido",code:"44"},
        {pais:"República Centroafricana",code:"236"},
        {pais:"República Checa",code:"420"},
        {pais:"República de Sudán del Sur",code:"211"},
        {pais:"República del Congo",code:"242"},
        {pais:"República Democrática del Congo",code:"243"},
        {pais:"República Dominicana",code:"1"},
        {pais:"Reunión",code:"262"},
        {pais:"Ruanda",code:"250"},
        {pais:"Rumanía",code:"40"},
        {pais:"Rusia",code:"7"},
        {pais:"Samoa",code:"685"},
        {pais:"Samoa Americana",code:"+1 684"},
        {pais:"San Bartolomé",code:"590"},
        {pais:"San Cristóbal y Nevis",code:"1"},
        {pais:"San Marino",code:"378"},
        {pais:"San Martín",code:"+1 599"},
        {pais:"San Pedro y Miquelón",code:"508"},
        {pais:"San Vicente y las Granadinas",code:"1"},
        {pais:"Santa Elena",code:"290"},
        {pais:"Santa Lucía",code:"1"},
        {pais:"Santo Tomé y Príncipe",code:"239"},
        {pais:"Senegal",code:"221"},
        {pais:"Serbia",code:"381"},
        {pais:"Seychelles",code:"248"},
        {pais:"Sierra Leona",code:"232"},
        {pais:"Singapur",code:"65"},
        {pais:"Siria",code:"963"},
        {pais:"Somalia",code:"252"},
        {pais:"Sri Lanka",code:"94"},
        {pais:"Sudáfrica",code:"27"},
        {pais:"Sudán",code:"249"},
        {pais:"Suecia",code:"46"},
        {pais:"Suiza",code:"41"},
        {pais:"Surinam",code:"597"},
        {pais:"Swazilandia",code:"268"},
        {pais:"Tailandia",code:"66"},
        {pais:"Taiwán",code:"886"},
        {pais:"Tanzania",code:"255"},
        {pais:"Tayikistán",code:"992"},
        {pais:"Timor Oriental",code:"670"},
        {pais:"Togo",code:"228"},
        {pais:"Tokelau",code:"690"},
        {pais:"Trinidad y Tobago",code:"1"},
        {pais:"Túnez",code:"216"},
        {pais:"Turkmenistán",code:"993"},
        {pais:"Turquía",code:"90"},
        {pais:"Tuvalu",code:"688"},
        {pais:"Ucrania",code:"380"},
        {pais:"Uganda",code:"256"},
        {pais:"Uruguay",code:"598"},
        {pais:"Uzbekistán",code:"998"},
        {pais:"Vanuatu",code:"678"},
        {pais:"Venezuela",code:"58"},
        {pais:"Vietnam",code:"84"},
        {pais:"Yemen",code:"967"},
        {pais:"Zambia",code:"260"},
        {pais:"Zimbabue",code:"263"}
      ],
      pubActive: {},
        ///// manoejo de alertas
        mensajealerta:"",
        staleras:false,
        tpalert:'red',
        screenprinf:false,

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
          visible: false
        },
        {
          title: "Mis Grupos",
          icon: "mdi-account-multiple",
          link: "/grupos",
          logeado: true,
          permisos: 0,
          visible: false
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
          permisos: 3,
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
        // idMembresia: "",
        estadoMembresia:"",
        descargas:{
          dia: {fecha:"", disponibles:1, usabas:[] },
          mes: {
            active: false, tipo:"",
            registro:[],
          }
        },
        vercorreo: false,
      },
      datosSuscripcion:{ status: false},
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
      // descargarFree: 8,
      // data para ver lista completa de post
      misPost:[],
      otrosPost:[],

      //DATA DE TODOS LOS RECURSOS
      categorias:[],
      categoriasblog:[{
        text:'Planeaciones',
        value:'planeaciones'
      },
      {
        text:'Escuelas',
        value:'escuelas'
      },
      {
        text:'Educación',
        value:'educacion'
      },
      {
        text:'Niños',
        value:'niños'
      }
      ],
      viewpost: false,
      viewothers: false,
      dialogPost: false,

      //DATA PARA DIRECTORIO
      directorios:[],

      ////foroseleccionado
      foroselect:{},
      
      //data para la configuracion de las descargas
      descargasConf:{
        free:0,
        mensual:0,
        trimestral:0,
        semestral:0,
        anual:0,
      },
      datosPago:{medio:""},


    }),
    actions: {
      async loginStore({commit}, data) {
        console.log('cambia en store')
        console.log(data)
        commit("cambiastatusSesion", data);
      },
      scrollmenu({state}){

        if(window.scrollY>200){ 

          state.menufix=true 
          
        }else{ 
          state.menufix=false
      
          }
          //console.log(state.menufix)
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

    var datos={
      dataComentario:{
          comentario:"",
          idUsuario:state.datosUsuario.id,
          nombreUsuario:state.datosUsuario.nombre+" "+state.datosUsuario.apellido,
          urlImagen:""
      },
      dataRecurso:{
          idCreador:"",
          idRecurso:"",
          nombreCreador:"",
          titulo:""
      },
      date:new Date(),
      icon:data.icon,
      link:data.link,
      status:0,
      title:data.text
    }


      await this.$fireStore.collection('Notificaciones').doc(idnot).collection('notify').add(datos)



  },
  async notificacionComentario({state},req){

    // console.log(req);

    await this.$fireStore.collection('Notificaciones').doc(req.dataRecurso.idCreador).collection('notify').add({
      icon:"mdi-comment", 
      title: "Comentario en Post",
      link:"",
      dataComentario: req.dataComentario,
      dataRecurso: req.dataRecurso,
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
        console.log(data)
        if(data !== "" || data !== "none")
        {

          let dirsep=nombreArchivo.split("/")
          let dirsep2=dirsep[7].split('?')
          let respdir1=dirsep2[0].replace(/%2F/gi,'/')
          let respdir2=respdir1.replace(/%20/gi,' ')
          //console.log(respdir2)
          let desertRef =  await this.$fireStorage.ref().child(respdir2);
          // Delete the file
         desertRef.delete().then(function() {
            //console.log('imagen eliminada')
            return true;
          }).catch(function(error) {
            console.error('imagen no eliminada')
            return false;
          });
        }
      },
      async autenticarUsuario(context) {
       // console.log("Verificando si hay sesion abierta");
        context.commit("compruebaConexion", "usuarios");
        setTimeout(() => {
       ////   console.log(context.state.connection);
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
      //  console.log("VERIFICANDO USUARIOOO...")
      
        await this.$fireAuth.onAuthStateChanged( user => {
          // console.log("USUARIO QUE SE ESTA VERIFICANDO:")
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
                  // data.idMembresia = data.idMembresia ? data.idMembresia : "";
                  data.estadoMembresia = data.estadoMembresia ? data.estadoMembresia : "";
                  data.idCliente = data.idCliente ? data.idCliente : "";
                  data.idSuscripcion = data.idSuscripcion ? data.idSuscripcion : "";
                  data.descargas = data.descargas ? data.descargas : {};
                  
                       datos = {
                        id: doc.id,
                        ...data
                      }
                });

                  datos.estadoMembresia = datos.lvluser >= 3 ? "active" : "";

                  //se busca el pago que coincida con el id del usuario y el id_externo
                  
                  context.commit("actualizarConfigDescargas")

                  
                  //REVISAR ESTADO DE LA SUSCRIPCIÓN MIENTRAS NO SEA USUARIO ADMIN
                  if(datos.lvluser === 2 || datos.lvluser === 1)
                  {

                    //OBTENER CONFIGURACION DE DESCARGAS
                    const response = await fetch(context.state.urlAPI+"/obtenerFechaActual")
                    const d = await response.json();

                    //DESCARGAS POR MES POR DEFECTO PARA EVITAR ERRORES
                    if(!datos.descargas.mes){
                      datos.descargas.mes = {
                        active: false, tipo:"", disponibles: 0,
                        registro: [] ,
                      };
                    }

                    //DESCARGA DIARIA GRATIS POR DEFECTO
                    if(!datos.descargas.dia)
                    {
                      datos.descargas.dia = {
                        disponibles: context.state.descargasConf.free,
                        usadas: [],
                        fecha: d.fecha,
                      }
                    }

                    //SI LA FECHA CAMBIA SE RESETEA EL CAMPO PARA OBTENER UNA DESCARGA NUEVA
                    else if(d.fecha !== datos.descargas.dia.fecha)
                    {
                      ///console.log("el dia cambiooooooo")
                      datos.descargas.dia.disponibles= context.state.descargasConf.free,
                      datos.descargas.dia.usadas = [];
                      datos.descargas.dia.fecha = d.fecha;
                    }
                    // context.commit("actualizarConfigDescargas")
                    let dp= {};


                    //ontenermos los datos del pago
                    console.log("dp")
                      console.log(dp)
                    const pagoQuery =  this.$fireStore.collection('pagos')
                    .where("iduser", "==", datos.id)
                    .where("external_reference", "==", datos.idSuscripcion);
                    pagoQuery.get()
                    .then( (querySnapshot) => {
                      console.log("dp")
                      console.log(dp)
                      querySnapshot.forEach( (doc) => {
                        let data = doc.data();
                        dp = {
                          id: doc.id,
                          ...data
                        }
                      });
                      console.log("dp")
                      console.log(Object.keys(dp).length)
                      if(Object.keys(dp).length === 0)
                      {
                        context.state.datosPago.medio="";
                        context.state.datosPago.collector_id=0;

                      }
                      else
                        context.state.datosPago = dp;

                      console.log("AQUI DENTRO DEL EXTENRL")

                      console.log("this.datosPago")
                      console.log("this.datosPago")
                      console.log(context.state.datosPago)
                    
                      //PAGO POR STRIPE
                      console.log("this.datosPago");
                      console.log(context.state.datosPago);

                      

                      if(context.state.datosPago.medio === "Stripe")
                      {

                        const {id} = context.state.datosPago

                        fetch(context.state.urlAPI+"/check-suscripcion?suscripcionId=" + id)
                        .then((result)=>{
                          return result.json()
                        })
                        .then(async(suscripcion)=>{
                          // console.log(suscripcion);


                          context.commit("cambiastatusSesion",datos);

                          //SE REVISA EL ESTADO DE LA SUSCRIPCIÓN
                          if(suscripcion.error)
                          {
                            datos.estadoMembresia = "canceled";
                            context.state.datosSuscripcion.status = false;
                            datos.descargas.mes.active = false;
                          }
                          else{
                            datos.estadoMembresia = suscripcion.status;
                            
                            if(suscripcion.status === "active")
                            {
                              context.state.datosSuscripcion.status = true;
                              datos.lvluser = 2;
                              console.log("SI TIENE MEMBRESIA PREMIUM")
                              context.commit("updateDescargasPre", suscripcion);
                            }
                          }

                          

                        })
                        .catch((err)=>{
                          console.log('Error al verificar suscripción', err);
                        });
                      }
                      
                      else if(context.state.datosPago.medio === "MercadoPago")
                      {

                        //REVISA MEMBRESIA EN CASO DE PAGO CON MERCAPAGO
                        
                          const config = {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({idPago: context.state.datosPago.id})
                          }
                          fetch(context.state.urlAPI+"/estado-pago",config)
                          .then((result)=>{
                            return result.json()
                          })
                          .then(async(suscripcion)=>{

                            let data = suscripcion.response;
                            console.log(suscripcion);
                            console.log(data);

                            //DESCARGAS POR MES POR DEFECTO PARA EVITAR ERRORES
                            if(!datos.descargas.mes){
                              datos.descargas.mes = {
                                active: false, tipo:"", disponibles: 0,
                                registro: [] ,
                              };
                            }
                          // console.log(datos.descargas)

                          context.commit("cambiastatusSesion",datos);


                            //SE REVISA EL ESTADO DE LA SUSCRIPCIÓN
                            if(suscripcion.error)
                            {
                              datos.estadoMembresia = "canceled";
                              context.state.datosSuscripcion.status = false;
                              datos.descargas.mes.active = false;

                            }
                            else{

                              //CONVIERTE FORMATOS DE FECHA A UNIXTIME PARA MANEJARLOS CON DATE-FNS

                              let fechaInicio = parseInt((new Date(data.date_approved).valueOf() / 1000).toFixed(0))
                              // console.log(fechaInicio)

                              const interval_count = data.transaction_amount === 490 ? 1 :
                                data.transaction_amount === 1290 ? 3 :
                                data.transaction_amount === 2190 ? 6 : 12;

                              let fechaFin = addMonths(new Date(data.date_approved), interval_count);
                              fechaFin = parseInt((new Date(fechaFin).valueOf() / 1000).toFixed(0))

                              data.fechaInicio = fechaInicio;
                              data.fechaFin = fechaFin;
                              data.interval_count = interval_count;

                              
                              // const ff = fromUnixTime(1577944800);
                              const ff = fromUnixTime(fechaFin);
                              const esVencida = isPast(ff)
                              console.log(data)
                              console.log(esVencida)

                              if( (data.status === "approved" || data.status === "accredited") && !esVencida )
                              {
                                datos.estadoMembresia = "active";
                                datos.lvluser = 2;
                                console.log("SI TIENE MEMBRESIA PREMIUM")
                                // console.log(datos)
                                context.commit("updateDescargasPreMP", data);
                              }
                              else if(data.status === "pending" )
                              {
                                console.log("pago pendiente")
                                const {external_resource_url} = data.transaction_details
                                datos.estadoMembresia = "canceled";
                                context.state.datosSuscripcion.status = false;
                                context.state.datosSuscripcion.external_resource_url = external_resource_url;
                                context.state.datosSuscripcion.date_of_expiration = data.date_of_expiration;
                              }
                              else
                              {
                                console.log("AQUII")
                                datos.estadoMembresia = "canceled";
                                context.state.datosSuscripcion.status = false;
                              }
                            }
    
                          })
                          .catch((err)=>{
                            console.log('Error al verificar suscripción', err);
                          });
                      }
                      else{
                        //SUSCRIPCION TERMINADA
                        datos.estadoMembresia = "canceled";
                        context.state.datosSuscripcion.status = false;
                        datos.descargas.mes.active = false;
                        datos.lvluser = 1
                      }

                    })
                    


                    
                  
                  }
                  else if(datos.lvluser >= 3)
                  {
                    // console.log("antes de config des")
                    // context.commit("actualizarConfigDescargas")
              //context.dispatch( "actualizarCategorias('cat')" );
              //
                    // console.log("des´pues de config des")
                    datos.descargas.mes = {
                      active: true, tipo:"", disponibles: 3000,
                      registro: [] ,
                    };
                    datos.descargas.dia = {
                      disponibles: -2,
                      usadas: [],
                    }

            //         context.state.datosUsuario.descargas.dia.disponibles= -5;
            // context.state.datosUsuario.descargas.dia.usadas = [];
                  }
                  
                  context.commit("cambiastatusSesion",datos);

              })
              .catch((error) =>{
                  console.log("Error: ", error);
              });
          }
          else 
          {
            console.log("NO HAY USUARIO, ES LVLUSER 0")
            context.state.datosUsuario.descargas.dia.disponibles= -5;
            context.state.datosUsuario.descargas.dia.usadas = [];

            // datos.descargasDia.fecha = d.fecha;
          }
        });
        return true;
      },

      //OBTENER DATOS DE CONFIGURACION DE DESCARGAS
    //   async cargaConfiguracionDescargas({commit}){
    //     let datos= {};
    //     console.log("OBTENIENDO DATA")

    //     await this.$fireStore
    //     .collection("confDescargas")
    //     .get()
    //     .then(data => {
    //      console.log(data);
    //       data.forEach(doc => {
    //         let dat = doc.data();
    //         datos = {
    //           idConfig: doc.id,
    //           ...dat
    //         }
    //       });

    //       commit("actualizarConfigDescargas",datos);
    //       console.log(datos)
    //       // this.editDescargasConf = datos;
    //       // console.log(this.descargasConf)
    //       // this.dialogDes = true;

    //     });

    // },

      //DE STRIPE
      obtenerDatosSuscripcion({state}, idSuscripcion){
        fetch(state.urlAPI+"/check-suscripcion?suscripcionId=" + idSuscripcion)
          .then((result)=>{
            return result.json()
          })
          .then(async(suscripcion)=>{

            // console.log(suscripcion)
            if(suscripcion.error)
            {
              // datos.estadoMembresia = "canceled";
              state.datosSuscripcion.status = false;

            }
            else{
              // datos.estadoMembresia = suscripcion.status;
              let sus = {
                status: true,
                pasarela: "stripe",
                plan:{
                  interval_count: suscripcion.plan.interval_count,
                  interval: suscripcion.plan.interval,
                  amount: suscripcion.plan.amount,
                  active: suscripcion.plan.active,
                  fechaFin: suscripcion.current_period_end,
                  fechaInicio: suscripcion.current_period_start,
                }
              }
              state.datosSuscripcion = sus;
              // state.datosSuscripcion.status = true;
              // state.datosSuscripcion.pasarela = "stripe"
              // state.datosSuscripcion.plan.current_period_end = state.datosSuscripcion.plan.current_period_end

            }

          })
          .catch((err)=>{
            console.log('Error al verificar suscripción', err);
          });
      },

      

      changeRecursosFavoritos({state}, dato)
      {
        if(!state.datosUsuario.userlogin)
        {
          ///console.log("necesitas iniciar sesión")
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
        // context.state.recursosBusqueda = [];
        try {
          // console.log(context.state.datosBusqueda);
          let datos = {};
          let cat = [];
          if(context.state.categorias.length === 0)
          {

            await this.$fireStore
            .collection("CATEGORIAS")
            .get()
            .then(data => {
              ///console.log(data);
              data.forEach(doc => {
                let data = doc.data();
                  //CREAR DATOS EN VACIO PARA EVITAR ERRORES EN LA VISTA
                data.tags = data.tags ? data.tags : [];
                data.favoritos = data.favoritos ? data.favoritos : [];
                data.sinopsis= data.sinopsis ? data.sinopsis : "";

                if(data.tipo !== "blog" || data.tipo !== "reflexion" || data.tipo !== "memoria")
                  data.premium =  typeof(data.premium) === "undefined" ? false : data.premium

                datos = {
                  idRecurso: doc.id,
                  ...data
                }
                cat.push(datos);
                
              });
              context.dispatch( "actualizarCategorias('cat')" );

            });

          }
          else{
            console.log("BUSCAR DE STORE")

          }


        } catch (e) {
          console.log(e);
        }
        // return [...context.state.categorias];
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

      //CARGA DE POST POR TIPO DE POST PARA LA VISTA DE VER MAS
      async  cargaBasePost({state,commit},tipoPost){
        let postG = [];

        if(state.categorias.length === 0)
        {
          // console.log("BUSCAR DE FIREBASE")
          try {
            await this.$fireStore
              .collection("CATEGORIAS").orderBy("fecha", "desc")
              .get()
              .then((data) => {
                data.forEach((doc) => {
                  let data = doc.data();
                  data.tags = data.tags ? data.tags : [];
                  data.favoritos = data.favoritos ? data.favoritos : [];
                  data.sinopsis= data.sinopsis ? data.sinopsis : "";

                  if(data.tipo !== "blog" || data.tipo !== "reflexion" || data.tipo !== "memoria")
                    data.premium =  typeof(data.premium) === "undefined" ? false : data.premium

                  delete data['idRecurso'];


                  const datos = {
                      idRecurso: doc.id,
                      ...data
                  }
                  postG.push(datos);

                });
                state.categorias = postG;
                commit("updateVerMas",tipoPost);
                
              });
          } catch (e) {
            console.log(e);
          }
        }else{
          // console.log("BUSCAR DE STORE")
          commit("updateVerMas",tipoPost);


        }
    },
    updateCategoriasInicio(postG, tipoPost){
      // console.log(postG);
      if(tipoPost === "actividades")
      {
        state.misPost = postG.filter( 
          post  => (post.tipo === "planeacion" && (post.recomendado === true && post.edopost === "publico" || (post.edopost === "privado" && post.idCreador === state.datosUsuario.id)))
        )

        state.otrosPost = postG.filter( 
          post  => 
            ( post.tipo === "recurso" && (post.recomendado === true && post.edopost === "publico" || (post.edopost === "privado" && post.idCreador === state.datosUsuario.id)) )
        )
      }
      else
      {

        state.misPost = postG.filter( 
          post  => (post.tipo === tipoPost && post.idCreador === state.datosUsuario.id)
        )

        state.otrosPost = postG.filter( 
          post  => 
            ( post.tipo === tipoPost && (post.idCreador !== state.datosUsuario.id && post.edopost !== "privado") )
        )
      }

      
    },
    listaAleatoria({state},data){
      let ran = 0;
      let postSeleccionados = 1;
      let contador = 1;
      let response= [];
      data.map(li => {

        ran = Math.floor(Math.random() * 2);

        if( ( data.length - contador ) <= 4)
          ran = 1;
        if(postSeleccionados <= 4)
          if(ran === 1 )
          {
            response.push(li);
            postSeleccionados++;
          }

        contador++;
      });

      return response;
    },

        cerrarconexion(){
          console.log('action close conexion')
          observer()
        }
    },



    mutations: {
      changeScreenPrint(state,edo){
        state.screenprinf=edo
      },
      foroseleccionado(state,data){
        state.foroselect=data
      },
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
      actualizarCategorias(state, payload){
        state.categorias = payload;
      },
      actualizarDirectorios(state, payload){
        state.directorios = payload;
      },
      agregarCategorias(state, payload){
        // console.log(payload)
        // console.log(state.categorias)
        // alert("state.categorias")
        state.categorias = [
          ...state.categorias,
          payload
        ];
        // console.log(state.categorias)
        // alert("state.categorias")
      },
      changeViewOthers(state, payload){
        state.viewothers = payload;
      },
      changeViewPost(state, payload){
        state.viewpost = payload;
      },
      changeDialogPost(state, payload){
        console.log("mosytrando post")
        state.dialogPost = payload;
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
          // console.log(file)
          try {
            //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
            let storageRef = this.$fireStorage.ref(ubi);
            await storageRef.child("portada-perfil").put(file, metadata);
            //SE OBTIENE LA URL DE LA IMAGEN DE PERFIL Y SE AGREGA AL OBJETO DE USUARIO
            await storageRef
              .child("portada-perfil")
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
        // console.log(data)

        if(data.salida===true){
          state.datosUsuario.userlogin=data.login
          state.datosUsuario.lvluser= 0
          state.datosUsuario.nombre = ""
          state.datosUsuario.apellido = ""
          state.datosUsuario.correo = ""
          state.datosUsuario.id = ""
          state.datosUsuario.grupo =  {};
          // state.datosUsuario.idMembresia = "";
          state.datosUsuario.estadoMembresia = "";
          state.datosUsuario.idCliente = "";
          state.datosUsuario.idSuscripcion = "";
          state.datosUsuario.importeSuscripcion = "";
          state.datosUsuario.tipoSuscripcion = "";
          console.log("AQUIIIII NO HAY USUARIO, ES LVLUSER 0")
          // state.datosUsuario.descargas.dia.disponibles= -5;
          // state.datosUsuario.descargas.dia.usadas = [];
          state.datosUsuario.descargas = {};
          state.datosUsuario.grupo = {};
          state.datosSuscripcion = {};
          
        }else{
          state.datosUsuario = data;
        }


        // console.log(state.datosUsuario);
      },
      async  tomaDatosActualizados(state){
        await this.$fireStore.collection('usuarios').where('id','==',state.datosUsuario.id).get()
        .then((data)=>{
          console.log('update store con firebase')
         state.datosUsuario=data.docs[0].data()
        })
     },

     

      async actualizarConfigDescargas(state, pay){
      // await this.$fireStore.collection('usuarios').where('id','==',state.datosUsuario.id).get()
      // .then((data)=>{
        // console.log(pay);
        if(!pay)
        {

          let datos= {};
          // console.log("OBTENIENDO DATA")
  
          await this.$fireStore
          .collection("confDescargas")
          .get()
          .then(data => {
          //  console.log(data);
            data.forEach(doc => {
              let dat = doc.data();
              datos = {
                idConfig: doc.id,
                ...dat
              }
            });
  
            // commit("actualizarConfigDescargas",datos);
            // console.log(datos)
            // console.log('update store con firebase')
            state.descargasConf = datos;
          });
        }
        else{
          state.descargasConf = pay;
        }

        
      },
      compruebaConexion(state, data) {
        // console.log("Verificando conexion");
        // console.log(data);

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
      },
      updateEditado(state, post){

        state.categorias.map( cat =>{
          if(post.idRecurso === cat.idRecurso)
            cat = post;
        })

      },

      updateDescargasPre(state, sus){
        // console.log(sus);
        let suscripcion = {
          status: true,
          pasarela: "stripe",
          plan:{
            interval_count: sus.plan.interval_count,
            interval: sus.plan.interval,
            amount: sus.plan.amount,
            active: sus.plan.active,
            fechaFin: sus.current_period_end,
            fechaInicio: sus.current_period_start,
          }
        }

        state.datosSuscripcion = suscripcion;
        // state.datosSuscripcion.pasarela = "stripe"
        // console.log("state.datosSuscripcion.plan.active")
        // console.log(state.datosSuscripcion.plan.active)
        // alert("mira datasus")

        
        // console.log(suscripcion.plan.active)
        // alert("mira suscripcion.plan.active")

        
        if( state.datosSuscripcion.plan.active)
        {
          const {interval, interval_count } =  state.datosSuscripcion.plan;
          // console.log(state.datosSuscripcion.plan);

          const {registro} =  state.datosUsuario.descargas.mes;
            
          state.datosUsuario.descargas={
            ...state.datosUsuario.descargas,
            // dia: {fecha:"", disponibles:1, usabas:[] },
            mes: {
              active: true, tipo:"", disponibles: 0,
              registro: registro.length === 0 ? [] : registro,
            }
          }
          
          
          console.log(state.descargasConf);
          // console.log("interval");
          // console.log(interval);
          // console.log("interval_count");
          // console.log(interval_count);

          
          if( interval === "month" &&  interval_count === 1)
          {
            state.datosUsuario.descargas.mes.tipo = "mensual";
            state.datosSuscripcion.plan.tipoSuscripcion = "mensual";
            state.datosUsuario.descargas.mes.disponibles = state.descargasConf.mensual;
          }
          else if( interval === "month" &&  interval_count === 3)
          {
            state.datosUsuario.descargas.mes.tipo = "trimestral";
            state.datosSuscripcion.plan.tipoSuscripcion = "trimestral";
            state.datosUsuario.descargas.mes.disponibles = state.descargasConf.trimestral;
          }
          else if(interval === "month" &&  interval_count === 6)
          {
            state.datosUsuario.descargas.mes.tipo = "semestral";
            state.datosSuscripcion.plan.tipoSuscripcion = "semestral";
            state.datosUsuario.descargas.mes.disponibles = state.descargasConf.semestral;
          }
          else 
          {
            state.datosUsuario.descargas.mes.tipo = "anual";
            state.datosSuscripcion.plan.tipoSuscripcion = "anual";
            state.datosUsuario.descargas.mes.disponibles = state.descargasConf.anual;
          }

        }
        else
          state.datosUsuario.descargas.mes.active = false;

      },

      updateDescargasPreMP(state, data){

        // console.log(data);
        if(data.status === "approved" )
        {

          // datosSuscripcion.status
          let suscripcion = {
            status: true,
            pasarela: "mercadopago",
            plan:{
              interval_count: data.interval_count,
              interval: "month",
              amount: (data.transaction_amount * 100),
              active: true,
              fechaFin: data.fechaFin,
              fechaInicio: data.fechaInicio,
            }
          }
          state.datosSuscripcion = suscripcion;
        // console.log(state.datosSuscripcion);


          if( state.datosSuscripcion.plan.active)
          {
            const {interval, interval_count } =  state.datosSuscripcion.plan;

            const {registro} =  state.datosUsuario.descargas.mes;
            
            state.datosUsuario.descargas={
              ...state.datosUsuario.descargas,
              // dia: {fecha:"", disponibles:1, usabas:[] },
              mes: {
                active: true, tipo:"", disponibles: 0,
                registro: registro.length === 0 ? [] : registro,
              }
            }
            
            if( interval === "month" &&  interval_count === 1)
            {
              state.datosUsuario.descargas.mes.tipo = "mensual";
              state.datosSuscripcion.plan.tipoSuscripcion = "mensual";
              state.datosUsuario.descargas.mes.disponibles = state.descargasConf.mensual;
            }
            else if( interval === "month" &&  interval_count === 3)
            {
              state.datosUsuario.descargas.mes.tipo = "trimestral";
              state.datosSuscripcion.plan.tipoSuscripcion = "trimestral";
              state.datosUsuario.descargas.mes.disponibles = state.descargasConf.trimestral;
            }
            else if(interval === "month" &&  interval_count === 6)
            {
              state.datosUsuario.descargas.mes.tipo = "semestral";
              state.datosSuscripcion.plan.tipoSuscripcion = "semestral";
              state.datosUsuario.descargas.mes.disponibles = state.descargasConf.semestral;
            }
            else 
            {
              state.datosUsuario.descargas.mes.tipo = "anual";
              state.datosSuscripcion.plan.tipoSuscripcion = "anual";
              state.datosUsuario.descargas.mes.disponibles = state.descargasConf.anual;
            }
          }

        }
        else
          state.datosUsuario.descargas.mes.active = false;

       

      },
      updateVerMas(state,tipoPost){
        // console.log(state.categorias);
        if(tipoPost === "actividades")
        {
          // console.log("RECOMENDADOS")
          state.misPost = state.categorias.filter( 
            post  => (post.tipo === "planeacion" && post.permisoadmin && (post.recomendado === true && post.edopost === "publico" || (post.edopost === "privado" && post.idCreador === state.datosUsuario.id)))
          )
  
          state.otrosPost = state.categorias.filter( 
            post  => 
              ( post.tipo === "recurso" && post.permisoadmin &&  (post.recomendado === true && post.edopost === "publico" || (post.edopost === "privado" && post.idCreador === state.datosUsuario.id)) )
          )
        }
        else if(tipoPost === "recomendados")
        {
          // console.log("RECOMENDADOS")
          state.misPost = state.categorias.filter( 
            post  => ( post.recomendado  && post.idCreador === state.datosUsuario.id && post.permisoadmin)
          )
  
          state.otrosPost = state.categorias.filter( 
            post  => 
              ( post.recomendado  && post.edopost === "publico" && post.permisoadmin )
          )
        }
        else
        {
  
          state.misPost = state.categorias.filter( 
            post  => (post.tipo === tipoPost && post.idCreador === state.datosUsuario.id && post.permisoadmin)
          )
  
          state.otrosPost = state.categorias.filter( 
            post  => 
              ( post.tipo === tipoPost && (post.idCreador !== state.datosUsuario.id && post.edopost !== "privado") && post.permisoadmin)
          )
        }
        // console.log("state.misPost")
        // console.log(state.misPost)
        // console.log("state.otrosPost")
        // console.log(state.otrosPost)
  
        
      },
    }
  });
};

export default createStore;