<template>
    <v-main>
        <!-- {{dialog}} -->

    <v-card class=" mx-5 mt-7 red">
        <div class="d-flex justify-center">
            <div>
                <button>Lunes</button>
            </div>
            <div>
                <button>Martes</button>
            </div>
            <div>
                <button>Miercoles</button>
            </div>
            <div>
                <button>Jueves</button>
            </div>
            <div>
                <button>Viernes</button>
            </div>
        </div>
    </v-card>

    <v-card class=" mx-5 mt-7" >
        <v-row>
            <v-col class="ml-3">
                <!-- <div class="ml-2"> -->
                    <div><p class="primary--text ">Miercoles</p></div>
                    <div>
                        <v-switch @change="!isClase" 
                                  v-model="isClase" :label="isClase ? 'Clase' : 'Descanso' "
                    ></v-switch>
                    </div>
                <!-- </div> -->
            </v-col>
            <v-col class="mr-3">
                <div class="orden">
                    <div><p class="primary--text ">Ver otros dias</p></div>
                </div >
                <div class="orden">
                    <div><p class="primary--text ">Miercoles de 08:00 a 12:00 hrs</p></div>
                </div>
            </v-col>
        </v-row>
        <!-- <div class="pink"><h1 class="primary--text ml-3">Mis Grupos</h1></div>
        <div class="blue"><v-btn class="orange mr-3">Ver más</v-btn></div> -->
    </v-card>

    

    <v-card class=" mx-5 mt-7" >
        <v-row >
            <v-col cols="12" class="ml-3 " >
                <v-row >
                    <v-col cols="3">
                        <!-- <div v-if="lista === 'Nuevo Alumno'">  -->
                            <h3 class="tabla_titulos">
                                <v-btn text @click="dialogAlumno = true" fab class="blue lighten-3">
                                    <v-icon color="white "  >mdi-plus</v-icon>
                                </v-btn>
                                 Nuevo Alumno
                            </h3>
                        <!-- </div> -->
                    </v-col>
                    <v-col v-for="(lista, index) in grupo.listas" :key="index" class="" cols="1">
                        <!-- <div v-if="lista === 'Nuevo Alumno'"> 
                            <h3 class="tabla_titulos">
                                <v-btn text @click="dialogAlumno = true" fab class="blue lighten-3">
                                    <v-icon color="white "  >mdi-plus</v-icon>
                                </v-btn>
                                <v-btn text @click="dialogAlumno = true" class="blue lighten-3 fab">
                                    <v-icon color="white "  style="font-size: 25px;">mdi-plus</v-icon>
                                </v-btn> 
                                 {{lista}}
                            </h3>
                        </div> -->
                        <!-- <div v-if="t.titulo !== 'Nueva lista'"> -->
                            <h3 class="tabla_titulos ">{{lista}}</h3>
                            <v-select
                                :items="items"
                                dense
                                height="10"
                                label="Selecciona"
                                solo
                            ></v-select>
                        <!-- </div> -->
                        <!-- <div v-else class=" pr-3">
                            <h3 class="tabla_titulos  text-center">
                                <v-btn text @click="dialogLista = true"   fab x-small class="blue lighten-3">
                                    <v-icon color="white "  style="font-size: 20px;">mdi-plus</v-icon>
                                </v-btn>
                                {{lista}}
                            </h3>
                        </div> -->
                    </v-col>
                    <v-col cols="1" class=" pr-3">
                        <h3 class="tabla_titulos  text-center">
                                <v-btn text @click="dialogLista = true"   fab x-small class="blue lighten-3">
                                    <v-icon color="white "  style="font-size: 20px;">mdi-plus</v-icon>
                                </v-btn>
                                Nueva lista
                            </h3>
                    </v-col>
                    
                </v-row>
                <v-spacer></v-spacer>
                <v-row v-for="(a, index) in grupo.alumnos" :key="index"   >
                    <v-col  cols='3' class=" py-1" >
                    <!-- {{index}} -->
                        <div class=""><p>{{a.nombre}} {{a.apellidos}}</p></div>
                    </v-col>
                    <div v-if="a.evaluaciones">
                    <v-col class="fila"  v-for="(data, index) in a" :key="index" :cols="index === 'nombre' ? '3' : '1'" >
                        <div class="">
                            <p :class="index === 'nombre' ? '' : 'text-center'">{{data}}</p>
                        </div>
                    </v-col>
                    </div>
                    <!-- <v-col :cols="index === 0 ? '4' : 'auto'" >
                        <h3>{{a.nombre}}</h3>
                    </v-col> -->
                    <!-- {{Object.keys(a.data)}} -->
                    <!-- <v-col :cols="index === 0 ? '4' : 'auto'" >
                        <h3>{{a.conducta}}</h3>
                    </v-col>
                    <v-col :cols="index === 0 ? '4' : 'auto'" >
                        <h3>{{a.asistencia}}</h3>
                    </v-col>
                    <v-col :cols="index === 0 ? '4' : 'auto'" >
                        <h3>{{a.nombre}}</h3>
                    </v-col> -->
                </v-row>
            </v-col>
        </v-row>
        <!-- <div class="pink"><h1 class="primary--text ml-3">Mis Grupos</h1></div>
        <div class="blue"><v-btn class="orange mr-3">Ver más</v-btn></div> -->
    </v-card>


    <!-- DIALOG DE REGISTRO DE ALUMNOS -->
    <v-dialog v-model="dialogAlumno" persistent max-width="755">
        <!-- {{dialogAlumno}} -->
      <v-card class="">
        <v-card-title class=" justify-space-between">
            <v-btn icon text small color="purple" @click="" >
                <!-- <v-icon>mdi-arrow-left-bold</v-icon> -->
            </v-btn>
            <h2 class="headline purple--text ">Nuevo Alumno</h2>
            <v-btn icon text small color="purple" @click="dialogAlumno = false" >
                <v-icon>mdi-window-close</v-icon>
            </v-btn>
        </v-card-title>
        <div class="">
         <v-form ref="formAlumno"
         v-model="esAlumnoValido"
         lazy-validation>
          <v-row>
            <v-col class="" cols="5">
              <div  hidden>
                  <input type="file" @change = "changeImagenAlumno" ref="fileupload"/>
              </div> 

              <!-- BOTON DE PARA ELEGIR FOTO  -->
              <div class="  d-flex justify-center align-center ">
                <v-btn
                  class=" mt-12"
                  color=""
                  height="150" width="85%"
                  @click="seleccionarImagenAlumno"
                >
                  <div v-if="!imagen" >
                      <v-icon color="pink darken-4"  style="font-size: 120px;">mdi-plus</v-icon>
                  </div>
                  <div v-else  class="divFoto">
                          <v-img
                          :src="urlImagenPrevia"
                          alt="foto"
                          class="imagenPre"
                          contain
                          ></v-img>
                  </div>
                </v-btn>
              </div>
              <p class="text-center sub mt-2">Añadir imagen de alumno</p>
            </v-col>

            <v-col cols="7" class="pr-7">
              <div class=""> 
                <v-text-field
                    v-model="datosNuevoAlumno.nombre"
                    placeholder="Nombre"
                    required
                    outlined
                    :rules="[v => !!v || 'Nombre es requerido']"
                ></v-text-field>
                <v-text-field
                    v-model="datosNuevoAlumno.apellidos"
                    placeholder="Apellidos"
                    required
                    outlined
                    :rules="[v => !!v || 'Apellidos son requeridos']"

                ></v-text-field>
                <v-text-field
                    v-model="datosNuevoAlumno.fechaNacimiento"
                    placeholder="Fecha nacimiento"
                    required
                    outlined
                    :rules="[v => !!v || 'Fecha de nacimiento es requerida']"

                ></v-text-field>
                <!-- {{datosNuevoAlumno.sexo}} -->
                <v-radio-group 
                    v-model="datosNuevoAlumno.sexo" 
                    :mandatory="false" row
                    :rules="[v => !!v || 'Dato equerido']">
                    <v-radio label="Niña" value="F"></v-radio>
                    <v-radio label="Niño" value="M"></v-radio>
                </v-radio-group>

                <v-text-field
                    v-model="datosNuevoAlumno.telefono"
                    placeholder="Telefono"
                    required
                    outlined
                    :rules="[v => !!v || 'Telefono es requerido']"

                ></v-text-field>
                <!-- <p class="sub">*Campo obligatorio</p > -->
              </div>
            </v-col>

          </v-row>
          <div class="d-flex justify-center">
              <v-btn 
                  :disabled="!esAlumnoValido" dark 
                  class="red px-10 mb-5" 
                  @click="validarFormularioAlumno"  
              > Crear Alumno</v-btn>
          </div>
             
         </v-form>

                    
                 
        </div>
      </v-card>
    </v-dialog>




    <!-- DIALOG DE REGISTRO DE ALUMNOS -->
    <v-dialog v-model="dialogLista" persistent max-width="755">
        <!-- {{dialogAlumno}} -->
      <v-card class="">
        <v-card-title class=" justify-space-between">
            <v-btn icon text small color="purple" @click="" >
                <!-- <v-icon>mdi-arrow-left-bold</v-icon> -->
            </v-btn>
            <h2 class="headline purple--text ">Nueva Lista</h2>
            <v-btn icon text small color="purple" @click="dialogLista = false" >
                <v-icon>mdi-window-close</v-icon>
            </v-btn>
        </v-card-title>
        <div class="">
         <v-form ref="formLista"
         v-model="esListaValido"
         lazy-validation>
          <v-row class="mx-8">
            <v-col cols="12" class="pr-7">
              <div class=""> 
                <v-text-field
                    v-model="datosNuevoLista.nombre"
                    placeholder="Nombre"
                    required
                    outlined
                    :rules="[v => !!v || 'Nombre es requerido']"
                ></v-text-field>

                <v-card>
                    <v-row class="mx-2">
                        <v-col v-for="(lis, index) in listas" :key="index">
                            <div class="  d-flex justify-center align-center "> 
                                <v-btn height="150" width="85%" @click="elegirTipoLista(lis.titulo)" >
                                    <div class="divFoto">
                                            <v-img
                                            src=""
                                            alt="foto"
                                            class="imagenPre"
                                            contain
                                            ></v-img>
                                    </div>
                                </v-btn>
                            </div>
                            <div>
                               <h5 class="text-center"> {{lis.titulo}}</h5>
                            </div>
                        </v-col>
                </v-row>
                </v-card>

                <v-radio-group 
                    v-model="allDays" 
                    :mandatory="false" row
                    :rules="[v => !!v || 'Dato equerido']">
                    <v-radio label="Solo este día" value=true></v-radio>
                    <v-radio label="Todos los días" value=false></v-radio>
                </v-radio-group>

              </div>
            </v-col>

          </v-row>
          <div class="d-flex justify-center">
              <v-btn 
                  :disabled="!esListaValido" dark 
                  class="red px-10 mb-5" 
                  @click="validarFormularioLista"  
              > Crear Lista</v-btn>
          </div>
             
         </v-form>

                    
                 
        </div>
      </v-card>
    </v-dialog>



    </v-main>
