<template>
        <v-main >
        
            <!-- <v-btn @click="listaAleatoria([])">Random</v-btn> -->
                <!---------planeaciones------------>
                 <h1 class="text-center white--text" style="font-size:1px;">Planeaciones editables, hojas de trabajo,
material didáctico, cantos y juegos| Planeta Preescolar.</h1>
                <v-row>
                   <v-col cols="10">
                      <buscador :esBuscando ="buscando"  @updateBuscando="buscando=$event"/>
                  </v-col>
                </v-row>
                
                <div style="width:100%; height:5px;">
                  <loaderDate :loader="loading"  />
                </div>
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
                <div style="width:100%; height:0px;" v-if="interactivos.length > 0"></div>

                <!-------OTROS------------->
                <!-- <listablog 
                        :blogpost="otros" :esCompleto="false" @updateBlogpost="otros=$event"
                        tipo="CATEGORIAS" subtipo="otro" 
                        titulo="Otros" subtitulos="Efemérides nacionales e internacionales, convocatorias varias, Orientaciones administrativas, ¡todo lo que necesitas!" 
                        linkmas="otros"  
                />
                <div style="width:100%; height:0px;" v-if="otros.length > 0"></div> -->

                
                <!-- <div style="width:100%; height:150px;" v-if="interactivos.length > 0"></div> -->
           
        </v-main>
</template>

<script>
import buscador from '~/components/buscador/buscador.vue'
import reflexiones from '~/components/reflexiones/reflexiones.vue'
import listablog from '~/components/listado-blog/listado-blog.vue'
import loaderDate from '~/components/loaderDate/loaderDate.vue'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {

  head() {
      return {
    title:'Planeaciones editables, hojas de trabajo,material didáctico, cantos y juegos| Planeta Preescolar',
      }
  },
  data() {
    return {
      // reflexiones:[],
      planeaciones:[],
      hojastrabajo:[],
      hojasilustrar:[],
      materialdidactico:[],
      interactivos:[],
      buscando: false,

    };
  },
  // methods:{
  //   ...mapMutations(['guardarVistaValida']),
  // },
  async mounted() {
      // this.guardarVistaValida(true); 
      await this.cargabaseGral()
  },
  computed: {
    ...mapState(['datosUsuario','categorias', 'loading']),
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
   this.cambiaLoading('inicia')
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

                  if(data.tipo !== "blog" || data.tipo !== "reflexion" || data.tipo !== "memoria")
                    data.premium =  typeof(data.premium) === "undefined" ? false : data.premium

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
        console.log("YA HAY DATOS EN CATEGORIAS")
        // console.log(this.categorias)
        this.updateCategoriasInicio([...this.categorias])
        this.sliceCategoriasInicio();
      }
         this.cambiaLoading('finaliza')
    },

    updateCategoriasInicio(datos){
      datos.map(cat => {

        if(cat.tipo === "planeacion"  && 
          ( cat.edopost === "publico" && cat.permisoadmin || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id) ) )
            this.planeaciones.push(cat)
  
        else if(cat.tipo === "materialdidactico"  && 
          (cat.edopost === "publico" && cat.permisoadmin || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id)) )
            this.materialdidactico.push(cat)

        else if(cat.tipo === "hojatrabajo"  && 
          (cat.edopost === "publico" && cat.permisoadmin || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id)) )
            this.hojastrabajo.push(cat)

        else if(cat.tipo === "hojailustrar"  && 
          (cat.edopost === "publico" && cat.permisoadmin || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id)) )
            this.hojasilustrar.push(cat)

        else if(cat.tipo === "interactivo"  && 
          (cat.edopost === "publico" && cat.permisoadmin || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id)) )
            this.interactivos.push(cat)
        
        // else if(cat.tipo === "otro"  && 
        //   (cat.edopost === "publico" || (cat.edopost === "privado" && cat.idCreador === this.datosUsuario.id)) )
        //     this.otros.push(cat)


      })

    },
    async sliceCategoriasInicio(){

    
      this.planeaciones = 
        this.planeaciones.length > 4 ? await this.listaAleatoria(this.planeaciones) : this.planeaciones.slice(0, 4) 
      
      this.hojastrabajo = 
        this.hojastrabajo.length > 4 ? await this.listaAleatoria(this.hojastrabajo) : this.hojastrabajo.slice(0, 4) 
      
      this.hojasilustrar = 
        this.hojasilustrar.length > 4 ? await this.listaAleatoria(this.hojasilustrar) : this.hojasilustrar.slice(0, 4) 
      
      this.materialdidactico = 
        this.materialdidactico.length > 4 ? await this.listaAleatoria(this.materialdidactico) : this.materialdidactico.slice(0, 4) 

      this.interactivos = 
        this.interactivos.length > 4 ? await this.listaAleatoria(this.interactivos) : this.interactivos.slice(0, 4) 
      
      // this.otros = 
      //   this.otros.length > 4 ? await this.listaAleatoria(this.otros) : this.otros.slice(0, 4) 
      
    }
  },
};
</script>
