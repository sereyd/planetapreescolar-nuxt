export default {
    data(){
        return {
            dialogDes:false,
            validConfigD: false,  //DATA PARA VALIDAR EL FORMULARIO CONFIG DESCARGAS
            editDescargasConf:{
                free:0,
                mensual:0,
                trimestral:0,
                semestral:0,
                anual:0,
            },

        }
    },
    methods:{
        abrirConfigD(){
            this.dialogDes = true;
            this.editDescargasConf = {...this.descargasConf};
        },
        validateConfDes () {
            const vd = this.$refs.formConfigDes.validate();
            this.validConfigD = vd;
            if(this.validConfigD)
            //   this.crearUsuario()
            this.editarConfigDescargas()
            // console.log("todo OK")
        },
    }
}