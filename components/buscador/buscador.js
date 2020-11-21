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
                'TODOS LOS RECURSOS',
                'BLOG',
                'MEMORIA',
                'RECOMENDACION',
                'REFLEXIONES',
                'AUDIOS',
                'VIDEOS',
                'IMAGENES',
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
            // console.log(this.datosBusqueda)
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