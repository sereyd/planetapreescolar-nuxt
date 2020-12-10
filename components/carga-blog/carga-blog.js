import { VueEditor } from "vue2-editor";
import { format } from 'date-fns'
import { es } from 'date-fns/locale';
import InputTag from 'vue-input-tag';
import { mapState, mapActions, mapMutations } from "vuex";


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


      ubiWP:"",

      completadoW: false,
      cargandoW: false,
      porcentajeW: 0,
      fileWord:null,


      completadoP: false,
      cargandoP: false,
      porcentajeP: 0,
      filePDF:null,

      completadoF: false,
      cargandoF: false,
      porcentajeF: 0,
      file:null,

      changeFile1: false,
      changeFile2: false,

      tipoRecursoSelect: "",
      tiposRecursoList: ["link","file"],
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
    ...mapMutations(["agregarCategorias","updateEditado"]),
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




    async mostrarRecursoEdit(post){
      console.log(post)
      console.log(this.tipo);
      let nombreFile = ""
      let nombreFile2 = ""
      let response = "";
      let data = "";
      let metadata = {};

      // if(this.datosRecursoEdit.sinopsis)  
      //   this.sinopsis = this.datosRecursoEdit.sinopsis
      
      
      if(this.tipo === "RECOMENDACION")
        this.esBlog = true;
      else
        this.esBlog = false;

      this.editRecurso = true;
      // console.log(post);
      this.datosRecursoEdit = {...post};
      this.datosRecursoEdit.premium = !this.datosRecursoEdit.premium ? false : this.datosRecursoEdit.premium;
      this.datosRecursoEdit.recomendado = !this.datosRecursoEdit.recomendado ? false : this.datosRecursoEdit.recomendado;
      
        
      if(this.datosRecursoEdit.tipo === "planeacion")
      {
        this.filePDF=null;
        this.fileWord=null;

        if(this.datosRecursoEdit.urlRecurso.length === 0)
        {
          this.datosRecursoEdit.urlRecurso[0] = ""
          this.datosRecursoEdit.urlRecurso[1] = ""
        }
        else{

          console.log(this.datosRecursoEdit.urlRecurso)

          if(this.datosRecursoEdit.urlRecurso[0] !== 'none' && this.datosRecursoEdit.urlRecurso[0] !== "")
          {

            response = await fetch(this.datosRecursoEdit.urlRecurso[0]);
            data = await response.blob();
            metadata = {
              type: 'application/vnd.openxmlformats-officedocument.word'
            };
            this.fileWord = new File([data], "word.docx", metadata);
          }

          if(this.datosRecursoEdit.urlRecurso[1] !== 'none' && this.datosRecursoEdit.urlRecurso[1] !== "")
          {
            response = await fetch(this.datosRecursoEdit.urlRecurso[1]);
            data = await response.blob();
            metadata = {
              type: 'application/pdf '
            };
            this.filePDF = new File([data], "pdf.pdf", metadata);
          }


        }
      }else if (this.datosRecursoEdit.tipo === "recurso")
      {
        this.tipoRecursoSelect = this.datosRecursoEdit.tipoRecurso !== "link" ? "file": "link";
        // this.datosRecursoEdit.urlRecurso[1] = this.datosRecursoEdit.urlRecurso[0];
        if(this.datosRecursoEdit.urlRecurso[0] !== 'none' && 
        this.datosRecursoEdit.urlRecurso[0] !== "" && 
        this.datosRecursoEdit.tipoRecurso !== "link")
          {

            response = await fetch(this.datosRecursoEdit.urlRecurso[0]);
            data = await response.blob();

            console.log(data)
            const res = data.type.split("/");
            const typeFile = res[1];
            const nombreFile = this.datosRecursoEdit.titulo+'.'+typeFile;
            metadata = {
              type: data.type
            };
            this.file = new File([data], nombreFile, metadata);
          }
          

      }


    },
    modificarRecurso(){

      console.log(this.datosRecursoEdit);
      // alert("altooo");
      let {idRecurso, titulo, contenido, edopost, tags, premium, sinopsis, recomendado, urlRecurso, materia, grado} = this.datosRecursoEdit;
      

      //SE OBTIENE EL RECURSO POR MEDIO DEL ID
      let usuarioRecursosRef =  this.$fireStore.collection("CATEGORIAS").doc(idRecurso);

      if(this.datosRecursoEdit.tipoRecurso === "link")
      {
        urlRecurso[1] = urlRecurso[0];
      }
      
      //SE ACTUALIZA EN FIREBASE EL RECURSO SELECCIONADO
      usuarioRecursosRef.update({
        titulo, contenido, edopost,tags, premium, recomendado, sinopsis, urlRecurso, materia, grado
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
              lista.urlRecurso= urlRecurso;
              lista.materia= materia;
              lista.grado= grado;
              this.updateEditado(lista);
              
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

    async changeFile(){
      this.ubiWP = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecursoEdit.foldercode}/`;

      console.log("UBICACION")
      console.log(this.ubiWP)

      
      let file =  this.file;
      let typeFileFull = ""
      let metadata = {};
      console.log(file)
      
      if(file)
      {
        
        this.completadoF = false;
        this.cargandoF= true;
        this.porcentajeF = 0;
        typeFileFull = file.type;
        console.log(typeFileFull)
        metadata = {
        contentType: typeFileFull
        };
      }

      // file = null;

      //VERIFICAR QUE EXISTA ARCHIVO PARA SUBIR
      if(file){
        console.log("FILE VALIDO")
          try {
              //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

              let storageRef = this.$fireStorage.ref(this.ubiWP);
              let uploadTask = storageRef.child("file_"+this.datosRecursoEdit.foldercode).put(file, metadata);

              await uploadTask.on('state_changed', // or 'state_changed'
              (snapshot) => {
                  this.porcentajeF = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );

              },(error) => {
                  console.log("ERROR")
                  console.log(error)
              }, () => {
                  uploadTask.snapshot.ref.getDownloadURL()
                  .then( async(downloadURL) => {
                      this.datosRecursoEdit.urlRecurso[0] = downloadURL;
                      this.datosRecursoEdit.urlRecurso[1] = downloadURL;
                      console.log('File available at', downloadURL);
                      console.log('URLFILE', this.datosRecursoEdit.urlRecurso);
                      this.cargandoF = false;
                  });
              });

          } catch (error) {
              console.log(error)
          }
      }

    },

    async changeWord(){

      
      this.ubiWP = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecursoEdit.foldercode}/`;

      console.log("UBICACION")
      console.log(this.ubiWP)

      
      let file =  this.fileWord;
      console.log(file)
      
      if(file)
      {
        
        this.completadoW = false;
        this.cargandoW = true;
        this.porcentajeW = 0;
        const typeFileFull = file.type;
        console.log(typeFileFull)
        const metadata = {
        contentType: typeFileFull
        };
      }

      // file = null;

      //VERIFICAR QUE EXISTA ARCHIVO PARA SUBIR
      if(file){
        console.log("FILE VALIDO")
          try {
              //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

              let storageRef = this.$fireStorage.ref(this.ubiWP);
              let uploadTask = storageRef.child("word_"+this.datosRecursoEdit.foldercode).put(file, metadata);

              await uploadTask.on('state_changed', // or 'state_changed'
              (snapshot) => {
                  this.porcentajeW = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );

              },(error) => {
                  console.log("ERROR")
                  console.log(error)
              }, () => {
                  uploadTask.snapshot.ref.getDownloadURL()
                  .then( async(downloadURL) => {
                      this.datosRecursoEdit.urlRecurso[0] = downloadURL;
                      console.log('File available at', downloadURL);
                      console.log('URLFILE', this.datosRecursoEdit.urlRecurso);
                      this.cargandoW = false;
                  });
              });

          } catch (error) {
              console.log(error)
          }
      }
    },

    async changePDF(){

      
      this.ubiWP = `${this.subtipo}/${this.datosUsuario.id}/${this.datosRecursoEdit.foldercode}/`;

      console.log("UBICACION")
      console.log(this.ubiWP)

      
      let file =  this.filePDF;
      console.log(file)
      if(file)
      {
        
        this.completadoP = false;
        this.cargandoP = true;
        this.porcentajeP = 0;
        const typeFileFull = file.type;
        console.log(typeFileFull)
        const metadata = {
        contentType: typeFileFull
      }
      };

      if(file){
      try {
          //SE AGREGA LA FOTO AL STORAGE DE FIREBASE

          let storageRef = this.$fireStorage.ref(this.ubiWP);
          let uploadTask = storageRef.child("pdf_"+this.datosRecursoEdit.foldercode).put(file, metadata);

          await uploadTask.on('state_changed', // or 'state_changed'
          (snapshot) => {
              this.porcentajeP = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );

          },(error) => {
              console.log("ERROR")
              console.log(error)
          }, () => {
              uploadTask.snapshot.ref.getDownloadURL()
              .then( async(downloadURL) => {
                  this.datosRecursoEdit.urlRecurso[1] = downloadURL;
                  console.log('File available at', downloadURL);
                  console.log('URLFILE', this.datosRecursoEdit.urlRecurso);
                  this.cargandoP = false;
              });
          });

      } catch (error) {
          console.log(error)
      }
      }

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
