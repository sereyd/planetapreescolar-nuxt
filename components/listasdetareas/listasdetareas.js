export default{
    data(){
        return {
            respuesta:""
        }
    },

    methods:{
        actconducta(){
            this.datatrans==='buena' ? this.$emit('respuesta','mala') : this.$emit('respuesta','buena')
        }
    },
    props:{
        tipo:'',
        datatrans:{
            default:function () {
                var regresa=""
                switch(this.$props.tipo){
                    case 'conducta':
                        regresa='buena'
                    break;
                }
                return regresa
            }
        }
    }
}