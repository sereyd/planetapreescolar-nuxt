<template>
<v-main>
  <!-----Buscador------>

<buscador />
  <!------reflexiones------>
  
<reflexiones  />

  <!------recomendaciones----->
  <!-- <div style="width:100%; height:50px;"></div>
<listablog :esCompleto="false" tipo="RECOMENDACION" titulo="Recomendación del día" subtitulos="Una sección de recursos y planeación para tu día"  linkmas="recomendacion"  /> -->

  <!---------RECOMENDACIONES------------>
<div style="width:100%; height:50px;"></div>
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
    };
  },
  // methods:{
  //   ...mapMutations(['guardarVistaValida']),
  // },
  async mounted() {
      console.log("HOME")
      // this.guardarVistaValida(true); 
      await this.cargabaseGral()
  },
  computed: {
    ...mapState(['datosUsuario']),
  },
  components: {
    buscador,
    reflexiones,
    listablog
  },
  methods: {
    ...mapMutations(['guardarVistaValida']),
    async  cargabaseGral(){
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
                  delete data['idRecurso'];


                  const datos = {
                      idRecurso: doc.id,
                      ...data
                  }
                  // if(datos.tipo === "reflexion")
                  //   this.reflexiones.push(datos)
                  // console.log(datos.tipo)
                  // console.log(datos)

                  if(datos.tipo === "blog"  && 
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.blog = [
                      ...this.blog,
                      datos]

                  else if(datos.tipo === "memoria"  &&
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.memorias.push(datos)

                  else if((datos.tipo === "recurso" || datos.tipo === "planeacion") && datos.recomendado && 
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.recomendaciones.push(datos)
                
                  // this.blogpost.push(datos);
                });
                // console.log("this.planeaciones")
                // console.log(this.planeaciones)
                // console.log("this.recursos")
                // console.log(this.recursos)
                this.blog = this.blog.slice(0, 4);
                this.memorias = this.memorias.slice(0, 4);
                this.recomendaciones = this.recomendaciones.slice(0, 4);
                // console.log("this.blog solo 4 elelemntos")
                // console.log(this.blog)
                // console.log("this.memorias solo 4 elelemntos")
                // console.log(this.memorias);
                // console.log("this.RECOMENDAIONES solo 4 elelemntos")
                // console.log(this.recomendaciones);
                
                  // this.blogpost = [...this.blogpost].slice(0,4);
                // console.log(this.blogpost);
              });
            // else
            //   await this.$fireStore
            //     .collection(this.tipo).orderBy("fecha", "desc")
            //     .get()
            //     .then((data) => {
            //       data.forEach((doc) => {
            //         let data = doc.data();
            //         data.tags = data.tags ? data.tags : [];
            //         data.favoritos = data.favoritos ? data.favoritos : [];
            //         delete data['idRecurso'];


            //         const datos = {
            //             idRecurso: doc.id,
            //             ...data
            //           }
            //         this.blogpost.push(datos);
            //       });
                    // this.blogpost = [...this.blogpost].slice(0,4);
                  // console.log(this.blogpost);
                // });
          } catch (e) {
            console.log(e);
          }
        },
  },
};
</script>
