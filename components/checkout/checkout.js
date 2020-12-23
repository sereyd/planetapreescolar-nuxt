import { mapState, mapMutations, mapActions } from 'vuex'

// import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus'
// import { stripeKey, stripeOptions } from './stripeConfig.json'
// import { Card, CardNumber, CardExpiry, CardCvc, createToken, confirmCardPayment, handleCardPayment } from 'vue-stripe-elements-plus'
import Spinner from '~/components/spinner.vue'

// import { StripeCheckout } from 'vue-stripe-checkout';

 
export default {

  // head() {
  //   return {
  //     script: [
  //       {
  //         src:
  //           'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js'
  //       }
  //     ]
  //   }
  // },
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
      tipoMembresia: "",

      //CLAVES PARA MERCADO PAGO
      apiKey: "TEST-20920d57-4e20-4f4c-8ae8-165479c50481",
      accessToken:"TEST-8920658246221073-122116-fae55fc90deca1afa2cffd0207537488-392358182",
      
      //DATA DE MERCAPAGO
      datosMP:{
        nombre:"Jose",
        apellido:"Ruiz Diaz",
        correo:"josed555@gmail.com",
      },
      dialogMP: false,
      mediosPago:["oxxo"],
      medioSeleccionado:null,
      validMP:true,

      spinner: false,
      completado: false,
      linkMP: "",

      correoReglas: [    
        v => !!v || 'Correo es requerido',
        v => /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(v) || 'Correo no válido',
      ],

        
    }
  },
  computed:{
    ...mapState(['datosUsuario','dominio','urlAPI']),
    
  },
  components:{Spinner},
 
  methods: {
    ...mapMutations(['guardaDatosUsuarioStore','guardarStripeObj']),
    //PAGOS CON MERCADO LIBRE
    generarCobro(){

      window.Mercadopago.setPublishableKey(this.apiKey);
      console.log(this.datosMP);
    },

    validarMP(){
      const vd = this.$refs.formMP.validate();
      // console.log(this.$router)
      this.validMP = vd;
      if(this.validMP)
      {
        // this.tipoMembresia = tipoM;

        this.crearOrdenMP();
      }
    
    },

    //PAGO CON MERCAPAGO POR OXXO
    async crearOrdenMP(){

      this.spinner = true;
      this.completado = false;

      window.Mercadopago.setPublishableKey(this.apiKey);
      console.log(this.datosMP);

      this.importe  = 
        this.tipoMembresia === 'trimestral' ? this.precioTrimenstral 
        : this.tipoMembresia === 'semestral' ? this.precioSemestral : this.precioAnual;

      const dataMP = {
        precio: this.importe,
        tipo: this.tipoMembresia,
        correo: this.datosMP.correo,
        nombre: this.datosMP.nombre+" "+this.datosMP.apellido
      }

      console.log(this.urlAPI)
      try {
        const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataMP)
        }
        
        const json = await fetch(this.urlAPI+"/mercadopago-oxxo",config);
        let res = await json.json();
  
        // console.log(res.response);
        this.datosUsuario.idSuscripcion = res.response.id;
        // console.log(res.response.transaction_details.external_resource_url);
        this.linkMP = res.response.transaction_details.external_resource_url;

        // this.cambiastatusSesion()

        this.spinner = false;
        this.completado = true;

      } catch (error) {
        console.log(error)
      }

    },
    


    //PAGOS CON STRIPE
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