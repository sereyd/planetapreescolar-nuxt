import { mapState } from 'vuex'

export default {


    data(){
        return {
          urlimg:""
        }
    },
    created(){
        this.urlimg=`${window.location.protocol}//${window.location.host}/images/loader/loader5.gif`
      },
    computed:{
        ...mapState(['cleanview'])
    }

}