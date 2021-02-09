<template>
    <v-main>
<h2>Administrador de Landing Page</h2>


<v-btn class="melon white--text" @click="addpage=true">
    Crear Nueva Pagina
</v-btn>




<v-dialog
      v-model="addpage"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
<v-card>
        <v-card-title class="melon">
            Crea Nueva Pagina <v-spacer></v-spacer> <v-btn class="primary white--text" @click="addpage=false">Cerrar</v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field label="Ingrese el titulo de la pagina"  v-model="datalp.titulo"></v-text-field>  
                <v-text-field label="url-del-sitio " disabled v-model="creaurlsitio"></v-text-field>
    <v-label class="primary white--text">
        {{urldesitio}}
    </v-label>

                    <br />
                <v-combobox
                    v-model="datalp.tags"
                    hide-selected
                    label="Ingrese las palabras clave de busqueda para los buscadores"
                    multiple
                    small-chips
                    solo
                    >

                    </v-combobox>
                    <br />

                <VueEditor class="elevation-3 rounded-lg" v-model="datalp.contenido" ></VueEditor>
<v-label>Quill</v-label>
                <Quill></Quill><br /><br />
    <v-btn class="melon white--text"  @click="guardarCambios()">Guardar Cambios</v-btn>
            </v-card-text>
</v-card>
</v-dialog>





        </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import { VueEditor, Quill } from "vue2-editor";
export default {
    data(){
        return {
            datapage:{
                permisos:3,
                logeado:true,
               
            },
             addpage:false,
             datalp:{
                 url:""
             },
             sitioweb:""
        }
    },
    computed:{
        urldesitio(){
             var sitioweb=window.location.href.replace('landingpage','v')
        if(!this.datalp.url){
            this.datalp.url=""
        }
     sitioweb=sitioweb+"/"+this.datalp.url
        return sitioweb
        },
        creaurlsitio(){
             var urlSitio=this.datalp.titulo
            if(this.datalp.titulo){
             urlSitio=urlSitio.toLowerCase()   
             urlSitio=urlSitio.replaceAll(" ","-")
             urlSitio=urlSitio.replaceAll("á","a")
             urlSitio=urlSitio.replaceAll("é","e")
             urlSitio=urlSitio.replaceAll("í","i")
             urlSitio=urlSitio.replaceAll("ó","o")
             urlSitio=urlSitio.replaceAll("ú","u")   
            }else{
                
                 urlSitio=""
            }
            this.datalp.url=urlSitio
            return urlSitio
        }
    },
    components:{
        VueEditor,
        Quill
    },

    methods:{
        async guardarCambios(){
            await this.$fireStore.collection('landingpage').where('url','==',this.datalp.url).get()
            .then((data)=>{
  //await this.$fireStore.collection('landingpage').add(this.datalp)
           data.docs.forEach((di)=>{
             if(di.data().titulo){

                console.log(di)
             
             
             }else{


             }
           })
            })
           
        }
    },
    mixins:[validasitio]
}
</script>