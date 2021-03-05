import PDF from "vue-pdf";
import { mapState } from "vuex";
export default {
  data() {
    return {
      paginas: [1, 2, 3],
      numPages: 0,
      pdfload: {},
      pageLoader:0
    };
  },
  computed: {
    ...mapState(["datosUsuario","screenprinf"]),
    async cargaPDF() {
       

        var numeropaginas = (this.pdfload = await PDF.createLoadingTask(
          this.src
        ));
        this.pdfload.promise.then(data => {
          this.numPages = data._pdfInfo.numPages;
          
    
        });
        
      return this.numPages;
    }
  },
  methods:{
    loaderpage(p){
      setTimeout(()=>{
      this.pageLoader++
      },1000)

    }
  },
  mounted() {},
  components: {
    PDF
  },
  props: {
    src: "",
    subtipo:{
      default:()=>{
          return 'BLOG'
      }
    },
  }
};
