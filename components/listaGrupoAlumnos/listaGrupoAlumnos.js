import listasdetareas from "~/components/listasdetareas/listasdetareas.vue";
export default{
    data(){
        return {
          edit:false,
          editlista:false,
          editalumno:false
        }
    },
    computed:{
      listadoAlumnos() {
        var num = 0
            this.dataAlumnos.map((al)=>{
              var datos=Object.keys(al)
              if(datos.indexOf('conducta')===-1){
               al.conducta='buena'
               console.log('ingresa conducta')
              }
              if(datos.indexOf('asistencia')===-1){
               al.asistencia="1"
               console.log('carga asistencia')
              } 

              al.pos=num++

               })

                 return this.dataAlumnos
             }
    },
    methods:{
      updatedata(item,val,tipo){
        this.dataAlumnos[item.pos][tipo]=val
      },
      deleteCabecera(item,pos){
        this.cabecera.splice(pos,1)
      },
      editarAlumno(item){
        var payload={
          item:item,
          edit:true
        }
        this.$emit('editarAlumno',payload)

      }
    },
    components:{
      listasdetareas
    },
    props:{
        dataAlumnos:{},
        cabecera:{}
    }
}