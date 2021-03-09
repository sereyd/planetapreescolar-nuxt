<template>
<v-main >
<div style="display:none;"></div>
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


                <div style="width:100%; height:10px;">

                <loaderDate :loader="loading"  />

                </div>


                <!---------RECOMENDACIONES------------>

                <listablog 
                  blogpost="recomendado" :esCompleto="false" @updateBlogpost="recomendaciones=$event"
                  tipo="CATEGORIAS" subtipo="recomendacion" 
                  titulo="Recomendación del día" subtitulos="Una selección de recursos y planeaciones para tu día"  
                  linkmas="recomendacion" 
                />


                <listablog 
                        blogpost="planeacion" :esCompleto="false" @updateBlogpost="planeaciones=$event"
                        tipo="CATEGORIAS" subtipo="planeacion" 
                        titulo="Planeaciones" subtitulos="Biblioteca con cientos de planeaciones, no te quedes sin ideas."  
                        linkmas="planeaciones" 
                />
                <div style="width:100%; height:0px;" v-if="planeaciones.length > 0"></div>

                <!-------HOJAS DE TRABAJO------------->
                <listablog 
                        blogpost="hojatrabajo" :esCompleto="false" @updateBlogpost="hojastrabajo=$event"
                        tipo="CATEGORIAS" subtipo="hojatrabajo" 
                        titulo="Hojas de trabajo para los niños" subtitulos="Actividades para reforzar los aprendizajes en forma divertida" 
                        linkmas="hojas-trabajo"  
                />
                <div style="width:100%; height:0px;" v-if="hojastrabajo.length > 0"></div>

                <!-------HOJAS PARA ILUSTRAR------------->
                <listablog 
                        blogpost="hojailustrar" :esCompleto="false" @updateBlogpost="hojasilustrar=$event"
                        tipo="CATEGORIAS" subtipo="hojailustrar" 
                        titulo="Hojas para colorear" subtitulos="" 
                        linkmas="hojas-ilustrar"  
                />
                <div style="width:100%; height:0px;" v-if="hojasilustrar.length > 0"></div>

                <!-------MATERIAL DIDÁCTICO------------->
                <listablog 
                        blogpost="materialdidactico" :esCompleto="false" @updateBlogpost="materialdidactico=$event"
                        tipo="CATEGORIAS" subtipo="materialdidactico" 
                        titulo="Material didáctico para los niños" subtitulos="Loterías, memoramas, juegos, dominós, frisos, gafetes, reglamentos a todo color." 
                        linkmas="material-didactico"  
                />
                <div style="width:100%; height:0px;" v-if="materialdidactico.length > 0"></div>

                <!-------INTERACTIVOS------------->
                <listablog 
                        blogpost="interactivo" :esCompleto="false" @updateBlogpost="interactivos=$event"
                        tipo="CATEGORIAS" subtipo="interactivo" 
                        titulo="Interactivos para los niños" subtitulos="Cantos, cuentos, videos y actividades interactivas" 
                        linkmas="interactivos"  
                />

                <!-------Administración------------->

                <div style="width:100%; height:0px;" ></div>
                <listablog 
                  blogpost="otro" :esCompleto="false" @updateBlogpost="otros=$event"
                  tipo="CATEGORIAS" subtipo="otro" 
                  titulo="Administración" subtitulos="Material de administración y consulta que complementa tu actividad diaria." 
                  linkmas="otros"  
                />

                  <!-------Blog------------->

                <div style="width:100%; height:0px;"></div>
                <listablog 
                  blogpost="blog" :esCompleto="false" @updateBlogpost="blog=$event"
                  tipo="CATEGORIAS" subtipo="blog" 
                  titulo="Blog de la educadora" subtitulos="Conoce lo que pasa en la educación preescolar." 
                  linkmas="blog"  
                />


                  <!---------memorias------------>
                  
                <div style="width:100%; height:0px;"></div>
                <listablog 
                  blogpost="memoria" :esCompleto="false" @updateBlogpost="memorias=$event"
                  tipo="CATEGORIAS" subtipo="memoria" 
                  titulo="Memorias de la educadora" subtitulos="Relatos y anécdotas que han dejado huella, comparte tus vivencias." 
                  linkmas="memorias"  
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
         // reflexiones:[],
      planeaciones:[],
      hojastrabajo:[],
      hojasilustrar:[],
      materialdidactico:[],
      interactivos:[],
      recomendaciones:[],
      blog:[],
      memorias:[],
      otros:[],
      bandera: true,
      intent:0
    };
  },

mounted(){
  this.cambiaLoading('inicia')
  setTimeout(()=>{
this.cambiaLoading('finaliza')

  },500)
},
  computed: {
    ...mapState(['datosUsuario', 'categorias', 'loading','configAll']),
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
  
  
  
  },
};
</script>
