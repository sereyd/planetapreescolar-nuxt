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
         /* LANZA EL FOCUS PARA SELECCIONAR LA IMAGEN DE PERFIL */
         focus(){
            this.$refs.fileupload.click();
        },

          /* VISTA PREVIA DE LA IMAGEN DE PERFIL SELECCIONADA */
          async change(){
            this.urlImagenPrevia = URL.createObjectURL(this.$refs.fileupload.files[0]);
            this.imagen = this.$refs.fileupload.files[0];
            
          },

         
          async almacenarFotoStorage(){

            const file =  this.imagen;
            const metadata = {
              contentType: 'image/jpeg'
            };
  
            //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
            if(file){
              // console.log("entroo")
              try {
                //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
                let storageRef = this.$fireStorage.ref("fotos_perfil");
                await storageRef.child(file.name).put(file, metadata);
                //SE OBTIENE LA URL DE LA IMAGEN DE PERFIL Y SE AGREGA AL OBJETO DE USUARIO
                await storageRef.child(file.name).getDownloadURL()
                    .then((url) =>{
                    this.$emit('urlfoto',url);
                    }
                );
                
              } catch (error) {
                console.log(error)
              }
            }else{
                this.$emit('urlfoto','none');
            }
          }
    },
    watch:{
       async ejecimagen(){
            if(this.ejecimagen===true){
               await this.almacenarFotoStorage();
            }
        }
    }
}