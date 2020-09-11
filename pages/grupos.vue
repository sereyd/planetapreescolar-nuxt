<template>
    <v-main>
        
        <grupos/>
        </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import grupos from '~/components/grupos/grupos.vue'
export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            }
        }
    },
    components:{
        grupos
    },
    mixins:[validasitio]
}
</script>
