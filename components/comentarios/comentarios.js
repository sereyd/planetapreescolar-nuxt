
import { mapState, mapMutations, mapActions } from 'vuex'

// import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus'
// import { stripeKey, stripeOptions } from './stripeConfig.json'
// import { Card, CardNumber, CardExpiry, CardCvc, createToken, confirmCardPayment, handleCardPayment } from 'vue-stripe-elements-plus'
import Spinner from '~/components/spinner.vue'

// import { StripeCheckout } from 'vue-stripe-checkout';

 
export default {
  data () {
    return {

        esComentarioValido: true,
        comentarios:[],
        datosComentario:{
          idUsuario:"",
          comentario:"",
          nombreUsuario:"",
          urlImagen:"",
          // valido: false,
        },
        comentariosVistos: 2,
        
    }
  },
  computed:{
    ...mapState(['datosUsuario']),
    
  },
  components:{Spinner},

  mounted() {
      this.masComentarios("null");
  },
 
  methods: {
    ...mapMutations(['']),
    
    //  METODOS PARA COMENTARIOS
    async agregarComentario(){
        const {id, nombre, apellido, urlImagen} = this.datosUsuario;
        let comentarios = [];
        
        this.datosComentario.idUsuario = id;
        this.datosComentario.nombreUsuario = `${nombre} ${apellido}`;
        this.datosComentario.urlImagen = urlImagen;
        //OBTENEMOS EL ID DEL RECURSO (MEMORIA, RELFEXION, RECOMENDACION, ETC)
        const {idRecurso} = this.post;
        this.post.comentarios.push({...this.datosComentario});
        // this.post.comentarios.push({...this.datosComentario});

        //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
        let recursoComentariosRef = this.$fireStore.collection("CATEGORIAS").doc(idRecurso);
        
        //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
        recursoComentariosRef.update({
            comentarios: [...this.post.comentarios]
        })
        .then(() => {

        // this.notificacionComentario({...this.datosComentario, idRecurso})
        this.datosComentario.idUsuario = "";
        this.datosComentario.nombreUsuario = "";
        this.datosComentario.urlImagen = "";
        // this.datosComentario.comentario = "";
        // this.esComentarioValido = true;
        this.$refs.formComentario.reset();

        // console.log("reset data")

        })
        .catch((error) => {
            console.error("ErroR al agregar nuevo comentario: ", error);
        });

    },
    validarFormularioComentario(){
        // console.log("revision")
        this.esComentarioValido =this.$refs.formComentario.validate();
        if(this.esComentarioValido)
        this.agregarComentario();
        // console.log("biennnn")
    },
    masComentarios(data){
        // console.log(data)

        if(data === "mas")
            this.comentariosVistos += 2;
        else if(data === "menos")
            this.comentariosVistos -= 2;


        this.comentarios = [...this.post.comentarios.slice(0,this.comentariosVistos)];
        // .slice(0,4);


    },

  },
    props:{
        
        post:{
        type: Object,
        default: () => {}
        },
        
    },
}



