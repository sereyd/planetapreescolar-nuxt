import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex'
import { format } from 'date-fns'
import { es } from 'date-fns/locale';
import InputTag from 'vue-input-tag';

export default {
  data() {
    return {
        listapost:[],

        editRecurso:false,

        //DATA DE FORMULARIO PARA EDITAR POST
        esRecursoEditValido: true,
        datosRecursoEdit:{
          // idRecurso:"",
        titulo: "",
        fecha: "",
        edopost: "",
        urlImagen: "",
        // user:"",
        contenido:"",
        tipoRecurso:"",
        urlRecurso:"",
        tags:[],
        premium: false,
        recomendado: false,
        },
        customToolbar: [
          [{ 'font': [] }],
          [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
          [{ 'header': 1 }, { 'header': 2 }],
          ['blockquote'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'video', 'formula'],
          [{ 'direction': 'rtl' }],
          ['clean'],
        ],

        esBlog: false,

        tagsValido: null,
        msjTag: "",
    };
  },
  components: {
    VueEditor,
    InputTag
  },
  computed: {
    ...mapState(['datosUsuario']),
    fechaVisual(payload){
      console.log(payload)
      // const fecha = format(payload, "dd 'de' MMMM 'de' yyyy", {locale: es});
      // console.log(fecha)
      //return (id) => this.itemById(id).description;
      return (payload) => format(payload, "dd 'de' MMMM 'de' yyyy", {locale: es});
    },
    tituloEditar(){
      let tipoM = "";
      if(this.subtipo === "reflexion")
        tipoM= "Editar reflexión";
      else if(this.subtipo === "memoria")
        tipoM= "Editar memoria";
      else if(this.subtipo === "blog")
        tipoM= "Editar blog";
      else if(this.subtipo === "planeacion")
        tipoM= "Editar planeación";
      else if(this.subtipo === "recurso")
        tipoM= "Editar recurso";
          
      return tipoM;
    }
  },
  methods: {
    async cargaPost() {
    // console.log(this.tipo)
    // console.log(this.$store.state.datosUsuario.id)
    let datos = {};
      
      try {
        // const usuarioQuery =  this.$fireStore.collection('usuarios').where("correo", "==", user.email);

        // console.log(this)
        // console.log(this.$fireStore)
   
        await this.$fireStore
          .collection(this.tipo)
          .where("idCreador", "==",this.datosUsuario.id)
          // .where("tipo","==",this.tipo)  
          .get()
          .then((data) => {
            data.forEach((doc) => {
              let data = doc.data();
              data.tags = data.tags ? data.tags : [];
              data.favoritos = data.favoritos ? data.favoritos : [];
              delete data['idRecurso'];


              datos = {
                idRecurso: doc.id,
                ...data
              }

              this.listaR.push(datos);
                // console.log("Carga tipo: "+this.tipo)
                // console.log(doc.data())
              // this.listaR.push(doc.data());
            });
            // console.log(this.listaR)
          });
      } catch (e) {
        console.log(e);
      }

  
    },


    mostrarRecursoEdit(post){
      console.log(post)
      console.log(this.tipo);
      if(this.tipo === "RECOMENDACION")
        this.esBlog = true;
      else
        this.esBlog = false;

      this.editRecurso = true;
      // console.log(post);
      this.datosRecursoEdit = {...post};
      this.datosRecursoEdit.premium = !this.datosRecursoEdit.premium ? false : this.datosRecursoEdit.premium;
      this.datosRecursoEdit.recomendado = !this.datosRecursoEdit.recomendado ? false : this.datosRecursoEdit.recomendado;
      // console.log(this.datosRecursoEdit)
      // console.log(this.tipo)


    },
    modificarRecurso(){

      console.log(this.datosRecursoEdit);
      // alert("altooo");
      const {idRecurso, titulo, contenido, edopost, tags, premium, recomendado} = this.datosRecursoEdit;
      

      //SE OBTIENE EL RECURSO POR MEDIO DEL ID
      let usuarioRecursosRef =  this.$fireStore.collection("CATEGORIAS").doc(idRecurso);
      
      //SE ACTUALIZA EN FIREBASE EL RECURSO SELECCIONADO
      usuarioRecursosRef.update({
        titulo, contenido, edopost,tags, premium, recomendado
      })
      .then(() => {
          // console.log(this.grupo);
          // alert("paso 1")
          // this.$router.push('/publicaciones')
          //ACTUALIZAR RECURSO LISTAR DE PROPS
          // console.log("Antes de cambio this.listaR")
          // console.log(this.listaR)
          // alert("1")
          this.listaR.map( (lista) => {
            // console.log(lista.id +"==="+ id)
            // console.log(lista)
            if(lista.idRecurso === idRecurso)
            {
              lista.titulo = titulo;
              lista.contenido = contenido ;
              lista.edopost = edopost;
              lista.tags = tags;
              lista.premium = premium;
              lista.recomendado = recomendado;
              
            }
          })
          this.editRecurso = false;

          // console.log("Despues de cambio this.listaR")
          // console.log(this.listaR)
          // alert("2")

 
      })
      .catch((error) => {
          console.error("ErroR al modifcar recurso: ", error);
      });

    },
    validarFormularioRecursoEdit(){
      // console.log("revision")
      this.esRecursoEditValido =this.$refs.formRecursoEdit.validate();

      if(this.esRecursoEditValido && this.datosRecursoEdit.tags.length > 0)
      {
        this.tagsValido = true;
        this.msjTag = ""
        console.log("tags validos")
        this.modificarRecurso()
      }

      if(this.datosRecursoEdit.tags.length === 0)
      {
        this.tagsValido = false;
        console.log("tags NO validos")

        this.msjTag = "Necesita agregar por lo menos un tag"
      }
      
        // console.log("biennnn")
    }
  },
  mounted() {
    // console.log("this.listaR")
    // console.log(this.listaR)
    // alert("cargando ListaR")
    // this.cargaPost();

  },
  props: {
    tipo: {
      type: String,
      default: "BLOG"
    },
    subtipo: {
      type: String,
      default: "BLOG"
    },
    listaR:{
      type: Array,
      default: () => []
    }
  }
};
