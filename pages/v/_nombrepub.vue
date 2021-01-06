<template>
    <v-main>
        {{nombredesitio}}
        {{datadeprodicto}}
    </v-main>
</template>

<script>
    export default {
 async asyncData({ params }) {
      const nombrepub = params.nombrepub // When calling /abc the slug will be "abc"
      return { 
          url:nombrepub 
          }
    },
    data(){
        return{
        datadeprodicto:"muestra esta variable"
        }
    },
    computed:{
        nombredesitio(){
            var returl=this.url
            console.log(this.url)
            return returl
        }
    }
    }

</script>