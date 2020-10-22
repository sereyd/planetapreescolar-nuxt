export default{
    data(){
        return {
            reflexion:[]
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
    mounted(){
        this.cargaref()
    }
}