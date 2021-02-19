import { mapState, mapMutations, mapActions } from 'vuex'
import Spinner from '~/components/spinner.vue'

export default{
    data(){
        return {

            //DATA DE FORMULARIO LOGIN
            dataLogin:{
                correo: '',
                password: '',
            },

            //DATA PARA VALIDAR
            valid: false,
            showPass: false,
            spinner: false,

            //DATA PARA ALERTA DE ERRORES EN EL FORMULARIO
            error: false,
            mensajeError: '',

            //DATA PARA RESTABLECER CONTRASEÑA
            passwordreset:"",
            validreset: false,
            dialogpassword: false,
            msjrestablecer: "Se enviará una liga para restablecer la contraseña al siguiente correo",
            errorRestablecerP:false,
            spinnerreset:false,

            

            /* REGLAS DEL FORMULARIO */
            correoReglas: [
            v => !!v || 'correo es requerido',
            v => /.+@.+\..+/.test(v) || 'Correo no válido',
            ],
            passwordReglas: [
            v => !!v || 'contraseña es requerida',
            v => (v && v.length >= 8) || 'Contraseña debe ser 8 o más caracteres',
            ],

            
        }
    },
    computed:{
        // ...mapState(['datosUsuario']),
        ...mapState(['datosUsuario','dominio']),
        setDatos:{
            get () {
                return this.datosUsuario
            },
            set(value){
                this.datosUsuario = value;
            }
        }
    },
    methods:{
        ...mapActions(['loginStore', 'cerrarSesion']),
        async login (){
            this.spinner = true;
            this.error = false;

            try {
                const response = await this.$fireAuth
                .signInWithEmailAndPassword(this.dataLogin.correo, this.dataLogin.password);
                
            } catch (error) {
                // console.log(error)
                this.error = true;
                // if(error.code === )
                this.mensajeError = error.code === "auth/user-not-found" ? "Correo no registrado" : "Contraseña incorrecta"
                // this.mensajeError = error.message;
                // this.$refs.inputCorreo.focus();
            }
            //console.log( response );

            if(this.error)
            {
                this.spinner = false;
                return
            }
                

            ///const correo = this.dataLogin.correo;
       
            const productoQuery = await this.$fireStore.collection('usuarios').where("correo", "==", this.dataLogin.correo);
            // console.log(productoQuery);
            productoQuery.get()
            .then((querySnapshot) => {
               
                querySnapshot.forEach( (doc) => {
                    let data = doc.data();
                   
                    data.grupo = data.grupo ? data.grupo : {};
                    // data.idMembresia = data.idMembresia ? data.idMembresia : "";
                    data.estadoMembresia = data.estadoMembresia ? data.estadoMembresia : "";
                    data.idCliente = data.idCliente ? data.idCliente : "";
                    data.idSuscripcion = data.idSuscripcion ? data.idSuscripcion : "";
                    data.importeSuscripcion = data.importeSuscripcion ? data.importeSuscripcion : "";
                    data.tipoSuscripcion = data.tipoSuscripcion ? data.tipoSuscripcion : "";
                    if(data.userlogin===false){
                        alert('Tiene un bloqueo de sistema por favor reportelo con nuestra area de soporte ')
                        this.$router.push('reporte')
                    }
                    const datos = {
                        id: doc.id,
                        // idMembresia:"",

                        // grupo:{},
                        ...data
                      }
                //    console.log(doc.data());
                    // this.previo = doc.data();
                 
                 
                    this.loginStore(datos);
                });
                
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
            this.$refs.form.reset();
            this.spinner = false;
            this.$router.push('/')



          },

        //LOGIN PARA FACEBOOK Y GOOGLE
        loginExterno(tipo){
            //ACTIVANDO ANIMACIÓN DE SPINNER

            this.spinner = true;
            const URLactual = window.location;
            // console.log(URLactual);
            // console.log(this.$route);
            // console.log(this.$router);
            // return;
            // alert("dsdsdsdsd")
  
            const provider = tipo === 'google' 
            ? new this.$fireAuthObj.GoogleAuthProvider() 
            : new this.$fireAuthObj.FacebookAuthProvider()
            
            
            this.$fireAuth.languageCode = 'es';

            this.$fireAuth.signInWithPopup(provider).then((result) => {
                const user = result.user;
                console.log(user);
                //TOKEN EXTERNO QUE PUEDE UTILIZARSE
                // const token = result.credential.accessToken;
                // this.$router.push("/");
                // console.log(this.$route);

                window.location.href = URLactual.origin;
                // location.reload();
            }).catch((error) => {
              console.log(error)
            });
            
        },

          validate () {
            const vd = this.$refs.form.validate();
            this.valid = vd;
            if(this.valid)
              this.login();
               // this.siguienteFormulario()
          },
          validateReset () {
            this.spinnerreset = true;
            if(this.dataLogin.correo === "")
            {
                const vd = this.$refs.formReset.validate();
                this.validreset = vd;
                if(this.validreset)
                this.restablecerPassword();
            }
            else
            this.restablecerPassword();

               // this.siguienteFormulario()
          },

          restablecerPassword(){
            console.log("Restableciendo...")
            // console.log(this.$fireAuthObj())
            const auth = this.$fireAuthObj();
            this.$fireAuthObj().languageCode = 'es';
            let correo;

            if(this.dataLogin.correo !== '')
                correo = this.dataLogin.correo
            else
                correo = this.passwordreset

            auth.sendPasswordResetEmail(correo).then(() => {
                this.msjrestablecer = "El correo fue enviado con éxito, revise su bandeja de entrada o correos no deseados"
                this.errorRestablecerP=false;
                this.spinnerreset = false;


                console.log("enviando correo..");
            // Email sent.
            }).catch((error) => {
            // An error happened.
            if(error.code === "auth/user-not-found")
            this.msjrestablecer = "Este correo no se encuentra registrado."
            this.errorRestablecerP=true;
            this.spinnerreset = false;



            console.log("error al enviar correo")
            console.log(error)
            });

          },
          cerrarPassword(){
            this.dialogpassword=false;
            this.errorRestablecerP=false;

            this.msjrestablecer = "Se enviará una liga para restablecer la contraseña al siguiente correo"
            this.title="Correo"

          }
    },
    components:{
        Spinner
    }
}