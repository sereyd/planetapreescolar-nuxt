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
                'todos',
                'blog',
                'memoria',
                'reflexion',
                'planeacion',
                'recurso',
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
            console.log( "this.$router")
            console.log( this.$router.history.current.fullPath)
            if(this.$router.history.current.fullPath === "/busqueda")
                this.$emit('updateBuscando',!this.esBuscando)
            else
                this.$router.push('/busqueda')

        },
        validateBusqueda () {
            const vd = this.$refs.formBusqueda.validate();
            // console.log(this.$router)
            this.validBusqueda = vd;
            if(this.validBusqueda)
              this.buscarDato()
          },
        
    },
    props:{
        esBuscando:{
            type:Boolean,
            default:false
        },
    }
    
}