import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            recursos:[
                'todos',
                'Planeaciones',
                'Hojas de trabajo',
                'Hojas para ilustrar',
                'Material didáctico',
                'Material interactivo',
                'Administración',
                'Blog',
                'Memorias',
                'otro',
            ],
            validBusqueda: true,
            // datoBuscar: "ejm",
            // tipoSeleccionado: ""

        }
    },
    mounted(){
      if(this.selectopt){
            console.log(this.selectopt)
            this.cambiaselecionbusqueda(this.selectopt)
        }
    },
    computed: {
        ...mapState(['datosUsuario','datosBusqueda'])
    },
    methods: {
        ...mapActions(['obtenerRecursos']),
        ...mapMutations(['cambiaselecionbusqueda']),
        buscarDato(){
            // console.log( "this.$router")
            // console.log( this.$router.history.current.fullPath)
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
        selectopt:""
    }
    
}