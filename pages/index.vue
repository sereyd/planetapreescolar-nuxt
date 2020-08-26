<template>
  <div>
    Hola vuejs {{ test }}
    <Usuarios />
  </div>
</template>

<script>


import Usuarios from "~/components/Usuarios/Usuarios.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["test"])
  },
  components: {
    Usuarios
  }
};
</script>
