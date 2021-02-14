<template>
<v-main>
    <h3 color="" class="primary--text">Directorio</h3>
    <!-- <div class="d-flex justify-center">
      <v-btn class="melon white--text mb-2 btn_crearG" @click="crearSesionSuscripcion()">Stripe</v-btn>
    </div> -->
    <!-- <listadoDirectorio/> -->
</v-main>
</template>

<script>

import listadoDirectorio from '~/components/listado-directorio/listado-directorio.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      priceId: "price_1II2R1GqO5WLKI2HKofDzyQq",
      precio:250,
      
    };
  },
  
  async mounted() {
      await this.cargabaseGral()
  },
  computed: {
    ...mapState(['datosUsuario', 'directorios','urlAPI','dominio']),
  },
  components: {
    listadoDirectorio
  },
  methods: {
    ...mapMutations(['actualizarDirectorios']),
    ...mapActions(['']),
    async  cargabaseGral(){
      let directorio = [];

      if(this.directorios.length === 0)
      {
        try {
          await this.$fireStore
            .collection("CATEGORIAS").orderBy("fecha", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                let data = doc.data();
                // data.tags = data.tags ? data.tags : [];
                // data.favoritos = data.favoritos ? data.favoritos : [];
                // data.sinopsis= data.sinopsis ? data.sinopsis : "";

                delete data['idRecurso'];


                const datos = {
                    idRecurso: doc.id,
                    ...data
                }

                directorio.push(datos);
                this.actualizarDirectorios(directorio);
              });

            });
        } catch (e) {
          console.log(e);
        }
      }
      
    },
    crearSesionSuscripcion(){
      // this.spinner = true;

      let priceId = "price_1II2R1GqO5WLKI2HKofDzyQq";
      let precio = 250;

      const locale = "es"
      
      

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
        // data.tipoSuscripcion = this.tipoSuscripcion;
        // data.importe = this.importe;


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
    updateCategoriasInicio(datos){
     
    },
    
  },
};
</script>
