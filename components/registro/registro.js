
import { mapState, mapActions, mapMutations } from 'vuex'
import subirImagen from '@/components/subirimagen/subirimagen.vue'

export default{
    data(){
        return {
          urlhost:"",
            finish:false,
            succesreg:false,
            //DATA DE ELEMENTOS
            uploadimg:false,
            checkbox:false,
            spinner: false,
            payload:{},
            //DATA PARA LOS SELECT DEL FORMULARIO
            tipos:['Miss','Maestra'],
            years: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],

            //DATA QUE SE MANDARÁ A FIREBASE
            datosUsuarioR:{
                tipo: null,
                nombre: '',
                apellido: '',
                correo: '',
                urlImagen:'',
                userlogin:false,
                foldercode:'',  
                vercorre:false, //// se utiliza para confirmar el correo registrado
                lvluser:0,
                codigocorreo:''
            },

            //DATA DE CONFIRMACION DE CAMPOS
            password: '',
            confirmarPassword:'',
            confirmarCorreo: '',
            //DATA PARA VALIDAR QUE ESTEN LLENOS LOS CAMPOS DE CADA FORMULARIO
            valid: false,
            showPass: false,
            showPass2: false,

            //DATA PARA ALERTA DE ERRORES EN EL FORMULARIO
            error: false,
            mensajeError: '',

            /* REGLAS DEL PRIMER FORMULARIO */
            nombreReglas: [
            v => !!v || 'Nombre es requerido',
            // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            apellidoReglas: [
            v => !!v || 'Nombre es requerido',
            // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            correoReglas: [
            
            v => !!v || 'correo es requerido',
            v => /.+@.+\..+/.test(v) || 'Correo no válido',
            ],
            correoReglas2: [
            v => !!v || 'correo es requerido',
            v => /.+@.+\..+/.test(v) || 'Correo no válido',
            v => (v === this.datosUsuarioR.correo) || 'El correo debe ser el mismo',
            ],
            passwordReglas: [
            v => !!v || 'contraseña es requerida',
            v => (v && v.length >= 8) || 'Contraseña debe ser 8 o más caracteres',
            ],
            passwordReglas2: [
            v => !!v || 'contraseña es requerida',
            v => (v && v.length >= 8) || 'Contraseña debe ser 8 o más caracteres',
            v => (v === this.password) || 'La contraseña debe ser la misma',
            ],

            /*REGLAS DEL SEGUNDO FORMULARIO */
            telefonoReglas: [
                v => /^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(v) || 'Teléfono no valido',
                v => (v && v.length === 10) || 'El número debe tener 10 digito',
            ],
        }
    },
    components:{
      subirImagen
    },
    computed:{
        ...mapState(['datosUsuario','urlimg','dominio','configAll']),
    },
    created(){
      this.urlhost=`${window.location.protocol}//${window.location.host}/`
    },
    methods:{

      ...mapMutations(['almacenarFotoStorage','guardaDatosUsuarioStore']),

        //REGISTRO PARA FACEBOOK Y GOOGLE
        registroExterno(tipo){
          //ACTIVANDO ANIMACIÓN DE SPINNER
          this.spinner = true;

          const provider = tipo === 'google' 
          ? new this.$fireAuthObj.GoogleAuthProvider() 
          : new this.$fireAuthObj.FacebookAuthProvider()
          
          
          this.$fireAuth.languageCode = 'es';
          this.$fireAuth.signInWithPopup(provider).then((result) => {
            const user = result.user;

            //VERIFICAR SI EL CORREO DE GOOGLE O FACEBOOK YA ESTAN REGISTRADOS EN EL SISTEMA
            if(result.isNewUser || result.additionalUserInfo.isNewUser)
            {
              this.datosUsuarioR = {
                tipo: '',
                nombre: user.displayName,
                apellido: '',
                correo: user.email,
                urlImagen: user.photoURL,
                userlogin:true,
                lvluser:0
              };
              this.almacenarUsuarioCollection();
     

            }
            else
            {
              this.spinner = false;
              this.error = true;
              this.mensajeError = "Este correo ya fue registrado";
            }

          }).catch((error) => {
            console.log(error)
          });
          
        },
   
        async crearUsuario(){
          //ACTIVANDO ANIMACIÓN DE SPINNER Y ERROR FALSE PARA OCULTAR ERRORES PREVIOS
          this.spinner = true;
          this.error = false;
        
         var codigo=this.$codegenerate();
        var codigo1=this.$codecorreo();
         this.datosUsuarioR.foldercode=codigo
         this.datosUsuarioR.codigocorreo=codigo1
         
         await this.almacenarFotoStorage("fotos_perfil/"+codigo);
          
          
         if(!this.urlimg){
         this.payload={
          tipo:'confirmacion',
          datos:this.datosUsuarioR,
          url:this.configAll.url
        }

       fetch(this.configAll.mailserver+'/mailsender/',
        {
          method:'POST',
          headers:{
            'Content-type':'applications/json'
          },
          body:JSON.stringify(this.payload)

        }
       )
       .then((data)=>{

        this.payload.tipomensaje='registro'
        this.payload.accion='envio para confirmación de correo'

       this.$fireStore.collection('correos').add(this.payload)
       .then(()=>{
        this.finish=true
       })
      })
    }
        },
        async almacenarUsuarioCollection(){
        // const URLactual = window.location;

          //SE ALMACENA EL NUEVO USUARIO EN LA COLECCION DE USUARIOS
          try {
              this.datosUsuarioR.userlogin = true,
              this.datosUsuarioR.lvluser = 1;
           await this.$fireStore.collection('usuarios').add(this.datosUsuarioR);
             ////Guarda los datos de usuario en el store con una mutación 
           this.guardaDatosUsuarioStore(this.datosUsuarioR);
           this.resetearData();
         /// this.$router.push('/')
          window.location.href = this.urlhost;


          } catch (error) {
            console.log(error)
          }
        },
        async almacenarUsuarioAuthentication(){

          const {correo, nombre, apellido, urlImagen } = this.datosUsuarioR;

          try {
            //SE AGREGAN NUEVOS USUARIOS A FIREBASE AUTHENTICATION
            const nuevoUsuario = await this.$fireAuth
            .createUserWithEmailAndPassword(correo, this.password);

            //AGREGAR CAMPO DE NOMBRE COMPLETO Y URL DE LA FOTO DE PERFIL
            const nombreCompleto = `${nombre} ${apellido}`;
            await nuevoUsuario.user.updateProfile({
                displayName: nombreCompleto,
                photoURL: urlImagen
            });
          } catch (error) {
            this.error = true;
            this.mensajeError = "Este correo ya fue registrado";
          }
          
        },

        resetearData(){
            this.$refs.form.reset();
            this.datosUsuarioR.urlImagen = this.urlImagen;
            this.checkbox = false;
            this.spinner = false;
            this.error = false;
            this.mensajeError = "";
        },

    
        /* VALIDA QUE LAS REGLAS DEL 1ER FORMULARIO SE CUMPLAN */
        validate () {
          const vd = this.$refs.form.validate();
          this.valid = vd;
          if(this.valid)
            this.crearUsuario()
        },
        finalizaproceso(){
          this.$router.push('/')
        }
       
    },
    watch:{
      async urlimg(){

       this.datosUsuarioR.urlImagen=this.urlimg
        
        await this.almacenarUsuarioAuthentication();
        //EN EL METODO DE almacenarUsuarioAuthentication SI EL USUARIO EXISTE MODIFICA this.error
        //DE ESTA FORMA EVITA QUE ALMACENE EL USUARIO EN LA COLLECION
        console.log("error: "+this.error)
         if(!this.error){
           
             this.succesreg=true
             
           
              
              ///envia correo de confirmación 
              this.almacenarUsuarioCollection();

              this.payload={
                tipo:'confirmacion',
                datos:this.datosUsuarioR,
                url:this.configAll.url
              }

             fetch(this.configAll.mailserver+'/mailsender/',
              {
                method:'POST',
                headers:{
                  'Content-type':'applications/json'
                },
                body:JSON.stringify(this.payload)

              }
             )
             .then((data)=>{

              this.payload.tipomensaje='registro'
              this.payload.accion='envio para confirmación de correo'

             this.$fireStore.collection('correo').add(this.payload)
             .then(()=>{
              this.finish=true
             })
              
              
            })
      
            


            }else{ 
              this.spinner = false 
            }
        
      }
    }
  
}