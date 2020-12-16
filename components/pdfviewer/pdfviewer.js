import PDF from 'vue-pdf'

export default {
    data(){
        return {
            paginas:[1,2,3],
            numPages:0
        }
    },
    computed:{
        cargaPdf(){
            var pdfload=pdf.createLoadingTask(this.src);
            return pdfload
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

    }
}