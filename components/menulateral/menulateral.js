import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Inicio", icon: "mdi-home", link: "/" },
        { title: "Actividades", icon: "mdi-human", link: "actividades" },
        { title: "Foro", icon: "mdi-forum", link: "", link: "foro" },
        { title: "Tienda", icon: "mdi-tag", link: "", link: "tienda" },
        { title: "Mis Grupos", icon: "mdi-account-multiple", link: "grupos" },
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
        }
      ],
      devtest:true  //// para realizar pruebas de sesiones
    };
  },
  computed: {
    ...mapState(["userlogin", "lvluser"])
  }
};
