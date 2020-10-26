import { VueEditor } from "vue2-editor";
export default{
    data(){
        return {
            blogpost:[],
            editpost:{},
            edit:false,
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
            viewpost:false,
            vistapost:{}
        }
    },
    methods:{
      muestrapost(p){
        this.viewpost=true
        this.vistapost=p
      },
      editapost(t){
        this.edit=true
        this.editpost=t
      },
      async  cargabaseGral(){
        try {
            await this.$fireStore
              .collection(this.tipo)
              .get()
              .then((data) => {
                data.forEach((doc) => {
                  this.blogpost.push(doc.data());
                });
              });
          } catch (e) {
            console.log(e);
          }
        },
    async  cargabaseUser(){
        try { 
    await this.$fireStore
      .collection(this.tipo)  
      .where("user","==",this.userId)  
      .get()
      .then((data) => {
        data.forEach((doc) => {
          this.blogpost.push(doc.data());
        });
      });
          } catch (e) {
                console.log(e);
              }
            },
            async  cargabaseExclude(){
                try {
                    await this.$fireStore
                      .collection(this.tipo)
                      .where("user","!=",this.idexclude)
                      .get()
                      .then((data) => {
                        data.forEach((doc) => {
                          this.blogpost.push(doc.data());
                        });
                      });
                  } catch (e) {
                    console.log(e);
                  }
                }    
    },
    props:{
        tipo:{
            default:()=>{
                return 'BLOG'
            }
        },
        titulo:{
            default:()=>{
                return "titulo";
            }
        },
        linkmas:{
            default:()=>{
                return "#";
            }
        },
        subtitulos:{
            default:()=>{
                return "";
            }
        },
        userId:{
            type:String,
            default:""
        },
        idexclude:{
            type:String,
            default:""
        },
        addslot:{
            type:Boolean,
            default:false
        },
        imagen:{
          type:String,
          default:"true"
        }
    },
    components:{
      VueEditor
    },
    mounted(){
        if(this.userId==='' && this.idexclude===''){
            this.cargabaseGral()
        }
        if(this.userId){
            this.cargabaseUser()
        }
        if(this.idexclude){
            this.cargabaseExclude()    
        }

    }
}