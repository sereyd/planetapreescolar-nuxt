<template>
<v-main  v-if="bandera">
  <!-----Buscador------>
<v-card class="secondary ma-3  modbuscador" >
    <v-card-text class="backbuscador text-center white--text pa-12 rounded-2 pt-3">
        <h1 class="medidah1">¡Muchos recursos para ti!</h1>
        <p class="medidap">Encuentra cantos, imágenes, planeaciones, todo para ti, educadora</p>
        <buscador />
    </v-card-text>
</v-card>
  <!------reflexiones------>
  
<reflexiones  />

  <!------recomendaciones----->
  <!-- <div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="RECOMENDACION" titulo="Recomendación del día" subtitulos="Una sección de recursos y planeación para tu día"  linkmas="recomendacion"  /> -->

  <!---------RECOMENDACIONES------------>
<div style="width:100%; height:0px;"></div>
<listablog 
  :blogpost="recomendaciones" :esCompleto="false" @updateBlogpost="recomendaciones=$event"
  tipo="CATEGORIAS" subtipo="recomendacion" 
  titulo="Recomendación del día" subtitulos="Una selección de recursos y planeaciones para tu día"  
  linkmas="recomendacion" 
/>

  <!-------Blog------------->
<div style="width:100%; height:50px;"></div>
<listablog 
  :blogpost="blog" :esCompleto="false" @updateBlogpost="blog=$event"
  tipo="CATEGORIAS" subtipo="blog" 
  titulo="Blog de la educadora" subtitulos="Conoce lo que pasa en el mundo de la educación inicial" 
  linkmas="blog"  
/>


  <!---------memorias------------>
<div style="width:100%; height:50px;"></div>
<listablog 
  :blogpost="memorias" :esCompleto="false" @updateBlogpost="memorias=$event"
  tipo="CATEGORIAS" subtipo="memoria" 
  titulo="Memorias de la educadora" subtitulos="Compoarte tus vivencias y experiencias con la comunidad"  
  linkmas="memorias" 
/>



  <!---------audios------------>
<!-- <div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="AUDIOS" titulo="Audios de la educadora" subtitulos="Audios o música para tus rutinas o clases"  linkmas="audios" /> -->

  <!---------imagenes------------>
<!-- <div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="IMAGENES" titulo="Imagenes de la educadora" subtitulos="fotos o imágenes de apoyo para clases"  linkmas="imagenes" /> -->

  <!---------videos------------>
<!-- <div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="VIDEOS" titulo="Videos de la educadora" subtitulos="videos para complementar clases o informativos"  linkmas="videos" /> -->



</v-main>
</template>

<script>
import buscador from '~/components/buscador/buscador.vue'
import reflexiones from '~/components/reflexiones/reflexiones.vue'
import listablog from '~/components/listado-blog/listado-blog.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      // reflexiones:[],
      recomendaciones:[],
      blog:[],
      memorias:[],
      bandera: false,
    };
  },
  // methods:{
  //   ...mapMutations(['guardarVistaValida']),
  // },
  async mounted() {
      // console.log("HOME")
      // console.log(this.bandera)
      // this.guardarVistaValida(true); 
      await this.cargabaseGral()
      this.bandera = true
      // console.log("HOME")
      // console.log(this.bandera)
  },
  computed: {
    ...mapState(['datosUsuario', 'categorias']),
  },
  components: {
    buscador,
    reflexiones,
    listablog
  },
  methods: {
    ...mapMutations(['guardarVistaValida','actualizarCategorias']),
    async  cargabaseGral(){
      let cat = [];

      if(this.categorias.length === 0)
      {
        // console.log("BUSCAR DE FIREBASE")
        try {
          // if(!this.esCompleto)
          await this.$fireStore
            .collection("CATEGORIAS").orderBy("fecha", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                let data = doc.data();
                data.tags = data.tags ? data.tags : [];
                data.favoritos = data.favoritos ? data.favoritos : [];
                data.sinopsis= data.sinopsis ? data.sinopsis : "";

                delete data['idRecurso'];


                const datos = {
                    idRecurso: doc.id,
                    ...data
                }

                cat.push(datos);
              
              });
              this.updateCategoriasInicio(cat)
              this.actualizarCategorias(cat);
              this.sliceCategoriasInicio();

            });
        } catch (e) {
          console.log(e);
        }
      }
      else
      {
        console.log("BUSCAR DE STORE")
        this.updateCategoriasInicio([...this.categorias])
        this.sliceCategoriasInicio();
      }
    },
    updateCategoriasInicio(datos){
      // console.log(datos)

      datos.map(cat => {

        if(cat.tipo === "blog"  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.blog = [
            ...this.blog,
            cat]

        else if(cat.tipo === "memoria"  &&
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.memorias.push(cat)

        else if((cat.tipo === "planeacion" || cat.tipo === "materialdidactico" || cat.tipo === "hojatrabajo" || cat.tipo === "interactivo") && cat.recomendado && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.recomendaciones.push(cat)
      })
    },
    sliceCategoriasInicio(){
      this.blog = this.blog.slice(0, 4);
      this.memorias = this.memorias.slice(0, 4);
      this.recomendaciones = this.recomendaciones.slice(0, 4);
      // console.log("this.blog solo 4 elelemntos")
      // console.log(this.blog)
      // console.log("this.memorias solo 4 elelemntos")
      // console.log(this.memorias);
      // console.log("this.RECOMENDAIONES solo 4 elelemntos")
      // console.log(this.recomendaciones);
    }
  },
};
</script>
