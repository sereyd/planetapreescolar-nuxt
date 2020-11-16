
import { mapState, mapMutations, mapActions } from 'vuex'

// import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus'
// import { stripeKey, stripeOptions } from './stripeConfig.json'
// import { Card, CardNumber, CardExpiry, CardCvc, createToken, confirmCardPayment, handleCardPayment } from 'vue-stripe-elements-plus'
import Spinner from '~/components/spinner.vue'

// import { StripeCheckout } from 'vue-stripe-checkout';

 
export default {
  data () {
    return {
      //PRUEBAS
      // complete: false,
      // number: false,
      // expiry: false,
      // cvc: false,

      // customer:null,
      // clienteCreado: false,
      // stripeSuscripcion: null,
      // elementsSuscripcion: null,
      // cardSuscripcion: null,

      //SELECCIONAR DOMINIO
      // dominio:"https://educadora.cf",
      // dominio:"http://localhost:3000",

      //DATOS PRA PANTLLA DE PAGO EXITOSO
      tipoSuscripcion: "",
      importe:"",

      //CLAVES DE PAQUETES
      trimestralPriceId: "price_1HcaNeGqO5WLKI2H66t5f2bc",
      anualPriceId: "price_1HcaOZGqO5WLKI2HTm79PBnc",
      precioTrimenstral: 500,
      precioAnual: 1500,

      spinner: false,





      //VALIDACIONES, COMPLETE DE LA API DE STRIPE Y VALID DE VUETIFY
      // valid : true,
      // complete: false,

      //RUTAS DE RESPUESTA
      // successUrl:"http://localhost:3000/pago-realizado",
      // cancelUrl:"http://localhost:3000/cancelado",
      
      //OPCIONES PARA LA API STRIPE
      // stripeOptions: {
      //   style: {
      //       base: {
      //           color: "#32325d",
      //           lineHeight: '24px',
      //           fontFamily: "Roboto, sans-serif",
      //           fontSmoothing: "antialiased",
      //           fontSize: "16px",
      //           "::placeholder": {
      //           color: "#32325d"
      //           }
      //       },
            
      //       invalid: {
      //           fontFamily: "Roboto, sans-serif",
      //           color: "#fa755a",
      //           iconColor: "#fa755a"
      //       }
            
      //   }
        
      // },

    
      //DATA DE FORMULARIO DE PAGO
      // correo: "",
      // nombre: "",

      //REGLA PARA CORREO VALIDO
      // correoReglas: [
      //   v => !!v || 'correo es requerido',
      //   v => /.+@.+\..+/.test(v) || 'Correo no válido',
      //   ],
      // // REGLAS PARA NOMBRE EN LA TARJETA
      // nombreReglas: [
      //   v => !!v || 'Nombre del propietario de la tarjeta es requerido',
      //   v => (v && v.length >= 10) || 'El nombre completo debe ser por lo menos de 10 caracteres',
      // ],

      // //ELEMENTOS DE API STRIPE
      // stripe: null,
      // elements: null,
      // card: null,

      // //VALIDACIONBES PARA HABILITAR BOTON DE PAGO Y MENSAJES DE ERROR O EXITO
      // error: null,
      // pagoHecho: false,
      // spinner: false,
      // errorMensaje:"",
      // modalPago: false,

      // //ERRORES DE STRIPE
      // erroresStripe:[
      //   {en:"Your card number is invalid.", es:"Numero de tarjeta no válido"},
      //   {en:"Your card has insufficient funds.", es:"La tarjeta no tiene fondos suficientes"},
      //   {en:"Your card number is incomplete.", es:"Número de tarjeta incompleto"},
      //   {en:"Your card's expiration date is incomplete.", es:"Fecha de expiración incompleto"},
      //   {en:"Your card's expiration year is in the past.", es:"Fecha de expricación vencida"},
      //   {en:"Your card's expiration year is invalid.", es:"Fecha de expiración no válida"},
      //   {en:"Your card's security code is incomplete.", es:"Código (CVC) de seguridad incompleto"},
      //   {en:"Your postal code is incomplete.", es:"Código postal incompleto"},
      // ],

        // else if ( msj === "Your postal code is incomplete.")
          // this.errorMensaje = "Código postal incompleto";

        //Your card number is incomplete.
        //Your card's expiration date is incomplete.
        //Your card's expiration date is in the past
        //Your card's expiration year is invalid.
        //Your card's security code is incomplete.
        
    }
  },
  computed:{
    ...mapState(['datosUsuario','dominio','urlAPI']),
    
  },
  components:{Spinner},
 
  // components: { Card, Spinner, StripeCheckout,  CardNumber, CardExpiry, CardCvc },
  // components: { Card, Spinner, StripeCheckout,  CardNumber, CardExpiry, CardCvc },
  // components: {  },
  // created() {
  //   // this.stripe = Stripe(process.env.publishStripeKey);
  // },
  // mounted() {
    
  //   // console.log("ANTES this.card");
  //   // console.log(this.card);
  //   // this.stripe = Stripe(process.env.publishStripeKey);
  //   // this.elements = this.stripe.elements();
  //   // this.card = this.elements.create('card', this.style);
  //   // this.card.mount('#card-element');
  //   // this.correo = this.datosUsuario.correo;  
  //   // this.nombre = `${this.datosUsuario.nombre} ${this.datosUsuario.apellido}` ;  
  //   // console.log("this.card");
  //   // console.log(this.card);
  //   // card_stripe
  // },
 
  methods: {
    ...mapMutations(['guardaDatosUsuarioStore','guardarStripeObj']),

    //PRUEBAS

    crearSesionSuscripcion(priceTipo){
      this.spinner = true;

      this.tipoSuscripcion = priceTipo;
      // this.importe = priceTipo === 'trimestral' ? "$500.00 MX" : "$1500.00 MX";
      this.importe  = priceTipo === 'trimestral' ? this.precioTrimenstral : this.precioAnual;

      const locale = "es"
      
      //SE VERIFICA QUE TIPO DE MEMBRESIA SE DESEA PAGAR
      const priceId = priceTipo === 'trimestral' ? this.trimestralPriceId : this.anualPriceId;


      let stripe = Stripe(process.env.publishStripeKey, locale);

      //LLAMADA A LA API EXTERNA PARA CREAR UNA SESION DE PAGO
      // fetch("http://localhost:4242/create-checkout-session", {
      fetch(this.urlAPI+"/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          priceId: priceId,
          dominio: this.dominio
        })
      })
      .then((result) => {
        if (!result.ok) {
          return result.json().then((json) => {
            if (json.error && json.error.message) {
              throw new Error(result.url + ' ' + result.status + ' ' + json.error.message);
            }
          });
        }
        return result.json();
      })

      .then((data) => {
        //DATOS PARA PANTALLA DE PAGO EXITOSO
        data.tipoSuscripcion = this.tipoSuscripcion;
        data.importe = this.importe;


        //DATA EN STORAGE PARA COMPROBARLA AL HACERASE EL PAGO EXITOSO
        localStorage.setItem("payment_intent", JSON.stringify(data) );
        localStorage.setItem("user", JSON.stringify(this.datosUsuario) );

        //SE EJECUTA LA VENTANA DE STRIPE PARA INSERTAR DATOS DE LA TARJETA
        stripe
          .redirectToCheckout({
            sessionId: data.sessionId
          })
          .then( (result) => {

            if (result.error) {
              // var displayError = document.getElementById("error-message");
              // displayError.textContent = result.error.message;
              console.log(result.error)
            }else{
              localStorage.setItem("result_beta", JSON.stringify(result) );

            }
          });
      });

    },

  

    // pagarMembresia () {
    //   this.spinner = true;
    //   this.modalPago = true;

    //   let purchase = {
    //       // items: [{ id: "xl-tshirt028373" }],
    //       correo: this.correo,
    //       // nombreTarjeta: this.nombre,
    //       usuario: `${this.datosUsuario.nombre} ${this.datosUsuario.apellido}`,
    //   };
    
    //   fetch("https://stripe-checkout-api.herokuapp.com/pagar-membresia", {

    //       method: "POST",
    //       headers: {
    //           "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(purchase),
    //   })
    //   .then((result) => {
    //       // const r =  result.json();
    //       console.log(result);
    //       return result.json();
    //   })  
    //   .then((data) => {
    //     console.log("data")
    //     console.log(data)


    //       this.stripe
    //       .confirmCardPayment(data.clientSecret, {
    //       receipt_email: this.correo,
    //       payment_method: {
    //           card: this.card,
    //           billing_details: {
    //             email: this.correo,
    //             name: this.nombre,
    //             // phone: "2441408001"
    //           }
    //       }
    //       })
    //       .then((result) => {
    //           this.spinner = false;

    //           if (result.error) {
    //               console.log(result.error.message)
    //               this.pagoError(result.error.message);
    //           } else {
    //               this.pagoCorrecto();

    //               //SE OBTIENE EL ID DEL USUARIO ACTUAL
    //               const {id} = this.datosUsuario;

    //               //SE CREA UNA VARIABLE PARA MODIFICAR LOS CAMPOS
    //               let dataUser = this.datosUsuario;

    //               //VALIDA QUE SOLO SE CAMBIA A USUARIO TIPO 1 SI EL USUARIO ES TIPO 0
    //               const lvl = dataUser.lvluser === 2 ? 2 : 1;

    //               //SE BUSCA AL USUARIO EN LA BASE DE DATOS POR MEDIO DEL ID
    //               let usuarioRef =  this.$fireStore.collection("usuarios").doc(id);

    //               //SE ACTUALIZA EN FIREBASE LOS CAMPOS NECESARIOS
    //               usuarioRef.update({
    //                 lvluser: lvl,
    //                 idMembresia: result.paymentIntent.id,
    //               })
    //               .then(() => {


    //                 //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
    //                 dataUser.lvluser = lvl;
    //                 dataUser.idMembresia = result.paymentIntent.id;
    //                 this.guardaDatosUsuarioStore(dataUser);
    //               })
    //               .catch((error) => {
    //                   console.error("Error al realizar pago: ", error);
    //               });


    //           }
    //       });
    //   });


    // },
    // pagoCorrecto(){
    //     this.spinner = false;
    //     this.error= false;
    //     this.pagoHecho = true;
    //     this.errorMensaje = "El pago a sido completado";
    //     // setTimeout(() => {
    //     //     this.$router.push('/')
    //     // }, 3000);

    // },
    // pagoError(msjE){
    //     this.spinner = false;
    //     this.error = true;
    //     this.pagoHecho = false;
    //     const e = this.erroresStripe.find ( error => error.en === msjE);
    //     this.errorMensaje = e.es;


    //     // if(msjE === "Your card has insufficient funds.")
    //     //   this.errorMensaje = "La tarjeta no tiene fondos suficientes";
    //     // else if ( msj === "Your postal code is incomplete.")
    //     //   this.errorMensaje = "Código postal incompleto";

    //     //Your card number is incomplete.
    //     //Your card's expiration date is incomplete.
    //     //Your card's expiration date is in the past
    //     //Your card's expiration year is invalid.
    //     //Your card's security code is incomplete.

    //     // setTimeout(() => {
    //         // console.log("ya pasaron los segundos")
    //         // this.error = null;
    //         // this.errorMensaje = "";
    //     // }, 4000);
            
    // },
    // cerrarModal(){
    //   this.modalPago= false;
    //   this.error= null;
    //   this.pagoHecho = false;
    //   this.errorMensaje = "";
    // },
    // validatarDatosTarjeta () {
    //   const vd = this.$refs.formTarjeta.validate();
    //   this.valid = vd;
    //   // console.log(vd)
    //   if(this.valid)
    //     this.pagarMembresia();
      
    // },

    // //FORMATO DE PAGO 2
    // async pagarConTarjeta(){

    //   var stripe = Stripe(process.env.publishStripeKey);
    //   console.log("create-session")

    // fetch("https://stripe-checkout-api.herokuapp.com/create-session", {
    //   // fetch("http://localhost:4242/create-session", {
    //     method: "POST",
    //   })

    //     .then( (response) => {
    //       return response.json();
    //     })
    //     .then( (session) => {
    //         console.log(session)
    //         // alert("hasta aquiiii")
    //         // localStorage.setItem("sesion", JSON.stringify(session) );
    //         // localStorage.setItem("payment_intent", JSON.stringify(session) );
    //         // this.guardarStripeObj(session);
    //         console.log("session")
    //         console.log(session)
    //         alert("sesion")

    //         localStorage.setItem("payment_intent", JSON.stringify(session) );
    //         localStorage.setItem("user", JSON.stringify(this.datosUsuario) );

    //         // this.sessionId = session.id;
    //         const resultado =  stripe.redirectToCheckout({ sessionId: session.id });
    //         // localStorage.setItem("resullltado", JSON.stringify(resultado) );

    //         // alert("resultado")

    //         return resultado;
  
    //     })

    //     .then( (result) => {
    //       console.log(resul);
    //       // alert("resul")

    //       if (result.error) {
    //         console.log(result.error.message);
    //       }
    //       // alert("Que hace aqui");
    //     })

    //     .catch( (error) => {
    //       console.error("Error:", error);
    //     });

    // // });

    // },



  },
  // watch: {
  //   number () { this.update() },
  //   expiry () { this.update() },
  //   cvc () { this.update() }
  // }
}