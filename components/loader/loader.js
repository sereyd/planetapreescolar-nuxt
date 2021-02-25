import { mapActions } from "vuex";
export default {
  data() {
    return {
      validsesion: true
    };
  },
  methods: {
    ...mapActions(["autenticarUsuario"])
  },
  mounted() {
    this.$nextTick(() => {
      this.autenticarUsuario().then((data) => {
       setTimeout(()=>{this.validsesion=false},2000)
      });
    });
  }
};
