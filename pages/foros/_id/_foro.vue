<template>
  <v-row class="pa-10">
    <v-col cols="12" md="10">
      <v-dialog v-model="addeditblog" max-width="800">
        <editablog
          :editar="datosforo"
          tipo="actualizar"
          @finaliza="addeditblog = $event"
          @actualizaforo="actualizaForos($event)"
        ></editablog>
      </v-dialog>

      <v-row>
        <v-col cols="12" md="12">
          <v-card>
            <v-card-title>
              <h3>{{ datosforo.titulo }}</h3>
              <v-spacer></v-spacer
              ><v-btn
                @click="editarblog()"
                v-if="
                  datosUsuario.lvluser === 3 ||
                    this.datosforo.iduser === this.datosUsuario.id
                "
                class="melon white--text"
                ><v-icon>mdi-file-edit-outline</v-icon></v-btn
              >
            </v-card-title>
            <h4>Categoría: {{ datosforo.categoria }}</h4>

            <v-card-text v-html="datosforo.cuerpo"> </v-card-text>

            <v-card-text>
              <v-row>
   
                <v-col cols="12" md="12" v-if="verestrellas===false" >
                
                  <v-chip v-for="l in 5" :key="l+'keuy'" class="white ma-0 pa-0"  >
                     <v-icon :class="l<=datosforo.calcstart ? 'yellow--text' : 'grey--text' ">mdi-star</v-icon>
                    </v-chip>
                </v-col>
                <v-col cols="12" md="12" v-if="verestrellas===true">
                  <v-icon
                    @click="selecciona(1)"
                    :class="clasif.star1 ? 'yellow--text' : 'grey--text'"
                    >mdi-star</v-icon
                  >-
                  <v-icon
                    @click="selecciona(2)"
                    :class="clasif.star2 ? 'yellow--text' : 'grey--text'"
                    >mdi-star</v-icon
                  >
                  <v-icon
                    @click="selecciona(3)"
                    :class="clasif.star3 ? 'yellow--text' : 'grey--text'"
                    >mdi-star</v-icon
                  >
                  <v-icon
                    @click="selecciona(4)"
                    :class="clasif.star4 ? 'yellow--text' : 'grey--text'"
                    >mdi-star</v-icon
                  >
                  <v-icon
                    @click="selecciona(5)"
                    :class="clasif.star5 ? 'yellow--text' : 'grey--text'"
                    >mdi-star</v-icon
                  >

                  <v-btn
                    class="melon white--text"
                    v-if="btnvbl"
                    @click="guardarestrella()"
                    ><v-icon>mdi-content-save</v-icon></v-btn
                  >
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
        <v-col cols="12" md="12" v-if="datosUsuario.userlogin === true">
          <v-card>
            <v-card-text>
              <v-textarea
                outlined
                name="input-7-4"
                label="Ingrese su comentario"
                v-model="comentario"
              ></v-textarea>

              <v-btn
                class="melon white--text"
                @click="guardarComentario()"
                style="text-transform:none;"
                >Enviar Comentario</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="12">
          <h4 class="primary--text">{{ ncoment }} Comentarios</h4>

          <v-row>
            <v-col cols="12" md="12" class="pa-6">
              <v-card>
                <v-card-text
                  v-for="(com, index) in lcomentarios"
                  :key="'coment' + index"
                  class="pa-0"
                >
                  <v-row>
                    <v-col cols="12" md="4" class="text-center">
                      <v-avatar size="50">
                        <v-img :src="com.imagen"></v-img> </v-avatar
                      ><br />
                      <h4>{{ com.nombre }}</h4>

                      <v-icon v-if="datosforo.iduser === datosUsuario.id && com.validado===true" class="success--text" >mdi-check</v-icon>
                      <v-icon v-if="datosforo.iduser === datosUsuario.id && com.validado===false" class="error--text" >mdi-eye-off</v-icon>

                      <v-btn
                        class="success"
                        v-if="datosforo.iduser === datosUsuario.id"
                        @click="cambiacoment('accept',com,index)" 
                        ><v-icon class="white--text" >mdi-check</v-icon></v-btn
                      >
                       <v-btn
                        class="info"
                        v-if="datosforo.iduser === datosUsuario.id"
                        @click="cambiacoment('disable',com,index)" 
                        ><v-icon class="white--text" >mdi-eye-off</v-icon></v-btn
                      >
                      <v-btn
                        class="error"
                        v-if="datosforo.iduser === datosUsuario.id"
                         @click="cambiacoment('delete',com,index)"
                        ><v-icon class="white--text">mdi-delete</v-icon></v-btn
                      >
                    </v-col>
                    <v-col cols="12" md="8">
                      {{ com.comentario }}
                    </v-col>
                  </v-row>
                </v-card-text>
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
import { mapState, mapActions } from "vuex";
import editablog from "~/components/editor-blog/editor-blog.vue";
export default {
  async asyncData({ params }) {
    const foro = params.foro;
    const uid = params.id;
    return {
      url: foro + " con id: " + uid,
      datosforo: {},
      uid: uid,
      comentario: "",
      addeditblog: false,
      editdatosforo: {},
      lcomentarios: [],
      clasif: {
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false
      },
      btnvbl: false,
      calstar: 0,
      verestrellas:true
    };
  },
  computed: {
    ...mapState(["foroselect", "datosUsuario"]),

    ncoment() {
      this.lcomentarios = [];
      if (this.datosforo.comentarios) {
        this.datosforo.comentarios.forEach(coment => {
          if (
            this.datosUsuario.userlogin === true &&
            this.datosUsuario.id === this.datosforo.iduser
          ) {
            this.lcomentarios.push(coment);
          } else {
            if (coment.validado === true) {
              this.lcomentarios.push(coment);
            }
          }
        });
      }
      return this.lcomentarios.length;
    }
  },
  methods: {
    ...mapActions(["creaNotificacion"]),
    verifEstrella(){
    
    if(this.datosforo.estrellas && this.datosforo.estrellas.length>0){
        var resultado = this.datosforo.estrellas.find(estrella=>estrella.iduser === this.datosUsuario.id)
        console.log('Resultado de find estrellas')
        if(resultado.cal){
          this.verestrellas=false
        }else{
          this.verestrellas=true
        }
      }
    },
    cambiacoment(n,data,p){
      if(n==='accept'){
        this.datosforo.comentarios[p].validado=true
        this.$fireStore.collection('foro').doc(this.datosforo.id).update({comentarios:this.datosforo.comentarios})
      }
      if(n==='disable'){
        this.datosforo.comentarios[p].validado=false
        this.$fireStore.collection('foro').doc(this.datosforo.id).update({comentarios:this.datosforo.comentarios})
      }
      if(n==='delete'){
        this.datosforo.comentarios.splice(p,1)
        this.$fireStore.collection('foro').doc(this.datosforo.id).update({comentarios:this.datosforo.comentarios})
      }

    },
    selecciona(p) {
      this.calstar = p;
      var truval = 0;
      var c = 0;
      for (c = 0; c < 6; c++) {
        this.clasif["star" + c] = false;
      }

      if (this.clasif["star" + p] === false) {
        for (c = 0; c < p + 1; c++) {
          this.clasif["star" + c] = true;
          truval++;
        }
      } else {
        truval = 0;
      }

      for (var co in this.clasif) {
        if (this.clasif[co] === true) {
          truval++;
        }

        truval > 0 ? (this.btnvbl = true) : (this.btnvbl = false);
      }
    },
    guardarestrella() {
      var calstart = {
        iduser: this.datosUsuario.id,
        cal: this.calstar,
        fecha: new Date(),
        nombre: this.datosUsuario.nombre + " " + this.datosUsuario.apellido,
        correo: this.datosUsuario.correo
      };

        this.datosforo.estrellas.push(calstart);
        var sumstar=0
        var totalstart=0

      for(var cl in this.datosforo.estrellas){
       sumstar=+this.datosforo.estrellas[cl].cal
       totalstart++
      }
        var calcstart=sumstar/totalstart
        

console.log('suma de '+sumstar+" de "+totalstart+' calificación de estrellas '+calcstart)
      this.$fireStore
        .collection("foro")
        .doc(this.datosforo.id)
        .update({ estrellas: this.foroselect.estrellas,  calcstart:calcstart.toFixed(0)});
        this.btnvbl = false;
        this.verestrellas=false

        this.initForo()
    },
    editarblog() {
      this.addeditblog = true;
      this.editdatosforo = this.foroselect;
    },
    actualizaForos($datos) {},
    guardarComentario() {
      var imagenUser = "";
      if (this.datosUsuario.urlImagen) {
        imagenUser = this.datosUsuario.urlImagen;
      }
      this.datosComentario = {
        iduser: this.datosUsuario.id,
        nombre: this.datosUsuario.nombre + " " + this.datosUsuario.apellido,
        imagen: imagenUser,
        comentario: this.comentario,
        fecha: new Date(),
        validado: false
      };
      this.datosforo.comentarios.push(this.datosComentario);
      this.comentario = "";

      ///// guarda comentario en firebase

      var datosdenotificacion = {
        user: this.datosforo.iduser,
        icon: "mdi-text-box-check-outline",
        text: "se agrega un nuevo comentario",
        link: "/foros/" + this.datosforo.id + "/" + this.datosforo.titulo
      };
      this.creaNotificacion(datosdenotificacion);
      this.$fireStore
        .collection("foro")
        .doc(this.datosforo.id)
        .update({ comentarios: this.datosforo.comentarios });
      ///// envia notificación
    },
    initForo(){
        if (Object.keys(this.foroselect).length === 0) {
      ///// en caso de no tener por store datos de foro se llama datos a firebase
      this.$fireStore
        .collection("foro")
        .doc(this.uid)
        .get()
        .then(data => {

          console.log(data.data())
          this.datosforo = data.data();
             this.datosforo.calcstart = parseInt(data.data().calcstart);

        setTimeout(()=>{this.verifEstrella()},1000)

        });
    } else {

      this.datosforo = this.foroselect;
        setTimeout(()=>{this.verifEstrella()},1000)
    }
    }
  },
  mounted() {

  this.initForo()
   
  },
  components: {
    editablog
  }
};
</script>