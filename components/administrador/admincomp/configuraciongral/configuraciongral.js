import {mapState, mapActions, mapMutations } from 'vuex'
export default {
    data(){
        return {
            seccion:"",
            gralconfig:{},
            alerta:false,
            headerpagos:[
                {
                    text:'Tipo',
                    value:'tipo'
                },
                {
                    text:'Monto',
                    value:'monto'
                },
                {
                    text:'Clave Producción',
                    value:'idprod'
                },
                {
                    text:'Clave Prueba',
                    value:'idtest'
                },
                {
                    text:'status',
                    value:'status'
                },
                {
                    text:'edit',
                    value:'edit'
                }
            ],
            newedit:false,
            newdata:{},
            newpay:false,
            regpago:{},
            tiponewpago:""
        }
    },
    computed:{
        ...mapState(['configAll'])
    },
    created(){
        this.gralconfig={...this.configAll}
    },
    methods:{
        ...mapMutations(['cargaConfiGral']),
        async guardarCambios(){
              await  this.$fireStore.collection('ConfiguracionGeneral')
                    .doc(this.configAll.idCAll).update(this.gralconfig)
                    .then((data)=>{
                        console.log('***Guardado***')
                        console.log(data)
                        this.cargaConfiGral(this.gralconfig)
                        this.alerta=false
                    })
            },
            deletelist(p,t){
                var indexdelete=this.gralconfig.pagos[t].idpagos.indexOf(p)
                this.gralconfig.pagos[t].idpagos.splice(indexdelete,1)
            },
            editarpago(p){
               this.regpago=p
               this.newedit=true
            },
            addnewpago(p){
                this.newpay=true
                this.tiponewpago=p
            },
            guardarPagoAr(p)
            {
              this.gralconfig.pagos[this.tiponewpago].idpagos.push(this.newdata)
              this.newdata={}
              this.tiponewpago=""
              this.newpay=false
            }
       
        }
}   