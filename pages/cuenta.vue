<template>
    <div>
        Cuenta
        </div>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
export default {
    data(){
        return {
            datapage:{
                permisos:0,
                logeado:true
            }
        }
    },
    mixins:[validasitio]
}
</script>