
import { mapState, mapMutations, mapActions } from 'vuex'
// import { StripeCheckout } from 'vue-stripe'
// import "https://js.stripe.com/v3/";
// import "https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch"

{/* <script src="https://js.stripe.com/v3/"></script>
<script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch"></script> */}

// import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus'

// import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements-plus'
import Spinner from '~/components/spinner.vue'

import { StripeCheckout } from 'vue-stripe-checkout';

 
export default {
  data () {
    return {
      complete: false,
        stripeKey: "pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx",
      sessionId: "cd_hsjd3893",
      loading: false,

      //RUTAS DE RESPUESTA
      successUrl:"http://localhost:3000/pago-realizado",
      cancelUrl:"http://localhost:3000/cancelado",
      items: [
        {
          sku: 'sku_FdQKocNoVzznpJ', 
          quantity: 1,
          amount: 20000
        }
      ],
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        amount: 1000,
        label: 'Membresia de PlanetaEducadora',
        currency:"mxn"
        
      },
        correo: "ivanc654@gmail.com",
        stripe: null,
        elements: null,
        card: null,
        error: null,
        errorMensaje:"",
        spinner: false,
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                color: "#32325d"
                }
            },
            
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
            
        },
    }
  },
  computed:{
    ...mapState(['idCompra']),
  },
 
  components: { Card, Spinner, StripeCheckout },
  mounted() {
       
            // this.elements = this.$stripe.import().elements();
    
            this.stripe = Stripe(this.stripeKey);
            this.elements = this.stripe.elements();
            this.card = this.elements.create('card', this.style);
            this.card.mount('#card-element');
            console.log(this.card)
            console.log("stripe")
            console.log(this.stripe);


      //       fetch("http://localhost:4242/create-session", {
      //   method: "POST",
      // })

      //   .then( (response) => {
      //     return response.json();
      //   })
      //   .then( (session) => {
      //       console.log(session)
      //       // localStorage.setItem("sesion", JSON.stringify(session) );
      //       this.sessionId = session.id;
      //       return this.sessionId;
      //   })

      //   .then( (result) => {

      //     if (result.error) {
      //       alert(result.error.message);
      //     }
      //   })

      //   .catch( (error) => {
      //     console.error("Error:", error);
      //   });
    
            
        },
 
  methods: {
    checkout () {
      fetch("http://localhost:4242/create-session", {
        method: "POST",
      })

        .then( (response) => {
          return response.json();
        })
        .then( (session) => {
            console.log(session)
            localStorage.setItem("payment_intent", JSON.stringify(session.payment_intent) );
            this.sessionId = session.id;
            this.idCompra = session.id;
            console.log(this.idCompra)
            // this.$refs.sessionRef.redirectToCheckout({ sessionId: session.id })
            // const resultado = this.$refs.checkoutRef.redirectToCheckout({ sessionId: session.id });

            //const resultado =  stripe.redirectToCheckout({ sessionId: session.id });
  
            // console.log(resultado);
            // alert(session.id);
            // debugger;
          // return resultado
          return this.sessionId
        })

        .then( async(result) => {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.
          console.log("result")
          console.log(result)
          const res = await this.$refs.sessionRef.redirectToCheckout();
          console.log(res);
          // debugger;
          // alert("listo")

          if (result.error) {
            alert(result.error.message);
          }
        })

        .catch( (error) => {
          console.error("Error:", error);
        });

       
    },


    pagarMembresia () {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
        // createToken().then(data => console.log(data));
        // this.stripe = Stripe(this.stripeKey);
         this.spinner = true;

        // let purchase = {
        //     items: [{ id: "xl-tshirt028373" }]
        // };
    
        fetch("http://localhost:4242/pagar-membresia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(purchase)
        })
        .then((result) => {
            // const r =  result.json();
            console.log(result);
            return result.json();
        })  
        .then((data) => {
            
            // this.pagarConTarjeta(stripe, data.clientSecret);
        
            console.log(this.stripe);
            this.stripe
            .confirmCardPayment(data.clientSecret, {
            receipt_email: this.correo,
            payment_method: {
                card: this.card
            }
            })
            .then((result) => {
                this.spinner = false;

                if (result.error) {
                    // Show error to your customer
                    // showError(result.error.message);
                    console.log(result.error.message)
                    this.pagoError();
                } else {
                    // The payment succeeded!
                    // this.pagoCorrecto(result.paymentIntent.id);
                    this.pagoCorrecto();
                    console.log(result.paymentIntent.id);

            
                    // this.$refs.cardnumber.click();
            
                }
            });
        });


        // var paymentRequest = stripe.paymentRequest({
        //     country: 'MX',
        //     currency: 'mxn',
        //     total: {
        //       label: 'Membresia',
        //       amount: 1000,
        //     },
        //     requestPayerName: true,
        //     requestPayerEmail: true,
        //   });
        //   console.log(paymentRequest);

        //   paymentRequest.canMakePayment().then(result => {
        //     // Check result
        //     console.log(result);
        //   })

        // stripe.
        // createSource({
        //     type: 'ideal',
        //     amount: 1000,
        //     currency: 'mxn',
        //     owner: {
        //     name: 'Jenny Rosen',
        //     },
        //     redirect: {
        //         return_url: 'http://localhost:3000/checkout',
        //       },
        // })
        // .then((result) => {
        //   // Handle result.error or result.source
        //   console.log(result);
        // });
    },
    pagoCorrecto(){
        this.spinner = false;
        this.error= false;
        this.errorMensaje = "El pago a sido completado";
        setTimeout(() => {
            this.$router.push('/pago-realizado')
        }, 3000);

    },
    pagoError(){
        this.spinner = false;
        this.error = true;
        this.errorMensaje = "Error al procesar el pago";
        setTimeout(() => {
            console.log("ya pasaron los segundos")
            this.error = null;
            this.errorMensaje = "";
        }, 4000);
            
    },

    //FORMATO DE PAGO 2
    async pagarConTarjeta(){

        var stripe = Stripe("pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx");

    // var checkoutButton = document.getElementById("checkout-button");

    // checkoutButton.addEventListener("click", function () {
      fetch("http://localhost:4242/create-session", {
        method: "POST",
      })

        .then( (response) => {
          return response.json();
        })
        .then( (session) => {
            console.log(session)
            localStorage.setItem("sesion", JSON.stringify(session) );
            this.sessionId = session.id;
            const resultado =  stripe.redirectToCheckout({ sessionId: session.id });
  
            console.log(resultado);
            // alert(session.id);
            // debugger;
          return resultado
        })

        .then( (result) => {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.

          if (result.error) {
            alert(result.error.message);
          }
        })

        .catch( (error) => {
          console.error("Error:", error);
        });

    // });

    },




