import { mapState, mapMutations, mapActions } from 'vuex'
export default{
    data(){
        return {
            fullScreenUsuarios: false,
            fullScreenUsuarios2: false,
            fullScreenUsuarios3: false,


            //DATA DE FORMULARIO LOGIN
            usuarios:[],
            tipos:['Miss','Maestra'],
            lvls:[{value: 0, text: "Gratis"}, {value: 1, text: "Premium"}, {value: 2, text: "Admin"}],

            //DATA DE LA TABLA
            titulos:[
                {
                    text:'Foto',
                    value:'action2'
                },
                {
                    text:'Nombre',
                    value:'nombre'
                },
                {
                    text:'Apellido',
                    value:'apellido'
                },
                {
                    text:'Correo',
                    value:'correo'
                },
                
                {
                    text:'Editar',
                    value:'actions',
                    sorteable: false
                }   
            ],
            
            usuarioEditable: {
                nombre: '',
                apellido: '',
                tipo: '',
                correo: '',
                lvluser: '',
            },

            //DATA PARA FILTAR USUARIOS
            search: '',

            dialog: false,//DATA PARA ELA VENTANA  EMERGENTE DE EDITAR USUARIO
            valid: false,  //DATA PARA VALIDAR EL FORMULARIO
            validConfigD: false,  //DATA PARA VALIDAR EL FORMULARIO CONFIG DESCARGAS

            /* REGLAS DEL PRIMER FORMULARIO */
            nombreReglas: [
                v => !!v || 'Nombre es requerido',
                // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
            apellidoReglas: [
                v => !!v || 'Nombre es requerido',
                // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
            nivelReglas: [
                v =>  (v >= 0 && v < 3) || 'Seleccione un nivel'
            ],
            abrenot:false,
            dialogDes:false,
            optionUsuarios:[],
            usernotselect:{},
            iconos:[
                {
                  text:'delete',
                  value:'mdi-delete'
                },
                {
                    text:'alerta',
                    value:'mdi-alert'
                  },
                  {
                    text:'cuenta',
                    value:'mdi-account'
                  },
                  {
                    text:'correo',
                    value:'mdi-email'
                  }
                
            ],
            editDescargasConf:{
                free:0,
                mensual:0,
                trimestral:0,
                semestral:0,
                anual:0,
            },

            
        }
      
    },
    computed:{
        // ...mapState(['datosUsuario']),
        ...mapState(['datosUsuario','descargasConf']),
    },
    methods:{
        ...mapActions(['creaNotificacion']),
        ...mapMutations(['cambiarStatusOpenAdmin','actualizarConfigDescargas']),
        abrirConfigD(){
            this.dialogDes = true;
            this.editDescargasConf = {...this.descargasConf};
        },
        // async cargaConfiguracionDescargas(){
        //     let datos= {};
        //     console.log("OBTENIENDO DATA")

        //     await this.$fireStore
        //     .collection("confDescargas")
        //     .get()
        //     .then(data => {
        //      console.log(data);
        //       data.forEach(doc => {
        //         let dat = doc.data();
        //         datos = {
        //           idConfig: doc.id,
        //           ...dat
        //         }
        //       });
        //       this.actualizarConfigDescargas(datos);
        //       console.log(datos)
        //       this.editDescargasConf = datos;
        //       console.log(this.descargasConf)
        //       this.dialogDes = true;

        //     });

        // },
        editarConfigDescargas(){
            const {idConfig} = this.descargasConf;
            // console.log(this.descargasConf);
            // console.log(this.editDescargasConf);
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let descargasFreeRef = this.$fireStore.collection("confDescargas").doc(idConfig);
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
            descargasFreeRef.update({
                ...this.editDescargasConf
            })
            .then(() => {
              console.log("UPDATE CONFIGURACION DESCARGAR ")
              this.actualizarConfigDescargas(this.editDescargasConf);
            //   console.log(datos)
            //   console.log(this.descargasConf)
              this.dialogDes = false;
        
            })
            .catch((error) => {
                console.error("ErroR al actualizar descargas: ", error);
            });
        },
        enviarNotificacion(){
            this.creaNotificacion(this.usernotselect)

            this.usernotselect={}
        },
        async getElement(){ 
            this.cambiaLoading('inicia')
            try{
                this.usuarios=[]
                this.optionUsuarios=[]
                const dtuser=await this.$fireStore.collection('usuarios').get();
                //DESPUES DE OBTENER A LOS USUARIOS LOS ALMACENAMOS EN THIS.UUSUARIOS
                this.usuarios = dtuser.docs.map(doc=>{
                    this.optionUsuarios.push({
                        text:doc.data().nombre+" "+doc.data().apellido+": "+doc.data().correo,
                        value:doc.id
                    })

                return {
                    id: doc.id, //SE LES AGREGA EL ID DEL USAURIO PARA REALIZAR LA BUSQUEDA POR SU ID
                    ...doc.data()
                    }

                    this.cambiaLoading('finaliza')
                });
                console.log(this.optionUsuarios)
            }catch(error){
              console.log(error)
            }

        },
        abreNotificaciones(){

        },
        abrirVentana (usuario) {
          this.usuarioEditable = usuario;
          this.dialog = true
        },
        // SOLO SE PUEDE ELIMIINAR EL USUARIO DE LA BASE DE DATOS PERO NO DEL AUTENTHICATION
        // async eliminarUsuario (usuario) {
        //     const {id} = usuario;
        //     console.log(usuario);

        //   if (confirm('¿Seguro que desea eliminar a este usuario?')) {
        //     console.log("eliminado ALV")
        //     try {
        //         await this.$fireStore.collection('usuarios').doc(id).delete();
        //     } catch (error) {
        //         console.log(error);
        //     }

        //   } else {
        //     console.log("No ALV")
        //   }

        // },
    
        editarUsuario () {
            //SE OBTIENE EL CAMPO ID DEL USUARIO A EDITAR
            const {id} = this.usuarioEditable;
            //SE REALIZA LLA BUSQUEDA POR MEDIO DE SU ID
            this.$fireStore.collection('usuarios').doc(id).update(this.usuarioEditable)
            this.close()
        },

        validarFormulario () {
            const vd = this.$refs.form.validate();
            this.valid = vd;
            if(this.valid)
              this.guardarModificacionUsuario();
        },

        validateConfDes () {
            const vd = this.$refs.formConfigDes.validate();
            this.validConfigD = vd;
            if(this.validConfigD)
            //   this.crearUsuario()
            this.editarConfigDescargas()
            // console.log("todo OK")
          },
    },
    mounted(){
        this.getElement()
    }
}