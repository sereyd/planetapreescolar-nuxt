import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return {
        }
},
computed:{
    ...mapState(['itemsnotifi']),
    noticount(){
            var num=this.itemsnotifi.length
            return num
        }
    },     
mounted(){
    this.tomanotificaciones()
},
methods:{

    ...mapActions(['tomanotificaciones','cerrarconexion','creaNotificacion'])

    }    

}