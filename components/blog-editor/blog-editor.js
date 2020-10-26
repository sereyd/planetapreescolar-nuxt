import { mapState, mapActions, mapMutations } from "vuex";

import { VueEditor } from "vue2-editor";
import subirImagen from "@/components/subirimagen/subirimagen.vue";
export default {
  data() {
    return {
      editar: false,
      datablog: {
        urlImagen: "",
        fecha:"",
        edopost: "",
        titulo: "",
        contenido: "",
        user: ""
      },
      uploadimg: false,
      creablog: false,
      mensajeError1: "",
      preview: "",
      customToolbar: [
        [{ 'font': [] }],
        [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        [{ 'header': 1 }, { 'header': 2 }],
        ['blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'video', 'formula'],
        [{ 'direction': 'rtl' }],
        ['clean'],
      ]
  
    };
  },
  computed: {
    ...mapState(["urlimg", "datosUsuario"])
  },
  methods: {
    ...mapMutations(["almacenarFotoStorage"]),
    creanuevopost() {
      this.mensajeError1 = "";
      if (this.datablog.titulo && this.datablog.edopost) {
        this.editar = false;
        this.creablog = true;
      } else {
        this.mensajeError1 = "Ingrese todos los datos para continuar";

        setTimeout(() => {
          this.mensajeError1 = "";
        }, 2000);
      }
    },
    guardaPost() {
      try {
      } catch (e) {
        console.error(e);
      }
    },
    cerrar() {
      this.creablog = false;
      this.editar = true;
    },
    async guardarPost() {
      try {
        if (this.imagen === "true") {
          if (this.preview) {
            this.almacenarFotoStorage(
              this.tipo+"/" + this.datosUsuario.foldercode
            );
          } else {
            this.guardaenstore();
          }
        }else{
          this.guardaenstore();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async guardaenstore() {
      try {
        var date=new Date();
        this.datablog.fecha=date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear();
        var numhora=date.getSeconds()+date.getMilliseconds()
        await this.$fireStore.collection(this.tipo).add(this.datablog);
        this.creablog = false;
            this.datablog.urlImagen=""
            this.datablog.edopost=""
            this.datablog.fecha=""
            this.datablog.titulo=""
            this.datablog.contenido=""
        this.$emit('updatepost',numhora)
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.datablog.user = this.datosUsuario.id;
  },
  components: {
    subirImagen,
    VueEditor
  },
    props: {
    tipo: {
      type: String,
      default: "BLOG"
    },
    imagen: {
      type: String,
      default: "true"
    }
  },
  watch: {
    urlimg() {
      if (this.urlimg) {
        if (this.datablog.titulo && this.datablog.edopost) {
          this.datablog.urlImagen = this.urlimg;
          this.guardaenstore();
        }
      }
    }
  }
};
