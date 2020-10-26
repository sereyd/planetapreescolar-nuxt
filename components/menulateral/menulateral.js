
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: null,
      menufix:false,
      devtest:false,  //// para realizar pruebas de sesiones
      itemsmenumni:[
        { title: 'Ver perfil',link:"perfil" },
        { title: 'Cerrar sesión', link:"exit" },

      ]
    }
  },

  computed: {
    ...mapState(["datosUsuario","itemsmenu"])
  },
  methods:{
    ...mapMutations(['abrirRegistro']),
    scrollmenu(){

     window.scrollY>200 ? this.menufix=true : this.menufix=false
     console.log( this.menufix)
    }

  }
  
};
