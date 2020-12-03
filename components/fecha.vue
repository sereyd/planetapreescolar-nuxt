<template>
<!-- <div  class=" d-flex justify-center align-center mt-4"> -->
    <p>{{fechaFormato}}</p>
 
<!-- </div> -->
</template>

<script>
import { format } from 'date-fns'
import { es } from 'date-fns/locale';
export default {
  data() {
    return {
      
    };
  },
  computed: {
    fechaFormato(){
        const f = format(this.fecha , "dd/MM/yyyy", {locale: es});
        return f;
    }
  },
  methods: {
  },
  props:{
    fecha:{
        type: Number,
        default:()=>{
            return ''
        }
    },
  }
};
</script>

<style >



</style>