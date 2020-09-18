export default{
    data(){
        return {
            blogpost:[
                {
                    imagen:"",    
                    titulo:"Cargando 1",
                    subtitulo:"Cargando Subtitulo 1",
                    grado:"Cargando Grado"
                },
                {
                    imagen:"",
                    titulo:"Cargando 2",
                    subtitulo:"Cargando Subtitulo 2",
                    grado:"Cargando Grado"
                },
                {
                    imagen:"",
                    titulo:"Cargando 3",
                    subtitulo:"Cargando Subtitulo 3",
                    grado:"Cargando Grado"
                },
                {
                    imagen:"",
                    titulo:"Cargando 4",
                    subtitulo:"Cargando Subtitulo 4",
                    grado:"Cargando Grado"
                }
            ]
        }
    },
    methods:{
      async  cargabase(){
            if(this.basedatos!==''){
                await this.$fireStore.collection(this.basedatos).get()
                .then((snapshot) => {
                    console.log(snapshot)
                 
                })
                .catch((err) => {
                  console.log('No existe la base de datos', err);
                });
            }
        },
    },
    props:{
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
        }
    },
    created(){
        this.cargabase()
    }
}