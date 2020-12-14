<template>
        <v-main>
                <!---------planeaciones------------>
                <div style="width:100%; height:15px;"></div>
                <listablog 
                        :blogpost="misPost" :esCompleto="false" @updateBlogpost="misPost=$event"
                        tipo="CATEGORIAS" subtipo="planeacion" 
                        titulo="Planeaciones" subtitulos="¡Planea tu día con muchas actividades!"  
                />
                <div style="width:100%; height:0px;" v-if="misPost.length > 0"></div>

                <!-------Actividades------------->
                <listablog 
                        :blogpost="otrosPost" :esCompleto="false" @updateBlogpost="otrosPost=$event"
                        tipo="CATEGORIAS" subtipo="recurso" 
                        titulo="Actividades para los niños" subtitulos="Recortes, actividades, días especiales, ¡todo lo que necesitas!" 
                />
                <div style="width:100%; height:0px;" v-if="otrosPost.length > 0"></div>

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
  computed: {
    ...mapState(["datosUsuario","misPost","otrosPost"])
  },
  async created() {

    await this.cargaPost();
    this.bandera = true;
  },
  // async mounted() {
  //     console.log("aqui1")
  //     // this.guardarVistaValida(true); 
  //     await this.cargabaseGral()
  // },
  components: {
    buscador,
    reflexiones,
    listablog
  },
  methods: {
    ...mapActions(['cargaBasePost']),
    async cargaPost(){
      await this.cargaBasePost("actividades");

    },
    // async  cargabaseGral(){
    //     try {
    //       // if(!this.esCompleto)
    //         await this.$fireStore
    //           .collection("CATEGORIAS").orderBy("fecha", "desc")
    //           .get()
    //           .then((data) => {
    //             data.forEach((doc) => {
    //               let data = doc.data();
    //               data.tags = data.tags ? data.tags : [];
    //               data.favoritos = data.favoritos ? data.favoritos : [];
    //               delete data['idRecurso'];


    //               const datos = {
    //                   idRecurso: doc.id,
    //                   ...data
    //               }
    //               // if(datos.tipo === "reflexion")
    //               //   this.reflexiones.push(datos)

    //               if(datos.tipo === "planeacion" && datos.recomendado === true)
    //                 this.planeaciones.push(datos)

    //               else if(datos.tipo === "recurso" && datos.recomendado === true)
    //                 this.recursos.push(datos)

                
    //               // this.blogpost.push(datos);
    //             });
    //             // console.log("this.planeaciones")
    //             // console.log(this.planeaciones)
    //             // console.log("this.recursos")
    //             // console.log(this.recursos)
    //             this.planeaciones = this.planeaciones.slice(0, 4);
    //             this.recursos = this.recursos.slice(0, 4);
    //             console.log("this.planeaciones")
    //             console.log(this.planeaciones)
    //             console.log("this.recursos")
    //             console.log(this.recursos)
    //               // this.blogpost = [...this.blogpost].slice(0,4);
    //             // console.log(this.blogpost);
    //           });
            
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     },
  },
};
</script>
