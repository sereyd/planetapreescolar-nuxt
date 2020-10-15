import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: null,
      devtest:false,  //// para realizar pruebas de sesiones
      itemsmenumni:[
        { title: 'Perfil',link:"perfil" },
        { title: 'Cerrar Sesión', link:"exit" },

      ]
    }
  },
  computed: {
    ...mapState(["datosUsuario","itemsmenu"])
  },
  methods:{
    ...mapMutations(['abrirRegistro'])


  }
  
};
