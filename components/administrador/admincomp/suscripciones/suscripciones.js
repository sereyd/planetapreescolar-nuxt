import {mapState,mapActions,mapMutations} from 'vuex'

export default {

    data(){
        return {
             editSus:{
                 diasPrueba:0,
             },
             mensajeres:"",
             validConfigSus: false,
        }
    },
    computed:{
        ...mapState(['configAll','descargasConf'])
    },
    created(){
            this.editSus.diasPrueba=this.configAll.pagos.stripe.pruebagratuita
    },
    methods:{
        ...mapMutations(['actualizarConfigDescargas','cambiaLoading']),
        validateConfSus () {
            const vd = this.$refs.formConfigSus.validate();
            this.validConfigSus = vd;
            if(this.validConfigSus)
            this.editarConfigSuscripciones()
        },
        editarConfigSuscripciones(){
            const {idCAll} = this.configAll;
            let {pagos} = this.configAll;
            // console.log(this.descargasConf);
            // console.log(this.editDescargasConf);
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let descargasFreeRef = this.$fireStore.collection("ConfiguracionGeneral").doc(idCAll);
            
             pagos.stripe.pruebagratuita = this.editSus.diasPrueba

            //  console.log(pagos.stripe);
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
            descargasFreeRef.update({
                pagos
                // ...this.configAll
            })
            .then(() => {
          //    console.log("UPDATE CONFIGURACION DE            this.actualizarConfigDescargas(this.editDescargasConf);
            //   console.log(datos)
            //   console.log(this.descargasConf)
   
              this.mensajeres="Cambio Realizado"
              setTimeout(()=>{ this.mensajeres="" },3000)
        
            })
            .catch((error) => {
                console.error("ErroR al actualizar descargas: ", error);
                this.mensajeres="Error al actualizar descargas"
                setTimeout(()=>{ this.mensajeres="" },3000)
            });
        }
    }
}