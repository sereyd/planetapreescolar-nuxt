import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data() {
      return {
        
      };
    },
    
    computed: {
      ...mapState(['datosUsuario', 'directorios']),
    },
    
    
  };
  