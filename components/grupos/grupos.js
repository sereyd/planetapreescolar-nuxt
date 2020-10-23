
import { mapState, mapMutations, mapActions } from 'vuex'
import { format } from 'date-fns'
// import { es } from 'date-fns/locale';

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
              nombreGrupo: "gg",
              adicionales: "gg",
              cicloEscolar: "gg",
              // seccion: "2",
              // turno: "Matutino",
              // periodo: "",
              urlImagen: "",
          },
            
            //DATA FORMULARIO 2
            // horario:{
            //   clase: false, horaInicio:"", horaFin: "",
            // },
            clase:[],
            // horario: [
            //     {
            //       dia:"Lunes", clase: false, horaInicio:"", horaFin: "", 
            //       alumnos:[],
            //       listas:[
            //         {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
            //         {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
            //       ]
            //     },
            //     {
            //       dia:"Martes", clase: false, horaInicio:"", horaFin: "", 
            //       alumnos:[],
            //       listas:[
            //         {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
            //         {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
            //       ]
            //     },
            //     {
            //       dia:"Miercoles", clase: false, horaInicio:"", horaFin: "", 
            //       alumnos:[],
            //       listas:[
            //         {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
            //         {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
            //       ]
            //     },
            //     {
            //       dia:"Jueves", clase: false, horaInicio:"", horaFin: "", 
            //       alumnos:[],
            //       listas:[
            //         {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
            //         {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
            //       ]
            //     },
            //     {
            //       dia:"Viernes", clase: false, horaInicio:"", horaFin: "", 
            //       alumnos:[],
            //       listas:[
            //         {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
            //         {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
            //       ]
            //     },
            //     {
            //       dia:"Sabado", clase: false, horaInicio:"", horaFin: "", 
            //       alumnos:[],
            //       listas:[
            //         {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
            //         {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
            //       ]
            //     },
            //     {
            //       dia:"Domingo", clase: false, horaInicio:"", horaFin: "", 
            //       alumnos:[],
            //       listas:[
            //         {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"]}, 
            //         {nombre:"Comportamiento", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"]}
            //       ]
            //     },
            // ],

            //LISTAS POR DEFECTO
            listasG:[
              {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"],calificacion:"Si"}, 
              {nombre:"Conducta", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"],calificacion:"Bien"}
            ],

            //DATA DE TODOS LOS GRUPOS DEL USUARIO
            materias:[],

            //DATA DE FECHA
            // meses:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            // diasSemana:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
            // diaHoy:"",
            fecha:"",
            

            
        }
    },
    computed:{
        ...mapState(['datosUsuario']),


    },
    mounted() {
      // this.guardarVistaValida(true);
      this.fecha = format(new Date(), 'yyyy-MM-dd')
      console.log(this.fecha);
      console.log(this.datosUsuario)

      
      
      // const f = new Date();
      // // this.diaHoy = this.diasSemana[f.getDay()];
      // // document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
      // // this.fecha = f.getDate()+ "/" + (f.getMonth() +1)+ "/" + f.getFullYear();
      // this.fecha = f.getFullYear() + "-" + (f.getMonth() +1)+ "-" + f.getDate();
      // console.log(this.fecha)
      // alert("mounted")
    },
    methods:{
        // crearGrupo(){
        //     console.log(this.newUsuario);
        //     this.usuarios.push(this.newUsuario);
        //     this.resetearData();
        //     console.log(this.newUsuario);
        // },
        ...mapActions(['actualizarGrupos']),
        // ...mapMutations(['guardarVistaValida']),
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
          console.log( this.datosUsuario.grupo)
          const {id} = this.datosUsuario;
          let grupo = this.datosUsuario.grupo ? this.datosUsuario.grupo : {};
          console.log("entrando...")
          console.log(grupo);
          try {

            //SE EXTRAEN LOS DATOS DEL OBJETO
            const {nombreGrupo, adicionales, cicloEscolar, urlImagen} 
            = this.datosNuevoGrupo;

            //VERIFICAR SI EL OBJETO datosUsuario TIENE LE CAMPO GRUPOS, SI TIENE GRUPOS PREVIOS
            //SE ALMACENAN EN LA DATA grupos
            // console.log(this.datosUsuario)
            // alert("1")
          console.log(grupo.materias);

            if( grupo.materias )
              this.materias = grupo.materias;
            else
              this.materias = [];
            // alert("2")

                // console.log(this.datosUsuario)
            

                // const existe = this.materias.clases.includes( clase => clase.fecha === this.fecha);
    
                // if(existe)
                // {
                //   console.log("existe")
                // }
                // else{
                //   console.log("no existe")
                // }

                //SE INSERTAN LOS DATOS DEL NUEVO GRUPO A LA DATA DE GRUPO.

            // this.materias.clases = 
            let alumnos = [];
            if(!grupo.alumnosDefault)
            { 
              console.log("NO EIXSTEN ALUMNOS")
              grupo= {
                ...grupo,
                alumnosDefault: [],
              }
            }
            else{
              let lista = [];
              grupo.alumnosDefault.map( al =>{
                console.log("al")
                console.log(al)
                console.log(lista)

                al.listas.map( list => {
                  
                  lista.push({
                    calificacionDefault: list.calificacionDefault,
                    lista: list.lista,
                    rango: list.rango,
                    tipoLista: list.tipoLista
                  })

                })
                console.log(lista)



                alumnos.push({
                  apellidos: al.apellidos,
                  fechaCreado: al.fechaCreado,
                  fechaNacimiento: al.fechaNacimiento,
                  lista,
                  nombre: al.nombre,
                  sexo: al.sexo,
                  telefono: al.telefono,
                  urlImagen: al.urlImagen,
                })
                lista = [];

              })
            }


            this.materias.push(
                {
                  nombreGrupo, adicionales, cicloEscolar, urlImagen,
                  boys: 0, girls: 0, total: 0, fechaCreado: this.fecha,
                  horario: [],
                  clases:[
                    {
                      fecha: this.fecha,
                      // alumnos: this.materias.alumnos ? this.materias.alumnos : [],
                      alumnos,
                      listas: this.listasG,
                      // alumnos:[],
                    },
                  ],
                  // alumnos:[],
                  listasDefault: this.listasG
                }
            );
            // this.grupo.alumnos= [];
            console.log("materias");
            console.log(this.materias);
            grupo.materias =  this.materias;
            // console.log(id);
            
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

            console.log(usuarioGruposRef);
            // console.log(this.grupos);
            console.log("grupo")
            console.log("grupo")
            console.log("grupo")
            console.log(grupo)
            // console.log(this.datosUsuario)
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE GRUPOS
            console.log(grupo.materias);
            
            usuarioGruposRef.update({
                grupo:{
                  alumnosDefault: grupo.alumnosDefault,
                  materias: grupo.materias
                }
            })
            .then(() => {
                //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
              this.actualizarGrupos(grupo);
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