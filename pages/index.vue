<template>
<v-main>
  <!-----Buscador------>

<buscador />
  <!------reflexiones------>
<reflexiones />

  <!------recomendaciones----->


  <!-------Blog------------->



  <!---------memorias------------>



</v-main>
</template>

<script>
import buscador from '~/components/buscador/buscador.vue'
import reflexiones from '~/components/reflexiones/reflexiones.vue'
export default {
  data() {
    return {};
  },
  computed: {

  },
  components: {
    buscador,
    reflexiones
  }
};
</script>
