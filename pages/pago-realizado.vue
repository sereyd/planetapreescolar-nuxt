<template>
   
  <v-container v-show="json !== ''">
    <v-card>
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
                  <p>${{importe}} MXN</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        

      </v-card-text>

    </v-card>
    


  </v-container>

</template>
<script>
// import validasitio from '@/mixins/validasitio.js'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
          file: null,
          json:"",
          idCompra:"",
          tipoSuscripcion:"",
          importe:"",
          idCliente:"",
           
        }
    },
    computed:{
    ...mapState(['datosUsuario','dominio','urlAPI']),
    
    },
    methods: {
      ...mapMutations(['guardaDatosUsuarioStore']),
      ...mapActions(['obtenerDatosSuscripcion']),
      subirAlumnos(){
        // console.log(this.file.files[0])
        console.log(this)
        console.log(this.$refs)
        console.log(this.$refs.updateFile)
        console.log(this.$refs.updateFile.files)
       

      },
      async obtenerCliente(sessionId){
        // const sessionId = "cs_test_a1mUqFoKvHsmFzSEGNe5JHZ3sk5oJy55x715ODr3tKocJfqk3keI5Mp6XK";
        
        let customerId; 

        if (sessionId) {
            await fetch(this.urlAPI+"/checkout-session?sessionId=" + sessionId)
          // fetch("https://stripe-checkout-api.herokuapp.com/checkout-session?sessionId=" + sessionId)
            .then((result)=>{
              return result.json()
            })
            .then((session)=>{

              if(session.error)
              {

                // console.log(session)
                console.log("EL PAGO DECLINADO")
              }
              else{
                if(session.payment_status === "paid")
                {
                  this.idCliente = session.customer;

                  //SE OBTIENE EL ID DEL USUARIO ACTUAL
                  let datosUsuario = JSON.parse( localStorage.getItem("user") );
                  localStorage.setItem("user", "" );

                  const {id} = datosUsuario;

                  //VALIDA QUE SOLO SE CAMBIA A USUARIO TIPO 1 SI EL USUARIO ES TIPO 0
                  const lvl = datosUsuario.lvluser <= 2 ? 2 : 3;

                  //SE BUSCA AL USUARIO EN LA BASE DE DATOS POR MEDIO DEL ID
                  let usuarioRef =  this.$fireStore.collection("usuarios").doc(id);

                  //SE ACTUALIZA EN FIREBASE LOS CAMPOS NECESARIOS
                  usuarioRef.update({
                    lvluser: lvl,
                    idMembresia: sessionId,
                    idCliente: this.idCliente,
                    idSuscripcion: session.subscription,
                    tipoSuscripcion: this.tipoSuscripcion,
                    importeSuscripcion: this.importe,
                  })
                  .then(() => {
                    //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
                    datosUsuario.lvluser = lvl;
                    datosUsuario.idMembresia =sessionId;
                    datosUsuario.idCliente = this.idCliente;
                    datosUsuario.idSuscripcion= session.subscription;
                    datosUsuario.tipoSuscripcion= this.tipoSuscripcion;
                    datosUsuario.importeSuscripcion= this.importe;
                    datosUsuario.estadoMembresia = session.payment_status === 'paid' ? 'active' : '';

                    this.guardaDatosUsuarioStore(datosUsuario);

                    //Obtener datos de membresia
                    this.obtenerDatosSuscripcion(session.subscription);
                    



                  })
                  .catch((error) => {
                      console.error("Error al realizar pago: ", error);
                  });
                
                
                console.log("EL PAGO FUE REALIZADO CON EXITO")
                }
                else{
                  console.log("PAGO FALLIDO O PENDIENTE CONSULTE ESTADO DEL PAGO CON SU BANCO")
                }

              }
            })
            .catch(function(err){
              console.log('Error AL REVISAR LA SESION DEL PAGO', err);
            });
        }
      },
    },
    mounted() {

      this.json = localStorage.getItem("payment_intent");
      let data= {};

      if(this.json !== "")
        data = JSON.parse(this.json);
      else
        data.sessionId= "";


      localStorage.setItem("payment_intent", "" );
      // console.log(data);

      if(data.sessionId)
      {
        this.idCompra = data.sessionId;
        this.tipoSuscripcion = data.tipoSuscripcion;
        this.importe = data.importe;
        this.obtenerCliente(data.sessionId);
        
      }
      else
      {
        console.log("PAGO NO REALIZADO")
        this.$router.push('/')        
      }
      
    },
}
</script>

<style>
.title{
  color:black;
}
</style>


