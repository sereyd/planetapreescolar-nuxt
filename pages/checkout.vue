<template>
    <v-main>
        <checkout/>
    </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import checkout from '~/components/checkout/checkout.vue'

// import { stripeKey, stripeOptions } from './stripeConfig.json'
// import { Card, createToken } from 'vue-stripe-elements-plus'

export default {

    // head() {
    //     return {
    //         script: [{src:'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js'}]
    //     }
    // },
    data(){
        return {
            datapage:{
                permisos:0,
                logeado:true
            }
        }
    },
    components:{
        checkout 
    },
    mixins:[validasitio]
}
</script>

<style>

</style> 
