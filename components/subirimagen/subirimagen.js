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
    limitImg:{
      type:Object,
      default:()=>{
        return{
        width:0,
          height:0
      }
      }
    },
    etreglas:{
      type:String,
      default:""
    }
  },
  mounted(){
    console.log(this.limitImg)
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
    ...mapMutations(["actualizaImgUpload","alertconfig"]),
    /* LANZA EL FOCUS PARA SELECCIONAR LA IMAGEN DE PERFIL */
    focus() {
      this.$refs.fileupload.click();
    },

    /* VISTA PREVIA DE LA IMAGEN DE PERFIL SELECCIONADA */
    async change() {
      var previewImg=0
      this.urlImagenPrevia = URL.createObjectURL(
        this.$refs.fileupload.files[0]
      );

         if(this.limitImg.width>0 || this.limitImg.height>0){
        var foto=new Image()
        foto.src= this.urlImagenPrevia

          foto.onload=()=>{
            if(this.limitImg.width>0 && foto.width === this.limitImg.width){
              previewImg=1

            }
            if(this.limitImg.height>0 && foto.height === this.limitImg.height){
              previewImg=1
            }  

            console.log("Medidas alto "+foto.height+" ancho "+foto.width)

            console.log(previewImg)
     
            if(previewImg===0){
              var payload = {
                st: true,
                tp: "red",
                mensaje: "La imagen no cumple con las medidas"
              };
              this.alertconfig(payload);
              setTimeout(() => {
                var payload = {
                  st: false,
                  tp: "red",
                  mensaje: ""
                };
                this.alertconfig(payload);
    
              }, 3400);
              this.urlImagenPrevia=""
              this.$emit("updateImg", this.urlImagenPrevia);
              this.actualizaImgUpload('');
    
            }
            if(previewImg===1 ){
              this.imagen = this.$refs.fileupload.files[0];
              this.$emit("updateImg", this.urlImagenPrevia);
              this.actualizaImgUpload(this.$refs.fileupload.files[0]);
            }


          }
        }else{
          this.imagen = this.$refs.fileupload.files[0];
          this.$emit("updateImg", this.urlImagenPrevia);
          this.actualizaImgUpload(this.$refs.fileupload.files[0]);
        }
       
    }
  }
};
