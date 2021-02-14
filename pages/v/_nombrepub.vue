<template>
    <v-main>
sito landing page
    </v-main>
</template>

<script>
    export default {
 async asyncData({ params }) {
      const nombrepub = params.nombrepub // When calling /abc the slug will be "abc"
      return { 
          url:nombrepub,
          datos:{}
          }
    },
    data(){
        return{
        datadeprodicto:"muestra esta variable"
        }
    },
    created(){
        this.cargadatos()
    },
    methods:{   
        cargadatos(){
            this.$fireStore.collection('landingpage').where('url','==',this.url).get()
            .then((data)=>{
               this.datos=data.docs[0].data()
            })
        },
    },
 

    }

</script>