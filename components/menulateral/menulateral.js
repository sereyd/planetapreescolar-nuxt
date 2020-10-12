import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/",visible:true },
        { title: "Actividades", icon: "mdi-human", link: "actividades",visible:false },
        { title: "Foro", icon: "mdi-forum", link: "", link: "foro",visible:false },
        { title: "Tienda", icon: "mdi-tag", link: "", link: "tienda",visible:false },
        { title: "Mis Grupos", icon: "mdi-account-multiple", link: "grupos",  logeado: true,
        permisos: 0,visible:true },
        { title: "Directorio", icon: "mdi-book-multiple", link: "directorio",visible:false },
        { title: "Calendario", icon: "mdi-calendar", link: "calendario",visible:false },
        {
          title: "Cuenta",
          icon: "mdi-account",
          link: "cuenta",
          logeado: true,
          permisos: 0,
          visible:true
        },
        {
          title: "Mis Publicaciones",
          icon: "mdi-table-edit",
          link: "publicaciones",
          logeado: true,
          permisos: 1,
          visible:true
          
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
          visible:true
        },
      ],
      devtest:false  //// para realizar pruebas de sesiones
    };
  },
  computed: {
    ...mapState(["datosUsuario"])
  },
  methods:{

    ...mapMutations(['abrirRegistro']),

  }
  
};
