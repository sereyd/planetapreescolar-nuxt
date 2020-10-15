
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
            listas:[
                {titulo:"Semáforo", img:"", selected: false},
                {titulo:"Si/No", img:"", selected: false},
                {titulo:"Rango 1/10", img:"", selected: false},
                {titulo:"ON/OFF", img:"", selected: false}
            ],
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
            horario:{},
            nuevoHorario:{
                clase: false,
                horaFin: "",
                horaInicio: ""
            },

            // DATA GRUPO
            grupos:[],
            grupo:{},
        }
    },
    mounted() {
        // this.grupos = this.$route.query;
        

        // setTimeout(() => {
            // console.log("datos usuario")
            // console.log(this.datosUsuario);
            this.grupos = this.datosUsuario.grupos;
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
                this.grupo = this.grupos.find( grupo => this.idGrupo === grupo.nombreGrupo );
                this.grupo.alumnos = this.grupo.alumnos ? this.grupo.alumnos : [];

                // console.log("this.grupo");
                // console.log(this.grupo);
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
            // console.log("GRUPO");
            // console.log(this.grupo);
            this.horario = this.grupo.horario.find( hor => dia === hor.dia);
            // console.log("HORARIO");
            // console.log(this.horario);
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

                if( sexo === "F")
                {
                    this.grupo.girls++;
                }else{
                    this.grupo.boys++;
                }

                this.grupo.total++;

                // //SE AGREGAN LAS LISTA A EVALUAR AL ALUMNO
                // this.horario.listas.map( lista => {
                //     console.log(lista)
                //     listasAlumno.push({
                //         lista: lista.nombre, 
                //         calificacion: (lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )? false : "", 
                //         tipoLista: lista.tipoLista, rango : lista.rango
                //     })
                // })

                // //SE INSERTA LOS DATOS DEL ALUMNO Y SU LISTA DE EVALUACION EN LA DATA DE HORARIO
                // this.horario.alumnos.push(
                //     {
                //         nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                //         fechaCreado: Date.now(),
                //         listas: listasAlumno
                //     }
                // );
            
            this.grupo.horario.map( h => {
                console.log("HORARIO")
                console.log(h)

                // if(h.dia === this.dia)
                // {
                    //   console.log("ES IGUSL")
                    // h.alumnos = this.horario.alumnos;
                    // h.alumnos.map( a => {


                    /*
                    listasAlumno.push({
                        lista: lista.nombre, 
                        calificacion: (lista.tipoLista === "Si/No" || lista.tipoLista === "ON/OFF" )? false : "", 
                        tipoLista: lista.tipoLista, rango : lista.rango
                    })
                    */

                   h.listas.map( lista => {
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


                        h.alumnos.push({
                            nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                            fechaCreado: Date.now(),
                            listas: listasAlumno
                        })
                    // })

                // }
                listasAlumno = [];

                    
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

        elegirTipoLista(lista){
            console.log(lista.titulo)
            // datosNuevoLista.tipoLista
            this.errorTipoLista = false;
            this.errorTipoListaMsg = ""
            this.datosNuevoLista.tipoLista = lista.titulo;
            this.listas.forEach( li => {
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
          const {id} = this.datosUsuario;
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

                //SE INSERTAN LA LISTA EN TODOS LOS DIAS
                this.grupo.horario.forEach( h => {
                    h.listas.push({ 
                        nombre, tipoLista, rango
                    })

                    h.alumnos.forEach( alumno => {
                        alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                    })
                })

            }else{
                console.log("Solo este dia");

                // //SE INSERTAN LOS DATOS DE LA NUEVA LISTA A LA DATA DE HORARIO.
                this.horario.listas.push({ 
                    nombre, tipoLista, rango
                });

                // //AGREGAR LISTA A HORARIO.ALUMNOS.LISTAS
                this.horario.alumnos.forEach( alumno => {
                    // console.log(alumno);
                    alumno.listas.push({calificacion, lista: nombre, tipoLista, rango })
                })

            }

            

            // //no se utiliza
            // // this.grupo.horario.map( h => {
            // //     if(h.dia === this.dia)
            // //     {
            // //         h.listas = this.horario.listas;
            // //     }
                
            // // })

            
                
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

            this.datosNuevoLista.tipoLista = "";
            this.listas.forEach( li => li.selected = false)

           

            
          } catch (error) {
            console.log(error)
          }
        },

        asignarCal(lista, alumno, nombreLista){
            const alumnoModificar = this.horario.alumnos.find(a => alumno.nombre === a.nombre && alumno.apellidos === a.apellidos);
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

        async guardarCambios(){
            //SE ALMACENA EL NUEVO ALUMNO EN LA COLECCION DE USUARIOS
            const {id} = this.datosUsuario;
            console.log(this.horario)
            console.log(this.grupo)
            console.log(this.grupos)


            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

                
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE ALUMNOS
            usuarioGruposRef.update({
                grupos: this.grupos
            })
            .then(() => {
                //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
                this.actualizarGrupos(this.grupos);
                alert("cambios guardados")

            })
            .catch((error) => {
                console.error("ErroR al agregar grupo: ", error);
            });
        }
    }
    // mixins:[validasitio]
}