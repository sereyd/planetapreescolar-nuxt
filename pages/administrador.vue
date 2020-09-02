<template>
    <div>
        Administrador
        </div>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
export default {
    data(){
        return {
            datapage:{
                permisos:2,
                logeado:true
            }
        }
    },
    mixins:[validasitio]
}
</script>