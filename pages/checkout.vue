<template>
    <v-main>
        <h1>CheckOut</h1>
        <checkout
            stripe='pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx'
            :options='stripeOptions'
        />
        <!-- <div id=''>
            <h1>Please give us your payment details:</h1>
            <card class='stripe-card'
            :class='{ complete }'
            stripe='pk_test_51HYuyhGqO5WLKI2Hu5m73PN4c8yz2iBOd1ewOcUYP8cVFfRvoXhUA0t7wpXFQBTawWYN8bjbpLdP4QGd9NhxiF7t00i4J0tzOx'
            :options='stripeOptions'
            @change='complete = $event.complete'
            />
            <button class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</button>
        </div> -->
        </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import checkout from '~/components/checkout/checkout.vue'

// import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            },
            complete: false,
            stripeOptions: {
                // see https://stripe.com/docs/stripe.js#element-options for details
            }
        }
    },
    components:{
        checkout,
        Card 
    },
    methods:{
        pay () {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then(data => console.log(data.token))
    }
    },
    mixins:[validasitio]
}
</script>

<style>

</style> 
