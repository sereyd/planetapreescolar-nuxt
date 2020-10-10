import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Actividades", icon: "mdi-human", link: "actividades" },
        { title: "Foro", icon: "mdi-forum", link: "", link: "foro" },
        { title: "Tienda", icon: "mdi-tag", link: "", link: "tienda" },
        { title: "Mis Grupos", icon: "mdi-account-multiple", link: "grupos",  logeado: true,
        permisos: 0 },
        { title: "Directorio", icon: "mdi-book-multiple", link: "directorio" },
        { title: "Calendario", icon: "mdi-calendar", link: "calendario" },
        {
          title: "Cuenta",
          icon: "mdi-account",
          link: "cuenta",
          logeado: true,
          permisos: 0
        },
        {
          title: "Editor",
          icon: "mdi-table-edit",
          link: "editor",
          logeado: true,
          permisos: 1
        },
        {
          title: "Administrador",
          icon: "mdi-speedometer",
          link: "administrador",
          logeado: true,
          permisos: 2
        },
        {
          title: "Checkout",
          icon: "mdi-speedometer",
          link: "checkout",
          logeado: true,
          permisos: 0
        },
        { title: "Salir", 
          icon: "mdi-exit-to-app", 
          link: "exit", 
          logeado:true,
          permisos:0 
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
