import {mapState, mapActions, mapMutations } from 'vuex'
export default {
    data(){
        return {
            seccion:"",
            gralconfig:{},
            alerta:false,
            headerpagos:[
                {
                    text:'Moneda',
                    value:'codigo'
                },
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
            tiponewpago:"",

            pais: [
                { text: 'México', value:"mexico" },
                { text: 'Estados Unidos', value:"estadosunidos" },
                { text: 'Argentina', value:"argentina" },
                { text: 'Chile', value:"chile" },
                // { text: 'State 5' },
                // { text: 'State 6' },
                // { text: 'State 7' },
            ],
            paisSeleccionado:"",
            arraySeleccionado:[],
            modoprueba: false,
        }
    },
    computed:{
        ...mapState(['configAll'])
    },
    created(){
        this.gralconfig={...this.configAll}
        if(this.configAll.pagos.stripe.modoprueba)
        {
            this.paisSeleccionado= "mexico";
            this.arraySeleccionado= [...this.configAll.pagos.stripe.idpagosS.mexico];
            this.modoprueba= true;
        }
        else
        {
            this.modoprueba= false;
        }
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
                // if(this.modoprueba)
                // {
                    if(t === "stripe")
                    {
                        var indexdelete=this.gralconfig.pagos[t].idpagosS[this.paisSeleccionado].indexOf(p)
                        this.gralconfig.pagos[t].idpagosS[this.paisSeleccionado].splice(indexdelete,1)
                    }
                    else
                    {
                        var indexdelete=this.gralconfig.pagos[t].idpagos.indexOf(p)
                        this.gralconfig.pagos[t].idpagos.splice(indexdelete,1)
                    }
                // }
                // else
                // {
                //     var indexdelete=this.gralconfig.pagos[t].idpagos.indexOf(p)
                //     this.gralconfig.pagos[t].idpagos.splice(indexdelete,1)
                // }
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
                console.log(this.paisSeleccionado)
                console.log(this.tiponewpago)
                console.log(this.newdata)
                console.log(this.modoprueba)


                // console.log(this.gralconfig.pagos[this.tiponewpago].idpagosS[this.paisSeleccionado])

                // if(this.modoprueba)
                // {
                    console.log(this.modoprueba)
                    if(this.tiponewpago === "stripe")
                    {
                        this.newdata.status = true;
                        this.newdata.codigo = this.gralconfig.pagos[this.tiponewpago].idpagosS[this.paisSeleccionado][0].codigo;
                        console.log(this.gralconfig.pagos[this.tiponewpago].idpagosS[this.paisSeleccionado])
                        this.gralconfig.pagos[this.tiponewpago].idpagosS[this.paisSeleccionado].push(this.newdata)
                        console.log(this.gralconfig.pagos[this.tiponewpago].idpagosS[this.paisSeleccionado])
                        this.newdata={}
                        this.tiponewpago=""
                        this.newpay=false
                    }
                    else
                    {
                        this.gralconfig.pagos[this.tiponewpago].idpagos.push(this.newdata)
                        this.newdata={}
                        this.tiponewpago=""
                        this.newpay=false
                    }
                // }
                // else
                // {
                //     this.gralconfig.pagos[this.tiponewpago].idpagos.push(this.newdata)
                //     this.newdata={}
                //     this.tiponewpago=""
                //     this.newpay=false
                // }

              
            }
       
    },
    watch:{
        paisSeleccionado(){
          const {idpagosS} = this.configAll.pagos.stripe
    
          this.arraySeleccionado =  this.paisSeleccionado === "mexico" ? idpagosS.mexico :
          this.paisSeleccionado === "argentina" ? idpagosS.argentina :
          this.paisSeleccionado === "estadosunidos" ? idpagosS.estadosunidos : idpagosS.chile;
          // console.log(array);
          
    
    
        }
    }
}   