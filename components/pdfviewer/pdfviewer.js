import PDF from 'vue-pdf'
export default {
    data(){
        return {
            paginas:[1,2,3]
        }
    },
    mounted(){
        if(this.numspages.length>0){
            this.paginas=this.numspages
        }
    },
    components:{
        PDF
    },
    props:{
        src:"",
        numspages:[]
    }
}