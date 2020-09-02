<template>
    <div>
     Login
        </div>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
export default {
    data(){
        return {
            datapage:{ 
                sinregistro:true
                }
        }
    },
    mixins:[validasitio]
}
</script>