<template>
    <v-main>
        editor
        </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            }
        }
    },
    mixins:[validasitio]
}
</script>