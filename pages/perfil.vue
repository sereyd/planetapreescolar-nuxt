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
<v-btn  v-if="editar===false && datosUsuario.idMembresia"  class="melon white--text" @click="dialogSus = true"> Ver suscripción </v-btn>
<!-- <v-btn  v-if="editar===false && datosUsuario.idMembresia"  class="melon white--text" @click="opcMembresia()"> Membresia </v-btn> -->

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

<v-dialog v-model="dialogSus" persistent max-width="755">
      
    <v-card class=" px-10">
      <v-card-title class=" justify-space-between">
          <v-btn icon text small color="purple"  >
          </v-btn>
          <h3 class="primary--text ">Detalles de la suscripción</h3>
          <v-btn icon text small color="purple" @click="dialogSus = false" >
              <v-icon>mdi-window-close</v-icon>
          </v-btn>
      </v-card-title>
      
      <div class="mt-5" >

        <!-- <v-card class=" mt-4" > -->
            <!-- <div>
                {{datosSuscripcion}}
            </div> -->
          <v-row >
              <v-col cols="12" class="" v-if="datosSuscripcion.status">

                <v-row class="">
                    <v-col cols="4" xsm="6" md="4" lg="6" class="">
                        <h4 class="title">Tipo suscripción:</h4>
                    </v-col>
                    <v-col class="mt-1">
                        <p v-if="datosSuscripcion.plan.interval_count === 1">Mensual</p>
                        <p v-else-if="datosSuscripcion.plan.interval_count === 3">Trimestral</p>
                        <p v-else-if="datosSuscripcion.plan.interval_count === 6">Semestral</p>
                        <p v-else>Anual</p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="4" xsm="6" md="4" lg="6">
                        <h4 class="title">Importe:</h4>
                    </v-col>
                    <v-col class="mt-1">
                        <p>$ {{(datosSuscripcion.plan.amount / 100)}}</p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="4" xsm="6" md="4" lg="6" v-if="datosSuscripcion.pasarela === 'stripe'">
                        <h4 class="title">Siguiente cobro:</h4>
                    </v-col>
                    <v-col cols="4" xsm="6" md="4" lg="6" v-else>
                        <h4 class="title">Fecha de vencimiento:</h4>
                    </v-col>
                    <v-col class="mt-1">
                        <p v-if="!checarVencimientoP">{{fechaFormato}}</p>
                        <p v-else>Tu membresia a vencido</p>
                    </v-col>
                </v-row>

                

                
              </v-col>
              <v-col cols="12" class="" v-else>
                  <p>No cuentas con suscripción premium</p>
              </v-col>

              <!-- <v-col cols="9" class=" d-flex  texto_comentario ">
                  
              </v-col> -->
              <v-divider  class=" black mt-4"/> 
          </v-row>
      <!-- </v-card> -->
              
        <div class="d-flex justify-center pb-3" >
            <v-btn  
                v-if="editar===false && datosSuscripcion.status && datosSuscripcion.pasarela === 'stripe'"  
                class="melon white--text" @click="opcMembresia()"
            > Membresia </v-btn>
           

            <router-link v-else to="checkout" class="white--text menu-sec miniMovil" style="text-decoration:none; position:relative;" > 
                <v-btn  
                    class="melon white--text" 
                > Ver planes </v-btn>
            </router-link>

          <!-- <v-btn  dark class="red px-10 mb-5 btn_crearG mr-2" @click="notivisto(post)"  
            >Leído</v-btn> -->
        </div>
      </div>
    </v-card>
</v-dialog>

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
import { format } from 'date-fns'
import fromUnixTime from 'date-fns/fromUnixTime';
import {isPast} from 'date-fns';
import {compareAsc} from 'date-fns';
import { es } from 'date-fns/locale';
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
	'Zacatecas'],
        dialogSus: false,
        
    }
},
computed:{
    ...mapState(['datosUsuario','dominio','urlAPI','urlimg','datosSuscripcion']),
    fechaFormato(){
        // console.log(this.datosSuscripcion.plan.fechaFin)
        const f = fromUnixTime(this.datosSuscripcion.plan.fechaFin );
        // console.log(f)
        const ff = format(f, "dd/MM/yyyy", {locale: es});
        return ff;
    },
    checarVencimientoP(){

        const ff = fromUnixTime(this.datosSuscripcion.plan.fechaFin);
        const result = isPast(ff)
        console.log(result)
        return result;

    },
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
            'Access-Control-Allow-Origin': '*',
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