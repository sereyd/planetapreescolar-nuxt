<template>
    <v-container>
        Configuración
        <!-- <input type="file" @change = "changeVideo" ref="videoUpload" />
        <v-file-input
            dense
            outlined
            show-size
            counter
            label="Seleccione video"
            prepend-icon="mdi-video"
            accept="video/*"
            ref="videoUpload2"
            v-model="file"
            @change = "changeFile"
        ></v-file-input>

        <v-btn
            class="success mb-4"
            block
            @click="updateFile('video')"
        >
            subir video
        </v-btn>
        <Spinner v-if="spinner" /> -->

        

        <v-file-input
            dense
            outlined
            show-size
            counter
            label="Seleccione Audio"
            prepend-icon="mdi-music-box"
            accept="audio/*, imagen/*, video/*"
            v-model="file"
            @change = "changeFile"

        ></v-file-input>

        <v-btn
            class="success"
            block
            @click="updateFile('audio')"
        >
            subir Audio
        </v-btn>
        <!-- <Spinner v-if="spinner" /> -->
        <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="value"
            color="primary"
            v-if="cargando"
        >
        {{ value }}
        </v-progress-circular>

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

            //DATA PARA BARRA DE PROGRESO UPLOAD
            interval: {},
            value: 0,

        }
    },
    components:{
        Spinner
    },
    // mounted () {
    //   this.interval = setInterval(() => {
    //     if (this.value === 100) {
    //       return (this.value = 0)
    //     }
    //     this.value += 10
    //   }, 1000)
    // },
    methods: {
        async changeFile(){
            console.log(this)
            // console.log(this.$refs)
            console.log(this.file)
            this.urlFile = URL.createObjectURL(this.file);
            // this.file = this.$refs.videoUpload.files[0]
            // this.$emit('updateImg',this.urlImagenPrevia);
            // this.actualizaImgUpload(this.$refs.videoUpload.files[0]);
            console.log(this.urlFile);
            console.log(this.file);

            
        },
        // async changeAudio(){
        //     console.log(this)
        //     console.log(this.$refs)
        //     console.log(this.file)
        //     this.urlFile = URL.createObjectURL(this.file);
        //     // this.file = this.$refs.videoUpload.files[0]
        //     // this.$emit('updateImg',this.urlImagenPrevia);
        //     // this.actualizaImgUpload(this.$refs.videoUpload.files[0]);
        //     console.log(this.urlFile);
        //     console.log(this.file);

            
        // },
        async updateFile(tipo){
            this.cargando = true
            const ubi = `${tipo}s/`;
            // async almacenarFotoStorage(state,ubi){
            console.log("entra al fotoStorage: "+ this.urlFile)

            const file =  this.file;
            const metadata = {
            contentType: `${tipo}/*`
            // contentType: 'video/*'
            };

            console.log("ubi")
            console.log(ubi)
            console.log("metadata")
            console.log(metadata)

            //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
            if(file){
            // console.log("entroo")
                try {
                    //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

                    let storageRef = this.$fireStorage.ref(ubi);
                    let uploadTask = storageRef.child(file.name).put(file, metadata);
                    // var uploadTask = storageRef.child('images/rivers.jpg').put(file);
                    // Upload file and metadata to the object 'images/mountains.jpg'
                    // var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on('state_changed', // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        this.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + this.value + '% done');
                            console.log(snapshot.state)
                            console.log(snapshot)
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