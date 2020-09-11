
import { mapState, mapMutations, mapActions } from 'vuex'

export default{
    data(){
        return {

          //DATA DE PRUEBA
          pageid: 123,

            

            //DATA PARA PASAR ENTRE FORMULARIOS
            faseFormulario:1,

            //DATA PARA VALIDACIONES
            dialog: false,
            valid: false,
            valid2: false,
            error: false,
            mensajeError: "",

            //DATA FROMULARIO 1
            imagen: null,
            datosNuevoGrupo:{
                escuela: "Miguel Hildalgo",
                grado: "3",
                grupo: "B",
                cicloEscolar: "2020",
                seccion: "2",
                turno: "Matutino",
                periodo: "",
                urlImagen: "",
            },
            
            //DATA FORMULARIO 2
            horario: [
                {dia:"Lunes", clase: false, horaInicio:"08:00 am", horaFin: "03:00 pm"},
                {dia:"Martes", clase: false, horaInicio:"08:00 am", horaFin: "03:00 pm"},
                {dia:"Miercoles", clase: false, horaInicio:"08:00 am", horaFin: "03:00 pm"},
                {dia:"Jueves", clase: false, horaInicio:"08:00 am", horaFin: "03:00 pm"},
                {dia:"Viernes", clase: false, horaInicio:"08:00 am", horaFin: "03:00 pm"},
                {dia:"Sabado", clase: false, horaInicio:"1", horaFin: "1"},
                {dia:"Domingo", clase: false, horaInicio:"1", horaFin: "1"},
            ],

            //DATA DE TODOS LOS GRUPOS DEL USUARIO
            grupos:[],
            

            
        }
    },
    computed:{
        ...mapState(['datosUsuario']),

    },
    methods:{
        // crearGrupo(){
        //     console.log(this.newUsuario);
        //     this.usuarios.push(this.newUsuario);
        //     this.resetearData();
        //     console.log(this.newUsuario);
        // },
        ...mapActions(['actualizarGrupos']),
        seleccionarImagen(){
            this.$refs.fileupload.click();
        },
        async change(){
            this.urlImagenPrevia = URL.createObjectURL(this.$refs.fileupload.files[0]);
            this.imagen = this.$refs.fileupload.files[0];
            
        },
        async crearGrupo(){
            //ACTIVANDO ANIMACIÓN DE SPINNER Y ERROR FALSE PARA OCULTAR ERRORES PREVIOS
            // this.spinner = true;
            // this.error = false;
  
            await this.almacenarFotoStorage();
            // await this.almacenarUsuarioAuthentication();
            
            //EN EL METODO DE almacenarUsuarioAuthentication SI EL USUARIO EXISTE MODIFICA this.error
            //DE ESTA FORMA EVITA QUE ALMACENE EL USUARIO EN LA COLLECION
            if(!this.error){
                this.almacenarGrupoCollection();
            }else{
            //   this.spinner = false
            }
  
          },
  
  
          async almacenarFotoStorage(){
  
            const file =  this.imagen;
            const metadata = {
              contentType: 'image/jpeg'
            };
  
            //VERIFICAR QUE SELECCIONARA UNA FOTO DE PERFIL
            if(file)
            {
              // console.log("entroo")
              try {
                //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
                let storageRef = this.$fireStorage.ref("fotos_grupos");
                await storageRef.child(file.name).put(file, metadata);
  
                //SE OBTIENE LA URL DE LA IMAGEN DE PERFIL Y SE AGREGA AL OBJETO DE USUARIO
                await storageRef.child(file.name).getDownloadURL().then((url) =>{
                  this.datosNuevoGrupo.urlImagen = url;
                });
                
              } catch (error) {
                console.log(error)
              }
            }
            else{
              this.datosNuevoGrupo.urlImagen = "none";
            }
          },
        
        async almacenarGrupoCollection(){
          //SE ALMACENA EL NUEVO USUARIO EN LA COLECCION DE USUARIOS
          const {id} = this.datosUsuario;
          try {
            //SE EXTRAEN LOS DATOS DEL OBJETO
            const {escuela, grado, grupo, cicloEscolar, seccion, turno, periodo, urlImagen} 
            = this.datosNuevoGrupo;

            //VERIFICAR SI EL OBJETO datosUsuario TIENE LE CAMPO GRUPOS, SI TIENE GRUPOS PREVIOS
            //SE ALMACENAN EN LA DATA grupos
            if( this.datosUsuario.grupos )
                this.grupos = this.datosUsuario.grupos;

                //SE INSERTAN LOS DATOS DEL NUEVO GRUPO A LA DATA DE GRUPO.
            this.grupos.push(
                {
                    escuela, grado, grupo, cicloEscolar, seccion, turno, periodo, urlImagen,
                    boys: 0, girls: 0, total: 0, fechaCreado: Date.now(), horario: this.horario
                }
            );
            
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

            console.log(usuarioGruposRef);
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE GRUPOS
            usuarioGruposRef.update({
                grupos: this.grupos
            })
            .then(() => {
                //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
                this.actualizarGrupos(this.grupos);
            })
            .catch((error) => {
                console.error("ErroR al agregar grupo: ", error);
            });

            //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
            this.$refs.form.reset();
            this.$refs.form2.reset();
            this.dialog = false;
            this.faseFormulario = 1;
            console.log("pusheando");
            this.$router.push('/grupos')

            
          } catch (error) {
            console.log(error)
          }
        },

        validarFormulario () {
            this.valid =this.$refs.form.validate();
            if(this.valid)
                this.faseFormulario++;

            console.log(this.faseFormulario)
        },
        validarFormulario2 () {
            this.valid2 =this.$refs.form2.validate();
            if(this.valid2)
             this.crearGrupo()
            console.log("valido")
        },
    },
    created() {
      console.log(this)
    },
}