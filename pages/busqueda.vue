<template>
    <v-main>
        
        <Spinner v-if="spinner" />
        <div v-else-if="datosBusqueda.tipo !== 'TODOS LOS RECURSOS'">
            <h2 class="pirmary--text" v-if="busquedaFiltrada.length !== 0" >{{tituloResultados}}</h2>
            <h2 class="pirmary--text" v-else >No se encontraron coincidencias</h2>
        </div>

        <div v-if="datosBusqueda.tipo !== 'TODOS LOS RECURSOS'">
            <listablog 
                :esBusqueda="true" 
                :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                :tipo="this.datosBusqueda.tipo" 
                titulo="" 
                subtitulos=""
                
            />
        </div>

        <!-- <v-row 
            class="mb-6" no-gutters
            v-if="datosBusqueda.tipo !== 'TODOS LOS RECURSOS'"
        >
            <v-col v-for="(el, index) in busquedaFiltrada" 
            :key="index" cols="12" md="3" sm="6" class=" mb-3">

                <v-card
                    class=" grey lighten-3 d-flex justify-center align-center mx-2"
                    height="150px"
                >
                    <v-img
                    :src="el.urlImagen"
                    class="fotomini"
                    @click="mostrarElemento(el)"
                    
                    ></v-img>
                </v-card>

                <div>
                    <div class=" ml-3 textos">
                        <h4>{{el.titulo}}</h4>
                        <p class="texto_busqueda">{{el.nombreCreador}}</p>
                        <p 
                            v-if="datosBusqueda.tipo === 'RECOMENDACION'" 
                            class="texto_busqueda">{{el.materia}}
                        </p>
                        <p 
                            v-if="datosBusqueda.tipo === 'RECOMENDACION'" 
                            class="texto_busqueda">{{el.grado}}
                        </p>

                    </div>
                </div>

          </v-col>
        </v-row> -->

        <div v-else-if="datosBusqueda.tipo === 'TODOS LOS RECURSOS' && !spinner">
            <div>
                <h2  class="pirmary--text" v-if="!spinner" >Resultados:</h2>
                <!-- <h2 class="pirmary--text" v-else >No se encontraron coincidencias</h2> -->
            </div>
            <!------recomendaciones----->
            <!-- <div style="width:100%; height:50px;"></div> -->
            <listablog 
                :esBusqueda="true" 
                :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                tipo="RECOMENDACION" 
                titulo="Recomendaciones" 
                subtitulos=""   
            />

            <!-------Blog------------->
            <!-- <div style="width:100%; height:50px;"></div> -->
            <listablog 
                :esBusqueda="true" 
                :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                tipo="BLOG" 
                titulo="Blogs" 
                subtitulos="" 
            />

            <!---------memorias------------>
            <!-- <div style="width:100%; height:50px;"></div> -->
            <listablog 
                :esBusqueda="true" 
                :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                tipo="MEMORIA" 
                titulo="Memorias" 
                subtitulos=""
            />

            <!-- RECURSOS TIPO FILE -->
            <listablog 
                :esBusqueda="true" 
                :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                tipo="AUDIOS" 
                titulo="Audios" 
                subtitulos=""
            />
            <listablog 
                :esBusqueda="true" 
                :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                tipo="VIDEOS" 
                titulo="Videos" 
                subtitulos=""
            />
            <listablog 
                :esBusqueda="true" 
                :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                tipo="IMAGENES" 
                titulo="Imagenes" 
                subtitulos=""
            />
            <!-- <listablog 
            :esCompleto="false" 
            tipo="IMAGENES" 
            titulo="Imagenes de la educadora" 
            subtitulos="fotos o imágenes de apoyo para clases"  
            linkmas="imagenes" /> -->


        </div>

        <!-- <v-dialog v-model="vistaElemento" fullscreen >
            <v-card >
                <v-card-text style="text-align: right; ">
                    <span class="primary--text" style="font-weight: bold; text-align: right;" @click="vistaElemento=false">X</span>

                    <div  max-width="100%" style="height:100px; "></div>
                    <v-container class="ma-auto elevation-3 rounded-ml fondo">
                
                        <div  max-width="100%" style="height:90px; "></div>
                        <h2 class="primary--text pa-5"><b>{{elementoSeleccionado.titulo}}</b> </h2>
                        <span >{{elementoSeleccionado.nombre}} {{elementoSeleccionado.apellido}}</span>

                        <v-section class="pa-5" v-html="elementoSeleccionado.contenido"  >
                            
                        </v-section>

                        <v-img  
                            :src="elementoSeleccionado.urlImagen!=='' ? elementoSeleccionado.urlImagen : 'images/logos/planeta_preescolar_logo.png'" 
                            style="max-width:100%;  width:100%; background-color:azure; " >
                        </v-img> 

                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog> -->

        <!-- {{mostrando}} -->

    </v-main>
</template>
<script>

import { mapState, mapMutations, mapActions } from 'vuex'
import listablog from '~/components/listado-blog/listado-blog.vue'
import Spinner from '~/components/spinner.vue'



export default {
    data(){
        return {
            mostrando:"carga resultados",
            busquedaFiltrada: [],
            vistaElemento: false,
            elementoSeleccionado: {},
            spinner: true,
            datos: [],
            // recursos:[
            //     'BLOG',
            //     'MEMORIA',
            //     'RECOMENDACION',
            //     'REFLEXIONES',
            // ],
        }
    },
    components:{
        listablog,
        Spinner
    },
    computed: {
        ...mapState(['datosUsuario','datosBusqueda','recursosBusqueda']),
        tituloResultados(){
            let tipoM = "";
            if(this.datosBusqueda.tipo === "REFLEXIONES")
                tipoM= "Resultados reflexiones";
            else if(this.datosBusqueda.tipo === "RECOMENDACION")
                tipoM= "Resultados recomendaciones";
            else if(this.datosBusqueda.tipo === "MEMORIA")
                tipoM= "Resultados memorias";
            else if(this.datosBusqueda.tipo === "BLOG")
                tipoM= "Resultados blogs";
            return tipoM;
        }
    },
    async mounted(){
        
        
        await this.initProceso();

    },
    methods: {
        ...mapActions(['obtenerRecursos']),
        async initProceso(){
            // this.buscandoDatos();
            await this.obtenerRecursos()
            // alert("paso1")

            
            this.filtarDatos();
            // alert("paso3")
        },
        filtarDatos(){
            console.log(this.recursosBusqueda);

            this.datos = [...this.recursosBusqueda]
            // console.log(this.datos);
            // alert("aqui 1")

            const clave = this.datosBusqueda.clave.toLowerCase().normalize("NFD");
            let recursos = [... this.datos];
            // console.log("clave")
            // console.log(clave)

            this.busquedaFiltrada = recursos.filter(recurso =>
                     recurso.tags.includes(clave) 
            )

            
            // console.log(this.busquedaFiltrada.length)

            // console.log(this.busquedaFiltrada);
            this.spinner =false;

        },
        mostrarElemento(elemento){
            this.vistaElemento = true
            this.elementoSeleccionado = elemento
        },
        
        
    },
}
</script>

<style>
    .fotomini{
        width: 100%;
        height: 150px;
    }
    .fondo{
        background-image:url('/images/back/backstart.jpg'); 
        background-position:top; 
        background-size: 100%; 
        background-repeat: repeat-x; 
        text-align: left; 
        max-width:1200px; 
        width:100%; 
    }
    .texto_busqueda{
        margin-bottom:0!important;
        font-size: 13.5px;
    }
</style>