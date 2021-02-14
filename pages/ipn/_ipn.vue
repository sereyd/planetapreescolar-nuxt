<template>
    <v-main>
        <div>
            {{query}}
        </div>
    </v-main>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {addMonths} from 'date-fns';

export default {
    
    
    data(){
        return{
            query:{},
            external_reference:"",
        }
    },
    // created() {
    //     console.log("dhshdhjs")
    //     this.query = this.$route.query;
    //     const {id, topic, } = this.query;

    //     // this.external_reference = this.$route.query;
    //     console.log(this.query)
    //     console.log(id)
    //     console.log(topic)
    //     // if(topic === "payment")
    //     this.obtenerClienteMP(id);

    //     // const idp =  
    // },
    async created() {
        //console.log(this.$fireStore);
        this.query = this.$route.query;
        //const {id, topic, } = this.query;

        // this.external_reference = this.$route.query;
        console.log(this.query)
        const datos={
          idPago: this.query['data.id'],
          type: this.query.type,
        }
        //console.log(this.$route.query)
        //console.log(this.$route.body)
        // if(topic === "payment")
        this.obtenerClienteMP(datos);

        // const idp =  
    },
    computed:{
    ...mapState(['datosUsuario','dominio','urlAPI']),

    },
    methods: {
        ...mapMutations(['guardaDatosUsuarioStore','updateDescargasPreMP']),
        obtenerClienteMP(data){
            console.log(data)

            
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
            console.log("this.urlAPI")
            console.log(this.urlAPI)


            fetch(this.urlAPI+"/estado-pago",config)
            .then((result)=>{
                console.log(result)

                return result.json()
            })
            .then(async(suscripcion)=>{
        
                console.log(suscripcion)
                if(suscripcion.error)
                {
                   try {
                        await this.$fireStore.collection('error').add({id:123});
                    } catch (error) {
                        console.log("error al agregar error")
                        console.log(error)
                    }
                }
                else{
                    let idPago;
                    let objPago;

                    console.log(suscripcion.response)
                    const {collector_id,date_created,description,
                    external_reference,id,operation_type,payer,payment_method_id,
                    transaction_amount,status,status_detail,} = suscripcion.response;
                    // const iduser = "jsjdhsdkds";
                    const medio = "MercadoPago";

                    //OBETNEMOS EL PAGO QUE SE COMENZO
                    console.log(external_reference)
                    const pagosRef = await this.$fireStore.collection('pagos');

                    const queryRef = await pagosRef.where('external_reference', '==', external_reference).get();
                    // .where("external_reference", "==", external_reference ).get();

                    console.log(queryRef)
                    console.log(queryRef.docs)
                    queryRef.docs.forEach(doc=>{
                        idPago = doc.id;
                        
                        objPago = {...doc.data() }
                    });
                    console.log("objPago")
                    console.log(objPago)

                    objPago.collector_id = collector_id;
                    objPago.id = id;
                    objPago.operation_type = operation_type;
                    objPago.payer = payer;
                    objPago.payment_method_id =payment_method_id;
                    objPago.status = status;
                    objPago.status_detail = status_detail;

                    
                    try {
                        console.log(objPago)
                        // await this.$fireStore.collection('error').add({id:123});
                        // await this.$fireStore.collection('pagos').add(pago);
                        await this.$fireStore.collection('pagos').doc(idPago).update(objPago)
                    } catch (error) {
                         console.log("error al agregar pago")
                        console.log(error)
                    }

                   
                }
            })
            .catch((err)=>{
                console.log('Error al verificar suscripción', err);
            });
        },
   },
        // obtenerClienteMP(idPago){
        //     console.log(idPago)

        //     let json;
        //     let tipoSuscripcion;
        //     let importe;
        //     const config = {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({idPago})
        //     }
        //     console.log(idPago)


        //     fetch(this.urlAPI+"/estado-pago",config)
        //     .then((result)=>{
        //         console.log(result)

        //         return result.json()
        //     })
        //     .then(async(suscripcion)=>{
        
        //         console.log(suscripcion)
        //         if(suscripcion.error)
        //         {
        //             console.log("error")
        //         }
        //         else{
        //             console.log(suscripcion.response)
        //             // console.log(suscripcion.response.status)
        //             let data = suscripcion.response;

        //             if(data.status === "approved" || data.status === "accredited")
        //             {
        //                 //SE OBTIENE EL ID DEL USUARIO ACTUAL
        //                 let datosUsuario = JSON.parse( localStorage.getItem("user") );
        //                 // localStorage.setItem("user", "" );
        //                 json = "mercadopagooo"

        //                 const {id} = datosUsuario;

        //                 //VALIDA QUE SOLO SE CAMBIA A USUARIO TIPO 1 SI EL USUARIO ES TIPO 0
        //                 const lvl = (datosUsuario.lvluser === 1 || datosUsuario.lvluser === 2) ? 2 : 2;

        //                 importe = data.transaction_amount;
        //                 tipoSuscripcion = importe === 1290 ? "trimestral" :
        //                 importe === 2190 ? "semestral" :
        //                 importe === 3500 ? "anual" : "mensual";

        //                 let fechaInicio = parseInt((new Date(data.date_approved).valueOf() / 1000).toFixed(0))
        //                 // console.log(fechaInicio)

        //                 const interval_count = data.transaction_amount === 490 ? 1 :
        //                 data.transaction_amount === 1290 ? 3 :
        //                 data.transaction_amount === 2190 ? 6 : 12;

        //                 let fechaFin = addMonths(new Date(data.date_approved), interval_count);
        //                 fechaFin = parseInt((new Date(fechaFin).valueOf() / 1000).toFixed(0))

        //                 data.fechaInicio = fechaInicio;
        //                 data.fechaFin = fechaFin;
        //                 data.interval_count = interval_count;
                        
        //                 // let session = suscripcion.response;


        //                 //SE BUSCA AL USUARIO EN LA BASE DE DATOS POR MEDIO DEL ID
        //                 let usuarioRef =  this.$fireStore.collection("usuarios").doc(id);

        //                 //SE ACTUALIZA EN FIREBASE LOS CAMPOS NECESARIOS
        //                 usuarioRef.update({
        //                 lvluser: lvl,
        //                 idMembresia: idPago,
        //                 idCliente: "",
        //                 idSuscripcion: idPago,
        //                 tipoSuscripcion: tipoSuscripcion,
        //                 importeSuscripcion: importe,
        //                 })
        //                 .then(() => {
        //                 //SE ACTUALIZA EL OBJETO USUARIOS POR MEDIO DE UN ACTION QUE ESTA EN EL STORE
        //                 datosUsuario.lvluser = lvl;
        //                 datosUsuario.idMembresia = idPago;
        //                 datosUsuario.idCliente = "";
        //                 datosUsuario.idSuscripcion= idPago;
        //                 datosUsuario.tipoSuscripcion= tipoSuscripcion;
        //                 datosUsuario.importeSuscripcion= importe;
        //                 datosUsuario.estadoMembresia = 'active';

        //                 this.guardaDatosUsuarioStore(datosUsuario);

        //                 this.updateDescargasPreMP(data);

        //                 })
        //                 .catch((error) => {
        //                     console.error("Error al realizar pago: ", error);
        //                 });
                        
        //             }
        //         }
        //     })
        //     .catch((err)=>{
        //         console.log('Error al verificar suscripción', err);
        //     });
        // },
        
    // },
}

</script>