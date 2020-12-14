import { mapState } from 'vuex'
import {VueEditor} from 'vue2-editor'
export default {
    data(){
        return {
            datosblog:{}
        }
    },
    computed:{
        ...mapState(['categoriasblog']),
        cargadatosblog(){
            if(Object.keys(this.editar).length>0){
                this.datosblog=this.editar
            }else{
                this.datosblog={}
            }
        }
    },
    components:{
        VueEditor
    },
    props:{
        editar:{},
        
    }
}
