import {mapState, mapActions, mapMutations } from 'vuex'
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
    ...mapState(['datosUsuario', 'loading'])
  },
  mounted(){
    this.cargaDatosforo()
  },
  methods:{
    ...mapMutations(['foroseleccionado','cambiaLoading']),
   
    foroselect(k){
      this.foroseleccionado(k)
      this.$router.push('/foros/'+k.id+"/"+k.titulo)
    },
    actualizaForos(e){
      this.cargaDatosforo()
    },
    cargaDatosforo(){
      this.cambiaLoading('inicia')
      this.items=[]
      var tomaforos
if(this.datosUsuario.lvluser===3){
console.log('super usuario')
  tomaforos=this.$fireStore.collection('foro')
}else{
  ////
  
  console.log('usuario normail')
   tomaforos=this.$fireStore.collection('foro')
    .where('verificado','==', true)
    .where('publicado','==', true)
    
}
console.log('lvl: '+this.datosUsuario.lvluser)
var datospublicacion
    tomaforos.get()
        .then((data)=>{
          data.docs.forEach((d)=>{
                  datospublicacion={
                      categoria:d.data().categoria,
                      calcstart:parseInt(d.data().calcstart),
                      comentarios:d.data().comentarios,
                      correo:d.data().correo,
                      cuerpo:d.data().cuerpo,
                      estrellas:d.data().estrellas,
                      fechapub:d.data().fechapub,
                      iduser:d.data().iduser,
                      publicado:d.data().publicado,
                      publicador:d.data().publicador,
                      titulo:d.data().titulo,
                      verificado:d.data().verificado,
                      id:d.id
                  }
            this.items.push(datospublicacion)
            this.   this.cambiaLoading('finaliza')
          })

})  
console.log('Items cargados ')
      console.log(this.items)
   
    }
  },
  components:{
    editablog
  }
}