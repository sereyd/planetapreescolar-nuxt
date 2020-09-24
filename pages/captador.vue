<template>
    <div>
        {{respuesta}}
        {{recive}}
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
        captadatos(){
            var get=window.location.href
            var get1=get.split('?')

            var get2=get1[1].split('&')
                get2.map((k)=>{
                let rec=k.split("=")
                this.$set(this.recive,[rec[0]],rec[1])
                rec="" 
                })


        },
        validandoRespuesta(res){
            console.log(res)
        },
        async init(){
            await this.captadatos()
            await this.validandoRespuesta(this.recive)
        }
    },
    mounted(){
        this.init()
    }
}
</script>