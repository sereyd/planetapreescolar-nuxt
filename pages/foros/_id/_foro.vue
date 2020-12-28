<template>
  <v-row class="pa-10">
    <v-col cols="12" md="10">
      <v-row>
        <v-col cols="12" md="12">
          <v-card>
            <v-card-title>
              <h3>{{ datosforo.titulo }}</h3>
            </v-card-title>

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
        <v-col cols="12" md="12" >
          <v-card>
            <v-card-text>
                   <v-textarea 
                        outlined
                        name="input-7-4"
                        label="Ingrese su comentario"
                        v-model="comentario"
                        ></v-textarea>    

                <v-btn class="melon white--text" style="text-transform:none;">Enviar Comentario</v-btn>

            </v-card-text>
          </v-card>
        </v-col>
             <v-col cols="12" md="12" >
               <h4 class="primary--text"> 0 Comentarios </h4>
                 

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
import { mapState } from "vuex";
export default {
  async asyncData({ params }) {
    const foro = params.foro;
    const uid = params.id;
    return {
      url: foro + " con id: " + uid,
      datosforo:{},
      comentario:""
    };
  },
  computed: {
    ...mapState(["foroselect","datosUsuario"])
  },
  mounted(){
      if(Object.keys(this.foroselect).length===0){
///// en caso de no tener por store datos de foro se llama datos a firebase 
      }else{
          this.datosforo=this.foroselect
      }
  }
};
</script>
