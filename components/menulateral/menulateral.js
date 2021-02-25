
import { mapState, mapMutations, mapActions } from "vuex";
import notificaciones from '@/components/notificaciones/notificaciones.vue'
export default {
  data() {
    return {
      drawer: null,
      menuoculto:true,
      devtest:false,  //// para realizar pruebas de sesiones
      host:"",
      protocol:"",
      itemsmenumni:[
        { title: 'Ver perfil',link:"/perfil" },
        { title: 'Cerrar sesión', link:"/exit" },
      ]
    }
  },

  computed: {
    ...mapState(["datosUsuario","itemsmenu","menufix",'descargasConf','datosSuscripcion'])
  },
  created(){
    this.protocol=window.location.protocol
    this.host=window.location.host
  },
  methods:{
    ...mapMutations(['abrirRegistro']),
    ...mapActions(['scrollmenu']),
    openMenu(){
// console.log('abre menu')
      this.$emit('abremenu',true)
    }
  },
  components:{
    notificaciones
  }

  
};
