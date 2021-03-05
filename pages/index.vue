<template>
<v-main >

  <!-----Buscador------>
  <h1 class="text-center white--text" style="font-size:1px;">Recursos descargables para el aprendizaje en
preescolar | Planeta preescolar.</h1>
<v-card class="secondary ma-2  modbuscador" >
    <v-card-text class="backbuscador text-center white--text pa-4 rounded-2 pt-3" style="background-image: url('images/nubes.png'); background-position:center center;" >
        <h2 class="medidah1" style="font-size:25px;">Selección de
recursos educativos</h2>
        <p class="medidap">Planeaciones editables, hojas de trabajo, material didáctico, cantos y juegos</p>
         <buscador :selectopt="'todo'"  />
    </v-card-text>
</v-card>
  <!------reflexiones------>
  
<reflexiones  />


  <!---------RECOMENDACIONES------------>
<div style="width:100%; height:10px;">

<loaderDate :loader="loading"  />

</div>
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
  titulo="Blog de la educadora" subtitulos="Conoce lo que pasa en la educación preescolar." 
  linkmas="blog"  
/>


  <!---------memorias------------>
<div style="width:100%; height:0px;"></div>
<listablog 
  :blogpost="memorias" :esCompleto="false" @updateBlogpost="memorias=$event"
  tipo="CATEGORIAS" subtipo="memoria" 
  titulo="Memorias de la educadora" subtitulos="Relatos y anécdotas que han dejado huella, comparte tus vivencias." 
  linkmas="memorias"  
/>

<div style="width:100%; height:0px;" ></div>
<listablog 
  :blogpost="otros" :esCompleto="false" @updateBlogpost="otros=$event"
  tipo="CATEGORIAS" subtipo="otro" 
  titulo="Administración" subtitulos="Material de administración y consulta que complementa tu actividad diaria." 
  linkmas="otros"  
/>


</v-main>
</template>


<script>
import buscador from '~/components/buscador/buscador.vue'
import reflexiones from '~/components/reflexiones/reflexiones.vue'
import listablog from '~/components/listado-blog/listado-blog.vue'
import loaderDate from '~/components/loaderDate/loaderDate.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {

  data() {
    return {
      // reflexiones:[],
      recomendaciones:[],
      blog:[],
      memorias:[],
      otros:[],
      bandera: true,
    };
  },
  // methods:{
  //   ...mapMutations(['guardarVistaValida']),
  // },
  async mounted() {
        console.log("INDEX.VUE")

      await this.cargabaseGral()
     // this.bandera = true
  },
  computed: {
    ...mapState(['datosUsuario', 'categorias', 'loading']),
  },
  components: {
    buscador,
    reflexiones,
    listablog,
    loaderDate
  },
  methods: {
    ...mapMutations(['guardarVistaValida','actualizarCategorias','cambiaLoading']),
    ...mapActions(['listaAleatoria']),
    async  cargabaseGral(){
      let cat = [];
      ///inicia loader de categorias
     this.cambiaLoading('inicia')
      if(this.categorias.length === 0)
      {
        console.log("CONSULTANDO LA BASE DE DATOS")
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
       
              this.updateCategoriasInicio(datos)
              
              });
              console.log(cat);
              this.actualizarCategorias(cat);
              this.sliceCategoriasInicio();

            });
        } catch (e) {
          console.log(e);
        }
      }
      else
      {
        console.log("YA HAY DATOS EN CATEGORIAS")
        console.log(this.categorias)
        this.updateCategoriasInicio([...this.categorias])
        this.sliceCategoriasInicio();
      }
       this.cambiaLoading('finaliza')
    },
    updateCategoriasInicio(cat){
      // datos.map(cat => {

        if((cat.tipo === "planeacion" || cat.tipo === "materialdidactico" || cat.tipo === "hojatrabajo" || cat.tipo === "hojailustrar" || cat.tipo === "interactivo" ) && cat.recomendado && 
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

        else if(cat.tipo === "otro"  && 
          (cat.edopost === "publico" && cat.permisoadmin || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id)) )
            this.otros.push(cat)

      // })

    },
    async sliceCategoriasInicio(){

      this.blog = 
        this.blog.length > 4 ? await this.listaAleatoria(this.blog) : this.blog.slice(0, 4) 
      
      this.memorias = 
        this.memorias.length > 4 ? await this.listaAleatoria(this.memorias) : this.memorias.slice(0, 4) 
      
      this.recomendaciones = 
        this.recomendaciones.length > 4 ? await this.listaAleatoria(this.recomendaciones) : this.recomendaciones.slice(0, 4) 

      this.otros = 
        this.otros.length > 4 ? await this.listaAleatoria(this.otros) : this.otros.slice(0, 4) 
  
    }
  },
};
</script>
