import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
        listapost:[]
    };
  },
  computed: {
    ...mapState(["datosUsuario"])
  },
  methods: {
    async cargaPost() {
      try {
        await this.$fireStore
          .collection("publicaciones")
          .where("user", "==", this.datosUsuario.id)
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
    this.cargaPost();
  },
  props: {
    tipo: {
      type: String,
      default: "BLOG"
    },
    updatelist:""
  }
};
