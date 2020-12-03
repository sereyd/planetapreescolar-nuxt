<template>
  <v-main class="pa-10">
      <h1 class="primary--text">Favoritos</h1>
    <div style="width:100%; height:15px;" class=""></div>
      <!------recomendaciones----->
    <listablog  
        :blogpost="planeaciones" @updateBlogpost="planeaciones=$event"
        tipo="CATEGORIAS" subtipo="planeacion" 
        titulo="Planeaciones" 
        subtitulos=""  
        :esFavoritos="true"
    />
    <div style="width:100%; height:10px;" v-if="planeaciones.length > 0"></div>

    <listablog  
        :blogpost="recursos" @updateBlogpost="recursos=$event"
        tipo="CATEGORIAS" subtipo="recurso" 
        titulo="Actividades" 
        subtitulos=""  
        :esFavoritos="true"
    />
    <div style="width:100%; height:10px;" v-if="recursos.length > 0"></div>



    <!-------Blog------------->
    <listablog  
        :blogpost="blog" @updateBlogpost="blog=$event"
        tipo="CATEGORIAS" subtipo="blog" 
        titulo="Blogs" 
        subtitulos="" 
        :esFavoritos="true"
    />
    <div style="width:100%; height:10px;" v-if="blog.length > 0"></div>

    <!---------memorias------------>
    <listablog  
        :blogpost="memorias" @updateBlogpost="memorias=$event"
        tipo="CATEGORIAS"  subtipo="memoria"
        titulo="Memorias" 
        subtitulos=""  
        :esFavoritos="true"
    />
    <div style="width:100%; height:50px;" v-if="memorias.length > 0"></div>

    <!---------reflexiones------------>
    <listablog  
        :blogpost="reflexiones" @updateBlogpost="reflexiones=$event"
        tipo="CATEGORIAS"  subtipo="reflexion"
        titulo="Reflexiones" 
        subtitulos=""  
        :esFavoritos="true"
    />
    <div style="width:100%; height:10px;" v-if="reflexiones.length > 0"></div>
    

    
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
      reflexiones:[],
      planeaciones:[],
      recursos:[],
      blog:[],
      memorias:[],
      // blog:[],
    };
  },
  async created() {
      this.guardarVistaValida(true); 
      console.log("FAVORITOS")
      await this.cargabaseGral();
  },
  computed: {
    ...mapState(['datosUsuario']),
  },
  components: {
    buscador,
    reflexiones,
    listablog
  },
  methods:{
    ...mapMutations(['guardarVistaValida']),
    async  cargabaseGral(){
        try {
          // if(!this.esCompleto)
            let esFav =false;
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
                  // const recursos = [...this.blogpost.filter(recurso =>
                  esFav = datos.favoritos.includes(this.datosUsuario.id) 
                  // )]

                  if(datos.tipo === "reflexion" && esFav  && 
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.reflexiones.push(datos)

                  else if(datos.tipo === "blog" && esFav  && 
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.blog.push(datos)


                  else if(datos.tipo === "memoria" && esFav  && 
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.memorias.push(datos)

                  else if(datos.tipo === "recurso" && esFav  && 
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.recursos.push(datos)

                  else if(datos.tipo === "planeacion" && esFav  && 
                    ( datos.edopost === "publico" || (datos.edopost === "privado" && datos.idCreador === this.datosUsuario.id) ) )
                    this.planeaciones.push(datos)
                
                  // this.blogpost.push(datos);
                });
                // console.log("this.planeaciones")
                // console.log(this.planeaciones)
                // console.log("this.recursos")
                // console.log(this.recursos)
                // console.log("this.blog")
                // console.log(this.blog)
                // console.log("this.memorias")
                // console.log(this.memorias)
                  // this.blogpost = [...this.blogpost].slice(0,4);
                // console.log(this.blogpost);
              });
          } catch (e) {
            console.log(e);
          }
        },
    
  },
};
</script>
