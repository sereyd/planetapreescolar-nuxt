    export default {
        data(){
            return{
    
            }
        },
        created(){
        this.autenticarUsuario()
        .then((data)=>{
          setTimeout(()=>{
             this.validsesion=false
          },2500)
          
        })
      }
    }