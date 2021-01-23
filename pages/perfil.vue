<template>
<v-row >
<v-col cols="12" md="6" class="text-center pa-10">
    <subirimagen
              ejecimagen="uploadimg"
              v-if="editar===true && datosuser.urlImagen==='' "
              @updateImg="previewIedit=$event"
              titulo="Subir imagen de pefil "
            ></subirimagen>



    <v-avatar color="primary"
    size="300"
    v-if="datosuser.urlImagen!==''"
    >
    <img  :src="datosuser.urlImagen" />
    </v-avatar>
<br />

<v-btn class="primary white--text" v-if="editar===true && datosuser.urlImagen===''" @click="subirImg()">Subir Imagen</v-btn>
<v-btn class="red white--text" v-if="editar===true && datosuser.urlImagen!==''" @click="delimagen()">Eliminar Imagen</v-btn>

<h1 v-if="editar===false">{{datosuser.nombre}} {{datosuser.apellido}}</h1>
    <div v-if="editar===true">
        <label  v-if="editar===false" >Nombre</label>
        <v-text-field label="Nombre" v-model="datosUsuario.nombre" hide-details="auto"></v-text-field>
        <label  v-if="editar===false"  >Apellido</label>
        <v-text-field label="Apellido" v-model="datosUsuario.apellido" hide-details="auto"></v-text-field>
        </div>


<v-btn  v-if="editar===false"  class="melon white--text" @click="editar=true"> Editar perfil </v-btn>
<!-- <p>membresia: {{datosUsuario.idMembresia}}</p> -->
<v-btn  v-if="editar===false && datosUsuario.idMembresia"  class="melon white--text" @click="opcMembresia()"> Membresia </v-btn>

    </v-col>
    <v-col cols="12" md="6" class="pa-10">

<label class="labelview"   v-if="editar===false"  >País</label>
        <div class="textview"  v-if="editar===false" >{{datosuser.pais}}</div >
        <v-text-field class="inputTextView" label="País" v-model="datosuser.pais" hide-details="auto"  v-if="editar===true"  ></v-text-field>

<label class="labelview"   v-if="editar===false" >Estado</label>
        <div class="textview"  v-if="editar===false" >{{datosuser.estado}}</div >
        <v-select class="inputTextView"  label="estado" v-model="datosuser.estado" hide-details="auto" :items="estado" v-if="editar===true" ></v-select>



<label class="labelview"   v-if="editar===false" >Ciudad</label>
        <div class="textview"  v-if="editar===false" >{{datosuser.ciudad}}</div >
        <v-text-field class="inputTextView"  label="Ciudad" v-model="datosuser.ciudad" hide-details="auto"  v-if="editar===true" ></v-text-field>



<label class="labelview"   v-if="editar===false" >Teléfono</label>
        <div class="textview"  v-if="editar===false">{{datosuser.telefono}}</div >
        <v-text-field class="inputTextView" label="Teléfono" v-model="datosuser.telefono" hide-details="auto" v-if="editar===true" ></v-text-field>


<label class="labelview"   v-if="editar===false" >Correo</label>
        <div class="textview" >{{datosuser.correo}}</div >
       





<label class="labelview"   v-if="editar===false" >Años de experiencia</label>
        <div class="textview"  v-if="editar===false" >{{datosuser.exp}}</div >
        <v-text-field class="inputTextView" label="Años de experiencia" v-model="datosuser.exp" hide-details="auto"  v-if="editar===true" ></v-text-field>


<label class="labelview"    v-if="editar===false" >¿Por que elegí esta profesión?</label>
        <div class="textview"  v-if="editar===false">{{datosuser.profesion}}</div >
        <v-text-field class="inputTextView" label="¿Por que elegí esta profesión?"  v-model="datosuser.profesion" hide-details="auto"  v-if="editar===true" ></v-text-field>
<label class="labelview"   v-if="editar===false" >Acerca de mi</label>
        <div class="textview"   v-if="editar===false" >{{datosuser.acerca}}</div >
        <v-text-field class="inputTextView" label="Acerca de mi" v-model="datosuser.acerca" hide-details="auto"  v-if="editar===true"  ></v-text-field>




<br /><br />
            <v-btn  v-if="editar===true" class="melon white--text" @click="guardarCambios()">Guardar Cambios</v-btn>



<hr />

  
    </v-col>

<simpleloader :stload="loader" ></simpleloader>


    </v-row>
</template>
<style scoped>
.textview{
    width: 100%;
    font-size: 18px;
    border-bottom:solid 1px  #ccc;  
    margin-bottom:20px;
}
.labelview{
    font-weight: bold;
    margin-top:10px;
}
.inputTextView{
    margin-top:20px;
}
.v-btn{
    letter-spacing: 0em;
    /* justify-content: center; */
    text-indent: 0em;
    /* text-transform: uppercase; */
    text-transform: none;
    /* align-items: flex-start; */
  }
</style>
<script>

import {mapState,mapActions, mapMutations} from 'vuex'
import simpleloader from '~/components/simpleloader/simpleloader.vue'
import subirimagen from "~/components/subirimagen/subirimagen.vue"
export default {
    
data(){
    return {
        datosuser:{},
        loader:false,
        editar:false,
        previewIedit:"",
        uploadimg:false,
        estado:[
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
	'Campeche',
	'Chiapas',
	'Chihuahua',
	'Coahuila de Zaragoza',
	'Colima',
	'Ciudad de México',
	'Durango',
	'Guanajuato',
	'Guerrero',
	'Hidalgo',
	'Jalisco',
	'Estado de Mexico',
	'Michoacan de Ocampo',
	'Morelos',
	'Nayarit',
	'Nuevo Leon',
	'Oaxaca',
	'Puebla',
	'Queretaro de Arteaga',
	'Quintana Roo',
	'San Luis Potosi',
	'Sinaloa',
  'Sonora',
	'Tabasco',
	'Tamaulipas',
	'Tlaxcala',
	'Veracruz de Ignacio de la Llave',
	'Yucatan',
	'Zacatecas',
]
    }
},
computed:{
    ...mapState(['datosUsuario','dominio','urlAPI','urlimg'])
},
methods:{
    ...mapActions(['eliminarImagen','fotostorageAsync','creaNotificacion']),
    ...mapMutations(['almacenarFotoStorage']),
    cargadatos(){
        this.datosuser=this.datosUsuario
    },
    async guardarCambios(){ 
        try{
            this.loader=true
            await this.$fireStore.collection('usuarios').doc(this.datosUsuario.id).update(this.datosuser)
            .then((data)=>{
                console.log(data)
                 this.loader=false
                 this.editar=false
                     this.datosuser=this.datosUsuario

            })
        }catch(e){
            console.log(e)  

        }
    },
    opcMembresia(){

        fetch(this.urlAPI+'/customer-portal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: this.datosUsuario.idMembresia,
            dominio: `${this.dominio}/perfil`
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          window.location.href = data.url;
          
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    
    },
   async delimagen(){
  
            await this.eliminarImagen(this.datosuser.urlImagen)
            .then(()=>{
               this.datosuser.urlImagen=""
               this.guardarCambios()
            })
       
    },
 async subirImg(){
          if(this.previewIedit){
 var fotoAlumno= await this.fotostorageAsync("fotos_perfil/"+this.datosuser.id)
     this.$set(this.datosuser,'urlImagen',fotoAlumno)                
    }
 }
},
components:{
    simpleloader,
    subirimagen
},
mounted(){
        this.cargadatos()
}
}
</script>