<template>
   
    
  <v-container v-show="json !== ''">
    <v-card>
      <!-- 
        mdi-checkbox-marked-circle
        mdi-checkbox-marked-circle-outline
       -->

      <v-card-title class="primary d-flex flex-column">
        <div>
          <v-icon  style="font-size: 60px;" color="success">
            mdi-checkbox-marked-circle
          </v-icon>
        </div>
        <div>
          <h3 class="white--text text-center">PAGO REALIZADO CORRECTAMENTE</h3>
        </div>
      </v-card-title>

      <v-card-text>

        <v-container>

          <h4 class="text-center">¡GRACIAS POR COMPRAR LA SUSCRIPCION DE PLANETA PREESCOLAR!</h4>

          <v-row class="mx-8"> 
            <v-col>
              <!-- <v-row class="">
                <v-col cols="4" xsm="6" md="4" lg="6">
                  <h5 class="title">ID de compra:</h5>
                </v-col>
                <v-col>
                  <p>{{idCompra}}</p>
                </v-col>
              </v-row> -->

              <v-row class="">
                <v-col cols="4" xsm="6" md="4" lg="6">
                  <h5 class="title">Tipo suscripción:</h5>
                </v-col>
                <v-col>
                  <p>{{tipoSuscripcion}}</p>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" xsm="6" md="4" lg="6">
                  <h5 class="title">Importe:</h5>
                </v-col>
                <v-col>
                  <p>{{importe}}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          

        </v-container>
        <div>

          <!-- <p>
            Gracias por comprar la membresia! Si tienes alguna duda escribenos...

            <a href="mailto:orders@example.com">orders@example.com</a>.

            <v-file-input
              ref="updateFile"
              v-model="file"
              counter
              show-size
            ></v-file-input>
            <v-btn class="primary" @click="subirAlumnos">Subir</v-btn>
          </p> -->
        </div>

      </v-card-text>

    </v-card>
    


  </v-container>

</template>
<script>
// import validasitio from '@/mixins/validasitio.js'
import { mapState, mapMutations, mapActions } from 'vuex'

// import readXlsxFile from 'read-excel-file'

export default {
    data(){
        return {
          file: null,
          json:"",
          idCompra:"",
          tipoSuscripcion:"",
          importe:"",
            // datapage:{
            //     permisos:0,
            //     logeado:false
            // }
        }
    },
    computed:{
    ...mapState(['datosUsuario','stripeObj']),
    
    },
    methods: {
      ...mapMutations(['guardaDatosUsuarioStore']),
      subirAlumnos(){
        // console.log(this.file.files[0])
        console.log(this)
        console.log(this.$refs)
        console.log(this.$refs.updateFile)
        console.log(this.$refs.updateFile.files)
        /*
        this.urlImagenPrevia = URL.createObjectURL(this.$refs.fileupload.files[0]);
            this.imagen=this.$refs.fileupload.files[0]
            this.actualizaImgUpload(this.$refs.fileupload.files[0]);
        */
        // readXlsxFile(this.file).then((rows) => {
        //   // `rows` is an array of rows
        //   // each row being an array of cells.
        //   console.log(rows);
        //   console.table(rows);
        //   rows.map( row => console.log(row));
        // })

      },
    },
    mounted() {

      this.json = localStorage.getItem("payment_intent");
      let data= {};

      if(this.json !== "")
        data = JSON.parse(this.json);
      else
        data.sessionId= "";

        // alert("mira")

      localStorage.setItem("payment_intent", "" );
      console.log(data);
      // alert("payment_intent")

      if(data.sessionId)
      {
        //DATOS PARA EL PAGO EXITOSO
        this.idCompra = data.sessionId;
        this.tipoSuscripcion = data.tipoSuscripcion;
        this.importe = data.importe;
        //SE OBTIENE EL ID DEL USUARIO ACTUAL
        let datosUsuario = JSON.parse( localStorage.getItem("user") );
        localStorage.setItem("user", "" );

        const {id} = datosUsuario;

        //SE CREA UNA VARIABLE PARA MODIFICAR LOS CAMPOS
        // let datosUsuario = this.datosUsuario;

        //VALIDA QUE SOLO SE CAMBIA A USUARIO TIPO 1 SI EL USUARIO ES TIPO 0
        const lvl = datosUsuario.lvluser === 2 ? 2 : 1;

        //SE BUSCA AL USUARIO EN LA BASE DE DATOS POR MEDIO DEL ID
        let usuarioRef =  this.$fireStore.collection("usuarios").doc(id);

        //SE ACTUALIZA EN FIREBASE LOS CAMPOS NECESARIOS
        usuarioRef.update({
          lvluser: lvl,
          idMembresia: data.sessionId,
        })
        .then(() => {
          //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
          datosUsuario.lvluser = lvl;
          datosUsuario.idMembresia =data.sessionId;
          this.guardaDatosUsuarioStore(datosUsuario);
        })
        .catch((error) => {
            console.error("Error al realizar pago: ", error);
        });
      }
      else{
        // alert("Nel no se hace")
        this.$router.push('/')

        // console.log(this.)

      }

      




      // var stripe = Stripe("pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx");

      // //${id}_secret_${secret}
      // stripe
      //   .retrievePaymentIntent(payment_intent)
      //   .then(function(result) {
      //     // Handle result.error or result.paymentIntent
      //       console.log("Antes el result")
      //       console.log(result)
      //       alert("vamos a ver el resultado")

      //     if(result.error){
      //       alert("No existe el pago o no esta pagado");
      //     }else{
      //       console.log(result)
      //       alert("El pago es correcto");
      //     }
      //   });

      // debugger;

      // .retrievePaymentIntent

      
    },
    components:{
        
    },
    // computed:{
    //   ...mapState(['idCompra']),
    // },
    // mixins:[validasitio]
}
</script>

<style>

.title{
  /* font-weight: 50; */
  color:black;
}

</style>


