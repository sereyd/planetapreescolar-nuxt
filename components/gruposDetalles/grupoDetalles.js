
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            },

            // items:["1", "2", "3"],
            tabla:[
                {titulo:"Nuevo Alumno"},
                {titulo:"Conducta"},
                {titulo:"Asistencia"},
                {titulo:"Nueva lista"},

            ],
            //DATA PARA SABER QUE DIA SELECCIONO EL USUARIO
            dia: "",

            //dDATA PARA MENU DE DIAS
            dias:['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],

            //DATA DE ALUMNOS
            dialogAlumno: false,
            esAlumnoValido: true,
            imagen: null,
            urlImagenPrevia: "",
            datosNuevoAlumno:{
                nombre:"",
                apellidos: "Gomez Nieves",
                fechaNacimiento:"1902",
                sexo:"",
                telefono:"2736273",
                urlImagen: "",

            },
            alumnos:[],


            //DATA PARA LISTAS
            dialogLista: false,
            esListaValido: true,
            datosNuevoLista:{
                nombre:"",
                tipoLista:"",
            },
            listas:[
                {titulo:"Semáforo", img:""},
                {titulo:"Si/No", img:""},
                {titulo:"Rango 1/10", img:""},
                {titulo:"ON/OFF", img:""}
            ],

            

            // DATA HORARIOS
            dialogHorario: false,
            esHorarioValido: true,
            horario:{},
            nuevoHorario:{
                clase: false,
                horaFin: "",
                horaInicio: ""
            },

            // DATA GRUPO
            allDays:"",
            grupos:[],
            grupo:{},
        }
    },
    beforeMount() {
        // this.grupos = this.$route.query;
        

        // setTimeout(() => {
            console.log("datos usuario")
            console.log(this.datosUsuario);
            this.grupos = this.datosUsuario.grupos;
            this.idGrupo = this.$route.params.id;
            console.log(this.idGrupo);
            console.log(this.grupos);
            if(this.idGrupo === "exit")
            {
                // this.$route.push("/");
                this.$router.push("/exit");

                // this.$route
            }
            else{
                this.grupo = this.grupos.find( grupo => this.idGrupo === grupo.nombreGrupo );
                this.grupo.alumnos = this.grupo.alumnos ? this.grupo.alumnos : [];
            }
            
        //   }, 7000);
        
    },
    components:{
        // grupos
    },
    computed:{
        ...mapState(['datosUsuario']),
    },
    methods:{

        ...mapActions(['actualizarGrupos']),

        seleccionarDia(dia){
            this.dia = dia;
            console.log("GRUPO");
            console.log(this.grupo);
            this.horario = this.grupo.horario.find( hor => dia === hor.dia);
            console.log("HORARIO");
            console.log(this.horario);
            // console.log(this)
            const {clase, horaInicio, horaFin} = this.horario;
            this.nuevoHorario.clase = clase;
            this.nuevoHorario.horaInicio = horaInicio;
            this.nuevoHorario.horaFin = horaFin;
        },

        //METODOS PARA ALUMNOS
        changeImagenAlumno(){
            this.urlImagenPrevia = URL.createObjectURL(this.$refs.fileupload.files[0]);
            this.imagen = this.$refs.fileupload.files[0];
            
        },
        seleccionarImagenAlumno(){
            this.$refs.fileupload.click();
        },
        validarFormularioAlumno () {
            this.esAlumnoValido =this.$refs.formAlumno.validate();
            if(this.esAlumnoValido)
                this.crearNuevoAlumno();
        },
        async crearNuevoAlumno(){
            await this.almacenarFotoStorage("alumnos");
            await this.almacenarAlumnoCollection();

        },

        async almacenarFotoStorage(ruta){
  
          const file =  this.imagen;
          const metadata = {
            contentType: 'image/jpeg'
          };
  
          //VERIFICAR QUE SELECCIONARA UNA FOTO DEL ALUMNO
          if(file)
          {
            try {
              //SE AGREGA LA FOTO AL STORAGE DE FIREBASE
              let storageRef = this.$fireStorage.ref(ruta);
              await storageRef.child(file.name).put(file, metadata);
  
              //SE OBTIENE LA URL DE LA IMAGEN DEL ALUMNO Y SE AGREGA AL OBJETO DE DE ALUMNO
              await storageRef.child(file.name).getDownloadURL().then((url) =>{
                this.datosNuevoAlumno.urlImagen = url;
              });
              
            } catch (error) {
              console.log(error)
            }
          }
          else{
            this.datosNuevoAlumno.urlImagen = "none";
          }
        },
        
        async almacenarAlumnoCollection(){
            //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
            const {id} = this.datosUsuario;
            try {


                //SE EXTRAEN LOS DATOS DEL OBJETO
                const {nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen} 
                = this.datosNuevoAlumno;
            
                let listasAlumno = [];

                //SE AGREGAN LAS LISTA A EVALUAR AL ALUMNO
                this.horario.listas.map( lista => {
                    listasAlumno.push(
                        {lista: lista.nombre, calificacion: ""}
                    )
                })

                //SE INSERTA LOS DATOS DEL ALUMNO Y SU LISTA DE EVALUACION EN LA DATA DE HORARIO
                this.horario.alumnos.push(
                    {
                        nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                        fechaCreado: Date.now(),
                        listas: listasAlumno
                    }
                );
            
            this.grupo.horario.map( h => {
                if(h.dia === this.dia)
                {
                    //   console.log("ES IGUSL")
                    h.alumnos = this.horario.alumnos;
                }
                    
            })

            
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE ALUMNOS
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
            this.$refs.formAlumno.reset();
            this.dialogAlumno = false;
            

            
          } catch (error) {
            console.log(error)
          }
        },



        //METODOS PARA LISTAS

        elegirTipoLista(tipoLista){
            console.log(tipoLista)
            this.datosNuevoLista.tipoLista = tipoLista;

        },
        validarFormularioLista() {
            this.esListaValido =this.$refs.formLista.validate();
            console.log("form lleno: "+this.esListaValido)
            if(this.esListaValido)
            {
                console.log("almacenando lista")
            }
            else{
                console.log("reprobado men lista")

            }
                // this.almacenarListaCollection();
        },

        async almacenarListaCollection(){
          //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
          const {id} = this.datosUsuario;
          try {

            //SE EXTRAEN LOS DATOS DEL OBJETO
            const {nombre, tipoLista} = this.datosNuevoLista;

            //SE INSERTAN LOS DATOS DE LA NUEVA LISTA A LA DATA DE HORARIO.
            this.horario.listas.push({ nombre, tipoLista });
            this.grupo.horario.map( h => {
                if(h.dia === this.dia)
                {
                    h.listas = this.horario.listas;
                }
                
            })
                
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

        
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE ALUMNOS
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

            // //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
            this.$refs.formLista.reset();
            this.dialogLista = false;
           

            
          } catch (error) {
            console.log(error)
          }
        },



        //METODOS PARA HORARIO

        cambiarHorario(){
            //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
            const {id} = this.datosUsuario;
            try {

                //SE EXTRAEN LOS DATOS DEL OBJETO
                const {clase, horaFin, horaInicio} = this.nuevoHorario;

                //SE ACTUALIZA EL HORARIO DE LA VISTA
                this.horario.clase = clase;
                this.horario.horaFin = horaFin;
                this.horario.horaInicio = horaInicio;

                this.grupo.horario.map( h => {
                    if(h.dia === this.dia)
                    {
                        h = this.horario;
                    }
                    
                })
                    
                //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
                let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

                
                //SE ACTUALIZA EN FIREBASE EL CAMPO DE ALUMNOS
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

                // //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
                this.$refs.formHorario.reset();
                this.dialogHorario = false;
           

            
            } catch (error) {
                console.log(error)
            }

        },

        validarFormularioHorario() {
            this.esListaValido =this.$refs.formHorario.validate();
            if(this.esListaValido)
                this.cambiarHorario();
        },
    }
    // mixins:[validasitio]
}