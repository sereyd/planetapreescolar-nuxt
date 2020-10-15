<template>
    <v-main>
      
        </v-main>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    redTienda(){
        window.open(this.$store.state.linktienda,"_blank")
    }
  },
  mounted(){
    this.redTienda()
  }
}
</script>