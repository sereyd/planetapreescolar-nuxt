import { mapMutations } from  'vuex'
export default{
    data(){
        return {
            imagen: null,
            urlImagenPrevia: '',
        }
    },
    props:{
        ejecimagen:false
    },
    methods:{
      ...mapMutations(['actualizaImgUpload']),
         /* LANZA EL FOCUS PARA SELECCIONAR LA IMAGEN DE PERFIL */
         focus(){
            this.$refs.fileupload.click();
        },

          /* VISTA PREVIA DE LA IMAGEN DE PERFIL SELECCIONADA */
          async change(){
            this.urlImagenPrevia = URL.createObjectURL(this.$refs.fileupload.files[0]);
            this.imagen=this.$refs.fileupload.files[0]
            this.actualizaImgUpload(this.$refs.fileupload.files[0]);
            
          }

         
     
    }
}