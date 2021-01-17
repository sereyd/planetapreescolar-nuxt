<template>
<v-main>
    <h3 color="" class="primary--text">Directorio</h3>
    <!-- <listadoDirectorio/> -->
</v-main>
</template>

<script>

import listadoDirectorio from '~/components/listado-directorio/listado-directorio.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      
    };
  },
  
  async mounted() {
      await this.cargabaseGral()
  },
  computed: {
    ...mapState(['datosUsuario', 'directorios']),
  },
  components: {
    listadoDirectorio
  },
  methods: {
    ...mapMutations(['actualizarDirectorios']),
    ...mapActions(['']),
    async  cargabaseGral(){
      let directorio = [];

      if(this.directorios.length === 0)
      {
        try {
          await this.$fireStore
            .collection("CATEGORIAS").orderBy("fecha", "desc")
            .get()
            .then((data) => {
              data.forEach((doc) => {
                let data = doc.data();
                // data.tags = data.tags ? data.tags : [];
                // data.favoritos = data.favoritos ? data.favoritos : [];
                // data.sinopsis= data.sinopsis ? data.sinopsis : "";

                delete data['idRecurso'];


                const datos = {
                    idRecurso: doc.id,
                    ...data
                }

                directorio.push(datos);
                this.actualizarDirectorios(directorio);
              });

            });
        } catch (e) {
          console.log(e);
        }
      }
      
    },
    updateCategoriasInicio(datos){
     
    },
    
  },
};
</script>
