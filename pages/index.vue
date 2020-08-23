<template>
 <div>
  Hola vuejs 
  <Usuarios />
   </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Usuarios from '~/components/Usuarios/Usuarios.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
    Usuarios
  }
}
</script>
