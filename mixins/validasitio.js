export default {
    methods:{
        validasitio(){
            let retur=false
            if(this.datapage){
            retur = this.$validasesion(this.$store.state,this.datapage)
            if(retur===false){
                this.$router.push('/')
            }
        }
        }
    },
    created(){
        this.validasitio()
    }
}