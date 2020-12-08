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
    ...mapState(['datosUsuario','categorias']),
  },
  components: {
    buscador,
    reflexiones,
    listablog
  },
  methods:{
    ...mapMutations(['guardarVistaValida','actualizarCategorias']),
    async  cargabaseGral(){
      let cat = [];

      if(this.categorias.length === 0)
      {
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
              });
        } catch (e) {
          console.log(e);
        }
      }else
      {
        console.log("BUSCAR DE STORE")
        this.updateCategoriasInicio([...this.categorias])

      }
    },
    updateCategoriasInicio(datos){
      console.log(datos)
       
      datos.map(cat => {
        let esFav = false;
        esFav = cat.favoritos.includes(this.datosUsuario.id) 
                  // )]

        if(cat.tipo === "reflexion" && esFav  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.reflexiones.push(cat)

        else if(cat.tipo === "blog" && esFav  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.blog.push(cat)


        else if(cat.tipo === "memoria" && esFav  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.memorias.push(cat)

        else if(cat.tipo === "recurso" && esFav  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.recursos.push(cat)

        else if(cat.tipo === "planeacion" && esFav  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.planeaciones.push(cat)
      })
    },
    
  },
};
</script>
