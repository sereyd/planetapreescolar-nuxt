
import { mapState, mapMutations, mapActions } from 'vuex'

// import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus'
// import { stripeKey, stripeOptions } from './stripeConfig.json'
// import { Card, CardNumber, CardExpiry, CardCvc, createToken, confirmCardPayment, handleCardPayment } from 'vue-stripe-elements-plus'
import Spinner from '~/components/spinner.vue'

// import { StripeCheckout } from 'vue-stripe-checkout';

 
export default {
  data () {
    return {

      //DATOS PRA PANTLLA DE PAGO EXITOSO
      tipoSuscripcion: "",
      importe:"",

      //CLAVES DE PAQUETES
      trimestralPriceId: "price_1HtDqDGqO5WLKI2Hgd1pYWoE",
      semestralPriceId: "price_1HtDnFGqO5WLKI2HjCzJ8bVM",
      anualPriceId: "price_1HtDqEGqO5WLKI2H2YHeoZbZ",
      precioTrimenstral: 990,
      precioSemestral: 1490,
      precioAnual: 2490,

      spinner: false,

        
    }
  },
  computed:{
    ...mapState(['datosUsuario','dominio','urlAPI']),
    
  },
  components:{Spinner},
 
  methods: {
    ...mapMutations(['guardaDatosUsuarioStore','guardarStripeObj']),

    //PRUEBAS

    crearSesionSuscripcion(priceTipo){
      this.spinner = true;

      this.tipoSuscripcion = priceTipo;
      // this.importe = priceTipo === 'trimestral' ? "$500.00 MX" : "$1500.00 MX";
      this.importe  = 
        priceTipo === 'trimestral' ? this.precioTrimenstral 
        : priceTipo === 'semestral' ? this.precioSemestral : this.precioAnual;

      const locale = "es"
      
      //SE VERIFICA QUE TIPO DE MEMBRESIA SE DESEA PAGAR
      const priceId = 
        priceTipo === 'trimestral' ? this.trimestralPriceId 
        : priceTipo === 'semestral' ? this.semestralPriceId : this.anualPriceId;


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


  },
}