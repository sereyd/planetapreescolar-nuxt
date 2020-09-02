<template>
    <v-row class="ma-0 pa-0">
<v-col cols="12" md="6" class="ma-0 pa-6"   >
<v-main>

<h1 class="primary--text">Inicia sesión</h1>

<!---componente de login---->
<!---componente de login---->

</v-main>
    </v-col>
    <v-col cols="12" md="6" class="ma-0 pa-0">
       <img src="/images/img-registro.png" width="100%" />
    </v-col>
    
    </v-row>

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