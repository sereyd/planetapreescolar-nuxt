<template>
    <v-main>
        <h1>Resultados {{datosBusqueda.tipo}}</h1>
        <Spinner v-if="spinner" />
        <v-row class="mb-6" no-gutters
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
                        <p class="datosGrupo">{{el.fecha}}</p>
                        <!-- <p class="datosGrupo">{{el.cicloEscolar}}</p>
                        <p class="datosGrupo">{{el.total}} alumnos</p> -->
                    </div>
                </div>

          </v-col>
        </v-row>

        <v-dialog v-model="vistaElemento" fullscreen >
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
        </v-dialog>

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
        ...mapState(['datosUsuario','datosBusqueda','recursosBusqueda'])
    },
    mounted(){
        
        
        this.initProceso();

    },
    methods: {
        ...mapActions(['obtenerRecursos']),
        async initProceso(){
            // this.buscandoDatos();
            this.datos = await this.obtenerRecursos()
            // alert("paso1")

            // console.log(this.datos);
            // alert("paso2")
            this.filtarDatos();
            // alert("paso3")
        },
        filtarDatos(){
            const clave = this.datosBusqueda.clave.toLowerCase();
            let recursos = [... this.datos];

            this.busquedaFiltrada = recursos.filter( recurso => {
                return(
                    recurso.titulo.toLowerCase().includes(clave) ||
                    recurso.contenido.toLowerCase().includes(clave)

                )
            })

            console.log(this.busquedaFiltrada);
            this.spinner =false;

        },
        mostrarElemento(elemento){
            this.vistaElemento = true
            this.elementoSeleccionado = elemento
        },
        
        // buscandoDatos(){
        //     const {userlogin, id} = this.datosUsuario;
        //     console.log("datosUsuario")
        //     console.log(this.datosUsuario)
        //     console.log("buscando: ", this.datosBusqueda.clave)
        //     console.log("tipo: ", this.datosBusqueda.tipo)
            
        //     if(!userlogin)
        //     {
        //         console.log("USAURIO SIN REGISTRO")
        //         this.buscarPublicas();
        //     }
        //     else
        //     {
        //         console.log("USUARIO LOEGADO")

        //     }



        // },

        // async buscarPublicas(){
        //     try {
        //         await this.$fireStore.collection(this.datosBusqueda.tipo)
        //         .where("user","==",this.userId)  
        //         .get()
        //           .then((data) => {
        //             data.map((doc) => {
        //               this.blogpost.push(doc.data());
        //             });
        //           });
        //       } 
        //       catch (e) {
        //         console.log(e);
        //       }
        // },
        // buscarPrivadas(){
        //      try { 
        //         await this.$fireStore
        //         .collection(this.tipo)  
        //         .where("user","==",this.userId)  
        //         .get()
        //         .then((data) => {
        //             data.forEach((doc) => {
        //                 this.blogpost.push(doc.data());
        //             });
        //         });
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
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
</style>