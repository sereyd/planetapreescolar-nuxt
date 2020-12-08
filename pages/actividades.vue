<template>
        <v-main>
                <!---------planeaciones------------>
                <div style="width:100%; height:15px;"></div>
                <listablog 
                        :blogpost="planeaciones" :esCompleto="false" @updateBlogpost="planeaciones=$event"
                        tipo="CATEGORIAS" subtipo="planeacion" 
                        titulo="Planeaciones" subtitulos="¡Planea tu día con muchas actividades!"  
                        linkmas="planeaciones" 
                />
                <div style="width:100%; height:50px;" v-if="planeaciones.length > 0"></div>

                <!-------Actividades------------->
                <listablog 
                        :blogpost="recursos" :esCompleto="false" @updateBlogpost="recursos=$event"
                        tipo="CATEGORIAS" subtipo="recurso" 
                        titulo="Actividades para los niños" subtitulos="Recortes, actividades, días especiales, ¡todo lo que necesitas!" 
                        linkmas="recursos"  
                />
                <div style="width:100%; height:50px;" v-if="recursos.length > 0"></div>

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
      planeaciones:[],
      recursos:[],
    };
  },
  // methods:{
  //   ...mapMutations(['guardarVistaValida']),
  // },
  async mounted() {
      console.log("aqui1")
      // this.guardarVistaValida(true); 
      await this.cargabaseGral()
  },
  computed: {
    ...mapState(['datosUsuario','categorias']),
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
                this.updateCategoriasInicio(cat);
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
        console.log(this.categorias)

        this.updateCategoriasInicio([...this.categorias])
        this.sliceCategoriasInicio();
        console.log(this.planeaciones)
        console.log(this.recursos)
      }
    },

    updateCategoriasInicio(datos){
      console.log(datos)
      datos.map(cat => {

        if(cat.tipo === "planeacion"  && 
          ( cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
          this.planeaciones.push(cat)
  
        else if(cat.tipo === "recurso"  && 
          (cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id)) )
          this.recursos.push(cat)
      })

        console.log(this.planeaciones)
        console.log(this.recursos)
    },
    sliceCategoriasInicio(){
      this.planeaciones = this.planeaciones.slice(0, 4);
      this.recursos = this.recursos.slice(0, 4);
    }
  },
};
</script>
