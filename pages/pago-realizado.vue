<template>
   
  <v-container v-show="datosSuscripcion.status">
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
                  <p>{{datosSuscripcion.plan.tipoSuscripcion}}</p>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" xsm="6" md="4" lg="6">
                  <h5 class="title">Importe:</h5>
                </v-col>
                <v-col>
                  <p>${{datosSuscripcion.plan.amount/100}} MXN</p>
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
import {addMonths} from 'date-fns';


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
    ...mapState(['datosUsuario','dominio','urlAPI','datosSuscripcion','configAll']),
    
    },
    methods: {
      ...mapMutations(['guardaDatosUsuarioStore','updateDescargasPreMP','actualizarConfigDescargas']),
      ...mapActions(['obtenerDatosSuscripcion']),
      subirAlumnos(){
        // console.log(this.file.files[0])
        // console.log(this)
        // console.log(this.$refs)
        // console.log(this.$refs.updateFile)
        // console.log(this.$refs.updateFile.files)
       

      },
      async obtenerCliente(sessionId){
        // const sessionId = "cs_test_a1mUqFoKvHsmFzSEGNe5JHZ3sk5oJy55x715ODr3tKocJfqk3keI5Mp6XK";
        // await this.actualizarConfigDescargas();
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
                  const lvl = (datosUsuario.lvluser === 1 || datosUsuario.lvluser === 2) ? 2 : 2;

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
                    this.$fireStore.collection('ConfiguracionGeneral').get()
                    .then((data)=>{
                        var urlweb=data.docs[0].data().pagos.stripe.modoprueba===true ? data.docs[0].data().pagos.stripe.apiUrltest : data.docs[0].data().pagos.stripe.apiUrlprod 


                       var payload={
                         url:urlweb,
                      idSuscripcion:session.subscription
                    }
                    this.obtenerDatosSuscripcion(payload);
                    
                    })
                   



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

      obtenerClienteMP(idPago){
        const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({idPago})
      }

      fetch(this.urlAPI+"/estado-pago",config)
      .then((result)=>{
        return result.json()
      })
      .then(async(suscripcion)=>{
  
        // console.log(suscripcion)
        if(suscripcion.error)
        {
          // datos.estadoMembresia = "canceled";
          // context.state.datosSuscripcion.status = false;

          console.log("error")
        }
        else{
          // console.log(suscripcion.response)
          // console.log(suscripcion.response.status)
          let data = suscripcion.response;

          if(data.status === "approved" || data.status === "accredited")
          {
            //SE OBTIENE EL ID DEL USUARIO ACTUAL
            let datosUsuario = JSON.parse( localStorage.getItem("user") );
            // localStorage.setItem("user", "" );
            this.json = "mercadopagooo"

            const {id} = datosUsuario;

            //VALIDA QUE SOLO SE CAMBIA A USUARIO TIPO 1 SI EL USUARIO ES TIPO 0
            const lvl = (datosUsuario.lvluser === 1 || datosUsuario.lvluser === 2) ? 2 : 2;

            this.importe = data.transaction_amount;
            this.tipoSuscripcion = this.importe === 1290 ? "trimestral" :
              this.importe === 2190 ? "semestral" :
              this.importe === 3500 ? "anual" : "mensual";

            let fechaInicio = parseInt((new Date(data.date_approved).valueOf() / 1000).toFixed(0))
            // console.log(fechaInicio)

            const interval_count = data.transaction_amount === 490 ? 1 :
              data.transaction_amount === 1290 ? 3 :
              data.transaction_amount === 2190 ? 6 : 12;

            let fechaFin = addMonths(new Date(data.date_approved), interval_count);
            fechaFin = parseInt((new Date(fechaFin).valueOf() / 1000).toFixed(0))

            data.fechaInicio = fechaInicio;
            data.fechaFin = fechaFin;
            data.interval_count = interval_count;
            
            // let session = suscripcion.response;


            //SE BUSCA AL USUARIO EN LA BASE DE DATOS POR MEDIO DEL ID
            let usuarioRef =  this.$fireStore.collection("usuarios").doc(id);

            //SE ACTUALIZA EN FIREBASE LOS CAMPOS NECESARIOS
            usuarioRef.update({
              lvluser: lvl,
              idMembresia: idPago,
              idCliente: "",
              idSuscripcion: idPago,
              tipoSuscripcion: this.tipoSuscripcion,
              importeSuscripcion: this.importe,
            })
            .then(() => {
              //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
              datosUsuario.lvluser = lvl;
              datosUsuario.idMembresia = idPago;
              datosUsuario.idCliente = "";
              datosUsuario.idSuscripcion= idPago;
              datosUsuario.tipoSuscripcion= this.tipoSuscripcion;
              datosUsuario.importeSuscripcion= this.importe;
              datosUsuario.estadoMembresia = 'active';

              this.guardaDatosUsuarioStore(datosUsuario);

              // console.log(this.datosUsuario);

              this.updateDescargasPreMP(data);

              //Obtener datos de membresia
              // this.obtenerDatosSuscripcion(session.subscription);
              



            })
            .catch((error) => {
                console.error("Error al realizar pago: ", error);
            });
            
            // datos.estadoMembresia = "active";
            // context.state.datosSuscripcion = suscripcion.response;
            // context.state.datosSuscripcion.status = true;
          }
          // else
          // {
          //   datos.estadoMembresia = "canceled";
          //   context.state.datosSuscripcion.status = false;
          // }
  
        }
  
        
  
      })
      .catch((err)=>{
        console.log('Error al verificar suscripción', err);
      });
      },
    },
    async mounted() {
      await this.actualizarConfigDescargas();
      this.json = localStorage.getItem("payment_intent");
      let data= {sessionId: ""};
      // console.log(this.json)

      if(this.json !== "")
      {
        // console.log("JSON NO ESTA VACIO")
        data = JSON.parse(this.json);
      }
      // else
      //   data.sessionId= "";

      // console.log(data);
      // alert("sdsdsd")
      // console.log("sdsdsd")


      localStorage.setItem("payment_intent", "" );
      // console.log(data);
      // console.log(this.$router)
      // console.log(this.$route.query)
      // console.log(this.$route.query.payment_id)
      // console.log(this.$route.query.preference_id)
      const {payment_id} = this.$route.query;
      // console.log(payment_id)
      


      if(data.sessionId !== "")
      {
        console.log("fue por stripe")
        this.idCompra = data.sessionId;
        this.tipoSuscripcion = data.tipoSuscripcion;
        this.importe = data.importe;
        // this.obtenerCliente(data.sessionId);
        
      }
      else if(payment_id !== "")
      {
        console.log("fue por mercadopago")
         this.idCompra = this.$route.query.payment_id;
        // this.tipoSuscripcion = data.tipoSuscripcion;
        // this.importe = data.importe;
        // this.obtenerClienteMP(payment_id);


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


