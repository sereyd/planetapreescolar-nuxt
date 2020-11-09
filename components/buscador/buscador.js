import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            // recursos:[
            //     'Todos los recursos',
            //     'Cantos',
            //     'Planeaciones',
            //     'Imágenes'
            // ],
            recursos:[
                // 'Todos los recursos',
                'BLOG',
                'MEMORIA',
                'RECOMENDACION',
                'REFLEXIONES',
            ],
            validBusqueda: true,
            // datoBuscar: "ejm",
            // tipoSeleccionado: ""

        }
    },
    computed: {
        ...mapState(['datosUsuario','datosBusqueda'])
    },
    methods: {
        ...mapActions(['obtenerRecursos']),
        buscarDato(){
            console.log(this.datosBusqueda)
            this.$router.push('/busqueda')

        },
        validateBusqueda () {
            const vd = this.$refs.formBusqueda.validate();
            this.validBusqueda = vd;
            if(this.validBusqueda)
              this.buscarDato()
          },
        
    },
    
}