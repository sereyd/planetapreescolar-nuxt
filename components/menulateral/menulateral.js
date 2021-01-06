
import { mapState, mapMutations, mapActions } from "vuex";
import notificaciones from '@/components/notificaciones/notificaciones.vue'
export default {
  data() {
    return {
      drawer: null,
      menuoculto:true,
      devtest:false,  //// para realizar pruebas de sesiones
      itemsmenumni:[
        { title: 'Ver perfil',link:"/perfil" },
        { title: 'Cerrar sesión', link:"/exit" },
      ]
    }
  },

  computed: {
    ...mapState(["datosUsuario","itemsmenu","menufix"])
  },
  methods:{
    ...mapMutations(['abrirRegistro']),
    ...mapActions(['scrollmenu']),
    openMenu(){
console.log('abre menu')
      this.$emit('abremenu',true)
    }
  },
  components:{
    notificaciones
  }

  
};
