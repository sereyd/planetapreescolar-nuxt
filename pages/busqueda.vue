<template>
    <v-main >
        <div class="mx-3 text-center" >
            <v-row>
                <v-col cols="12">
                    <buscador :esBuscando ="buscando" @updateBuscando="initProceso($event)"/>
                </v-col>
            </v-row>
        </div>
  

                <listablog 
                    ref="listablog"
                    :blogpost="busq.tipo"
                    :busqueda="busq.clave"
                    tipo="CATEGORIAS"  subtipo="planeacion"  
                    titulo="Resultados de busqueda: " 
                    subtitulos="Resultado de buequeda"   
                />
          
     
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
            buscando: false,
            busq:{}
        }
    },
    components:{
        listablog,
        Spinner,
        buscador
    },
    computed: {
        ...mapState(['datosUsuario','datosBusqueda','categorias','loading']),     
    },
     mounted(){
        this.cambiaLoading('finaliza')
        setTimeout(()=>{
                this.initProceso()
        },1000)
     
    },
    methods: {
        ...mapMutations(['cambiaLoading']),
        initProceso(){
            if(Object.keys(this.datosBusqueda).length>0){
            console.log('inicia proceso')
               this.busq=this.datosBusqueda
                  this.$refs.listablog.loadBase(this.busq.tipo)
            }else{
                console.log('intento')
                initProceso()
            }
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