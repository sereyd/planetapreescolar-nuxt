export default{
    data(){
        return {
            reflexion:[],
            reflexionSeleccionada:{},
        }
    },
    computed:{
        cargarecomendacion(){
            var limit=350
            var loncadena= this.reflexionSeleccionada.contenido.length
            var suspensivos="..."
            var contenido= this.reflexionSeleccionada.contenido.substr(0,limit)
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
                .get()
                .then((data)=>{
                    data.forEach((doc) => {
                        this.reflexion.push(doc.data());
                    });
                    let ran = Math.floor(Math.random() * this.reflexion.length)
                    console.log(ran);
                    console.log(this.reflexion.length);
                    this.reflexionSeleccionada = this.reflexion[ran]

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