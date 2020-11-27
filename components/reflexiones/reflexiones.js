export default{
    data(){
        return {
            reflexion:[]
        }
    },
    computed:{
        cargarecomendacion(){
            var limit=350
            var loncadena=this.reflexion[0].contenido.length
            var suspensivos="..."
            var contenido=this.reflexion[0].contenido.substr(1,limit)
            if(loncadena<limit){
                suspensivos=""
            }
            return contenido+suspensivos
        }   
    },
    methods:{
       async cargaref(){
            try{
                await this.$fireStore
                .collection('REFLEXIONES')
                .where("edopost","==","publico") 
                .limit(1)
                .get()
                .then((data)=>{
                    data.forEach((doc) => {
                        this.reflexion.push(doc.data());
                      });
         ////this.reflexion=data
                })   
            }catch(e){
                console.error(e)
            }
        }
    },
    props:{
        linkmas:{
            type:String,
            default:"#"
        }
    },
    mounted(){
        this.cargaref()
    }
}