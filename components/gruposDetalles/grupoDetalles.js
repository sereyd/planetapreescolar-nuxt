import { mapState, mapMutations, mapActions } from "vuex"
import Calendar from "v-calendar/lib/components/calendar.umd"
import DatePicker from "v-calendar/lib/components/date-picker.umd"
import VueTimepicker from "vue2-timepicker"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import "vue2-timepicker/dist/VueTimepicker.css"
import subirimagen from "~/components/subirimagen/subirimagen.vue"
import tablaAlumnos from "~/components/listaGrupoAlumnos/listaGrupoAlumnos.vue"

export default {
  data() {
    return {
      //// alertas
      error: [],
      ///FECHAS
      fechaselected: "",
      fecha: new Date(),
      masks: {
        input: "YYYY-MM-DD"
      },
      vercalendario: false,
      stclases: true,
      ///// horario
      fechahorario: false,
      tphoraguardado: ["General", "Solo el día"],
      dias: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
      ],
      horas: ["5:00", "6:00", ""],
      listahoras: [],
      addalumno: false,
      ////// subir imagen
      uploadimg: false,
      previewI: "",

      ////// fechas formato
      masks: {
        input: "YYYY-MM-DD"
      },
      /////Datos de alumno
      alumnoselect: {},
      edad: "",
      listaalumnos: [],
      loaderData: false,
      tpghoras: "",
      //// tareaa
      nombreGrupo: "",
      nuevalista:false,
      selectLista:[],
      nuevoalumno:true,
      crealista:{},
      editAlumno:false,
      datosEditAlumno:{},
      delteAl:false,
      textDelete:"",
      previewIedit:""
 
    }
  },
  computed: {
    ...mapState(["datosUsuario", "urlimg"]),
    //// carga el grupo
    nombredeGrupo() {
      this.nombreGrupo = this.datain.nombreGrupo
      return this.nombreGrupo;
    },
  
    cargaHoras() {
      if (
        this.fechaselected &&
        this.datain.Calendario &&
        this.datain.Calendario[this.fechaselected]
      ) {
        this.listahoras = this.datain.Calendario[this.fechaselected].Horario
        return this.listahoras;
      }
    },
    formatfecha() {
      var fechaselect = (this.fechaVisual = format(
        this.fecha,
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: es
        }
      ));
      this.fechaselected = this.fechaVisual = format(
        this.fecha,
        "yyyy'-'MM'-'dd",
        {
          locale: es
        }
      );
     
      ///// genera la estructura de schema
      this.schemavalidador(this.fechaselected)

      return fechaselect;
    },
    calculaedad() {
      var edad = 0;
      if (this.alumnoselect.fechaNacimiento) {
        var hoy = new Date();
        var cumpleanos = new Date(this.alumnoselect.fechaNacimiento)
        edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
        }
      }
      this.alumnoselect.edad = edad

      return edad + " Edad";
    },
    calculaedadedit(){
      var edad = 0;
      if (this.datosEditAlumno.fechaNacimiento) {
        var hoy = new Date();
        var cumpleanos = new Date(this.datosEditAlumno.fechaNacimiento)
        edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
        }
      }
      this.datosEditAlumno.edad = edad

      return edad + " Edad";
    }
  },
  methods: {
    ...mapMutations(["alertconfig", "almacenarFotoStorage"]),
    ...mapActions(['fotostorageAsync','eliminarImagen']),
    editarAlumno(p){
      this.editAlumno=p.edit,
      this.datosEditAlumno=p.item
    },
    guardaEditAlumno(){
      this.editAlumno=false

      this.$set(this.datain.Calendario[this.fechaselected].Alumnos,[this.datosEditAlumno.pos],this.datosEditAlumno)
      console.log('actualiza datos de usuario editado')
    },
    async SubirFoto(){
      if (this.previewIedit) {
        var fotoAlumno= await this.fotostorageAsync(
             "grupos/" +
               this.datosUsuario.id +
               "/" +
               this.datain.nombreGrupo +
               "/Alumnos/" +
               this.datosEditAlumno.Nombre +
               " " +
               this.datosEditAlumno.Apellido
           )
 
           this.$set(this.datosEditAlumno,'fotoAlumno',fotoAlumno)
           this.previewIedit=""
         }

    },
  async EliminarFoto(){
     await this.eliminarImagen(this.datosEditAlumno.fotoAlumno)
      .then((data)=>{
        this.datosEditAlumno.fotoAlumno=""
      })
    },
    deleteAlumno(){
    if(this.textDelete===this.datosEditAlumno.Nombre){
        this.delteAl=false
        this.editAlumno=false
      this.eliminarImagen(this.datosEditAlumno.fotoAlumno)
        //// elimina del calendario al alumno no se elimina de los alumnos generales
            this.datain.Calendario[this.fechaselected].Alumnos.splice(this.datosEditAlumno.pos,1)
        var payload = {
          st: true,
          tp: "yellow black--text",
          mensaje:"El usuario fue eliminado correctamente, para que los cambios se apliquen debe presionar  <b>Guardar</b> o <b>Guardar y Salir</b>"
        };
        this.alertconfig(payload);
        setTimeout(() => {
          var payload = {
            st: false,  
            tp: "red",
            mensaje: ""
          };
          this.alertconfig(payload);
        }, 5000);

    }else{
      var payload = {
        st: true,
        tp: "red",
        mensaje:"No coicide el nombre"
      };
      this.alertconfig(payload);
      setTimeout(() => {
        var payload = {
          st: false,
          tp: "red",
          mensaje: ""
        };
        this.alertconfig(payload);
      }, 3400);

    }
    },
    creaLista(){
      this.datain.Calendario[this.fechaselected].cabeceratabla.push({
        text:this.crealista.nombreLista,
        value:this.crealista.selectLista
      })

      this.nuevalista=false
      
      if(this.crealista.guardaen===1){
        this.$set(this.datain,'cabeceratabla',this.datain.Calendario[this.fechaselected].cabeceratabla)
      } 
    },
    schemavalidador(f) {
      if (!this.datain.Calendario) {
        console.log("data cal");
        this.$set(this.datain, "Calendario", {})
        this.schemavalidador(f);
      } else {
        if (!this.datain.Alumnos) {
          console.log("data alum");
          this.$set(this.datain, "Alumnos", [])
          this.schemavalidador(f);
        } else {
          if (!this.datain.Horario) {
            console.log("data hora");
            this.$set(this.datain, "Horario", [])
            this.schemavalidador(f);
          } else {
            if (!this.datain.Calendario[f]) {
              console.log("data cal fecha");
              this.$set(this.datain.Calendario, [f], {})
              this.schemavalidador(f);
            } else {
              if (!this.datain.Calendario[f].Alumnos) {
                console.log("data cal fecha alum");
                this.$set(this.datain.Calendario[f], "Alumnos", [])
                this.schemavalidador(f);
              } else {
                if (!this.datain.Calendario[f].Horario) {
                  console.log("data cal fecha horario");
                  this.$set(this.datain.Calendario[f], "Horario", [])
                  this.schemavalidador(f);
                } else {
                  if (!this.datain.Calendario[f].cabeceratabla) {
                    console.log("data cal fecha horario");

                    if(this.datain.cabeceratabla){
                    this.$set(this.datain.Calendario[f], "cabeceratabla",this.datain.cabeceratabla)
                  }else{
                    this.$set(this.datain.Calendario[f], "cabeceratabla", [
                      {
                        text:'Imagen',
                        value:'fotoAlumno'
                        },
                      {
                        text:'Nombre Apellido',
                        value:"Nombre"
                      },
                      {
                        text: "Conducta",
                        value: "conducta"
                      },
                      {
                        text: "Asistencia",
                        value: "asistencia"
                      }
                    ])
                  }
                  }
                }
              }
            }
          }
        }
      }
    },
    GuardarCambiosHorario() {
      this.fechahorario = false;
      if (this.tpghoras === "gg") {
        console.log('Guarda Horario en general')
        this.datain.Horario = this.listahoras;
      }
      this.datain.Calendario[this.fechaselected].Horario = this.listahoras
    },
    addhorario() {
      this.listahoras.push({
        dias: "",
        horaIni: "",
        horaFin: "",
        sthorario: true
      });
    },
    deletehorario(p) {
      this.listahoras.splice(p, 1)
    },
    guardarysalir(p) {

      this.$emit("cerrarventana", p)
    
    },
    validaAlumnos() {
      this.error = []
      if (!this.alumnoselect.Nombre) {
        this.error.push("Ingrese el nombre")
      }
      if (!this.alumnoselect.Apellido) {
        this.error.push("Ingrese el apellido")
      }
      if (!this.alumnoselect.fechaNacimiento) {
        this.error.push("Seleccione la fecha de nacimiento")
      }
      if (!this.alumnoselect.genero) {
        this.error.push("Seleccione el genero")
      }
      if (!this.alumnoselect.guardaen) {
        this.error.push(
          "Indique como se guarda el alumno General o solo en este día"
        )
      }
      if (this.error.length > 0) {
        var mens = ""
        this.error.map(m => {
          mens += m + "<br />"
        });
        var payload = {
          st: true,
          tp: "red",
          mensaje: mens
        };
        this.alertconfig(payload);
        setTimeout(() => {
          var payload = {
            st: false,
            tp: "red",
            mensaje: ""
          };
          this.alertconfig(payload);
        }, 3400);
      }
    },
    ////// guardar alumno
    async guardarAlumno(p) {
   
      await this.validaAlumnos();
      if (this.error.length === 0) {
        this.nuevoalumno=false
        if (this.previewI) {
       var fotoAlumno= await this.fotostorageAsync(
            "grupos/" +
              this.datosUsuario.id +
              "/" +
              this.datain.nombreGrupo +
              "/Alumnos/" +
              this.alumnoselect.Nombre +
              " " +
              this.alumnoselect.Apellido
          )

        this.$set(this.alumnoselect,'fotoAlumno',fotoAlumno)
        }

        if (!this.datain.niños) {
          this.datain.niños = 0;
        }
        if (!this.datain.niñas) {
          this.datain.niñas = 0;
        }
        if (!this.datain.totalAlumnos) {
          this.datain.totalAlumnos = 0;
        }
        //// lleva la cuenta de niños y niñas
        if (this.alumnoselect.genero === "niño") {
          this.datain.niños++;
          this.datain.totalAlumnos++;
        }
        if (this.alumnoselect.genero === "niña") {
          this.datain.niñas++;
          this.datain.totalAlumnos++;
        }
    
        if (this.alumnoselect.guardaen === "1") {
          ////// agrega alumno a general
          this.datain.Alumnos.push(this.alumnoselect);
        }
        ///////// agrega alumnos al dia
        this.datain.Calendario[this.fechaselected].Alumnos.push(
          this.alumnoselect
        );

        switch (p) {
          case "g":
            this.addalumno = false;
          
            break;
          case "gc":
            this.nuevoalumno=true
            break;
        }
        this.alumnoselect={}
      } else {
        this.alerta = true;
      }


    },
    changeDate(){
      
      this.vercalendario === true ? this.vercalendario=false : this.vercalendario=false 
    },
    dbclick(){
      alert('mensaje dobleclick')
    },
    importaGenerales(){
      this.datain.Calendario[this.fechaselected].Alumnos=this.datain.Alumnos
    }
  },

  props: {
    datain:{},
    edovista: false
  },
  components: {
    DatePicker,
    Calendar,
    VueTimepicker,
    subirimagen,
    tablaAlumnos
  },

  destroyed() {
    console.log("Destrucción de datos")
  }
}