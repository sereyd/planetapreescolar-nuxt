<template>
   
    
  <section>

    <p>

      Gracias por comprar la membresia! Si tienes alguna duda escribenos...

      <a href="mailto:orders@example.com">orders@example.com</a>.

    </p>

  </section>

</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            }
        }
    },
    mounted() {
      // const payment_intent = localStorage.getItem("payment_intent");
      // console.log(payment_intent);
      //   var stripe = Stripe("pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx");

      // //${id}_secret_${secret}
      // stripe
      //   .retrievePaymentIntent(payment_intent)
      //   .then(function(result) {
      //     // Handle result.error or result.paymentIntent
      //       console.log("Antes el result")
      //       console.log(result)
      //       alert("vamos a ver el resultado")

      //     if(result.error){
      //       alert("No existe el pago o no esta pagado");
      //     }else{
      //       console.log(result)
      //       alert("El pago es correcto");
      //     }
      //   });

      // debugger;

      // .retrievePaymentIntent

      
    },
    components:{
        
    },
    computed:{
      ...mapState(['idCompra']),
    },
    mixins:[validasitio]
}
</script>


