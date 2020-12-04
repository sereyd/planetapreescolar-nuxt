import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return {
        }
},
computed:{
    ...mapState(['itemsnotifi','datosUsuario']),
    noticount(){
            var num=0
            num=this.itemsnotifi.length
            return num
        }
    },     
mounted(){
    this.tomanotificaciones()
},

methods:{

    ...mapActions(['tomanotificaciones','cerrarconexion','creaNotificacion']),
    async notivisto(p){
           await this.$fireStore.collection('Notificaciones').doc(this.datosUsuario.id).collection('notify').doc(p.id).update({
            status:1
        })
    },
    async abrirLink(p){
        this.$router.push(p.data().link)
        this.notivisto(p)
    }
    }    

}