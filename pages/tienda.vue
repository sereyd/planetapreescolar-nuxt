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
        window.open(this.$store.state.configAll.tienda,"_blank")
        this.$router.push('/')
    }
  },
  mounted(){
    this.redTienda()
  }
}
</script>