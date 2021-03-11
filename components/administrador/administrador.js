import { mapState, mapMutations, mapActions } from 'vuex'
import gestordeusuarios from '~/components/administrador/admincomp/gestordeusuarios/gestordeusuarios.vue'
import suscripciones from '~/components/administrador/admincomp/suscripciones/suscripciones.vue'
import notificaciones from '~/components/administrador/admincomp/notificaciones/notificaciones.vue'
import landingpage from '~/components/administrador/admincomp/landinpage/landingpage.vue'
import configral from '~/components/administrador/admincomp/configuraciongral/configuraciongral.vue'
import limitesitios from '~/components/administrador/admincomp/adminpage/adminpage.vue'

export default{
    data(){
        return {
            //DATA DE FORMULARIO LOGIN
            usuarios:[],
            optionUsuarios:[],
            sitiosLp:[],
            notifilist:[],
            permisos:[]
            
        }
      
    },
    computed:{
        // ...mapState(['datosUsuario']),
        ...mapState(['datosUsuario','descargasConf','configAll']),
    },
    methods:{
        ...mapActions(['creaNotificacion']),
        ...mapMutations(['cambiarStatusOpenAdmin','actualizarConfigDescargas','cambiaLoading']),
          editarConfigDescargas(){
            const {idConfig} = this.descargasConf;
            // console.log(this.descargasConf);
            // console.log(this.editDescargasConf);
            //SE OBTIENE EL USUARIO LOGEADO POR MEDIO DEL ID
            let descargasFreeRef = this.$fireStore.collection("confDescargas").doc(idConfig);
            
            //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
            descargasFreeRef.update({
                ...this.editDescargasConf
            })
            .then(() => {
              console.log("UPDATE CONFIGURACION DESCARGAR ")
              this.actualizarConfigDescargas(this.editDescargasConf);
            //   console.log(datos)
            //   console.log(this.descargasConf)
              this.dialogDes = false;
        
            })
            .catch((error) => {
                console.error("ErroR al actualizar descargas: ", error);
            });
        },
        editarUsuario () {
            //SE OBTIENE EL CAMPO ID DEL USUARIO A EDITAR
            const {id} = this.usuarioEditable;
            //SE REALIZA LLA BUSQUEDA POR MEDIO DE SU ID
            this.$fireStore.collection('usuarios').doc(id).update(this.usuarioEditable)
            this.close()
        },
        async getElement(){ 
            this.cambiaLoading('inicia')
            try{
                this.usuarios=[]
                this.optionUsuarios=[]
                const dtuser=await this.$fireStore.collection('usuarios').get();
                //DESPUES DE OBTENER A LOS USUARIOS LOS ALMACENAMOS EN THIS.UUSUARIOS
                this.usuarios = dtuser.docs.map(doc=>{
                    this.optionUsuarios.push({
                        text:doc.data().nombre+" "+doc.data().apellido+": "+doc.data().correo,
                        value:doc.id
                    })

                return {
                    id: doc.id, //SE LES AGREGA EL ID DEL USAURIO PARA REALIZAR LA BUSQUEDA POR SU ID
                    ...doc.data()
                    }
                    this.cambiaLoading('finaliza')
                });
                // console.log(this.optionUsuarios)
            }catch(error){
              console.log(error)
            }
           

        },
        validasitio(p){

        },
        async cargaSitios(){

            this.sitiosLp=[]
     
           await this.$fireStore.collection('landingpage').get()
           .then((data)=>{
             data.docs.forEach((ld)=>{
               var payload=ld.data()
                   payload.iddoc=ld.id
                this.sitiosLp.push(payload)
                
             })
                
           })
         },
         async cargaNotificaciones(){
             this.notifilist=[]
             console.log('carga notificaciones')
             await this.$fireStore.collection('Notificaciones').get()
           .then((data)=>{
               console.log(data)
           })
         }
    },
    mounted(){
        this.cambiaLoading('inicia')
        setTimeout(()=>{
            this.cambiaLoading('finaliza')
        },500)
    },
    components:{
        gestordeusuarios,
        suscripciones,
        notificaciones,
        landingpage,
        configral,
        limitesitios
    }
}