import { VueEditor } from "vue2-editor";
import { format } from 'date-fns'
import { es } from 'date-fns/locale';
import InputTag from 'vue-input-tag';
import subirFile from "@/components/subirArchivo/subirArchivo.vue"
import subirImagen from "@/components/subirimagen/subirimagen.vue";
import Spinner from '~/components/spinner.vue'
import { mapState, mapActions, mapMutations } from "vuex";

var urlVistaCache="";

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
        urlRecurso: ["",""],
        tags:[],
        premium: false,
        recomendado: false,
        permisoadmin:true,
        },
        sinopsis:"",
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

        // REGLAS PARA FORMULARIO
      sinopsisReglas: [
        v => !!v || 'Sinopsis es requerido',
        v => (v && v.length <= 500) || 'Sinopsis debe tener menos de 500 caracteres',
      ],

      file: null,

      urlDescargable:"",
      urlVista:"",
      fileVista: null,
      fileDescargable: null,

      esUrlimgR: false,
      completado:false,



      tipoRecursoSelect: "",
      tiposRecursoList: ["link","file"],
    };
  },
  components: {
    VueEditor,
    InputTag,
    Spinner,
    subirFile,
    subirImagen
  },
  computed: {
    ...mapState(["urlimg", "datosUsuario"]),
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
      else if(this.subtipo === "materialdidactico")
        tipoM= "Editar material didactico";
      else if(this.subtipo === "hojatrabajo")
        tipoM= "Editar hoja de trabajo";
      else if(this.subtipo === "interactivo")
        tipoM= "Editar interactivo";
      else if(this.subtipo === "otro")
        tipoM= "Editar interactivo";
        
          
      return tipoM;
    }
  },
  methods: {
    ...mapMutations(["agregarCategorias","updateEditado",'almacenarFotoStorage']),
    




    async mostrarRecursoEdit(post){
      console.log(post)
      // console.log(this.tipo);
      let nombreFile = ""
      let nombreFile2 = ""
      let response = "";
      let data = "";
      let metadata = {};

      this.datosRecursoEdit = {...post};
      this.datosRecursoEdit.premium = !this.datosRecursoEdit.premium ? false : this.datosRecursoEdit.premium;
      this.datosRecursoEdit.recomendado = !this.datosRecursoEdit.recomendado ? false : this.datosRecursoEdit.recomendado;

      // console.log(this.datosRecursoEdit.tipoRecurso)

      if(this.datosRecursoEdit.tipoRecurso === "link")
      {
        this.tipoRecursoSelect = "link"
      }
      else{
        this.tipoRecursoSelect = "file"

      }
      // console.log(this.tipoRecursoSelect)


      // if(this.datosRecursoEdit.sinopsis)  
      //   this.sinopsis = this.datosRecursoEdit.sinopsis
      
      
      if(this.tipo === "RECOMENDACION")
        this.esBlog = true;
      else
        this.esBlog = false;

      this.editRecurso = true;
      // console.log(post);
     
      
    


    },
    modificarRecurso(){

      console.log("this.completado")
      console.log(this.completado)
      if(this.completado)
      {
        console.log(this.urlimg)
        if(this.urlimg !== "" && this.urlimg !== "none")
          this.datosRecursoEdit.urlImagen = this.urlimg

        console.log(this.datosRecursoEdit);
        // alert("altooo");
        let {idRecurso, titulo, contenido, edopost, tags, premium, sinopsis, recomendado, 
          urlVista, urlDescargable, materia, grado, urlImagen, permisoadmin} = this.datosRecursoEdit;
        // let permisoadmin = true;

        
  
        //SE OBTIENE EL RECURSO POR MEDIO DEL ID
        let usuarioRecursosRef =  this.$fireStore.collection("CATEGORIAS").doc(idRecurso);
  
        // if(this.datosRecursoEdit.tipoRecurso === "link")
        // {
        //   urlRecurso[1] = urlRecurso[0];
        // }
        
        //SE ACTUALIZA EN FIREBASE EL RECURSO SELECCIONADO
        if(this.subtipo === 'materialdidactico')
        {
          // console.log(urlDescargable)
          // console.log(urlVista)
          // alert("es material")
          urlVista = urlDescargable;
          // console.log(urlDescargable)
          // console.log(urlVista)
          // alert("es material")
        }
        usuarioRecursosRef.update({
          titulo, contenido, edopost,tags, premium, recomendado, sinopsis, urlVista, 
          urlDescargable, materia, grado, urlImagen, permisoadmin
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
                lista.sinopsis = sinopsis;
                lista.urlDescargable= urlDescargable;
                lista.urlVista= urlVista;
                lista.urlImagen= urlImagen;
                lista.materia= materia;
                lista.grado= grado;
                lista.permisoadmin = permisoadmin;
                this.updateEditado(lista);
                
              }
            })
            this.editRecurso = false;
            this.completado = false;

  
            // console.log("Despues de cambio this.listaR")
            // console.log(this.listaR)
            // alert("2")
  
   
        })
        .catch((error) => {
            console.error("ErroR al modifcar recurso: ", error);
        });
      }


    },

    cambioSelect(){
      console.log("Cambio de select")
      if(this.datosRecursoEdit.tipoRecurso === "link")
      {
        urlVistaCache = this.datosRecursoEdit.urlVista;
        this.datosRecursoEdit.urlVista = "";
      }else{
        this.datosRecursoEdit.urlVista = urlVistaCache;

      }
    },
    // cargaFinal(){
    //   const ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecursoEdit.foldercode}/`;
    //   this.completado = true;
    //   this.almacenarFotoStorage(ubi);
    // },

    validarFormularioRecursoEdit(){
      // console.log("revision")
      this.esRecursoEditValido =this.$refs.formRecursoEdit.validate();

      if(this.esRecursoEditValido && this.datosRecursoEdit.tags.length > 0)
      {
        this.tagsValido = true;
        this.msjTag = ""
        console.log("tags validos")
        
        const ubi = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecursoEdit.foldercode}/`;
        this.completado = true;
        this.almacenarFotoStorage(ubi);

        // this.almacenarFotoStorage(ubi);
        // this.modificarRecurso()
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
  watch: {
    async urlimg() {

      if(!this.esUrlimgR)
      {
        console.log("NO SE ESTA RESETEANDO")
        
        await this.modificarRecurso()


        
      }
      else{
        this.esUrlimgR = false; 
      }
    }
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