// // Show a spinner on payment submission
// var loading = function(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     document.querySelector("button").disabled = true;
//     document.querySelector("#spinner").classList.remove("hidden");
//     document.querySelector("#button-text").classList.add("hidden");
//   } else {
//     document.querySelector("button").disabled = false;
//     document.querySelector("#spinner").classList.add("hidden");
//     document.querySelector("#button-text").classList.remove("hidden");
//   }
  }
}

// export default {
//     props: [ 'stripe', 'options' ],
//     data(){
//         return {
//             datapage:{
//                 permisos:1,
//                 logeado:true
//             },
//             stripeKey: "pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx",
//             statusBoton: false,
//             pagoExitoso: false,
//             error: false,
//             clienteSecreto:"",
//             correo: "ivanc654@gmail.com",

//             //DATA DE VUE-STRIPE-PLUS
//             complete: false,
//             number: false,
//             expiry: false,
//             cvc: false,

//             style: {
//                 base: {
//                     color: "#32325d",
//                     fontFamily: 'Arial, sans-serif',
//                     fontSmoothing: "antialiased",
//                     fontSize: "16px",
//                     "::placeholder": {
//                     color: "#32325d"
//                     }
//                 },

//                 invalid: {
//                     fontFamily: 'Arial, sans-serif',
//                     color: "#fa755a",
//                     iconColor: "#fa755a"
//                 }

//             },
//             elements: null,
//             card: null,
//             // stripe: null,
//             dataPago: null,



//         }
//     },
//     mounted() {
       
//         // this.elements = this.$stripe.import().elements();

//         // this.stripe = Stripe(this.stripeKey);
//         // this.elements = this.stripe.elements();
//         // this.card = this.elements.create('card', this.style);
//         // this.card.mount('#card-element');
//         // console.log(this.card)
//         // console.log("stripe")
//         // console.log(this.stripe);

        
//     },

//     components: { CardNumber, CardExpiry, CardCvc },
//     computed:{
//         ...mapState(['datosUsuario']),
//     },
//     watch: {
//         number () { this.update() },
//         expiry () { this.update() },
//         cvc () { this.update() }
//     },
//     methods:{

//         update () {
//             this.complete = this.number && this.expiry && this.cvc
       
//             // field completed, find field to focus next
//             if (this.number) {
//               if (!this.expiry) {
//                 this.$refs.cardExpiry.focus()
//               } else if (!this.cvc) {
//                 this.$refs.cardCvc.focus()
//               }
//             } else if (this.expiry) {
//               if (!this.cvc) {
//                 this.$refs.cardCvc.focus()
//               } else if (!this.number) {
//                 this.$refs.cardNumber.focus()
//               }
//             }
//             // no focus magic for the CVC field as it gets complete with three
//             // numbers, but can also have four
//         },
        








