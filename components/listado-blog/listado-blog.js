export default{
    data(){
        return {
            blogpost:[]
        }
    },
    methods:{
      async  cargabase(){
        try {

        

            if(idexclude!==null){
                await 
                this.$fireStore
                .collection("publicaciones")
                .where("tipo","==",this.tipo)
                .where("edopost","==","publico")  
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                    this.blogpost.push(doc.data());
                    });
                });
            }else{
                await 
                this.$fireStore
                .collection("publicaciones")
                .where("tipo","==",this.tipo)
                .where("id","!==",idexclude)
                .where("edopost","==","publico")  
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                    this.blogpost.push(doc.data());
                    });
                });

            }
          } catch (e) {
            console.log(e);
          }
        },
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
        basedatos:"",
        linkmas:{
            default:()=>{
                return "#";
            }
        },
        subtitulos:{
            default:()=>{
                return "Subtitulo de sección disponible";
            }
        },
        idexclude:{
            default:()=>{
                return null
            }
        }
    },
    created(){
        this.cargabase()
    }
}