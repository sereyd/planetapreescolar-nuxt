
import { mapState, mapMutations, mapActions } from 'vuex'

// import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus'
// import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken, confirmCardPayment } from 'vue-stripe-elements-plus'
import Spinner from '~/components/spinner.vue'

import { StripeCheckout } from 'vue-stripe-checkout';

 
export default {
  data () {
    return {
      //VALIDACIONES, COMPLETE DE LA API DE STRIPE Y VALID DE VUETIFY
      valid : true,
      complete: false,

      //RUTAS DE RESPUESTA
      successUrl:"http://localhost:3000/pago-realizado",
      cancelUrl:"http://localhost:3000/cancelado",
      
      //OPCIONES PARA LA API STRIPE
      stripeOptions: {
        style: {
            base: {
                color: "#32325d",
                lineHeight: '24px',
                fontFamily: "Roboto, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                color: "#32325d"
                }
            },
            
            invalid: {
                fontFamily: "Roboto, sans-serif",
                color: "#fa755a",
                iconColor: "#fa755a"
            }
            
        }
        
      },

    
      //DATA DE FORMULARIO DE PAGO
      correo: "",
      nombre: "",

      //REGLA PARA CORREO VALIDO
      correoReglas: [
        v => !!v || 'correo es requerido',
        v => /.+@.+\..+/.test(v) || 'Correo no válido',
        ],
      // REGLAS PARA NOMBRE EN LA TARJETA
      nombreReglas: [
        v => !!v || 'Nombre del propietario de la tarjeta es requerido',
        v => (v && v.length >= 10) || 'El nombre completo debe ser por lo menos de 10 caracteres',
      ],

      //ELEMENTOS DE API STRIPE
      stripe: null,
      elements: null,
      card: null,

      //VALIDACIONBES PARA HABILITAR BOTON DE PAGO Y MENSAJES DE ERROR O EXITO
      error: null,
      pagoHecho: false,
      spinner: false,
      errorMensaje:"",
        
    }
  },
  computed:{
    ...mapState(['datosUsuario']),
    
  },
 
  components: { Card, Spinner, StripeCheckout },
  mounted() {
    this.stripe = Stripe(process.env.publishStripeKey);
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card', this.style);
    this.card.mount('#card-element');
    this.correo = this.datosUsuario.correo;  
    this.nombre = `${this.datosUsuario.nombre} ${this.datosUsuario.apellido}` ;  

    console.log("this.card");
    console.log(this.card);
    console.log("this.$refs.card_stripe")
    console.log(this.$refs.card_stripe)
  },
 
  methods: {
    ...mapMutations(['guardaDatosUsuarioStore']),

    pagarMembresia () {

      this.spinner = true;
      let purchase = {
          // items: [{ id: "xl-tshirt028373" }],
          correo: this.correo,
          // nombreTarjeta: this.nombre,
          usuario: `${this.datosUsuario.nombre} ${this.datosUsuario.apellido}`,
      };
    
      fetch("http://localhost:4242/pagar-membresia", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(purchase),
      })
      .then((result) => {
          // const r =  result.json();
          console.log(result);
          return result.json();
      })  
      .then((data) => {
        // console.log("data")
        // console.log(data)


          this.stripe
          .confirmCardPayment(data.clientSecret, {
          receipt_email: this.correo,
          payment_method: {
              card: this.card,
              billing_details: {
                email: this.correo,
                name: this.nombre,
                // phone: "2441408001"
              }
          }
          })
          .then((result) => {
              this.spinner = false;

              if (result.error) {
                  console.log(result.error.message)
                  this.pagoError();
              } else {
                  this.pagoCorrecto();

                  //SE OBTIENE EL ID DEL USUARIO ACTUAL
                  const {id} = this.datosUsuario;

                  //SE CREA UNA VARIABLE PARA MODIFICAR LOS CAMPOS
                  let dataUser = this.datosUsuario;

                  //VALIDA QUE SOLO SE CAMBIA A USUARIO TIPO 1 SI EL USUARIO ES TIPO 0
                  const lvl = dataUser.lvluser === 2 ? 2 : 1;

                  //SE BUSCA AL USUARIO EN LA BASE DE DATOS POR MEDIO DEL ID
                  let usuarioRef =  this.$fireStore.collection("usuarios").doc(id);

                  //SE ACTUALIZA EN FIREBASE LOS CAMPOS NECESARIOS
                  usuarioRef.update({
                    lvluser: lvl,
                    idMembresia: result.paymentIntent.id,
                  })
                  .then(() => {


                    //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
                    dataUser.lvluser = lvl;
                    dataUser.idMembresia = result.paymentIntent.id;
                    this.guardaDatosUsuarioStore(dataUser);
                  })
                  .catch((error) => {
                      console.error("Error al realizar pago: ", error);
                  });


              }
          });
      });


    },
    pagoCorrecto(){
        this.spinner = false;
        this.error= false;
        this.pagoHecho = true;
        this.errorMensaje = "El pago a sido completado";
        setTimeout(() => {
            this.$router.push('/')
        }, 3000);

    },
    pagoError(){
        this.spinner = false;
        this.error = true;
        this.pagoHecho = false;
        this.errorMensaje = "Error al procesar el pago";
        setTimeout(() => {
            console.log("ya pasaron los segundos")
            this.error = null;
            this.errorMensaje = "";
        }, 4000);
            
    },
    validatarDatosTarjeta () {
      const vd = this.$refs.formTarjeta.validate();
      this.valid = vd;
      // console.log(vd)
      if(this.valid)
        this.pagarMembresia();
      
    },

    //FORMATO DE PAGO 2
    // async pagarConTarjeta(){

    //     var stripe = Stripe(process.env.publishStripeKey);

    //   fetch("http://localhost:4242/create-session", {
    //     method: "POST",
    //   })

    //     .then( (response) => {
    //       return response.json();
    //     })
    //     .then( (session) => {
    //         console.log(session)
    //         alert("hasta aquiiii")
    //         // localStorage.setItem("sesion", JSON.stringify(session) );
    //         localStorage.setItem("payment_intent", JSON.stringify(session.payment_intent) );

    //         // this.sessionId = session.id;
    //         const resultado =  stripe.redirectToCheckout({ sessionId: session.id });
  
    //     })

    //     .then( (result) => {

    //       if (result.error) {
    //         alert(result.error.message);
    //       }
    //       // alert("Que hace aqui");
    //     })

    //     .catch( (error) => {
    //       console.error("Error:", error);
    //     });

    // // });

    // },



  }
}