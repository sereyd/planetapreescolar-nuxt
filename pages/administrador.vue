<template>
    <v-main>
        Administrador
        <administrador/>
        </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import administrador from '~/components/administrador/administrador.vue'
export default {
    data(){
        return {
            datapage:{
                permisos:2,
                logeado:true
            }
        }
    },
    components:{
        administrador
    },
    mixins:[validasitio]
}
</script>