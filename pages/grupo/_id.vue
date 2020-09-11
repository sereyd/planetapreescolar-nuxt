<template>
    <v-main>
        <h1>Hola ruta dinamica</h1>
    </v-main>
</template>
<script>
// import validasitio from '@/mixins/validasitio.js'
// import grupos from '~/components/grupos/grupos.vue'
export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            }
        }
    },
    created(){
        console.log(this.$router)
    },
    components:{
        // grupos
    },
    // mixins:[validasitio]
}
</script>
