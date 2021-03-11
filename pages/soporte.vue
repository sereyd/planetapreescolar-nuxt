<template>
    <v-main>
        <v-row>
            <v-col>
                <v-btn class="melon white--text" @click="goto('/reporte')">Enviar un reporte</v-btn>
            </v-col>
        </v-row>
    </v-main>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
         goto(p){
            this.$router.push(p)
        },
    }
}
</script>