import { mapState, mapMutations, mapActions } from "vuex";
import grupoDetalles from "~/components/gruposDetalles/grupoDetalles.vue";
import subirImagen from "~/components/subirimagen/subirimagen.vue";
export default {
  data() {
    return {
      grupos: {},
      uploadimg: false,
      previewImg: "",
      datosNuevoGrupo: {},
      selectGrupo: {},
      dialog: false,
      faseFormulario: 0,
      esGrupoValido: false,
      viewGroup: false
    };
  },
  computed: {
    ...mapState(["datosUsuario", "urlimg"])
  },
  mounted() {
    this.iniciaCargadeGrupos();
  },
  methods: {
    ...mapMutations([
      "almacenarFotoStorage",
      "cleanImgStore",
      "tomaDatosActualizados"
    ]),
    gruposelect(p) {
      this.selectGrupo = p;
      this.viewGroup = true;
    },
    updateListado() {},
    iniciaCargadeGrupos() {
      this.grupos = { ...this.datosUsuario.grupo };
    },
    guardarGrupo() {
      if (this.previewImg) {
        this.almacenarFotoStorage(
          "grupos/" +
            this.datosUsuario.id +
            "/" +
            this.datosNuevoGrupo.nombreGrupo
        );
      } else {
        this.addgruposquema();
        this.dialog = false;
        this.updateGrupo();
        this.tomaDatosActualizados()
        this.datosNuevoGrupo = {};
      }
    },
    GuardarCambiosAlumnos(p) {
        this.viewGroup = p;
        this.updateGrupo();
        this.tomaDatosActualizados();
        this.selectGrupo = {};
        this.cleanImgStore()
        this.selectGrupo={} 
    },
    addgruposquema() {
      this.$set(
        this.grupos,
        this.datosNuevoGrupo.nombreGrupo,
        this.datosNuevoGrupo
      );
    },
    async updateGrupo() {
      try {
        const { id } = this.datosUsuario;
        let usuarioGruposRef = this.$fireStore.collection("usuarios").doc(id);
        await usuarioGruposRef.update({
          grupo: this.grupos
        });
      } catch (err) {
        console.log("Error al agregar el grupo nuevo " + err);
      }
    }
  },
  components: {
    grupoDetalles,
    subirImagen
  },
  created() {},
  watch: {
    urlimg() {
   
      if (this.urlimg && this.previewImg) {
        console.log("ejecuta watch urlimg de grupos");
        this.datosNuevoGrupo.urlImagen = this.urlimg;
        this.addgruposquema();
        this.dialog = false;
        this.updateGrupo();
        this.tomaDatosActualizados();
        this.cleanImgStore();
        this.datosNuevoGrupo = {};
      }
    }
  }
};