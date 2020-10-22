export default{
    data(){
        return {
            blogpost:[]
        }
    },
    methods:{
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