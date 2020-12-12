import {mapState, mapActions, mapMutatios } from 'vuex'
export default {
  data(){
    return {
      items:[]
    }
  },
  computed:{
    ...mapState(['datosUsuario'])
  },
  mounted(){
    this.cargaDatosforo()
  },
  methods:{
    cargaDatosforo(){
      var tomaforos=this.$fireStroe.collection('foro').get()
      
      tomaforos.forEach((data)=>{
        this.items.push(data.data())
      })

      console.log(this.items)
    }
  }
}