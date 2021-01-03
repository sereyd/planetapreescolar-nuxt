<template>
  <v-row class="pa-10">
    <v-col cols="12" md="10">


          <v-dialog v-model="addeditblog" max-width="800">
      <editablog
        :editar="datosforo"
        tipo="actualizar"
        @finaliza="addeditblog=$event"
        @actualizaforo="actualizaForos($event)"
      ></editablog>
    </v-dialog>

      <v-row>
        <v-col cols="12" md="12">
          <v-card>
            <v-card-title>
              <h3>{{ datosforo.titulo }}</h3><v-spacer></v-spacer><v-btn @click="editarblog()" v-if="datosUsuario.lvluser===3 || this.datosfoto.iduser === this.datosUsuario.id" class="melon white--text"><v-icon>mdi-file-edit-outline</v-icon></v-btn>
            </v-card-title>
            <h4>Categoría: {{datosforo.categoria}}</h4>
                
            <v-card-text v-html="datosforo.cuerpo"> </v-card-text>

            <v-card-text>
              <v-row>
                <v-col cols="12" md="12">
                  <v-icon>mdi-star</v-icon>
                  <v-icon>mdi-star</v-icon>
                  <v-icon>mdi-star</v-icon>
                  <v-icon>mdi-star</v-icon>
                  <v-icon>mdi-star</v-icon>
                </v-col>
                <v-col cols="12" md="12">
                  <v-avatar color="indigo" size="56">
                    <span class="white--text headline">36</span>
                  </v-avatar>
                  {{ datosforo.publicador }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="12" v-if="datosUsuario.userlogin===true" >
          <v-card>
            <v-card-text>
                   <v-textarea 
                        outlined
                        name="input-7-4"
                        label="Ingrese su comentario"
                        v-model="comentario"
                        ></v-textarea>    

                <v-btn class="melon white--text" @click="guardarComentario()" style="text-transform:none;">Enviar Comentario</v-btn>

            </v-card-text>
          </v-card>
        </v-col>
             <v-col cols="12" md="12" >
               <h4 class="primary--text"> {{ncoment}} Comentarios </h4>
                 

                <v-row>
                    <v-col cols="12" md="12" class="pa-6">

                        <v-card>
                          <!--  <v-card-text  v-for="(com,index) in datosforo.comentarios">

                            </v-card-text>--->
                        </v-card>
                        
                        </v-col>
                </v-row>


                 
                 </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="2">
      <v-card>
        <v-card-text>
          Ads Google
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

import { mapState,mapActions } from "vuex";
import editablog from '~/components/editor-blog/editor-blog.vue'
export default {
  async asyncData({ params }) {
    const foro = params.foro;
    const uid = params.id;
    return {
      url: foro + " con id: " + uid,
      datosforo:{},
      comentario:"",
      addeditblog:false,
      editdatosforo:{},
      lcomentarios:[]
    };
  },
  computed: {
    ...mapState(["foroselect","datosUsuario"]),
    ncoment(){
      this.foroselect.comentarios.forEach((coment)=>{
        if(this.datosUsuario.userlogin===true && this.datosUsuario.id === this.foroselect.iduser){
          this.lcomentarios.push(coment)
        }else{
        if(coment.validado===true){
          this.lcomentarios.push(coment)
          }
        }
      })

      return this.lcomentarios.length
    }
  },
  methods:{
    ...mapActions(['creaNotificacion']),
    editarblog(){
      this.addeditblog=true
      this.editdatosforo=this.foroselect
    },
    actualizaForos($datos){

    },
    guardarComentario(){

var imagenUser=""
      if(this.datosUsuario.urlImagen){
        imagenUser=this.datosUsuario.urlImagen
      }

      this.datosComentario={
        iduser:this.datosUsuario.id,
        nombre:this.datosUsuario.nombre+" "+this.datosComentario.apellido,
        imagen:imagenUser,
        comentario:this.comentario,
        fecha:new Date(),
        validado:false
      }

      this.datosforo.comentarios.push(this.datosComentario)
      this.comentario=""

  ///// guarda comentario en firebase 

         var datosdenotificacion={
                           user:this.datosforo.iduser,
                            icon:'mdi-text-box-check-outline', 
                            text:'se agrega un nuevo comentario',
                            link:'/foro/'+this.datosforo.id+"/"+this.datosforo.titulo,
                       }
                        this.creaNotificacion(datosdenotificacion)

      
     this.$fireStore.collection('foro').doc(this.datosforo.id).update({comentarios:this.datosforo.comentarios})

  ///// envia notificación

    }
  },
  mounted(){
      if(Object.keys(this.foroselect).length===0){
///// en caso de no tener por store datos de foro se llama datos a firebase 
      }else{
          this.datosforo=this.foroselect
      }
  },
  components:{
    editablog
  }
};
</script>
