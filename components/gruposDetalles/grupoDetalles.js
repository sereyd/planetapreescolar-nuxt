
import { mapState, mapMutations, mapActions } from 'vuex'
import menulateral from '~/components/menulateral/menulateral.vue'
import Vue from 'vue';
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { format } from 'date-fns'
import { es } from 'date-fns/locale';

// Register components in your 'main.js'
Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)


export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            },

            //PRUEBAS
            horarioModal:[
                {dia: "Lunes", horaInicio: "09:00 hrs", horaFin: "10:00 hrs", edit: false},
                {dia: "Martes", horaInicio: "09:00 hrs", horaFin: "10:00 hrs", edit: false},
                {dia: "Miercoles", horaInicio: "09:00 hrs", horaFin: "10:00 hrs", edit: false},
            ],
            crearHorario: false,

            diaSeleccionado: true,

            modelConfig: {
                
                    type: 'string',
                    mask: 'YYYY-MM-D',
                
            },

            // items:["1", "2", "3"],
            tabla:[
                {titulo:"Nuevo Alumno"},
                {titulo:"Conducta"},
                {titulo:"Asistencia"},
                {titulo:"Nueva lista"},

            ],
            //DATA PARA SABER QUE DIA SELECCIONO EL USUARIO
            fechaVisual:  "probando",
            fecha:  format(new Date(), 'yyyy-MM-dd'),

            //dDATA PARA MENU DE DIAS
            dias:['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'],

            //DATA DE ALUMNOS
            dialogAlumno: false,
            esAlumnoValido: true,
            imagen: null,
            urlImagenPrevia: "",
            datosNuevoAlumno:{
                nombre:"jose",
                apellidos: "mende",
                fechaNacimiento:"1008",
                sexo:"",
                telefono:"241142",
                urlImagen: "",

            },
            alumnos:[],


            //DATA PARA LISTAS
            dialogLista: false,
            esListaValido: true,
            datosNuevoLista:{
                nombre:"gg",
                tipoLista:"",
            },
            allDays:false,
            listasOpciones:[
                {titulo:"Semáforo", img:"~/static/images/iconos/semaforo.png", selected: false},
                {titulo:"Si/No", img:"~/static/images/iconos/SiNo.png", selected: false},
                {titulo:"Rango 1/10", img:"~/static/images/iconos/rango.png", selected: false},
                {titulo:"ON/OFF", img:"~/static/images/iconos/OnOff.png", selected: false}
            ],
            listasDefault:[
                {nombre:"Asistencia",tipoLista: "Si/No", rango:["Si","No"],calificacionDefault:"Si"}, 
                {nombre:"Conducta", tipoLista:"Semáforo", rango:["Bien", "Regular", "Mal"],calificacionDefault:"Si"}
            ],
            // listasFireBase:[],
            //RANGOS DE LISTAS
            rangoSiNo:["Si","No"],
            rangoSemaforo:["Bien", "Regular", "Mal"],
            rangoOnOff:["ON","OFF"],
            rangoNumeros:[1,2,3,4,5,6,7,8,9,10],

            //ERROR AL NO SELECCIONAR TIPO LISTA
            errorTipoLista: false,
            errorTipoListaMsg: "",
              

            

            // DATA HORARIOS
            dialogHorario: false,
            esHorarioValido: true,
            horarioHoy:{},
        
            //{dia: "Lunes", horaInicio: "09:00 hrs", horaFin: "10:00 hrs", edit: false},
            nuevoHorario:{
                clase: false,
                horaFin: "",
                horaInicio: "",
                dia:""
            },
            diaEditar:"",

            // DATA GRUPO
            materias:[],
            materia:{},

            //DATA PARA FECHA
            meses:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            diasSemana:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
            diaHoy:"",
            clase: [],

            grupo:{},
            

        }
    },
    mounted() {
        
    },
    
    created() {
        // console.log(this.clase)
        // // alert("DS")
        console.log(this.fecha)

        

        const f = new Date();
        console.log(f);
        let materia = {};

        this.diaHoy = this.diasSemana[f.getDay()];
        // console.log(this.diaHoy)
        // document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
        // this.fechaVisual = this.diasSemana[f.getDay()] + " " +f.getDate()+ " de " + this.meses[(f.getMonth() +1)] + " de " + f.getFullYear();
        // this.fecha = f.getDay()+ "/" + f.getMonth()+ "/" + f.getFullYear();
        // this.fecha = f.getDate()+ "/" + (f.getMonth() +1)+ "/" + f.getFullYear();
        // this.fecha = f.getFullYear() + "-" + (f.getMonth() +1)+ "-" + f.getDate();
        this.fechaVisual = format(new Date(), "dd 'de' MMMM 'de' yyyy", {
            locale: es
        })
        this.fechaVisual = this.diaHoy+" "+this.fechaVisual;
        //   console.log(this.fechaVisual);

        // this.fecha = format(new Date(), 'yyyy-MM-dd')
        // console.log(this.fecha);



        // this.fecha = "16/9/2020"


            this.grupo = {...this.datosUsuario.grupo};
            // this.grupo.idGrupo = "wrerwerwerwerwer";
            console.log(this.grupo)
            // this.grupo = this.$route.query;
            // this.materias = {...this.datosUsuario.grupo.materias};
            // this.materias = {...this.grupo.materias};
            // this.materias = this.grupo.materias;
            // this.alumnos = this.grupo.alumnos;
            this.idGrupo = this.$route.params.id;
            // console.log(this.idGrupo);
            // console.log(this.grupos);
            
            if(this.idGrupo === "exit")
            {
                // this.$route.push("/");
                this.$router.push("/exit");

                // this.$route
            }
            else{
                // this.materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
               materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
                console.log(materia);
                // console.log(this.materia);
                // this.materia.alumnos = this.materia.alumnos ? this.materia.alumnos : [];
                this.clase = materia.clases.find( c => c.fecha === this.fecha);
                console.log(this.clase);

                if(!this.clase)
                {
                    let listasAlumno = [];

                

                //SE AGREGA LA LISTA POR DEFAULT EN LA MATERIA ACTUAL,

                    materia.clases.push({
                    fecha: this.fecha,
                    alumnos: this.grupo.alumnosDefault ? this.grupo.alumnosDefault : [],
                    listas: materia.listasDefault,
                    // alumnos: this.materias.alumnos ? this.materias.alumnos : [],
                    // listas: this.materia.listasDefault,
                    // listasDefault: this.listasDefault,
                })
                materia = this.grupo.materias.find( mat => this.idGrupo === mat.nombreGrupo );
                this.clase = materia.clases.find( c => c.fecha === this.fecha);
                }



                // console.log("this.grupo");
                // console.log(this.grupo);
            }
            // console.log(this.fecha);
            // console.log(this.clase);
            // console.log(this.materia);
            // alert("fecha  clase   grupo")
            // console.log(this)

            //BUSCAR SI EL DIA ESTA DADO DE ALTA 
            // this.clase = this.getClase;
            // const clase = this.materia.clases.find( c => c.fecha === this.fecha);
            // // console.log("clase");
            // // console.log(this.clase);
            // if(!clase)
            // {   
            //     console.log("clase no existe")
            //     // this.clase = [];
            //     // console.log(this.materia)
            //     console.log("Creando nuevo dia");

            //     //SE AGREGA LA LISTA POR DEFAULT EN LA MATERIA ACTUAL,
            //     // this.materia.listasDefault = this.listasDefault;

            //     // console.log( "this.materia.listasDefault")
            //     // console.log( this.materia.listasDefault)

            //     // this.listasFireBase  = this.materia.listasDefault= this.materia.listasDefault ? this.materia.listasDefault : this.listasDefault;
            //     // console.log( "this.materia.listasDefault")
            //     // console.log( this.materia.listasDefault)
            //     // console.log( this.listasFireBase)

            //     // this.materia.clases.push({
            //     //     fecha: this.fecha,
            //     //     alumnos: this.datosUsuario.grupo.alumnos ? this.datosUsuario.grupo.alumnos : [],
            //     //     // alumnos: this.materias.alumnos ? this.materias.alumnos : [],
            //     //     listas: this.materia.listasDefault,
            //     //     // listasDefault: this.listasDefault,
            //     // })
            //     console.log(clase)
            //     // this.clase={
            //     //     fecha: this.fecha,
            //     //     alumnos: this.datosUsuario.grupo.alumnos ? this.datosUsuario.grupo.alumnos : [],
            //     //     listas: this.materia.listasDefault,
            //     //     // listasDefault: this.listasDefault,
            //     // }
            //     // this.materias
            //     // console.log("this.clase")
            //     // console.log(this.clase)

            //     // console.log(this)
            //     // console.log(this.$fireStore)
                // this.updateFirebaseGrupo();
                

            // }
            this.horarioHoy = materia.horario.find( hr => hr.dia === this.diaHoy);

            this.horarioHoy = this.horarioHoy ? this.horarioHoy : {};
            // this.materia.alumnos = this.materia.alumnos ? this.materia.alumnos : [];
            // console.log("this.horarioHoy")
            console.log(this.horarioHoy)

            

            
            // if(clase)
            
        //   }, 7000);
        
    },
    watch: {
        fecha (){

            console.log(this);
            console.log(this.fecha);
            //CAMBIO DE ESTADO PARA MOSTRAR DETALLES DEL DIA
            this.diaSeleccionado =  !this.diaSeleccionado;
            //SE OBTIENE DIA MES Y AÑO POR SEPARADO PARA new Date()
            const fechaArray = this.fecha.split("-");
            const f = new Date(fechaArray[0], fechaArray[1]-1, fechaArray[2]);

            //SE OBTIENE EL DIA EN LETRAS PARA COMPARARLO CON EL HORARIO DEL DIA
            this.diaHoy = this.diasSemana[f.getDay()];

            //SE OBTIENE LA FECHA SUPERIOR IZQUIERDA (VISUAL COMODO PARA EL USUARIO)
            this.fechaVisual = format( f, "dd 'de' MMMM 'de' yyyy", {
                locale: es
            })

            //SE LE AGREGA EL DIA EN LETRAS A LA FECHA VISUAL
            this.fechaVisual = this.diaHoy+" "+this.fechaVisual;
            

            //BUSCAR SI EL DIA ESTA DADO DE ALTA 
            // let materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );

            let materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
            this.clase = materia.clases.find( c => c.fecha === this.fecha);

            if(!this.clase)
            {   
                this.clase = [];
                console.log(materia)
                console.log("CREANDO NUEVO DIA");
                console.log(this.grupo);
                let listasAlumno = [];

                

                //SE AGREGA LA LISTA POR DEFAULT EN LA MATERIA ACTUAL,

                materia.clases.push({
                    fecha: this.fecha,
                    alumnos: this.grupo.alumnosDefault ? this.grupo.alumnosDefault : [],
                    listas: materia.listasDefault,
                    // alumnos: this.materias.alumnos ? this.materias.alumnos : [],
                    // listas: this.materia.listasDefault,
                    // listasDefault: this.listasDefault,
                })
                materia = this.grupo.materias.find( mat => this.idGrupo === mat.nombreGrupo );
                this.clase = materia.clases.find( c => c.fecha === this.fecha);

                // this.clase={
                //     fecha: this.fecha,
                //     alumnos: this.grupo.alumnosDefault ? this.grupo.alumnosDefault : [],
                //     listas: this.materia.listasDefault,
                //     // listas: this.materia.listasDefault,
                //     // listasDefault: this.listasDefault,
                // }

                // this.materia.clases.push({
                //     fecha: this.fecha,
                //     alumnos: this.materias.alumnos ? this.materias.alumnos : [],
                //     listas: this.materia.listasDefault,
                //     // listasDefault: this.listasDefault,
                // })
                
                // this.materia.clases.map( c => {


                //     c.listas.map( lista => {
                //         listasAlumno.push({
                //             lista: lista.nombre, 
                //             // calificacion: (lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )? true 
                //             // : lista.tipoLista === "Rango 1/10" ? 0
                //             // :  "Bien", 
                //             calificacion: lista.calificacionDefault ,
                //             tipoLista: lista.tipoLista, rango : lista.rango
                //         })
                //     })

                //     // c.alumnos.push({
                //     //     nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                //     //     fechaCreado: Date.now(),
                //     //     listas: listasAlumno
                //     // })
                // })

                /**
                 c.listas.map( lista => {
                        console.log("LISTA")
                        console.log(lista)
                        listasAlumno.push({
                            lista: lista.nombre, 
                            calificacion: (lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )? true 
                            : lista.tipoLista === "Rango 1/10" ? 0
                            :  "Bien", 
                            tipoLista: lista.tipoLista, rango : lista.rango
                        })
                    })


                    c.alumnos.push({
                        nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                        fechaCreado: Date.now(),
                        listas: listasAlumno
                    })
                 */

                // this.clase={
                //     fecha: this.fecha,alumnos: this.materias.alumnos ? this.materias.alumnos : [],
                //     listas: this.materia.listasDefault,
                //     // listasDefault: this.listasDefault,
                // }

                // this.updateFirebaseGrupo()
                

            }
            this.horarioHoy = materia.horario.find( hr => hr.dia === this.diaHoy);

            this.horarioHoy = this.horarioHoy ? this.horarioHoy : {};
        },
    },
    components:{
        // grupos
        menulateral,
        Calendar,
        DatePicker
    },
    computed:{
        ...mapState(['datosUsuario','vistaValida']),
        // getClase(){
        //     return this.materia.clases.find( c => c.fecha === this.fecha);
        // }
    },
    methods:{

        ...mapActions(['actualizarGrupos']),
        ...mapMutations(['guardarVistaValida']),

        updateFirebaseGrupo(){
            
            const {id} = this.datosUsuario;

            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE ALUMNOS
            usuarioGruposRef.update({
                 grupo: this.grupo
            })
            // .then(() => {
            //     console.log(this.grupo);
            //     alert("paso 1")
            //     // this.actualizarGrupos(this.grupo.materias);
 
            // })
            .catch((error) => {
                console.error("ErroR al agregar grupo: ", error);
            });

        },

        seleccionarDia(dia){
            this.dia = dia;
            // console.log("GRUPO");
            // console.log(this.grupo);
            this.horarioHoy = this.materia.horario.find( hor => dia === hor.dia);
            // console.log("HORARIO");
            // console.log(this.horario);
            // console.log(this)
            const {clase, horaInicio, horaFin} = this.horarioHoy;
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
            this.dialogAlumno = false;

            try {
                let materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );

                
                //SE EXTRAEN LOS DATOS DEL OBJETO
                const {nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen} 
                = this.datosNuevoAlumno;
            
                let listasAlumno = [];
                // let ListasAlumnoG= [];

                const fechaCreado = Date.now();

                if( sexo === "F")
                {
                    materia.girls++;
                }else{
                    materia.boys++;
                }

                materia.total++;

                this.clase.listas.map( lista => {
                    listasAlumno.push({
                        lista: lista.nombre, 
                        calificacion: (lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )? true 
                            : lista.tipoLista === "Rango 1/10" ? 0
                            :  "Bien", 
                        tipoLista: lista.tipoLista, 
                        rango : lista.rango
                    })
                })


                this.clase.alumnos.push({
                    nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                    fechaCreado,
                    listas: listasAlumno
                })

                // console.log("INSERTANDO ALUMNO DEFAULT")
                this.grupo.alumnosDefault.push({
                    nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                    fechaCreado,
                    listas: listasAlumno
                })

                listasAlumno = [];

             
            
                materia.clases.map( c => {

                    if(c.fecha !== this.fecha)
                    {

                        c.listas.map( lista => {
                            listasAlumno.push({
                                lista: lista.nombre, 
                                calificacion: (lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )? true 
                                    : lista.tipoLista === "Rango 1/10" ? 0
                                    :  "Bien", 
                                tipoLista: lista.tipoLista, 
                                rango : lista.rango
                            })
                        })
                        // console.log("fecha clase");
                        // console.log(c.fecha);
    
                        // console.log("INSERTANDO ALUMNO NORMAL")
                        // console.log(c.alumnos)
                        // alert("stop")
                        c.alumnos.push({
                            nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                            fechaCreado,
                            listas: listasAlumno
                        })
                        // console.log(c.alumnos)
                        // alert("stop")
                        // })
                        // ListasAlumnoG = listasAlumno
                        listasAlumno = [];
                    }
                    
                })
            

            //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
            this.$refs.formAlumno.reset();
            this.dialogAlumno = false;
            

            
          } catch (error) {
            console.log(error)
          }
        },



        //METODOS PARA LISTAS

        elegirTipoLista(lista){
            console.log(lista.titulo)
            // datosNuevoLista.tipoLista
            this.errorTipoLista = false;
            this.errorTipoListaMsg = ""
            this.datosNuevoLista.tipoLista = lista.titulo;
            this.listasOpciones.forEach( li => {
                if(li.titulo === lista.titulo){
                    li.selected = !li.selected;
                }
                else{
                    li.selected = false;
                }
            })

        },
        validarFormularioLista() {
            this.esListaValido =this.$refs.formLista.validate();
            // console.log("form lleno: "+this.esListaValido)
            if(this.esListaValido)
            {
                // console.log("almacenando lista")
                this.almacenarListaCollection();
               
            }
            else{
                console.log("Llene todos los campos")
                if(this.datosNuevoLista.tipoLista === "")
                {
                    this.errorTipoLista = true;
                    this.errorTipoListaMsg = "Debe selecionar un tipo de lista"
                }

            }
                // this.almacenarListaCollection();
        },

        async almacenarListaCollection(){
          //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
          console.log("almacenando lista")
        //   let materia = null;
          let materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
          
          try {

            //SE EXTRAEN LOS DATOS DEL OBJETO
            const {nombre, tipoLista} = this.datosNuevoLista;

            const rango = tipoLista === "Semáforo" ? this.rangoSemaforo 
                        : tipoLista === "Si/No"  ? this.rangoSiNo : tipoLista === "Rango 1/10" ? this.rangoNumeros
                        : this.rangoOnOff
            
            const calificacion = 
                (tipoLista === "ON/OFF" || tipoLista === "Si/No") ? true 
                : tipoLista === "Rango 1/10" ? 0
                :  "Bien"

            // console.log("this.allDays");
            // console.log(this.allDays);
            if(this.allDays === "true")
            {
                console.log("Todos los dias");
                let listasClase = null;
                // debugger;
                // this.clase.listas.push({ 
                //     nombre, tipoLista, rango
                // });

                // this.clase.listas.push({
                //     nombre, tipoLista, rango
                // })
                // debugger;
                


                //SE INSERTAN LA LISTA EN TODOS LOS DIAS
                materia.clases.map( c => {
                    console.log(c)
                    c.listas.push({ 
                        calificacionDefault: calificacion,
                        nombre, tipoLista, rango
                    })
                    console.log(c);

                    c.alumnos.forEach( alumno => {
                        alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                    })
                });

                //SE AGREGA LA LISTA POR DEFAULT EN LA MATERIA ACTUAL,
                materia.listasDefault.push({calificacion, nombre, tipoLista, rango});

                // console.log( "this.materia.listasDefault")
                // console.log( this.materia.listasDefault)

                // this.listasFireBase  = this.materia.listasDefault= this.materia.listasDefault ? this.materia.listasDefault : this.listasDefault;
                // console.log( "this.materia.listasDefault")
                // console.log( this.materia.listasDefault)
                // console.log( this.listasFireBase)

            }else{
                console.log("Solo este dia");

                materia.clases.map( c => {
                    if(c.fecha === this.fecha)
                    {
                        c.listas.push({ 
                            calificacionDefault: calificacion,
                            nombre, tipoLista, rango
                        })
                        c.alumnos.forEach( alumno => {
                            alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                        })
                    }
                        
                    
                });

                // //SE INSERTAN LOS DATOS DE LA NUEVA LISTA A LA DATA DE HORARIO.
                // this.clase.listas.push({ 
                //     nombre, tipoLista, rango
                // });

                // //AGREGAR LISTA A HORARIO.ALUMNOS.LISTAS
                // this.clase.alumnos.forEach( alumno => {
                //     // console.log(alumno);
                //     alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                // })

                console.log("this.clase")
                console.log(this.clase)
                console.log("this.materia")
                console.log(this.materia)

            }

            console.log(this.grupo)

            

            // //no se utiliza
            // // this.grupo.horario.map( h => {
            // //     if(h.dia === this.dia)
            // //     {
            // //         h.listas = this.horario.listas;
            // //     }
                
            // // })

            
                
            // //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            // let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

        
            
        //    this.updateFirebaseGrupo();

            // //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
            this.$refs.formLista.reset();
            this.dialogLista = false;

            this.datosNuevoLista.tipoLista = "";
            this.listasOpciones.forEach( li => li.selected = false)

           

            
          } catch (error) {
            console.log(error)
          }
        },

        asignarCal(lista, alumno, nombreLista){
            const alumnoModificar = this.clase.alumnos.find(a => alumno.nombre === a.nombre && alumno.apellidos === a.apellidos);
            // console.log(alumnoModificar);

            alumnoModificar.listas.forEach( li => {
                if(li.lista === nombreLista)
                {
                    // console.log("li.rango")
                    // console.log(li.rango)
                    console.log("li.tipoLista")
                    console.log(li.tipoLista)


                    if(li.tipoLista === "Si/No" || li.tipoLista === "ON/OFF")
                        li.calificacion = !li.calificacion

                    if(li.tipoLista === "Semáforo")
                    {
                        // console.log("listaaaaaaaa")
                        // console.log(li)
                        // console.log(li.calificacion)
                        if(li.calificacion === "" || li.calificacion === "Bien")
                            li.calificacion = "Regular"
                        else if(li.calificacion === "Regular")
                            li.calificacion = "Mal"
                        else if(li.calificacion === "Mal")
                            li.calificacion = "Bien"
                        
                    }
                    if(li.tipoLista === "Rango 1/10")
                        li.calificacion = li.calificacion <= 9 ? li.calificacion + 1 : 0;
                    
         


                }
                // return li;
            })
            // console.log(alumnoModificar.listas);



            //  this.horario.alumnos.map( a => {
            //     if(alumno.nombre === a.nombre && alumno.apellidos === a.apellidos){
            //         console.log("alumno al que se haran cambios")
            //         console.log(a)
            //         a.listas.map( li => {
            //             if(li.lista === nombreLista)
            //             {
            //                 console.log("lista que se modificara")
            //                 console.log(li)
            //                 li.calificacion = !li.calificacion
            //                 console.log("CALIFICACION CAMBIADA")
            //                 console.log(li.calificacion)
            //                 console.log(this.horario.alumnos)
            //             }
            //         })
            //     }
            //     console.log(a)
            // })
            // console.log("Todo cambiadoo ahoraa")
            // console.log(this.horario.alumnos)
            



            // console.log(lista.tipoLista)
            // console.log(lista.calificacion)
            // if(lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )
            // {
            //     lista.calificacion = !lista.calificacion;
            // }
            // console.log(lista);
            // console.log(lista.calificacion);
        },



        //METODOS PARA HORARIO

        borrarNuevoHorario(){
            this.$refs.formHorario.reset();
            this.crearHorario = false;

        },
        eliminarHorario(hr){
            // this.horarioModal = this.horarioModal.filter( h => hr.dia !== h.dia);
            this.materia.horario = this.materia.horario.filter( h =>  hr.dia !== h.dia );
            console.log(this.materia.horario);
            // this.updateFirebaseGrupo();
        },

        cambiarHorario(tipoForm){
            //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
            
            try {

                // const tipoForm = ref === "formHorario" ? "nuevo" : "cambio";



                //SE EXTRAEN LOS DATOS DEL OBJETO
                console.log(tipoForm)
                if(tipoForm === "nuevo")
                {
                    const {clase, horaFin, horaInicio, dia} = this.nuevoHorario;
                    console.log(this.nuevoHorario)
                    //SE ACTUALIZA EL HORARIO DE LA VISTA
                    // this.horario.clase = clase;
                    // this.horario.horaFin = horaFin;
                    // this.horario.horaInicio = horaInicio;
                    // console.log(this.horario);
    
                    this.materia.horario.push({
                        clase: true,
                        horaInicio,
                        horaFin,
                        dia,
                        edit: false,
                    });
                }
                this.horarioHoy = this.materia.horario.find( hr => hr.dia === this.diaHoy);


                // this.materia.horario.map( h => {
                //     if(h.dia === this.dia)
                //     {
                //         h = this.horario;
                //     }  
                // })
                this.materia.horario.forEach( hr => {hr.edit = false});
                    
            //    this.updateFirebaseGrupo();
               this.crearHorario = false;
            //     // //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
                this.$refs.formHorario.reset();

            //     this.dialogHorario = false;
           

            
            } catch (error) {
                console.log(error)
            }

        },
        // validarFormularioHorarioCambios() {
        //     this.esListaValido =this.$refs.formHorario.validate();
        //     if(this.esListaValido)
        //         this.cambiarHorario();
        // },

        validarFormularioHorario(ref) {
            console.log(ref)
            console.log(this.$refs)
            const tipoForm = ref === "formHorario" ? "nuevo" : "cambio";
            this.esListaValido = ref === "Lunes" 
            ? this.$refs.Lunes.validate() 
            : ref === "Martes"  ? this.$refs.Martes[0].validate()
            : ref === "Miercoles"  ? this.$refs.Miercoles[0].validate()
            : ref === "Jueves"  ? this.$refs.Jueves[0].validate()
            : ref === "Viernes"  ? this.$refs.Viernes[0].validate()
            : ref === "Sabado"  ? this.$refs.Sabado[0].validate()
            : ref === "Domingo"  ? this.$refs.Domingo[0].validate()
            : this.$refs.formHorario.validate()

            // this.esListaValido =this.$refs.Martes.validate();
            console.log(this.$refs);
            if(this.esListaValido)
                this.cambiarHorario(tipoForm);
        },

        // async guardarCambios(){
        //     //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
            
        //     // console.log(this.horario)
        //     // console.log(this.grupo)
        //     // console.log(this.grupos)


            // tvhis.updateFirebaseGrupo();
        // }
    }
    // mixins:[validasitio]
}