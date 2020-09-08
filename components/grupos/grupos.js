
import { mapState, mapMutations, mapActions } from 'vuex'

export default{
    data(){
        return {
            dialog: false,
            valid: false,
            datosNuevoGrupo:{
                escuela: "Miguel Hildalgo",
                grado: "3",
                grupo: "B",
                cicloEscolar: "2020",
                seccion: "2",
                turno: "Matutino",
                periodo: "enero",
                urlImagen: "",
            },
            newUsuario:{
                nombre: "",
                apellidos: "",
                correo: "",
            },
            usuarios:[
                {nombre: "arturo", apellidos: "cano", correo: "artu@gmail.com"},
                {nombre: "fidel", apellidos: "mendez", correo: "artu@gmail.com"},
                {nombre: "gaby", apellidos: "diaz", correo: "artu@gmail.com"},
            ],
        }
    },
    computed:{
        ...mapState(['datosUsuario']),
    },
    methods:{
        crearGrupo(){
            console.log(this.newUsuario);
            this.usuarios.push(this.newUsuario);
            this.resetearData();
            console.log(this.newUsuario);
        },
        resetearData(){
            // this.$refs.form.reset();
            this.newUsuario.nombre =""
            this.newUsuario.apellidos =""
            this.newUsuario.correo =""
        },
    }
}