//         pagarMembresia(){

//             // this.stripe = Stripe(this.stripeKey);

//             let purchase = {
//                 items: [{ id: "xl-tshirt028373" }]
//               };
    
//             fetch("http://localhost:4242/pagar-membresia", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(purchase)
//                 })
//                 .then((result) => {
//                     // const r =  result.json();
//                     console.log(result);
//                     return result.json();
//                 })
    
                
                    
//                 .then((data) => {

//                     // this.pagarConTarjeta(stripe, data.clientSecret);

//                     console.log(this.stripe);
//                     this.stripe
//                     .confirmCardPayment(data.clientSecret, {
//                     receipt_email: this.correo,
//                     payment_method: {
//                         card: this.card
//                     }
//                     })
//                     .then((result) => {
//                     if (result.error) {
//                         // Show error to your customer
//                         // showError(result.error.message);
//                         console.log(result.error.message)
//                     } else {
//                         // The payment succeeded!
//                         // this.ordenCompleta(result.paymentIntent.id);
//                         console.log(result.paymentIntent.id);

//                         this.$refs.cardnumber.click();

//                     }
//                     });

//                 });

 

//         },
//         // pagarConTarjeta(stripe, clientSecret){

//         //     //loading(true);
//         //     console.log("clientSecret")
//         //     console.log(clientSecret)
//         //     console.log(stripe)


//         // },
//         // ordenCompleta(paymentIntentId){
//         // }
//     }
// }





// // A reference to Stripe.js initialized with your real test publishable API key.
// let stripe = Stripe(stripeKey);
// // The items the customer wants to buy
// let purchase = {
//   items: [{ id: "xl-tshirt" }]
// };

// // Disable the button until we have Stripe set up on the page
// document.querySelector("button").disabled = true;
// fetch("/create-payment-intent", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(purchase)
// })
//   .then(function(result) {
//     return result.json();
//   })
//   .then(function(data) {
//     var elements = stripe.elements();
//     var style = {
//       base: {
//         color: "#32325d",
//         fontFamily: 'Arial, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d"
//         }
//       },

//       invalid: {
//         fontFamily: 'Arial, sans-serif',
//         color: "#fa755a",
//         iconColor: "#fa755a"
//       }
//     };

//     var card = elements.create("card", { style: style });


//     // Stripe injects an iframe into the DOM
//     card.mount("#card-element");


//     card.on("change", function (event) {
//       // Disable the Pay button if there are no card details in the Element
//       document.querySelector("button").disabled = event.empty;
//       document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
//     });


//     var form = document.getElementById("payment-form");
//     form.addEventListener("submit", function(event) {
//       event.preventDefault();
//       // Complete payment when the submit button is clicked
//       payWithCard(stripe, card, data.clientSecret);
//     });

//   });


// // Calls stripe.confirmCardPayment
// // If the card requires authentication Stripe shows a pop-up modal to
// // prompt the user to enter authentication details without leaving your page.
// var payWithCard = function(stripe, card, clientSecret) {
//   loading(true);
//   stripe
//     .confirmCardPayment(clientSecret, {
//       receipt_email: document.getElementById('email').value,
//       payment_method: {
//         card: card
//       }
//     })
//     .then(function(result) {
//       if (result.error) {
//         // Show error to your customer
//         showError(result.error.message);
//       } else {
//         // The payment succeeded!
//         orderComplete(result.paymentIntent.id);
//       }

//     });

// };

// /* ------- UI helpers ------- */

// // Shows a success message when the payment is complete
// var orderComplete = function(paymentIntentId) {
//   loading(false);
//   document
//     .querySelector(".result-message a")
//     .setAttribute(
//       "href",
//       "https://dashboard.stripe.com/test/payments/" + paymentIntentId
//     );
//   document.querySelector(".result-message").classList.remove("hidden");
//   document.querySelector("button").disabled = true;

// };

// // Show the customer the error from Stripe if their card fails to charge
// var showError = function(errorMsgText) {
//   loading(false);
//   var errorMsg = document.querySelector("#card-error");
//   errorMsg.textContent = errorMsgText;
//   setTimeout(function() {
//     errorMsg.textContent = "";
//   }, 4000);
// };

// // Show a spinner on payment submission
// var loading = function(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     document.querySelector("button").disabled = true;
//     document.querySelector("#spinner").classList.remove("hidden");
//     document.querySelector("#button-text").classList.add("hidden");
//   } else {
//     document.querySelector("button").disabled = false;
//     document.querySelector("#spinner").classList.add("hidden");
//     document.querySelector("#button-text").classList.remove("hidden");
//   }

// };