import PDF from "vue-pdf";
import { mapState } from "vuex";
export default {
  data() {
    return {
      paginas: [1, 2, 3],
      numPages: 0,
      pdfload: {}
    };
  },
  computed: {
    ...mapState(["datosUsuario"]),
    async cargaPDF() {
        console.log(this.datosUsuario)
      if (this.datosUsuario.estadoMembresia === "active") {
        var numeropaginas = (this.pdfload = await PDF.createLoadingTask(
          this.src
        ));
        this.pdfload.promise.then(data => {
          this.numPages = data._pdfInfo.numPages;
        });
       
      } else {
        this.numPages = 2;
      }

      return this.numPages;
    }
  },
  mounted() {},
  components: {
    PDF
  },
  props: {
    src: ""
  }
};
