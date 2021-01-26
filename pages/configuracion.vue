<template>
    <v-container>
      <v-row>
          <v-col cols="12" md="6" class="text-center" style="cursor:pointer;" @click="goto('/idioma')" >
              <v-icon class="primary--text " style="font-size:50px;">mdi-translate</v-icon><br />
             <h3 class="melon--text">IDIOMA</h3>
          </v-col>
          <v-col cols="12" md="6" class="text-center" style="cursor:pointer;" @click="goto('/tutoriales')" >
                <v-icon class="primary--text " style="font-size:50px;">mdi-school</v-icon><br />
             <h3 class="melon--text"> TUTORIALES</h3>
          </v-col>   
 <v-col cols="12" md="6" class="text-center" style="cursor:pointer;" @click="goto('/soporte')">
       <v-icon class="primary--text " style="font-size:50px;">mdi-face-agent</v-icon><br />
   <h3 class="melon--text">  SOPORTE</h3>
          </v-col>
           <v-col cols="12" md="6" class="text-center" style="cursor:pointer;" @click="goto('/faq')">
                 <v-icon class="primary--text " style="font-size:50px;">mdi-frequently-asked-questions</v-icon><br />
<h3 class="melon--text">PREGUNTAS FRECUENTES</h3>
          </v-col>
           <v-col cols="12" md="6" class="text-center" style="cursor:pointer;" @click="goto('/share')">
                 <v-icon class="primary--text " style="font-size:50px;">mdi-share-variant</v-icon><br />
<h3 class="melon--text">INVITA A UN AMIGO</h3>
          </v-col>
      </v-row>

    </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Spinner from '~/components/spinner.vue'
export default {
    data(){
        return {
            cargando: true,
            barraProgreso: 0,
            urlFile: null,
            file: null,
            tipoRecurso: "",
            tipoFile:"",

            //DATA PARA BARRA DE PROGRESO UPLOAD
            interval: {},
            porcentaje: 100,
            bytesTotal: 0,
            bytesTranferidos: 0,

        }
    },
    components:{
        Spinner
    },
    methods: {
        goto(p){
            this.$router.push(p)
        },
        async changeFile(){
            // console.log(this)
            // console.log(this.$refs)
            // console.log(this.file)
            this.urlFile = URL.createObjectURL(this.file);
            // console.log(this.urlFile);
            console.log(this.file);
            const res = this.file.type.split("/");
            // console.log(res);
            this.tipoFile = res[0];
            this.bytesTranferidos = (this.file.size / 1000000).toFixed(2);
            // const r = (6085966 / 1000000).toFixed(2);
            // console.log(r+" MBs")
        },

        async updateFile(){
            this.cargando = true
            this.porcentaje = 0;
            const ubi = `${this.tipoFile}s/`;
            // async almacenarFotoStorage(state,ubi){
            console.log("entra al fotoStorage: "+ this.urlFile)

            const file =  this.file;
            const metadata = {
            contentType: `${this.tipoFile}/*`
            // contentType: 'video/*'
            };


            //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
            if(file){

                try {
                    //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

                    let storageRef = this.$fireStorage.ref(ubi);
                    let uploadTask = storageRef.child(file.name).put(file, metadata);

                    await uploadTask.on('state_changed', // or 'state_changed'
                    (snapshot) => {
                        this.porcentaje = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
                        // console.log('Upload is ' + this.porcentaje + '% done');
                        this.bytesTranferidos = ( snapshot.bytesTransferred / 1000000).toFixed(2);
                        this.bytesTotal = ( snapshot.totalBytes / 1000000).toFixed(2);

                        // console.log(Math.round(snapshot.bytesTransferred/ 100000) + "/"+ Math.round(snapshot.totalBytes/ 100000))
                        // switch (snapshot.state) {
                        // case this.$fireStorage.TaskState.PAUSED: // or 'paused'
                        //     console.log('Upload is paused');
                        //     break;
                        // case this.$fireStorage.TaskState.RUNNING: // or 'running'
                        //     console.log('Upload is running');
                        //     break;
                        // }
                    },(error) => {
                        console.log("ERROR: ")
                        console.log(error)
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        //   switch (error.code) {
                        //     case 'storage/unauthorized':
                        //       // User doesn't have permission to access the object
                        //       break;

                        //     case 'storage/canceled':
                        //       // User canceled the upload
                        //       break;

                        //     ...

                        //     case 'storage/unknown':
                        //       // Unknown error occurred, inspect error.serverResponse
                        //       break;
                        //   }
                    }, () => {
                    // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL()
                        .then( (downloadURL) => {
                            this.urlFile = downloadURL     
                            console.log('File available at', downloadURL);
                        });
                    });






                    // //SE OBTIENE LA URL DE LA IMAGEN DE PERFIL Y SE AGREGA AL OBJETO DE USUARIO
                    // await storageRef.child(file.name).getDownloadURL()
                    // .then((url) =>{
                    //     this.urlFile=url     
                    //     ///// manda instruccion de foto en lo que tendra el link de la foto con la url de la imagen 
                    //     }
                    // );
                } catch (error) {
                    console.log(error)
                }
            }else{
                this.urlFile= this.urlFile === 'none' ? "" : "none"
            ///// manda instruccion de foto en lo que tendra el link de la foto en none
            }

            console.log("saliendo fotoStorage: "+ this.urlFile)
            // this.cargando = false


            //

        },
        subirVideo(){

        },
        subirAudio(){

        },

    },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>{

}