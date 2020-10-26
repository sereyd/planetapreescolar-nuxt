
export default {
  data() {
    return {
        listapost:[]
    };
  },
  computed: {

  },
  methods: {
    async cargaPost(p) {
      
      try {
   
        await this.$fireStore
          .collection("publicaciones")
          .where("user", "==",this.$store.state.datosUsuario.id)
          .where("tipo","==",this.tipo)  
          .get()
          .then((data) => {
            data.forEach((doc) => {
                console.log("Carga tipo: "+this.tipo)
                console.log(doc.data())
              this.listapost.push(doc.data());
            });
          });
      } catch (e) {
        console.log(e);
      }

  
    }
  },
  mounted() {
    

  },
  props: {
    tipo: {
      type: String,
      default: "BLOG"
    },
    updatelist:""
  }
};
