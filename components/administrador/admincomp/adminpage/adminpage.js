import {mapState,mapMutations,mapActions} from 'vuex'

export default {
    data(){
        return {
            datoslimites:{},
            editaSeccion:{},
            options:['rand','lista'],
            titulos:[
                {
                    text:'Carga',
                    value:'carga'
                },
                {
                    text:'Limite',
                    value:'limite'
                },
                {
                    text:'Sección',
                    value:'seccion'
                },
                {
                    text:'Editar',
                    value:'editar'
                }
            ],
            ventanaeditar:false,
            numedit:0
        }
    },
    mounted(){
        this.cargadatosdesitio()
    },
    methods:{
        ...mapMutations(['cargaConfiGral']),
        cargadatosdesitio(){
            if(this.configAll.loadlimit.length===0){
               setTimeout(()=>{this.cargadatosdesitio()},600)
            }else{
                this.datoslimites={...this.configAll}
            }

        },
        abrirEditar(p){
           this.editaSeccion=p
           this.ventanaeditar=true
        },
        
        async guardarCambios(){

              await this.$fireStore.collection('ConfiguracionGeneral')
                    .doc(this.configAll.idCAll).update(this.datoslimites)
                    .then((dat)=>{
                        this.cargaConfiGral(this.datoslimites)
                        this.ventanaeditar=false
                    })
            },
    },
    computed:{
        ...mapState(['configAll'])
    }

}