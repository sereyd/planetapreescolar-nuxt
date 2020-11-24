export default {
  data() {
    return {
      val: "",
      rango: [
        {
          text: "1",
          value: 1
        },
        {
          text: "2",
          value: 2
        },
        {
          text: "3",
          value: 3
        },
        {
          text: "4",
          value: 4
        },
        {
          text: "5",
          value: 5
        },
        {
          text: "6",
          value: 6
        },
        {
          text: "7",
          value: 7
        },
        {
          text: "8",
          value: 8
        },
        {
          text: "9",
          value: 9
        },
        {
          text: "10",
          value: 10
        }
      ]
    };
  },

  computed: {
    cargaValor() {
      var emival = this.val;

      return emival;
    },
 
  },
  methods: {
    inidata() {
      this.val = this.valor;
    },
    cambios() {
      this.$emit("respuesta", this.val);
    }
  },
  mounted() {
    this.inidata();
  },
  watch: {
    valor() {
      this.inidata();
    }
  },
  props: {
    tipo: "",
    valor: ""
  }
};
