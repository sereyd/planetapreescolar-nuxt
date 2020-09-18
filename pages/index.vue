<template>
<v-main>
  <!-----Buscador------>

<buscador />
  <!------reflexiones------>
  
<reflexiones />

  <!------recomendaciones----->
  <div style="width:100%; height:50px;"></div>
<listablog titulo="Recomendación del día" subtitulos="Una sección de recursos y planeación para tu día" basedatos="recomendaciones" />

  <!-------Blog------------->
<div style="width:100%; height:50px;"></div>
<listablog titulo="Blog de la educadora" subtitulos="Conoce lo que pasa en el mundo de la educación inicial" basedatos="blogeducadora" />

  <!---------memorias------------>
<div style="width:100%; height:50px;"></div>
<listablog titulo="Memorias de la educadora" subtitulos="Compoarte tus vivencias y experiencias con la comunidad" basedatos="memorias" />

</v-main>
</template>

<script>
import buscador from '~/components/buscador/buscador.vue'
import reflexiones from '~/components/reflexiones/reflexiones.vue'
import listablog from '~/components/listado-blog/listado-blog.vue'
export default {
  data() {
    return {};
  },
  computed: {

  },
  components: {
    buscador,
    reflexiones,
    listablog
  }
};
</script>
