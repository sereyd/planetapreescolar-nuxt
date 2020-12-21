import { formatWithOptions } from "date-fns/fp";
import { mapMutations } from "vuex"
export default {
  data() {
    return {
      imagen: null,
      urlImagenPrevia: "",
      datosimg:{}
    };
  },
  props: {
    ejecimagen: false,
    tpimg: {
      type: String,
      default: "avatar"
    },
    titulo: {
      type: String,
      default: "Foto de Pefil"
    },
    urlPrevia:{
      type: String,
      default:""
    },
    limitW:{
      type:[Number,String],
      default:""
    },
    limitH:{
      type:[Number,String],
      default:""
    }
  },
  mounted(){

    console.log(this.urlPrevia);

    if(this.urlPrevia !== "" && this.urlPrevia !== "none")
    {
      this.urlImagenPrevia = this.urlPrevia;
      this.imagen = true;
      console.log(this.urlImagenPrevia);

      // this.$emit("updateImg", this.urlImagenPrevia);
      // this.actualizaImgUpload(this.$refs.fileupload.files[0]);

    }

  },
  methods: {
    ...mapMutations(["actualizaImgUpload"]),
    /* LANZA EL FOCUS PARA SELECCIONAR LA IMAGEN DE PERFIL */
    focus() {
      this.$refs.fileupload.click();
    },

    /* VISTA PREVIA DE LA IMAGEN DE PERFIL SELECCIONADA */
    async change() {

      this.urlImagenPrevia = URL.createObjectURL(
        this.$refs.fileupload.files[0]
      );
         if(this.limitW || this.limitH){
        var foto=new Image()
        foto.src= this.urlImagenPrevia

        foto.onload=()=>{
          if(this.limitW && foto.width !== this.limitW){
            this.urlImagenPrevi=""
          }
          if(this.limitH && foto.height !== this.limitH){
            this.urlImagenPrevi=""
          }  
        }
        }

      this.imagen = this.$refs.fileupload.files[0];
      this.$emit("updateImg", this.urlImagenPrevia);
      this.actualizaImgUpload(this.$refs.fileupload.files[0]);
    }
  }
};
