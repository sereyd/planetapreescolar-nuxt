import {mapState} from 'vuex'
export default {
    data(){
        return {
            registrar:false,
            stboletin:false,
            reg:{},
            intereses:['Planeaciones',
                'Hojas de trabajo',
                'Hojas para ilustrar',
                'Material Didáctico',
                'Administración',
                'Blog'],
                menerror:""
            }
        },
        computed:{
            ...mapState(['datosUsuario']),
            valconex(){
              var edobol=false
                if(this.datosUsuario.boletin===1){
                   edobol=false
                }else{
                    edobol=true
                }
                return edobol
            },  

        },
        mounted(){
            
        },
    methods:{
        
       async registrarBoletin(){
        if(this.reg.correo && this.reg.nombre){
            await this.$fireStore.collection('boletin').where('correo','==',this.reg.correo).get()
            .then((inf)=>{
                console.log(inf)
                if(inf.empty===true){

                    this.$fireStore.collection('boletin').add(this.reg)
                    let datosupdate={...this.datosUsuario}
                    datosupdate.boletin=1
                    this.$fireStore.collection('usuarios').doc(datosupdate.id).update(datosupdate)
                    this.registrar=false
                    this.stboletin=false

                }else{
                    this.menerror="El correo ya esta registrado"
                }
            })
        
        }else{
            this.menerror="Debe ingresar el nombre y el correo"
        }
        }
    }
}