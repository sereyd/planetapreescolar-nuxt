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
      const payment_intent = localStorage.getItem("payment_intent");
      console.log(payment_intent)
      debugger;

      
    },
    components:{
        
    },
    computed:{
      ...mapState(['idCompra']),
    },
    mixins:[validasitio]
}
</script>


