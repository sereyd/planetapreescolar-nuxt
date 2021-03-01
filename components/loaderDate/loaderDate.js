import { mapState } from 'vuex'
export default {
    data(){
        return {

        }
    },

    props:{
        loader:{
            type:Boolean,
            default:false
        },
        tipo:{
            type:String,
            default:'lista'
        },
        cols:{
            type:[Number,String],
            default:4
        }
    }
}