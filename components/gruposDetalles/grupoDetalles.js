
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
                nombre:"",
                apellidos: "",
                fechaNacimiento:"",
                sexo:"",
                telefono:"",
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
    
    async created() {
        // console.log(this.clase)
        // // alert("DS")
        console.log(this.fecha)
        const f = new Date();
        console.log(f);
        // let materia = {};

        this.diaHoy = this.diasSemana[f.getDay()];
        this.fechaVisual = format(new Date(), "dd 'de' MMMM 'de' yyyy", {
            locale: es
        })
        this.fechaVisual = this.diaHoy+" "+this.fechaVisual;
        //   console.log(this.fechaVisual);

        //DATA QUE SE REQUIERE PARA LA VISTA
        this.grupo = {...this.datosUsuario.grupo};

        this.idGrupo = this.$route.params.id;

        console.log(this.grupo)
        this.materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
        
        if(this.idGrupo === "exit")
        {
            this.$router.push("/exit");
        }
        else{
            
            //HACERLO METODO
            let materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
            
            this.clase = materia.clases.find( c => c.fecha === this.fecha);

            if(!this.clase)
            {
                this.actualizarClasesCreadas({clase: materia.nombreGrupo, fecha: this.fecha});
                console.log("CreandoClase")
                let listasAlumno = [];
                let alumnosListasD = [];
                let ald = {};
                
                //SE OBTIENE LA LISTA POR DEFAULT Y LOS ALUMNOS POR DEFAULT,
                this.grupo.alumnosDefault.map( ad => {
                    ald = {...ad,  listas: [...materia.listasDefault] }
                    alumnosListasD.push(ald);

                })

                //SE AGREGA LA LISTA Y LOS ALUMNOS POR DEFAULT EN LA MATERIA ACTUAL,
                materia.clases.push({   
                    fecha: this.fecha,
                    alumnos: alumnosListasD,
                    listas:[...materia.listasDefault],
                })

                //SE ACTUALIZA EL GRUPO ACTUAL CON LOS NUEVOS DATOS
                // materia = this.grupo.materias.find( mat => this.idGrupo === mat.nombreGrupo );
                this.clase = materia.clases.find( c => c.fecha === this.fecha);

                this.updateFirebaseGrupo()
            }
            //SE ACTUALIZA PARA LA VISTA DEL USUARIO LA FECHA DE SELECCIONADA EN EL CALENDARIO
            this.horarioHoy = materia.horario.find( hr => hr.dia === this.diaHoy);
            this.horarioHoy = this.horarioHoy ? this.horarioHoy : {};
            console.log(this.horarioHoy);
            //HACERLO METODO


        }
            
        
    },
    methods:{
        regresar(){
            this.$router.push("/")
        }
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
            

            
            
            //HACERLO METODO
            //BUSCAR SI EL DIA ESTA DADO DE ALTA 
            let materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
            this.clase = materia.clases.find( c => c.fecha === this.fecha);

            if(!this.clase)
            {   
                this.actualizarClasesCreadas({clase: materia.nombreGrupo, fecha: this.fecha});

                // this.clase = [];
                // let listasAlumno = [];
                let alumnosListasD = [];
                let ald = {};
                
                //SE OBTIENE LA LISTA POR DEFAULT Y LOS ALUMNOS POR DEFAULT,
                this.grupo.alumnosDefault.map( ad => {

                    ald = {...ad,  listas: [...materia.listasDefault] }
                    alumnosListasD.push(ald);

                })
                
                
                //SE AGREGA LA LISTA Y LOS ALUMNOS POR DEFAULT EN LA MATERIA ACTUAL,
                materia.clases.push({
                    fecha: this.fecha,
                    alumnos: alumnosListasD,
                    listas: [...materia.listasDefault],
                })

                //SE ACTUALIZA EL GRUPO ACTUAL CON LOS NUEVOS DATOS
                materia = this.grupo.materias.find( mat => this.idGrupo === mat.nombreGrupo );
                this.clase = materia.clases.find( c => c.fecha === this.fecha);


                this.updateFirebaseGrupo()
                

            }
            //SE ACTUALIZA PARA LA VISTA DEL USUARIO LA FECHA DE SELECCIONADA EN EL CALENDARIO
            console.log("this.horarioHoy")
            console.log(this.horarioHoy)
            this.horarioHoy = materia.horario.find( hr => hr.dia === this.diaHoy);
            console.log("this.horarioHoy")
            console.log(this.horarioHoy)
            this.horarioHoy = this.horarioHoy ? this.horarioHoy : {};
            console.log("this.horarioHoy")
            console.log(this.horarioHoy)
            //HACERLO METODO

        },
    },
    components:{
        // grupos
        menulateral,
        Calendar,
        DatePicker
    },
    computed:{
        ...mapState(['datosUsuario','vistaValida','clasesCreadas']),
        diasRestantes(){
            const red =this.materia.horario.filter(d => 
                {
                    console.log(d.dia)
                    console.log(this.dias)
                    return !this.dias.includes(d.dia)
                })

            // const r = this.dias.filter ( (d, index) => this. )
            // const red =this.dias.filter(d => this.materia.horario.includes(d))
            console.log(red)
            return red;
        }
        // getClase(){
        //     return this.materia.clases.find( c => c.fecha === this.fecha);
        // }
    },
    methods:{

        ...mapActions(['actualizarGrupos']),
        ...mapMutations(['guardarVistaValida','actualizarClasesCreadas']),

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
            let listasGA = [];

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

                console.log( this.grupo.materias)
                this.grupo.materias.map(mat => {
                    mat.boys= materia.boys;
                    mat.girls= materia.girls;
                    mat.total= materia.total;
                    console.log("MATERIA MATERIA")
                    console.log(mat.nombreGrupo)  
                    console.log("mat.clases")
                    console.log(mat)

                    mat.clases.map( cla => {

                        //SE OBTIENE LAS LISTAS DE EVALUACION DE CADA CLASE
                        console.log("cla.fecha");
                        console.log(cla.fecha);
                        cla.listas.map( li => {
                            listasGA.push({
                                lista: li.nombre, 
                                calificacion: (li.tipoLista === "Si/No" || li.tipoLista === "ON/OFF" )? true 
                                    : li.tipoLista === "Rango 1/10" ? 0
                                    :  "Bien", 
                                tipoLista: li.tipoLista, 
                                rango : li.rango
                            })
                        })

                        cla.alumnos.push({
                            nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                            fechaCreado,
                            listas: listasGA
                        })
                        listasGA = [];
                    })
                })

                // this.clase.listas.map( lista => {
                //     listasAlumno.push({
                //         lista: lista.nombre, 
                //         calificacion: (lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )? true 
                //             : lista.tipoLista === "Rango 1/10" ? 0
                //             :  "Bien", 
                //         tipoLista: lista.tipoLista, 
                //         rango : lista.rango
                //     })
                // })

                /*

                    materia.clases.map( c => {
                        console.log("c.fecha")
                        console.log(c.fecha)
                        console.log("this.fecha")
                        console.log(this.fecha)

                        // if(c.fecha !== this.fecha)
                        // {
                            console.log(c)
                            c.listas.push({ 
                                calificacion,
                                nombre, tipoLista, rango
                            })
                            console.log(c);

                            c.alumnos.forEach( alumno => {
                                alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                            })
                        // }
                    });
                
                 */


                // this.clase.alumnos.push({
                //     nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                //     fechaCreado,
                //     listas: listasAlumno
                // })

                // console.log("INSERTANDO ALUMNO DEFAULT")
                this.grupo.alumnosDefault.push({
                    nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                    fechaCreado,
                    // listas: listasAlumno
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

            this.updateFirebaseGrupo();
            

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

            const esClaseN = this.clasesCreadas.some( 
                cc => (cc.clase === this.idGrupo  && cc.fecha === this.fecha)
            );

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


                
                
                // console.log("ES CLASE NUEVA:");
                // console.log(esClaseN);
                // if(esClaseN)
                // {  
                    //SIRVE PARA GRUPOS CREADOS DUARANTE EL FLUJO DE GRUPOS
                    //SE INSERTAN LA LISTA EN TODOS LOS DIAS
                    materia.clases.map( c => {
                        console.log("c.fecha")
                        console.log(c.fecha)
                        console.log("this.fecha")
                        console.log(this.fecha)

                        if(c.fecha !== this.fecha)
                        {
                            console.log(c)
                            c.listas.push({ 
                                calificacion,
                                nombre, tipoLista, rango
                            })
                            console.log(c);

                            c.alumnos.forEach( alumno => {
                                alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                            })
                        }
                    });

                    this.clase.listas.push({
                        calificacion, nombre, tipoLista, rango
                    })
                    
                    this.clase.alumnos.forEach( alu => {
                        alu.listas.push({calificacion, lista: nombre, tipoLista, rango })
                    });
        

                    //SIRVE PARA GRUPOS CREADOS DUARANTE EL FLUJO DE GRUPOS

                // }
                // else{
                //     //SIRVE PARA GRUPOS YA CREADOS ANTES DE CARGAR PAGINA
                //     // alert("antes de push ALUMNOS")
                //     console.log(this.clase.alumnos);
                //     this.clase.alumnos.forEach( al => {
                //         // alert("DENTRO de push AL")
                //         console.log(al);
                //         // alert("DENTRO 2 de push AL")
                //         al.listas.push({
                //             calificacion, lista: nombre, tipoLista, rango 
                //         })
                //         console.log(al);
                //         al = {};
                //     })
                //     // alert("despues de push ALUMNOS")
                //     // console.log(this.clase.alumnos);

                //     // //AGREGAR A CLASE ACTUAL
                //     // console.log(this.clase.listas);
                //     // alert("antes de push LISTA")
                //     this.clase.listas = [
                //         ...this.clase.listas,
                //         {
                //             calificacion,
                //             nombre, tipoLista, rango
                //         }
                //     ]
                //     // alert("despues de push LISTA")
                //     console.log(this.clase.listas);

                //     //SIRVE PARA GRUPOS YA CREADOS ANTES DE CARGAR PAGINA

                // }




                //SE AGREGA LA LISTA POR DEFAULT EN LA MATERIA ACTUAL,
                materia.listasDefault.push({calificacion, nombre, tipoLista, rango});

                //AGREGANDO NUEVA LISTA A LOS ALUMNOS YA CREADO

                // LISTA DEFAULT
                //     calificacion:"Si"
                //     nombre:"Asistencia"
                //     rango:Array[2]
                //     tipoLista:"Si/No"


                // this.grupo.alumnosDefault.map( ad => {

                // })

                // console.log( "this.materia.listasDefault")
                // console.log( this.materia.listasDefault)

                // this.listasFireBase  = this.materia.listasDefault= this.materia.listasDefault ? this.materia.listasDefault : this.listasDefault;
                // console.log( "this.materia.listasDefault")
                // console.log( this.materia.listasDefault)
                // console.log( this.listasFireBase)

            }else{
                console.log("Solo este dia");
                let alumnosL = {};

                materia.clases.map( c => {
                    console.log("c.fecha")
                    console.log(c.fecha)
                    console.log("this.fecha")
                    console.log(this.fecha)
                    if(c.fecha === this.fecha)
                    {
                        console.log(c);
                        // alert("antes del push")
                        c.listas.push({ 
                            calificacion,
                            nombre, tipoLista, rango
                        })
                        console.log(c);
                        // alert("despues del push")
                        
                        alumnosL = c.alumnos;
                        console.log("alumnosL")
                        console.log(alumnosL)



                       
                    }
                });

                console.log("ES CLASE NUEVA:");
                console.log(esClaseN);
                // if(!esClaseN)
                // {
                    alumnosL.forEach( al => {
                        console.log(al)
                        // alert("antes del push")
                        al.listas.push({calificacion, lista: nombre, tipoLista, rango })
                        console.log(al)
                        // alert("despues del push")
                    })
                // }

                // materia.clases.map( c => {
                //     if(c.fecha === this.fecha)
                //     {
                //         c.listas.push({ 
                //             calificacion,
                //             nombre, tipoLista, rango
                //         })
                //         c.alumnos.forEach( alumno => {
                //             alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                //         })
                //     }
                        
                    
                // });

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

        
            
           this.updateFirebaseGrupo();

            // //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
            this.$refs.formLista.reset();
            this.dialogLista = false;

            this.datosNuevoLista.tipoLista = "";
            this.listasOpciones.forEach( li => li.selected = false)

           

            
          } catch (error) {
            console.log(error)
          }
        },

        asignarCal(lista, alumno, nombreLista, index){
            const alumnoModificar = this.clase.alumnos.find(a => alumno.nombre === a.nombre && alumno.apellidos === a.apellidos);
            console.log(alumnoModificar);
            console.log(lista);
            console.log(nombreLista);
            console.log(index)
            // alert("123")



            alumnoModificar.listas.map( li => {
                    console.log(alumnoModificar)
                    console.log(li)
                if(li.nombre === nombreLista)
                {
                    // console.log("li.rango")
                    // console.log(li.rango)
                    console.log("li.tipoLista")
                    console.log(li.tipoLista)


                    if(li.tipoLista === "Si/No" )
                    {
                        
                        li.calificacion = !li.calificacion
                    }
                    else if( li.tipoLista === "ON/OFF")
                    {

                        li.calificacion = !li.calificacion
                    }

                    else if(li.tipoLista === "Semáforo")
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
                    else if(li.tipoLista === "Rango 1/10")
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

        claseEsNueva(){

            // const claseNueva = this.clasesCreadas.some( cc => (cc.clase === && cc.fecha === ));

        },



        //METODOS PARA HORARIO

        borrarNuevoHorario(){
            this.$refs.formHorario.reset();
            this.crearHorario = false;

        },
        eliminarHorario(hr){
            // this.horarioModal = this.horarioModal.filter( h => hr.dia !== h.dia);
            this.materia.horario = this.materia.horario.filter( h =>  hr.dia !== h.dia );

            this.horarioHoy = this.materia.horario.find( hr => hr.dia === this.diaHoy);
            console.log("this.horarioHoy")
            console.log(this.horarioHoy)

            this.horarioHoy = this.horarioHoy ? this.horarioHoy : {};
            console.log(this.materia.horario);
            this.updateFirebaseGrupo();
        },

        cambiarHorario(tipoForm){
            //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
            this.materia = this.grupo.materias.find( materia => this.idGrupo === materia.nombreGrupo );
            // this.clase = this.materia.clases.find( c => c.fecha === this.fecha);

            
            
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
                    console.log(this.materia);
    
                    this.materia.horario.push({
                        clase: true,
                        horaInicio,
                        horaFin,
                        dia,
                        edit: false,
                    });
                }

                //SE OBTIENE EL HORARIO DEL DIA ACTUAL 
                console.log("this.horarioHoy")
                console.log(this.horarioHoy)    
                this.horarioHoy = this.materia.horario.find( hr => hr.dia === this.diaHoy);
                console.log("this.horarioHoy")
                console.log(this.horarioHoy)

                this.horarioHoy = this.horarioHoy ? this.horarioHoy : {};


                console.log("this.horarioHoy")
                console.log(this.horarioHoy)
                // console.log(this.horarioHoy)


                //SE DESHABILITAN LOS HORARIOAS CREADOS
                this.materia.horario.forEach( hr => {hr.edit = false});
                    
                this.updateFirebaseGrupo();

                //SE RESETEA EL FORMULARIO Y SE CIERRA LA VENTANA FLOTANTE
                this.crearHorario = false;
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
            ? this.$refs.Lunes[0].validate() 
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