<template>
    <v-main >
        <div class="mx-3 text-center" >
            <v-row>
                <v-col cols="12">
                    <buscador :esBuscando ="buscando" @updateBuscando="buscando=$event"/>
                </v-col>
                
                <!-- <v-col cols="2">
                    <v-btn tile small  @click="opcionesFiltrado()" color="melon" class="white--text" style="text-transform: none;">
                        <v-icon class="white--text" left>mdi-format-list-bulleted</v-icon>
                        Filtrar
                    </v-btn>
                </v-col> -->
            </v-row>
            <!-- <buscador :esBuscando ="buscando" @updateBuscando="buscando=$event"/> -->
            <!-- <v-btn tile small color="melon" class="white--text" style="text-transform: none;">
                <v-icon class="white--text" left>mdi-format-list-bulleted</v-icon>
                Filtrar
            </v-btn> -->
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

                <!------hojas de trabajo----->
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="hojastrabajo" @updateBlogpost="hojastrabajo=$event"
                    tipo="CATEGORIAS"  subtipo="hojatrabajo"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()" 
                    titulo="Hojas de trabajo" 
                    subtitulos=""   
                />

                <!------material didactico----->
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="materialdidactico" @updateBlogpost="materialdidactico=$event"
                    tipo="CATEGORIAS"  subtipo="materialdidactico"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()" 
                    titulo="Material didáctico" 
                    subtitulos=""   
                />

                <!------interactivos----->
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="interactivos" @updateBlogpost="interactivos=$event"
                    tipo="CATEGORIAS"  subtipo="interactivo"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()" 
                    titulo="Interactivos" 
                    subtitulos=""   
                />

                <!------otros----->
                <!-- <div style="width:100%; height:50px;"></div> -->
                <listablog 
                    :blogpost="otros" @updateBlogpost="otros=$event"
                    tipo="CATEGORIAS"  subtipo="otro"  
                    :datoBuscar= "this.datosBusqueda.clave.toLowerCase()" 
                    titulo="Otros" 
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


        <v-dialog v-model="dialogF" max-width="750">
            <v-card>
                <v-card-title class=" justify-space-between">
                    <v-btn icon text small color="purple">
                    <!-- <v-icon>mdi-arrow-left-bold</v-icon> -->
                    </v-btn>
                    <h3 class="primary--text ">Filtrado de datos</h3>
                    <v-btn icon text small color="purple" @click="dialogF = false">
                    <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="pb-3 " >
                    <v-form>
                        <v-row>
                            <v-col cols="6">
                                <div class="ml-3">
                                    <h4 class="mt-2">Tipo:</h4>
                                    <v-checkbox
                                        v-model="datosfiltrado.filtrovideo"
                                        label="videos"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="datosfiltrado.filtroaudio"
                                        label="audios"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="datosfiltrado.filtrofile"
                                        label="archivos"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>

                                    <h4 class="mt-4">Fecha:</h4>
                                    <v-radio-group
                                        v-model="fechaCarga"
                                        column
                                    >
                                        <v-radio
                                            label="Esta semana"
                                            color="melon"
                                            value="semana"
                                        ></v-radio>
                                        <v-radio
                                            label="Este mes"
                                            color="melon"
                                            value="mes"
                                        ></v-radio>
                                        
                                    </v-radio-group>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="ml-3">
                                    <h4 class="mt-2">Estado:</h4>
                                    <v-checkbox
                                        v-model="datosfiltrado.filtropremium"
                                        label="premium"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>
                                    <v-checkbox
                                        v-model="datosfiltrado.filtrofree"
                                        label="free"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>
                                </div>
                            </v-col>
                        </v-row>
                        
                        <v-btn small class="melon white--text" style="text-transform: none;" @click="filtarDatos()">Filtrar</v-btn>
                    </v-form>
                </div>
                
            </v-card>
        </v-dialog>
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
            materialdidactico:[],
            hojastrabajo:[],
            interactivos:[],
            otros:[],
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
            dialogF: false,
            // datosfiltrado:[
            //     {tipo:"video", estado: false},
            //     {tipo:"audio", estado: false},
            //     {tipo:"premium", estado: true},
            //     {tipo:"free", estado: true},
            // ],
            fechaCarga: "",
            datosfiltrado:{
                filtrovideo:false,
                filtroaudio:false,
                filtrofile:false,
                filtropremium:true,
                filtrofree: true
            }
        }
    },
    components:{
        listablog,
        Spinner,
        buscador
    },
    computed: {
        ...mapState(['datosUsuario','datosBusqueda','categorias']),
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
            else if(this.datosBusqueda.tipo === "memoria")
                tipoM= "Resultados memorias";
            else if(this.datosBusqueda.tipo === "blog")
                tipoM= "Resultados blogs";
            else if(this.datosBusqueda.tipo === "'planeacion")
                tipoM= "Resultados planeaciones";

            else if(this.datosBusqueda.tipo === "hojatrabajo")
                tipoM= "Resultados hojas de trabajo";
            else if(this.datosBusqueda.tipo === "materialdidactico")
                tipoM= "Resultados material didáctico";
            else if(this.datosBusqueda.tipo === "interactivo")
                tipoM= "Resultados interactivos";
            else if(this.datosBusqueda.tipo === "otro")
                tipoM= "Resultados otros";
            
            return tipoM;
        }
    },
     mounted(){
        
        
        this.buscando = !this.buscando;
        // console.log(this.tipoCat)
        // this.tipoCat = this.datosBusqueda.tipo

    },
    methods: {
        ...mapActions(['obtenerRecursos']),
        async initProceso(){
            await this.obtenerRecursos()
            // console.log(this.categorias)


            
            this.filtarDatos();
            // alert("paso3")
        },
        filtarDatos(){

            // if(!this.dialogF)
            // {
                this.datos = [...this.categorias]
                const {tipo} = this.datosBusqueda;
                // console.log(this.datosBusqueda.tipo)
                let recursos = [... this.datos];
            // }
            const clave = this.datosBusqueda.clave.toLowerCase().normalize("NFD");

            // alert("aqui 1")


            if(this.datosBusqueda.tipo !== "todos")
            {
                console.log("SOLO DE UN TIPO")
                console.log(this.datosBusqueda.tipo)
                this.busquedaFiltrada = recursos.filter(recurso =>
                    (this.esMatch(recurso, clave) && (recurso.edopost === "publico" && recurso.tipo === tipo))
                )
            }
            else
            {
                
                this.memorias = [], this.blogs=[], this.reflexiones=[], this.planeaciones=[], 
                this.materialdidactico=[], this.hojastrabajo=[], this.interactivos=[], this.otros=[],
                recursos.map(recurso =>
                {
                    // console.log(recurso)
                    let matched = this.esMatch(recurso, clave)
                    // console.log("HUBO MATCH : "+matched)
                    if( (matched && recurso.edopost === "publico"))
                    {
                        if(recurso.tipo === "memoria")
                            this.memorias.push(recurso);

                        if(recurso.tipo === "blog")
                            this.blogs.push(recurso);

                        if(recurso.tipo === "reflexion")
                            this.reflexiones.push(recurso);

                        if(recurso.tipo === "planeacion")
                            this.planeaciones.push(recurso);

                        if(recurso.tipo === "materialdidactico")
                            this.materialdidactico.push(recurso);

                        if(recurso.tipo === "hojatrabajo")
                            this.hojastrabajo.push(recurso);

                        if(recurso.tipo === "interactivo")
                            this.interactivos.push(recurso);

                        if(recurso.tipo === "otro")
                            this.otros.push(recurso);


                    }

                })
            //    this.blogs = recursos.filter(recurso =>
            //         (this.esMatch(recurso, clave) && recurso.edopost === "publico") &&
            //         recurso.tipo === "blog"
            //     )
            //     this.reflexiones = recursos.filter(recurso =>
            //         (this.esMatch(recurso, clave) && recurso.edopost === "publico") &&
            //         recurso.tipo === "reflexion"
            //     )
            //     this.planeaciones = recursos.filter(recurso =>
            //         (this.esMatch(recurso, clave) && recurso.edopost === "publico") &&
            //         recurso.tipo === "planeacion"
            //     )
            //     this.materialdidactico = recursos.filter(recurso =>
            //         (this.esMatch(recurso, clave) && recurso.edopost === "publico") &&
            //         recurso.tipo === "materialdidactico"
            //     )
            //     this.hojastrabajo = recursos.filter(recurso =>
            //         (this.esMatch(recurso, clave) && recurso.edopost === "publico") &&
            //         recurso.tipo === "hojatrabajo"
            //     )
            //     this.interactivos = recursos.filter(recurso =>
            //         (this.esMatch(recurso, clave) && recurso.edopost === "publico") &&
            //         recurso.tipo === "interactivo"
            //     )
            //     this.otros = recursos.filter(recurso =>
            //         (this.esMatch(recurso, clave) && recurso.edopost === "publico") &&
            //         recurso.tipo === "otro"
            //     )
            }


            // console.log(this.tipo)
            // console.log(this.busquedaFiltrada)

            
            // console.log(this.busquedaFiltrada.length)

            // console.log(this.busquedaFiltrada);
            this.spinner =false;
            this.verResultados= true;
            this.dialogF= false;

            


        },
        
        esMatch(recurso, clave){
            let {tags, titulo, contenido, sinopsis, materia, tipo, tipoRecurso, premium} = recurso;
            let response = false;

            if(tipo !== "blog" || tipo !== "reflexion" || tipo !== "memoria")
                premium =  typeof(premium) === "undefined" ? false : premium
            // console.log(recurso)

            const {filtrovideo, filtroaudio, filtrofile, filtropremium, filtrofree} = this.datosfiltrado;

            if(recurso.tipo === "planeacion" || recurso.tipo === "materialdidactico" || recurso.tipo === "hojatrabajo" || recurso.tipo === "interactivo")
            {
                let {sinopsis, materia} = recurso;
                materia = materia ? materia : "";
                sinopsis = sinopsis ? sinopsis : "";
               

                response = 
                ( 
                    tags.includes(clave) || 
                    titulo.toLowerCase().normalize("NFD").includes(clave) || 
                    contenido.toLowerCase().normalize("NFD").includes(clave) || 
                    sinopsis.toLowerCase().normalize("NFD").includes(clave) || 
                    materia.toLowerCase().normalize("NFD").includes(clave) 
                )
                    
                ? true : false;

                // console.log("MATCH NORMAL: "+response)

                //REVISAR SI SE QUIERE HACER UN FILTRADO AVANZADO
                // if( (filtrovideo || filtroaudio || filtrofile || this.fechaCarga !== "") && response)
                // {
                //     // console.log("REVISANDO MATCH AVANZADO: ")

                    

                //     let resFiltro = false;
                //     // this.datosfiltrado.map(dat => {
                        
                //         if(filtrovideo)
                //             resFiltro = tipoRecurso === "link"
                        
                // // console.log("MATCH : "+resFiltro)


                //         if(filtroaudio && !resFiltro)
                //             resFiltro = tipo === "interactivo" && tipoRecurso !== "link"
                        
                //         if(filtrofile && !resFiltro)
                //             resFiltro = tipoRecurso === "file"

                // // console.log("MATCH : "+resFiltro)
                        
                        
                //         if(filtropremium !== filtrofree && resFiltro)
                //         {

                //             // console.log("free: "+filtrofree+ "  premium: "+filtropremium)

                //             if(filtropremium)
                //                 resFiltro = premium === true
    
                //             else if(filtrofree)
                //                 resFiltro = premium === false
                //         }

                //         if(this.fechaCarga !== "" && resFiltro)
                //         {
                //             const fec = recurso.fecha.toString();
                //             // console.log(fec)
                //             let fechaNueva = fec.slice(0, 10);
                //             // console.log(fechaNueva);
                //             const fechaN = parseInt(fechaNueva);
                //             console.log("FECHA DEL POST");
                //             console.log(fechaN);
                            
                //             //FECHA ACTUAL
                //             let now = Date.now() 
                //             // console.log(now);
                //             const fa = now.toString();
                //             // console.log(fa)
                //             let faNueva = fa.slice(0, 10);
                //             // console.log(faNueva);
                //             const fechaAN = parseInt(faNueva);
                //             console.log("FECHA ACTUAL");
                //             console.log(fechaAN);

                            
                //         }

                // // console.log("MATCH : "+resFiltro)

  
                //     // })
                //     // console.log("FILTRO AVANZADO: "+resFiltro)
                //     response = resFiltro ? true : false
                // }

            }
            else
            {
                response = 
                ( 
                    tags.includes(clave) || 
                    titulo.toLowerCase().normalize("NFD").includes(clave) || 
                    contenido.toLowerCase().normalize("NFD").includes(clave) )
                ? true : false;

                //REVISAR SI SE QUIERE HACER UN FILTRADO AVANZADO
                // if( (filtrovideo || filtroaudio || filtrofile || this.fechaCarga !== "" ) && response )
                // {

                //     let resFiltro = false;
                //     // this.datosfiltrado.map(dat => {
                        
                //         if(filtrovideo)
                //             resFiltro = tipoRecurso === "link"

                //         if(filtroaudio && !resFiltro)
                //             resFiltro = tipo === "interactivo" && tipoRecurso !== "link" 
                        
                //         if(filtrofile && !resFiltro)
                //             resFiltro = tipoRecurso === "file"

                //         if(filtropremium !== filtrofree && resFiltro)
                //         {

                //             if(filtropremium)
                //                 resFiltro = premium === true
    
                //             else if(filtrofree)
                //                 resFiltro = premium === false
                //         }
  
                //     // })
                //     // console.log("FILTRO AVANZADO: "+resFiltro)
                //     response = resFiltro ? true : false
                // }

            }
            // console.log(response)
            return response;
        },
        opcionesFiltrado(){
            this.dialogF = true;
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
.v-input--selection-controls{
    margin-top: 0px!important;
}

</style>