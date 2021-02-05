import { mapState, mapMutations, mapActions } from 'vuex'
import Spinner from '~/components/spinner.vue'

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
      precioMensual: 490,
      precioTrimestral: 1290,
      precioSemestral: 2190,
      precioAnual: 3500,
      tipoMembresia: "",

      urlsusMP: "",

      //CLAVES PARA MERCADO PAGO GMAIL
      // apiKey: "TEST-20920d57-4e20-4f4c-8ae8-165479c50481",
      // accessToken:"TEST-8920658246221073-122116-fae55fc90deca1afa2cffd0207537488-392358182",

      //CLAVES PARA MERCADO PAGO GMAIL
      apiKey: "TEST-0243b12a-9903-4ea0-9837-a34e8fb2a723",
      accessToken:"TEST-5708698566465206-020216-1cbaade80cc97fab76047cc3d8b3321b-706431956",
      
      //DATA DE MERCAPAGO
      datosMP:{
        nombre:"Jose",
        apellido:"Ruiz Diaz",
        correo:"josed555@gmail.com",
      },
      dialogMP: false,

      dialogFormasPago: false,
      tipoSuscripcion: "",
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
      this.tipoSuscripcion= tipoS;

      const description = tipoS === "trimestral" ? "Planeta Preescolar: Trimestral" : 
        tipoS === "semestral" ? "Planeta Preescolar: Semestral" :
        tipoS === "anual" ? "Planeta Preescolar: Anual" : "Planeta Preescolar: Mensual";
      
      const price = tipoS === "trimestral" ? this.precioTrimestral : 
        tipoS === "semestral" ? this.precioSemestral :
        tipoS === "anual" ? this.precioAnual : this.precioMensual

      this.urlsusMP = tipoS === "trimestral" ? 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847726c5de01773a8cbb520dc0" : 
      tipoS === "semestral" ? 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847726c5de01773a8d86190dc3" :
      tipoS === "anual" ? 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847739336f01773a8e413b0290" : 
      "https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847739336f01773a8b6c050289";

      //https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847739336f01773a8e413b0290

      var orderData = {
        quantity: 1,
        description,
        price,
        dominio: this.dominio
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
          console.log(preference);
          this.urlMP = preference.pre.init_point;
          // this.createCheckoutButton(preference.id);
          this.dialogFormasPago = true; 
          localStorage.setItem("payment_intent", "" );
          localStorage.setItem("user", JSON.stringify(this.datosUsuario) );

          
      })
      .catch((error) => {
        console.log(error)
          alert("Unexpected error");
          // $('#checkout-btn').attr("disabled", false);
      });

    },

    // checkPago(){
    //   const config = {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({idPago: "1233419229"})
    //   }

    //   fetch("http://localhost:4242/estado-pago",config)
    //   .then((result)=>{
    //     return result.json()
    //   })
    //   .then(async(suscripcion)=>{
  
    //     console.log(suscripcion)
    //     if(suscripcion.error)
    //     {
    //       // datos.estadoMembresia = "canceled";
    //       // context.state.datosSuscripcion.status = false;

    //       console.log("error")
    //     }
    //     else{
    //       console.log(suscripcion.response)
    //       console.log(suscripcion.response.status)
    //       // if(suscripcion.response.status === "approved" || suscripcion.response.status === "accredited")
    //       // {
    //       //   datos.estadoMembresia = "active";
    //       //   context.state.datosSuscripcion = suscripcion.response;
    //       //   context.state.datosSuscripcion.status = true;

    //       //   // context.state.datosUsuario.descargasMes.status = true;


    //       // }
    //       // else
    //       // {
    //       //   datos.estadoMembresia = "canceled";
    //       //   context.state.datosSuscripcion.status = false;
    //       // }
  
    //     }
  
    //     // if(datos.estadoMembresia === 'canceled' || datos.estadoMembresia === '')
    //     // {
    //     //   const response = await fetch(context.state.urlAPI+"/obtenerFechaActual")
            
    //     //   const d = await response.json();
  
    //     //   if(!datos.descargasDia)
    //     //   {
    //     //     datos.descargasDia = 
    //     //     {
    //     //       disponibles: context.state.descargarFree,
    //     //       usadas: [],
    //     //       fecha: d.fecha
    //     //     }
    //     //   }
    //     //   else if(d.fecha !== datos.descargasDia.fecha)
    //     //   {
    //     //     ///console.log("el dia cambiooooooo")
    //     //     datos.descargasDia.disponibles= context.state.descargarFree,
    //     //     datos.descargasDia.usadas = [];
    //     //     datos.descargasDia.fecha = d.fecha;
    //     //   }
    //     // }
  
    //   })
    //   .catch((err)=>{
    //     console.log('Error al verificar suscripción', err);
    //   });
    // },

    //PAGO CON MERCAPAGO POR OXXO
    async crearOrdenMP(){

      this.spinner = true;
      this.completado = false;

      window.Mercadopago.setPublishableKey(this.apiKey);
      console.log(this.datosMP);

      this.importe  = 
        this.tipoMembresia === 'trimestral' ? this.precioTrimestral 
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
        // console.log(res.response.transaction_details.external_resource_url);
        this.linkMP = res.response.transaction_details.external_resource_url;
        
        let datosUsuario = {...this.datosUsuario}
        const {id} = datosUsuario;
        
        // const lvl = datosUsuario.lvluser === 2 ? 2 : 1;
        //SE ASIGNA EL ID DEL PAGO DE OXXO AL ID DE LA SUSCRIPCIÓN
        // datosUsuario.idSuscripcion = res.response.id;

        //SE BUSCA AL USUARIO EN LA BASE DE DATOS POR MEDIO DEL ID
        let usuarioRef =  this.$fireStore.collection("usuarios").doc(id);

        //SE ACTUALIZA EN FIREBASE LOS CAMPOS NECESARIOS
        usuarioRef.update({
          // lvluser: lvl,
          // idMembresia: res.response.id,
          // idCliente: this.idCliente,
          idSuscripcion: res.response.id,
          tipoSuscripcion: this.tipoMembresia,
          importeSuscripcion: this.importe,
        })
        .then(() => {
          //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
          // datosUsuario.lvluser = lvl;
          // datosUsuario.idMembresia =res.response.id;
          // datosUsuario.idCliente = this.idCliente;
          datosUsuario.idSuscripcion= res.response.id;
          datosUsuario.tipoSuscripcion= this.tipoMembresia;
          datosUsuario.importeSuscripcion= this.importe;
          // datosUsuario.estadoMembresia = session.payment_status === 'paid' ? 'active' : '';

          this.guardaDatosUsuarioStore(datosUsuario);
        })
        .catch((error) => {
            console.error("Error al realizar pago: ", error);
        });

        // this.cambiastatusSesion()

        this.spinner = false;
        this.completado = true;

      } catch (error) {
        console.log(error)
      }

    },

    //PAGO CON MERCADO LIBRE
    // pagarMP(){
    //   window.this.$MPC_loaded !== true ? (window.attachEvent ? window.attachEvent('onload', $MPC_load) : window.addEventListener('load', $MPC_load, false)) : null;
    // },
    // $MPC_loaded(){
    //   // <a mp-mode="dftl" href="https://www.mercadopago.com/mlm/debits/new?preapproval_plan_id=2c9380847739336f01773a8b6c050289" name="MP-payButton" class='blue-ar-l-rn-none'>Suscribirme</a>


    //      window.this.$MPC_loaded !== true && (function() {
    //      var s = document.createElement("script");
    //      s.type = "text/javascript";
    //      s.async = true;
    //      s.src = document.location.protocol + "//secure.mlstatic.com/mptools/render.js";
    //      var x = document.getElementsByTagName('script')[0];
    //      x.parentNode.insertBefore(s, x);
    //      window.this.$MPC_loaded = true;
    //   })();
   



    // },

    // $MPC_load(){
    //   window.$MPC_loaded !== true && (function() {
    //   var s = document.createElement("script");
    //   s.type = "text/javascript";
    //   s.async = true;
    //   s.src = document.location.protocol + "//secure.mlstatic.com/mptools/render.js";
    //   var x = document.getElementsByTagName('script')[0];
    //   x.parentNode.insertBefore(s, x);
    //   window.$MPC_loaded = true;
    //  })();
    // },
    


    //PAGOS CON STRIPE
    crearSesionSuscripcion(){
      this.spinner = true;

      const priceTipo = this.tipoSuscripcion;
      // this.importe = priceTipo === 'trimestral' ? "$500.00 MX" : "$1500.00 MX";
      this.importe  = 
        priceTipo === 'trimestral' ? this.precioTrimestral 
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