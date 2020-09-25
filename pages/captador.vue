<template>
    <div>
       <h1>{{respuesta}}</h1>
        
        </div>
</template>
<script>
export default {
    data(){
        return{
            respuesta:"Esperando",
            recive:{}
        }
    },
    methods:{
    async captadatos(){
            var get=window.location.href
            var get1=get.split('?')

            var get2=get1[1].split('&')
                get2.map((k)=>{
                let rec=k.split("=")
                this.$set(this.recive,[rec[0]],rec[1])
                rec="" 
                })
                var code=parseInt(this.recive.code)
                const usuarioQuery =  this.$fireStore.collection('usuarios').where("codigocorreo","==",code)
                await  usuarioQuery.get()
               .then((querySnapshot) => {
                  querySnapshot.forEach((doc)=>{
                      console.log(doc.id)
                      //// actualizando datos
                      console.log(doc.id,"=>",doc.data())
                      this.respuesta="Actualizando Datos"
                     this.$fireStore.collection("usuarios").doc(doc.id).update({vercorre:true})
                      
                      setTimeout(()=>{
                          this.$router.push('/login')
                      },2000)
                  })
              })
              .catch(function(error) {
                  console.log("Error: ", error);
              });
            
        },
     init(){
      
        this.captadatos()
            
        }
    },
    mounted(){
        this.init()
    }
}
</script>