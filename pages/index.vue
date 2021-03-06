<template>
<v-main >
<div style="display:none;">{{loaderData}}</div>
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
      intent:0
    };
  },
  // methods:{
  //   ...mapMutations(['guardarVistaValida']),
  // },

  computed: {
    ...mapState(['datosUsuario', 'categorias', 'loading','configAll']),
    loaderData(){
      if(Object.keys(this.configAll).length>0){
        console.log('carga base')
        this.cargabaseGral()
      }
    }
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

        ////console.log("CONSULTANDO LA BASE DE DATOS")
 
        try {

          var limitesecc=this.configAll.loadlimit.find(limit=>limit.seccion==='index')
    ///////recomendados
    //// carga reflexiones
          await this.$fireStore 
           .collection("CATEGORIAS")
          .where("recomendado", "==", true)   
          .limit(limitesecc.limite)
          .get()
            .then((dat) => {
              dat.forEach((doc) => {
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
                this.recomendaciones.push(datos)
              });
            });

             await this.$fireStore 
           .collection("CATEGORIAS")
          .where("tipo", "==", 'blog')   
          .limit(limitesecc.limite)
          .get()
            .then((dat) => {
              dat.forEach((doc) => {
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
                this.blog.push(datos)
              });
            });

         await this.$fireStore 
           .collection("CATEGORIAS")
          .where("tipo", "==", 'memoria')   
          .limit(limitesecc.limite)
          .get()
            .then((dat) => {
              dat.forEach((doc) => {
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
                this.memorias.push(datos)
              });
            });


        } catch (e) {
          console.log(e);
        }
        console.log(this.recomendaciones)
       this.cambiaLoading('finaliza')
    },
  
  
  },
};
</script>
