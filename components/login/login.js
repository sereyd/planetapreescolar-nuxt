import { mapState, mapActions } from "vuex";
import Spinner from "~/components/spinner.vue";

export default {
  data() {
    return {
      //DATA DE FORMULARIO LOGIN
      dataLogin: {
        correo: "lore@gmail.com",
        password: "12345678"
      },

      //DATA PARA VALIDAR
      valid: false,
      showPass: false,
      spinner: false,

      //DATA PARA ALERTA DE ERRORES EN EL FORMULARIO
      error: false,
      mensajeError: "",

      /* REGLAS DEL FORMULARIO */
      correoReglas: [
        v => !!v || "correo es requerido",
        v => /.+@.+\..+/.test(v) || "Correo no válido"
      ],
      passwordReglas: [
        v => !!v || "contraseña es requerida",
        v => (v && v.length >= 8) || "Contraseña debe ser 8 o más caracteres"
      ]
    };
  },
  computed: {
    // ...mapState(['datosUsuario']),
    ...mapState(["datosUsuario"]),
    setDatos: {
      get() {
        return this.datosUsuario;
      },
      set(value) {
        this.datosUsuario = value;
      }
    }
  },
  methods: {
    ...mapActions(["loginStore"]),
    async login() {
      this.spinner = true;
      this.error = false;

      try {
        const response = await this.$fireAuth.signInWithEmailAndPassword(
          this.dataLogin.correo,
          this.dataLogin.password
        );
      } catch (error) {
        // console.log(error)
        this.error = true;
        // if(error.code === )
        this.mensajeError =
          error.code === "auth/user-not-found"
            ? "Correo no registrado"
            : "Contraseña incorrecta";
        // this.mensajeError = error.message;
        // this.$refs.inputCorreo.focus();
      }
      //console.log( response );

      if (this.error) {
        this.spinner = false;
        return;
      }

      // const correo = this.dataLogin.correo;
      const productoQuery = await this.$fireStore
        .collection("usuarios")
        .where("correo", "==", this.dataLogin.correo);
      // console.log(productoQuery);
      productoQuery
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //    console.log(doc.data());
            // this.previo = doc.data();
            this.loginStore(doc.data());
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
      this.$refs.form.reset();
      this.spinner = false;
      this.$router.push("/");
    },
    validate() {
      const vd = this.$refs.form.validate();
      this.valid = vd;
      if (this.valid) this.login();
      // this.siguienteFormulario()
    },

    restablecerPassword() {
      console.log("Restableciendo...");

      console.log(this.$fireAuthObj());
      const auth = this.$fireAuthObj();
      this.$fireAuthObj().languageCode = "es";

      const { correo } = this.dataLogin;

      auth
        .sendPasswordResetEmail(correo)
        .then(() => {
          console.log("enviando correo");
          // Email sent.
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  components: {
    Spinner
  }
};
