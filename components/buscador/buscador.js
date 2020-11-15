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

            // const {userlogin, id} = this.datosUsuario;

            // console.log("datosUsuario")
            // console.log(this.datosUsuario)
            // console.log("buscando: ", this.datosBusqueda.clave)
            // console.log("tipo: ", this.datosBusqueda.tipo)

            // if(!userlogin)
            // {
            //     console.log("USAURIO SIN REGISTRO")
            //     // this.buscarPublicas();
            // }
            // else
            // {
            //     console.log("USUARIO LOEGADO")

            // }



        },
        
    },
    
}