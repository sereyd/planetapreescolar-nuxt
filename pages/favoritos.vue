<template>
  <v-main class="pa-10">
      <h1 class="primary--text">Favoritos</h1>
      <!------recomendaciones----->
    <!-- <div style="width:100%; height:50px;"></div>
    <listablog  
        tipo="RECOMENDACION" 
        titulo="Recomendaciones" 
        subtitulos=""  
        :esFavoritos="true"
    />

    <!-------Blog-------------
    <div style="width:100%; height:50px;"></div>
    <listablog  
        tipo="BLOG" 
        titulo="Blogs" 
        subtitulos="" 
        :esFavoritos="true"
    />

    <!---------memorias------------
    <div style="width:100%; height:50px;"></div>
    <listablog  
        tipo="MEMORIA" 
        titulo="Memorias" 
        subtitulos=""  
        :esFavoritos="true"
    />

    <!---------audios------------
    <div style="width:100%; height:50px;"></div>
    <listablog  
        tipo="AUDIOS" 
        titulo="Audios/Música" 
        subtitulos=""  
        :esFavoritos="true"
    />

    <!---------imagenes------------
    <div style="width:100%; height:50px;"></div>
    <listablog  
        tipo="IMAGENES" 
        titulo="Imagenes" 
        subtitulos=""  
        :esFavoritos="true"
    />

    <!---------videos------------
    <div style="width:100%; height:50px;"></div>
    <listablog  
        tipo="VIDEOS" 
        titulo="Videos" 
        subtitulos=""  
        :esFavoritos="true"
    /> -->

    
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
