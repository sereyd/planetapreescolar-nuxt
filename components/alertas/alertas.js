import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState(['staleras','tpalert','mensajealerta'])
    },
    methods:{
        ...mapMutations(['alertconfig']),
        cerraralerta(){
            var payload={
                st:false
            }
            this.alertconfig(payload)
        }
    }
}