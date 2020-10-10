
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
            esGrupoValido: false,
            error: false,
            mensajeError: "",

            //DATA FROMULARIO 1
            imagen: null,
            // datosNuevoGrupo:{
            //     escuela: "Miguel Hildalgo",
            //     grado: "3",
            //     grupo: "B",
            //     cicloEscolar: "2020",
            //     seccion: "2",
            //     turno: "Matutino",
            //     periodo: "",
            //     urlImagen: "",
            // },
            datosNuevoGrupo:{
              nombreGrupo: "",
              adicionales: "",
              cicloEscolar: "",
              // seccion: "2",
              // turno: "Matutino",
              // periodo: "",
              urlImagen: "",
          },
            
            //DATA FORMULARIO 2
            horario: [
                {
                  dia:"Lunes", clase: false, horaInicio:"", horaFin: "", 
                  alumnos:[],
                  listas:[
                    {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
                    {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
                  ]
                },
                {
                  dia:"Martes", clase: false, horaInicio:"", horaFin: "", 
                  alumnos:[],
                  listas:[
                    {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
                    {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
                  ]
                },
                {
                  dia:"Miercoles", clase: false, horaInicio:"", horaFin: "", 
                  alumnos:[],
                  listas:[
                    {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
                    {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
                  ]
                },
                {
                  dia:"Jueves", clase: false, horaInicio:"", horaFin: "", 
                  alumnos:[],
                  listas:[
                    {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
                    {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
                  ]
                },
                {
                  dia:"Viernes", clase: false, horaInicio:"", horaFin: "", 
                  alumnos:[],
                  listas:[
                    {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
                    {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
                  ]
                },
                {
                  dia:"Sabado", clase: false, horaInicio:"", horaFin: "", 
                  alumnos:[],
                  listas:[
                    {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
                    {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
                  ]
                },
                {
                  dia:"Domingo", clase: false, horaInicio:"", horaFin: "", 
                  alumnos:[],
                  listas:[
                    {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
                    {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
                  ]
                },
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
        //SE PUEDE USAR SI CAMBIAN EL FORMULARIO DE CREACION DE GRUPO
        // changeModo(item){
        //   console.log("change");
        //   console.log(item);
        //   this.horario.map( h =>{
        //     if(h.dia === item.dia)
        //     {
        //       h.horaFin = h.horaInicio = h.clase ? "" : "0";
        //     }

        //   })

        // },
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
            const {nombreGrupo, adicionales, cicloEscolar, urlImagen} 
            = this.datosNuevoGrupo;

            //VERIFICAR SI EL OBJETO datosUsuario TIENE LE CAMPO GRUPOS, SI TIENE GRUPOS PREVIOS
            //SE ALMACENAN EN LA DATA grupos
            if( this.datosUsuario.grupos )
                this.grupos = this.datosUsuario.grupos;

                //SE INSERTAN LOS DATOS DEL NUEVO GRUPO A LA DATA DE GRUPO.
            this.grupos.push(
                {
                  nombreGrupo, adicionales, cicloEscolar, urlImagen,
                    boys: 0, girls: 0, total: 0, fechaCreado: Date.now()
                    , horario: this.horario
                }
            );
            // console.log("horario");
            // console.log(this.horario);
            // console.log(id);
            
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

            console.log(usuarioGruposRef);
            // console.log(this.grupos);
            
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
            this.$refs.formGrupos.reset();
            // this.$refs.form2.reset();
            //   this.horario= [
            //     {dia:"Lunes", clase: false, horaInicio:"", horaFin: ""},
            //     {dia:"Martes", clase: false, horaInicio:"", horaFin: ""},
            //     {dia:"Miercoles", clase: false, horaInicio:"", horaFin: ""},
            //     {dia:"Jueves", clase: false, horaInicio:"", horaFin: ""},
            //     {dia:"Viernes", clase: false, horaInicio:"", horaFin: ""},
            //     {dia:"Sabado", clase: false, horaInicio:"", horaFin: ""},
            //     {dia:"Domingo", clase: false, horaInicio:"", horaFin: ""},
            // ];
            // console.log("horario resetado")
            // console.log(this.horario)
            this.dialog = false;
            this.faseFormulario = 1;
            // console.log("pusheando");
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
        validarFormularioGrupo () {
            this.esGrupoValido =this.$refs.formGrupos.validate();
            if(this.esGrupoValido)
             this.crearGrupo()
            console.log("valido")
        },
    },
    created() {
      // console.log(this.$route)
    },
}