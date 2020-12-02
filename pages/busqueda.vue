<template>
    <v-main >
        <div class="mx-3 text-center" >
            <buscador :esBuscando ="buscando" @updateBuscando="buscando=$event"/>
        </div>
        
        <div v-if="verResultados">
            <Spinner v-if="spinner" />
            <div v-else-if="datosBusqueda.tipo !== 'todos'">
                <h2 class="pirmary--text" v-if="busquedaFiltrada.length !== 0" >{{tituloResultados}}</h2>
                <h2 class="pirmary--text" v-else >No se encontraron coincidencias</h2>
            </div>

            <div v-if="datosBusqueda.tipo !== 'todos'">
                <listablog 
                    :blogpost="busquedaFiltrada" @updateBlogpost="busquedaFiltrada=$event"
                    tipo="CATEGORIAS"  :subtipo="this.datosBusqueda.tipo" 
                    titulo="" 
                    subtitulos=""
                />

            </div>

            

            <div v-else-if="datosBusqueda.tipo === 'todos' && !spinner">
                <div>
                    <h2  class="pirmary--text" v-if="!spinner" >Resultados:</h2>
                    <!-- <h2 class="pirmary--text" v-else >No se encontraron coincidencias</h2> -->
                </div>
                <!------planeaciones----->
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="planeaciones" @updateBlogpost="planeaciones=$event"
                    tipo="CATEGORIAS"  subtipo="planeacion"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()" 
                    titulo="Planeaciones" 
                    subtitulos=""   
                />

                <!------actividades----->
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="actividades" @updateBlogpost="actividades=$event"
                    tipo="CATEGORIAS"  subtipo="recurso"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()" 
                    titulo="Actividades" 
                    subtitulos=""   
                />

                <!-------Blog------------->
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="blogs" @updateBlogpost="blogs=$event"
                    tipo="CATEGORIAS"  subtipo="blog"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                    titulo="Blogs" 
                    subtitulos="" 
                />

                

                <!---------memorias------------>
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="memorias" @updateBlogpost="memorias=$event"
                    tipo="CATEGORIAS"  subtipo="memoria"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                    titulo="Memorias" 
                    subtitulos=""
                />

                <!-- Reflexion -->
                <listablog 
                    :blogpost="reflexiones" @updateBlogpost="reflexiones=$event"
                    tipo="CATEGORIAS"  subtipo="reflexion"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()"
                    titulo="Reflexiones" 
                    subtitulos=""
                />
                
                <!-- <listablog 
                :esCompleto="false" 
                tipo="IMAGENES" 
                titulo="Imagenes de la educadora" 
                subtitulos="fotos o imágenes de apoyo para clases"  
                linkmas="imagenes" /> -->


            </div>
        </div>


    </v-main>
</template>
<script>

import { mapState, mapMutations, mapActions } from 'vuex'
import listablog from '~/components/listado-blog/listado-blog.vue'
import Spinner from '~/components/spinner.vue'
import buscador from '~/components/buscador/buscador.vue'




export default {
    data(){
        return {
            mostrando:"carga resultados",
            busquedaFiltrada: [],
            vistaElemento: false,
            elementoSeleccionado: {},
            spinner: true,
            datos: [],
            subtipo:"",
            reflexiones:[],
            blogs:[],
            memorias:[],
            planeaciones:[],
            actividades:[],
            recursos:[
                'todos',
                'blog',
                'memoria',
                'reflexion',
                'planeacion',
                'recurso',
            ],
            validBusqueda: true,
            buscando: false,
            verResultados: true,
            tipoCat: null,
            cont: 0,
        }
    },
    components:{
        listablog,
        Spinner,
        buscador
    },
    computed: {
        ...mapState(['datosUsuario','datosBusqueda','recursosBusqueda']),
        tituloResultados(){
            console.log("this.datosBusqueda.tipo")
            if(this.cont !== 0)
                this.tipoCat = this.datosBusqueda.tipo;
            else
                this.cont++;
            console.log(this.datosBusqueda.tipo)
            let tipoM = "";
            if(this.datosBusqueda.tipo === "reflexion")
                tipoM= "Resultados reflexiones";
            else if(this.datosBusqueda.tipo === "'planeacion")
                tipoM= "Resultados planeaciones";
            else if(this.datosBusqueda.tipo === "recurso")
                tipoM= "Resultados recursos";
            else if(this.datosBusqueda.tipo === "memoria")
                tipoM= "Resultados memorias";
            else if(this.datosBusqueda.tipo === "blog")
                tipoM= "Resultados blogs";
            
            return tipoM;
        }
    },
     mounted(){
        
        
        this.buscando = !this.buscando;
        console.log(this.tipoCat)
        // this.tipoCat = this.datosBusqueda.tipo

    },
    methods: {
        ...mapActions(['obtenerRecursos']),
        async initProceso(){
            await this.obtenerRecursos()
            console.log(this.recursosBusqueda)
            // alert("paso1")

            
            this.filtarDatos();
            // alert("paso3")
        },
        filtarDatos(){
            // console.log(this.recursosBusqueda);

            this.datos = [...this.recursosBusqueda]
            // console.log(this.datos);
            // alert("aqui 1")

            const clave = this.datosBusqueda.clave.toLowerCase().normalize("NFD");
            let recursos = [... this.datos];

            if(this.datosBusqueda.tipo !== "todos")
            {
                this.busquedaFiltrada = recursos.filter(recurso =>
                    (recurso.tags.includes(clave) && recurso.edopost === "publico")
                )
            }
            else
            {
                this.memorias = recursos.filter(recurso =>
                    (recurso.tags.includes(clave) && recurso.edopost === "publico") &&
                    recurso.tipo === "memoria"
                )
               this.blogs = recursos.filter(recurso =>
                    (recurso.tags.includes(clave) && recurso.edopost === "publico") &&
                    recurso.tipo === "blog"
                )
                this.reflexiones = recursos.filter(recurso =>
                    (recurso.tags.includes(clave) && recurso.edopost === "publico") &&
                    recurso.tipo === "reflexion"
                )
                this.actividades = recursos.filter(recurso =>
                    (recurso.tags.includes(clave) && recurso.edopost === "publico") &&
                    recurso.tipo === "recurso"
                )
                this.planeaciones = recursos.filter(recurso =>
                    (recurso.tags.includes(clave) && recurso.edopost === "publico") &&
                    recurso.tipo === "planeacion"
                )
            }


            // console.log(this.tipo)
            console.log(this.busquedaFiltrada)

            
            // console.log(this.busquedaFiltrada.length)

            // console.log(this.busquedaFiltrada);
            this.spinner =false;
            this.verResultados= true;


        },
        mostrarElemento(elemento){
            this.vistaElemento = true
            this.elementoSeleccionado = elemento
        },
        buscarDato(){
            // console.log(this.datosBusqueda)
            this.$router.push('/busqueda')

        },
        validateBusqueda () {
            const vd = this.$refs.formBusqueda.validate();
            this.validBusqueda = vd;
            if(this.validBusqueda)
              this.buscarDato()
          },
        
        
    },
    watch: {
    async buscando() {
        // this.verResultados= false;
        await this.initProceso();
    },
    async tipoCat(){
        console.log("BUSQUEDA CAMBIO")
        this.verResultados= false;

    }

  }
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

    /* ESTILOS DE BUSCADOR */
    /*css de buscador */
.backbuscador{
    background-image:url('/images/nubes.png');
    background-size: 100%;
    background-position: bottom;
}

.v-input__slot{
    background-color:#fff;
}

.modbuscador{
    border-radius:15px;
}

.btn{
    cursor: pointer;
}

</style>