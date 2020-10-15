<template>
<v-row >
<v-col cols="12" md="6" class="text-center pa-10">

    <v-avatar color="primary"
    size="300"
    >
    <img :src="datosuser.urlImagen" />
    </v-avatar><br />
<v-btn v-if="editar===true" class="melon white--text" @click="delimg()" >Eliminar foto</v-btn>

<h1 v-if="editar===false">{{datosuser.nombre}} {{datosuser.apellido}}</h1>
    <div v-if="editar===true">
        <label>Nombre</label>
        <v-text-field v-model="datosUsuario.nombre"></v-text-field>
        <label>Apellido</label>
        <v-text-field v-model="datosUsuario.apellido"></v-text-field>
        </div>


<v-btn class="melon white--text" @click="editar=true"> Editar perfil </v-btn>

    </v-col>
    <v-col cols="12" md="6" class="pa-10">
<label>Teléfono</label><br />
        <div class="textview"  v-if="editar===false">{{datosuser.telefono}}</div ><br />
        <v-text-field v-model="datosuser.telefono" v-if="editar===true" ></v-text-field><br />
<label>Años de experiencia</label><br />
        <div class="textview"  v-if="editar===false" >{{datosuser.exp}}</div ><br />
        <v-text-field v-model="datosuser.exp"  v-if="editar===true" ></v-text-field><br />
<label>País</label><br />
        <div class="textview"  v-if="editar===false" >{{datosuser.pais}}</div ><br />
        <v-text-field v-model="datosuser.pais"  v-if="editar===true"  ></v-text-field><br />
<label>Ciudad</label><br />
        <div class="textview"  v-if="editar===false" >{{datosuser.ciudad}}</div ><br />
        <v-text-field v-model="datosuser.ciudad"  v-if="editar===true" ></v-text-field><br />
<label >¿Por que elegí esta profesión?</label><br />
        <div class="textview"  v-if="editar===false">{{datosuser.profesion}}</div ><br />
        <v-text-field  v-model="datosuser.profesion"  v-if="editar===true" ></v-text-field><br />
<label>Acerca de mi</label><br />
        <div class="textview"   v-if="editar===false" >{{datosuser.acerca}}</div ><br />
        <v-text-field v-model="datosuser.acerca"  v-if="editar===true"  ></v-text-field><br />

        <v-progress-circular v-if="loader===true"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>


            <v-btn class="melon white--text" @click="guardarCambios()">Guardar Cambios</v-btn>
    </v-col>
    </v-row>
</template>
<style scoped>
.textview{
    width: 100%;
    font-size: 18px;
    border-bottom:solid 1px  #ccc;
}
</style>
<script>

import {mapState} from 'vuex'
export default {
    
data(){
    return {
        datosuser:{},
        loader:false,
        editar:false
    }
},
computed:{
    ...mapState(['datosUsuario'])
},
methods:{
     delimg(){
         try{
                let imgdel=this.$fireStorage.child(this.datosuser.urlImagen)

                 imgdel.delete()
                 .then((d)=>{
                 console.log(d)
                        })
         }catch(r){
             console.error(r)
         }   
    },
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
    }
},
mounted(){
        this.cargadatos()
}
}
</script>