<template>
    <v-main>
        
        <grupos/>
        </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import grupos from '~/components/grupos/grupos.vue'
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
    methods:{
    ...mapMutations(['guardarVistaValida']),
    },
    created() {
        this.guardarVistaValida(true); 
    },
    components:{
        grupos
    },
    mixins:[validasitio]
}
</script>
