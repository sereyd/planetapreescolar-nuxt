<template>
    <v-main>
        <grupoDetalles/>
    </v-main>
</template>

<script>
    import validasitio from '@/mixins/validasitio.js'
    import grupoDetalles from '~/components/gruposDetalles/grupoDetalles.vue'
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
        components:{
            grupoDetalles
        },
        mixins:[validasitio],
        methods:{
            ...mapMutations(['guardarVistaValida']),
        },
        created() {
            this.guardarVistaValida(false);
            
        },
    }

</script>


