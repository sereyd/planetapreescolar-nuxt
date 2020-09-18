<template>
    <v-main>
        
    <v-row>
        <v-col cols="12" md="6">
            <editorblog />
            </v-col>


    </v-row>



        </v-main>
</template>
<script>
import validasitio from '@/mixins/validasitio.js'
import editorblog from '~/components/blog-editor/blog-editor.vue'
export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            }
        }
    },
    components:{
        editorblog
    },
    mixins:[validasitio]
}
</script>