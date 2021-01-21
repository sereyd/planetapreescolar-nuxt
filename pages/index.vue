<template>
<v-main  v-if="bandera">
  <!-----Buscador------>
<v-card class=" ma-2  modbuscador" >
    <v-card-text class="backbuscador text-center white--text pa-4 rounded-2 pt-3">
        <h2 class="medidah1">¡Muchos recursos para ti!</h2>
        <p class="medidap">Encuentra cantos, imágenes, planeaciones, todo para ti, educadora</p>
        <buscador />
    </v-card-text>
</v-card>
  <!------reflexiones------>
  
<reflexiones  />

  <!---------RECOMENDACIONES------------>
<div style="width:100%; height:10px;"></div>
<listablog 
  :blogpost="recomendaciones" :esCompleto="false" @updateBlogpost="recomendaciones=$event"
  tipo="CATEGORIAS" subtipo="recomendacion" 
  titulo="Recomendación del día" subtitulos="Una selección de recursos y planeaciones para tu día"  
  linkmas="recomendacion" 
/>

  <!-------Blog------------->
<div style="width:100%; height:0px;"></div>
<listablog 
  :blogpost="blog" :esCompleto="false" @updateBlogpost="blog=$event"
  tipo="CATEGORIAS" subtipo="blog" 
  titulo="Blog de la educadora" subtitulos="Conoce lo que pasa en el mundo de la educación inicial" 
  linkmas="blog"  
/>


  <!---------memorias------------>
<div style="width:100%; height:0px;"></div>
<listablog 
  :blogpost="memorias" :esCompleto="false" @updateBlogpost="memorias=$event"
  tipo="CATEGORIAS" subtipo="memoria" 
  titulo="Memorias de la educadora" subtitulos="Compoarte tus vivencias y experiencias con la comunidad"  
  linkmas="memorias" 
/>


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
      await this.cargabaseGral()
      this.bandera = true
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
    ...mapActions(['listaAleatoria']),
    async  cargabaseGral(){
      let cat = [];

      if(this.categorias.length === 0)
      {
        try {
          await this.$fireStore
            .collection("CATEGORIAS").orderBy("fecha", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                let data = doc.data();
                data.tags = data.tags ? data.tags : [];
                data.favoritos = data.favoritos ? data.favoritos : [];
                data.sinopsis= data.sinopsis ? data.sinopsis : "";

                if(data.tipo !== "blog" || data.tipo !== "reflexion" || data.tipo !== "memoria")
                  data.premium =  typeof(data.premium) === "undefined" ? false : data.premium

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
        this.updateCategoriasInicio([...this.categorias])
        this.sliceCategoriasInicio();
      }
    },
    updateCategoriasInicio(datos){
      datos.map(cat => {

        if((cat.tipo === "planeacion" || cat.tipo === "materialdidactico" || cat.tipo === "hojatrabajo" || cat.tipo === "interactivo" || cat.tipo === "otro") && cat.recomendado && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.recomendaciones.push(cat)

        else if(cat.tipo === "blog"  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.blog = [
            ...this.blog,
            cat]

        else if(cat.tipo === "memoria"  &&
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.memorias.push(cat)

      })
    },
    async sliceCategoriasInicio(){

      this.blog = 
        this.blog.length > 4 ? await this.listaAleatoria(this.blog) : this.blog.slice(0, 4) 
      
      this.memorias = 
        this.memorias.length > 4 ? await this.listaAleatoria(this.memorias) : this.memorias.slice(0, 4) 
      
      this.recomendaciones = 
        this.recomendaciones.length > 4 ? await this.listaAleatoria(this.recomendaciones) : this.recomendaciones.slice(0, 4) 
  
    }
  },
};
</script>
