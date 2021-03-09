import {mapState,mapActions,mapMutations} from 'vuex'

export default {

    data(){
        return {
             editSus:{
                 diasPrueba:0,
             },
             mensajeres:"",
             validConfigSus: false,
             dialogcupones: false,
             secretkey: "",
             apikeystripe:"",
             stripeAPI:null,

             //formulario
             tituloCupon: "Cupones de stripe",
             dialogEditarCupon:false,
             validCuponE:false,
             dialogCrearCupon:false,
             validCuponC:false,
             cuponEditable:{
                 name:"",
                 percent_off:0,
                 max_redemptions:0,
                 productos:[],
             },

             //data table 
             headers: [
                {
                  text: 'Código',
                  align: 'start',
                  sortable: false,
                  value: 'id',
                },
                { text: 'Nombre', value: 'name',align: 'center'},
                { text: '%', value: 'percent_off',align: 'center'},
                { text: 'cantidad', value: 'max_redemptions',align: 'center'},
                {
                    text:'xx',
                    value:'actions',
                    sortable: false
                },
                // { text: 'Protein (g)', value: 'protein' },
            ],
             listaCupones:[],
             urlAPI:"",
             planes:[],

             //REGLAS DE VALIDACION
            cantidadReglas: [
                v => !!v || 'cantidad es requerido',
                v =>  (v > 0) || 'la cantidad no puede ser menor a 1'
            ],
            porcentajeReglas: [
                v => !!v || 'procentaje es requerido',
                v =>  (v > 0 && v < 101) || 'el porcentaje válido: (1 a 100)'
            ],
        }
    },
    computed:{
        ...mapState(['configAll','descargasConf','configAll'])
    },
    created(){
           
        const {
            pruebagratuita, modoprueba,secretkeytest,
            secretkeyprod, apikeytest, apikeyprod,idpagos,
            idproductos
        } 
        = this.configAll.pagos.stripe;

        this.apikeystripe= modoprueba === true ? apikeytest : apikeyprod;
        
        this.editSus.diasPrueba = pruebagratuita;
        this.secretkey = modoprueba === true ? secretkeytest : secretkeyprod;
        this.planes = modoprueba === true ? idproductos.test : idproductos.prod;
        // idpagos.map( pago => {
        //     if(modoprueba)
        //         this.planes.push({text: pago.tipo, value: pago.idtest})
        //     else
        //         this.planes.push({text: pago.tipo, value: pago.idprod})

        // })
        // this.planes = idpagos;
        
        // this.obtenerCupones();
        this.urlAPI = this.configAll.pagos.stripe.modoprueba===true ? this.configAll.pagos.stripe.apiUrltest : this.configAll.pagos.stripe.apiUrlprod
        // this.urlAPI = "http://localhost:4242";

    },
    methods:{
        ...mapMutations(['actualizarConfigDescargas','cambiaLoading']),
        async obtenerCupones(){
            
            try {
                if(this.listaCupones.length === 0)
                {
                    const json = await fetch(this.urlAPI+"/obtenerCuponesStripe");
                    const res = await json.json()
                    this.listaCupones = res.data
                }
                
                // console.log(this.listaCupones);
                this.dialogcupones = true;
                
            } catch (error) {
                console.log(error)
            }

        },
        
        async crearCupon() {

            try {
                
                const json =await fetch(this.urlAPI+"/crearCuponStripe", {
                     method: "POST",
                     headers: {
                         "Content-Type": "application/json",
                         'Access-Control-Allow-Origin': '*',
                     },
                     body: JSON.stringify(this.cuponEditable),
                })
                const res = await json.json();
                // console.log(res);

                this.cuponEditable={ name:"",percent_off:0,max_redemptions:0,productos:[]};
                this.tituloCupon = "Cupones de stripe"
                this.dialogEditarCupon = false;
                // const {id, name, percent_off, max_redemptions,code} = res.cupon
                this.listaCupones.push(res.cupon);
            } catch (error) {
                console.log(error);
                
            }
        },

        async eliminarCupon(cupon){


            // console.log(cupon)
            if (confirm("¿Deseas eliminar este cupón?") === true) {

                try {
                    
                    const json =await fetch(this.urlAPI+"/eliminarCupon", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify(cupon.coupon),
                    })
                    const res = await json.json();
                    // console.log(res);
                    const {id} = res.cuponD;
                    this.listaCupones = this.listaCupones.filter( cup => cup.coupon.id !== id)
                    // console.log(this.listaCupones)
                } catch (error) {
                    console.log(error);
                    console.log("error al eliminar cupon");
                    
                }
            }
        },



        abrirVentanaCupon (cupon) {
            // console.log(cupon);
            
            this.cuponEditable={
                name:"",
                max_redemptions:0,
                percent_off:0,
                productos:[],
            }
            this.tituloCupon = "Crear cupón"
            this.dialogEditarCupon = true;
        },
        backListadoC(){
            this.tituloCupon = "Cupones de stripe"
            this.dialogEditarCupon = false;
        },
        validarFormularioCupones() {
            const vd = this.$refs.formCuponE.validate();
            // console.log('validando formulario')
            // console.log(vd)
            this.validCuponE = vd;

            if(this.validCuponE)
                this.crearCupon();
        },
        
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