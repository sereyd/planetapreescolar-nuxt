<template>
    <v-row class="ma-0 pa-0">
<v-col cols="12" md="6" class="ma-0 pa-6"   >
<v-main>

<h1 class="primary--text">Inicia sesión</h1>

<!---componente de login---->
    <login/>
<!---componente de login---->

</v-main>
    </v-col>
    <v-col cols="12" md="6" class="ma-0 pa-0">
       <img src="/images/img-registro.png" width="100%" height="89%"/>
    </v-col>
    
    </v-row>

</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import login from '~/components/login/login.vue'
export default {
    data(){
        return {
            datapage:{ 
                sinregistro:true
                }
        }
    },
    components:{
        login
    },
    mixins:[validasitio]
}
</script>