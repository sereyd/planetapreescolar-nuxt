import { mapState, mapMutations, mapActions } from 'vuex'
import Spinner from '~/components/spinner.vue'

export default {
  data () {
    return {
      loaderpage:false,
      //DATOS PRA PANTLLA DE PAGO EXITOSO
      tipoSuscripcion: "",
      importe:"",

      //CLAVES DE PAQUETES
      mensualPriceId: "price_1IKCoAGqO5WLKI2Hj5mvLrNe",
      trimestralPriceId: "price_1IKCpMGqO5WLKI2HaWxukBvn",
      semestralPriceId: "price_1IKCqbGqO5WLKI2HlHkgzs0c",
      anualPriceId: "price_1IKCrEGqO5WLKI2HwNUc9NgY",
      // mensualPriceId: "price_1IISmVANenJgOhZEqbbhOoWO",
      // trimestralPriceId: "price_1IISmVANenJgOhZEQFCe6E4l",
      // semestralPriceId: "price_1IISmVANenJgOhZEyjxBqKE4",
      // anualPriceId: "price_1IISmUANenJgOhZEM9nfjELS",

      precioMensual: 490,
      precioTrimestral: 1290,
      precioSemestral: 2190,
      precioAnual: 3490,
      tipoMembresia: "",

      urlsusMP: "",

      //CLAVES PARA MERCADO PAGO GMAIL
      // apiKey: "TEST-20920d57-4e20-4f4c-8ae8-165479c50481",
      // accessToken:"TEST-8920658246221073-122116-fae55fc90deca1afa2cffd0207537488-392358182",

      //CLAVES PARA MERCADO PAGO GMAIL
      apiKey: "TEST-0243b12a-9903-4ea0-9837-a34e8fb2a723",
      // accessToken:"TEST-5708698566465206-020216-1cbaade80cc97fab76047cc3d8b3321b-706431956",
      
      //DATA DE MERCAPAGO
      datosMP:{
        nombre:"Jose",
        apellido:"Ruiz Diaz",
        correo:"josed555@gmail.com",
      },
      dialogMP: false,

      dialogFormasPago: false,
      // tipoSuscripcion: "",
      urlMP: "",

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


    //PAGO CON MERCADOPAGO
  formasPago(tipoS){
      this.loaderpage=true
      this.tipoSuscripcion= tipoS;
      const external_reference = this.$codegenerate();

      // return external_reference;

      const description = tipoS === "trimestral" ? "Planeta Preescolar: Trimestral" : 
        tipoS === "semestral" ? "Planeta Preescolar: Semestral" :
        tipoS === "anual" ? "Planeta Preescolar: Anual" : "Planeta Preescolar: Mensual";
      
      const price = tipoS === "trimestral" ? this.precioTrimestral : 
        tipoS === "semestral" ? this.precioSemestral :
        tipoS === "anual" ? this.precioAnual : this.precioMensual

    /*  this.urlsusMP = tipoS === "trimestral" ? 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847726c5de01773a8cbb520dc0" : 
      tipoS === "semestral" ? 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847726c5de01773a8d86190dc3" :
      tipoS === "anual" ? 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847739336f01773a8e413b0290" : 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847739336f01773a8b6c050289";

      //https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847739336f01773a8e413b0290
*/
      var orderData = {
        quantity: 1,
        description,
        price,
        dominio: this.dominio,
        external_reference

      };
      fetch(this.urlAPI+"/create_preference", {
      // fetch("/create_preference", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
      })
      .then((response) => {
          return response.json();
      })
      .then((preference) => {
      

          // console.log(preference);
         /// location.href = preference.pre.init_point;
         this.urlMP = preference.pre.init_point;
          // this.createCheckoutButton(preference.id);
          // this.dialogFormasPago = true; 
          localStorage.setItem("payment_intent", "" );
          localStorage.setItem("user", JSON.stringify(this.datosUsuario) );
          orderData.medio="MercadoPago"
              this.registroPago(orderData)
            window.location.href=this.urlMP
        
      })
      .catch((error) => {
        console.log(error)
          alert("Unexpected error");
          // $('#checkout-btn').attr("disabled", false);
      });

    },

 registroPago(orderData){

  orderData.iduser=this.datosUsuario.id
  orderData.status= "pending"
  orderData.date_created=new Date()
  orderData.collector_id=0
  orderData.id=0
  orderData.operation_type=""
  orderData.payment_method_id=""
  orderData.status_detail=""
  orderData.payer={}
   this.$fireStore.collection('pagos').add(orderData)
 },

    //PAGOS CON STRIPE
    crearSesionSuscripcion(tipoSuscripcion){
      this.loaderpage=true
      this.spinner = true;
      const external_reference = this.$codegenerate();
      const priceTipo = tipoSuscripcion;
      // this.importe = priceTipo === 'trimestral' ? "$500.00 MX" : "$1500.00 MX";
      this.importe  = 
        priceTipo === 'trimestral' ? this.precioTrimestral 
        : priceTipo === 'semestral' ? this.precioSemestral 
        : priceTipo === 'mensual' ? this.precioMensual  : this.precioAnual;

      const locale = "es"
      
      //SE VERIFICA QUE TIPO DE MEMBRESIA SE DESEA PAGAR
      const priceId = 
        priceTipo === 'trimestral' ? this.trimestralPriceId 
        : priceTipo === 'semestral' ? this.semestralPriceId 
        : priceTipo === 'mensual' ? this.mensualPriceId : this.anualPriceId;


      let stripe = Stripe(process.env.publishStripeKey, locale);

      var orderData={
        priceId: priceId,
        dominio: this.dominio
      }
      //LLAMADA A LA API EXTERNA PARA CREAR UNA SESION DE PAGO
      // fetch("http://localhost:4242/create-checkout-session", {
      fetch(this.urlAPI+"/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
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
        data.tipoSuscripcion = tipoSuscripcion;
        data.importe = this.importe;
        orderData.tipoSuscripcion=tipoSuscripcion
        orderData.importe=this.importe
        orderData.external_reference=external_reference 

        //DATA EN STORAGE PARA COMPROBARLA AL HACERASE EL PAGO EXITOSO
        localStorage.setItem("payment_intent", JSON.stringify(data) );
        localStorage.setItem("user", JSON.stringify(this.datosUsuario) );

        orderData.medio="Stripe"
        this. registroPago(orderData)

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