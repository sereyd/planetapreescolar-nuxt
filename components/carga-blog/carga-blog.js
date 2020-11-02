
export default {
  data() {
    return {
        listapost:[]
    };
  },
  computed: {

  },
  methods: {
    async cargaPost() {
    console.log(this.tipo)
    console.log(this.$store.state.datosUsuario.id)
      
      try {
        // const usuarioQuery =  this.$fireStore.collection('usuarios').where("correo", "==", user.email);

        console.log(this)
        console.log(this.$fireStore)
   
        await this.$fireStore
          .collection(this.tipo)
          .where("user", "==",this.$store.state.datosUsuario.id)
          // .where("tipo","==",this.tipo)  
          .get()
          .then((data) => {
            data.forEach((doc) => {
                // console.log("Carga tipo: "+this.tipo)
                // console.log(doc.data())
              this.listaR.push(doc.data());
            });
            console.log(this.listaR)
          });
      } catch (e) {
        console.log(e);
      }

  
    }
  },
  mounted() {
    console.log("this.listaR")
    console.log(this.listaR)
    this.cargaPost();

  },
  props: {
    tipo: {
      type: String,
      default: "BLOG"
    },
    listaR:""
  }
};
