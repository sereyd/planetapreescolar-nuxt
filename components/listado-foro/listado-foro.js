import {mapState, mapActions, mapMutatios } from 'vuex'
import editablog from '~/components/editor-blog/editor-blog.vue'
export default {
  data(){
    return {
      items:[],
      addeditblog:false,
      blogeditable:{}
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
      /*var tomaforos=this.$fireStroe.collection('foro').get()
      
      tomaforos.forEach((data)=>{
        this.items.push(data.data())
      })

      console.log(this.items)
   */
    }
  },
  components:{
    editablog
  }
}