</template>
<script>
// import validasitio from '@/mixins/validasitio.js'
// import grupos from '~/components/grupos/grupos.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            datapage:{
                permisos:1,
                logeado:true
            },

            items:["1", "2", "3"],
            tabla:[
                {titulo:"Nuevo Alumno"},
                {titulo:"Conducta"},
                {titulo:"Asistencia"},
                {titulo:"Nueva lista"},

            ],

            //DATA DE ALUMNOS
            dialogAlumno: false,
            esAlumnoValido: true,
            imagen: null,
            urlImagenPrevia: "",
            datosNuevoAlumno:{
                nombre:"Fidel",
                apellidos: "Castro",
                fechaNacimiento:"1902",
                sexo:"",
                telefono:"2736273",
                urlImagen: "",

            },

            alumnos:[
                // {nombre: "Jose Migeul diaz perez", conducta:"1", asistencia: true},
                // {nombre: "Ernesto mendez ruiz", conducta:"2", asistencia: true},
                // {nombre: "Arturo Castillo Tellez", conducta:"1", asistencia: true},
                // {nombre: "Juan Mendez Blas", conducta:"2", asistencia: true},
            ],


            //DATA PARA LISTAS
            dialogLista: false,
            esListaValido: true,
            datosNuevoLista:{
                nombre:"Puntualidad",
                tipoLista:"",
            },
            listas:[
                {titulo:"Semáforo", img:""},
                {titulo:"Si/No", img:""},
                {titulo:"Rango 1/10", img:""},
                {titulo:"ON/OFF", img:""}
            ],

            

            // DATA GRUPO Y HORARIOS
            allDays:"",
            idGrupo :"",
            grupos:[],
            grupo:{},
            isClase: false,
        }
    },
    created(){
        console.log(this.$route)
        this.grupos = this.$route.query;
        this.idGrupo = this.$route.params.id;
        console.log(this.grupos);
        this.grupo = this.grupos.find( grupo => this.idGrupo === grupo.nombreGrupo );
        console.log(this.grupo);
        console.log("Alumnos");
        this.grupo.alumnos = this.grupo.alumnos ? this.grupo.alumnos : [];
        console.log(this.grupo.alumnos);

        // console.log(Object.keys(this.alumnos[0].data))
    },
    components:{
        // grupos
    },
    computed:{
        ...mapState(['datosUsuario']),
    },
    methods:{

        ...mapActions(['actualizarGrupos']),

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
            //  this.crearGrupo()
            console.log("valido")
            console.log(this.datosNuevoAlumno)
            this.crearNuevoAlumno();
        },
        async crearNuevoAlumno(){
            await this.almacenarFotoStorage("alumnos");
            await this.almacenarAlumnoCollection();
            // await crearGrupo();

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
          console.log("Almacenando");
          const {id} = this.datosUsuario;
          try {


            //SE EXTRAEN LOS DATOS DEL OBJETO
            const {nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen} 
            = this.datosNuevoAlumno;
          console.log("Almacenando");

            //VERIFICAR SI EL OBJETO datosUsuario TIENE ALUMNOS, SI TIENE ALUMNOS PREVIOS
            //SE ALMACENAN EN LA DATA ALUMNOS
            // if( this.datosUsuario.alumnos )
            //     this.alumnos = this.datosUsuario.alumnos;

            //SE INSERTAN LOS DATOS DEL NUEVO ALUMNO A LA DATA DE ALUMNO.
          console.log("Alumnos antes");
          console.log(this.grupo.alumnos);

            this.grupo.alumnos.push(
                {
                    nombre, apellidos, fechaNacimiento, sexo, telefono, urlImagen,
                    fechaCreado: Date.now()
                    // , horario: this.horario
                }
            );
          console.log("Alumnos despues");
          console.log(this.grupo.alumnos);

            
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let usuarioGruposRef =  this.$fireStore.collection("usuarios").doc(id);

            console.log(usuarioGruposRef);
            // console.log(this.grupos);

            this.grupos.map( grupo => {
                if(grupo.nombreGrupo === this.idGrupo)
                {
                    console.log(grupo);
                    grupo.alumnos = this.grupo.alumnos;
                }
            });

            console.log("GRUPOS UDPDATE");
            console.log(this.grupos);
            
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
            // this.dialog = false;
            // this.faseFormulario = 1;
            // console.log("pusheando");
            // this.$router.push('/grupos');

            
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
            if(this.esListaValido)
            //  this.crearGrupo()
            console.log("valido")
            console.log(this.datosNuevoLista);
        },
    }
    // mixins:[validasitio]
}
</script>


<style>
.orden
{
    display: flex;
    justify-content: flex-end;
    /* background-color: ; */
}
.tabla_titulos{
 font-size: 14px;
}

.fila{
    background-color: red;
    padding:0;
    margin:0;
    /* padding-bottom: 0px;
    padding-top: 0px;
    margin-bottom: 0px;
    margin-top: 0px; */
}

</style>