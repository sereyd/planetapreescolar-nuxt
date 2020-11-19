<template>
<v-main>
  <!-----Buscador------>

<buscador />
  <!------reflexiones------>
  
<reflexiones  />

  <!------recomendaciones----->
  <div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="RECOMENDACION" titulo="Recomendación del día" subtitulos="Una sección de recursos y planeación para tu día"  linkmas="recomendacion"  />

  <!-------Blog------------->
<div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="BLOG" titulo="Blog de la educadora" subtitulos="Conoce lo que pasa en el mundo de la educación inicial" linkmas="blog"  />

  <!---------memorias------------>
<div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="MEMORIA" titulo="Memorias de la educadora" subtitulos="Compoarte tus vivencias y experiencias con la comunidad"  linkmas="memorias" />

  <!---------audios------------>
<div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="AUDIOS" titulo="Audios de la educadora" subtitulos="Audios o música para tus rutinas o clases"  linkmas="audios" />

  <!---------imagenes------------>
<div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="IMAGENES" titulo="Imagenes de la educadora" subtitulos="fotos o imágenes de apoyo para clases"  linkmas="imagenes" />

  <!---------videos------------>
<div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="VIDEOS" titulo="Videos de la educadora" subtitulos="videos para complementar clases o informativos"  linkmas="videos" />



</v-main>
</template>

<script>
import buscador from '~/components/buscador/buscador.vue'
import reflexiones from '~/components/reflexiones/reflexiones.vue'
import listablog from '~/components/listado-blog/listado-blog.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {};
  },
  methods:{
    ...mapMutations(['guardarVistaValida']),
  },
  created() {
      this.guardarVistaValida(true); 
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
