<template>
    <v-main>
        <h2 class="text-center">Administrador</h2>
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