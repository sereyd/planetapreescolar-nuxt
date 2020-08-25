<template>
 <div>
  Hola vuejs  {{test}}
  <Usuarios />
   </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Usuarios from '~/components/Usuarios/Usuarios.vue'
import { mapState } from 'vuex'
export default {
  data(){
    return {

    }
  },
  computed:{
    ...mapState(['test'])
  },
  components: {
    Logo,
    VuetifyLogo,
    Usuarios
  },


}
</script>
