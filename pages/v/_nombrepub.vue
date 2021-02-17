<template>
    <v-main>

<h1>{{ this.datos.titulo}}</h1>

<div v-html="this.datos.contenido">
</div>



    </v-main>
</template>

<script>
    export default {
 async asyncData({ params }) {
      const nombrepub = params.nombrepub // When calling /abc the slug will be "abc"
      return { 
          url:nombrepub,
          datos:{},
          keywords:""
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

                this.datos.tags.forEach((key)=>{
            this.keywords+=key+" | "
        })
            })
        },
    },
    head() {
      return {
        title:  this.datos.titulo,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: this.datos.desc
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.keywords
          },
          {
              hid:'robots',
              name:"robots",
            content:"index"
          }
        ]
      }    
    }
    }
</script>