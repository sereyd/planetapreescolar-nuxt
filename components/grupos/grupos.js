import { mapState, mapMutations, mapActions } from "vuex"
import grupoDetalles from "~/components/gruposDetalles/grupoDetalles.vue"
import subirImagen from "~/components/subirimagen/subirimagen.vue"

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
      viewGroup: false,
      guardar: 0
    };
  },
  computed: {
    ...mapState(["datosUsuario", "urlimg"]),
    listagrupos() {
      this.grupos = this.datosUsuario.grupo;
      return this.grupos;
    }
  },

  methods: {
    ...mapMutations([
      "alertconfig",
      "almacenarFotoStorage",
      "cleanImgStore",
      "tomaDatosActualizados"
    ]),
    gruposelect(p) {
      this.viewGroup = true;
      this.selectGrupo = p;
    },
    guardarGrupo() {
      this.guardar = 1;
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
        this.tomaDatosActualizados();
        this.datosNuevoGrupo = {};
        this.guardar = 0;
      }
    },
    GuardarCambiosAlumnos(p) {
      if (p === "gs" || p === "c") {
        this.viewGroup = false;
      }
      if (p === "gs" || p === "g") {
        this.updateGrupo();
        this.tomaDatosActualizados();
        this.cleanImgStore();
        var payload = {
          st: true,
          tp: "green",
          mensaje: "Cambios guardados"
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
      if (p === "gs" || p === "c") {
        this.selectGrupo = {};
      }
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
    viewGroup() {
      if (this.viewGroup === false) {
        this.selectGrupo = {};
      }
    },
    urlimg() {
      if (this.urlimg && this.previewImg !== "" && this.guardar === 1) {
        console.log("ejecuta watch urlimg de grupos");
        this.datosNuevoGrupo.urlImagen = this.urlimg;
        this.addgruposquema();
        this.dialog = false;
        this.updateGrupo();
        this.tomaDatosActualizados();
        this.cleanImgStore();
        this.datosNuevoGrupo = {};
        this.previewImg = "";
        this.guardar = 0;
      }
    }
  }
};