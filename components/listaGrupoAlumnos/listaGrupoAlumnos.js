export default{
    data(){
        return {
          cabeceraListaAlumnos:[
            {
              text:'Edit',
              value:'action'
              },
            {
              text:'Imagen',
              value:'fotoAlumno'
              },
            {
              text:'Nombre Apellido',
              value:"Nombre"
            },
            {
              text: "Conducta",
              value: "conducta"
            },
            {
              text: "Asistencia",
              value: "asistencia"
            }
          ],
          listaalumnos:[]

        }
    },
    mounted(){
      this.cargaalumnos()
    },
    methods:{
        cargaalumnos() {
            this.dataAlumnos.Alumnos.map((al)=>{
              if(!al.conducta){
               al.conducta='buena'
              }
              if(!al.asistencia){
               al.asistencia="1"
              }
               })
         
               if (    
                 this.dataAlumnos
               ) {
         
               /////carga el horario gral 
               if(this.dataAlumnos.Horario.length===0){
                 this.dataAlumnos.Horario=this.datain.Horario
               }
              this.listaalumnos=this.dataAlumnos.Alumnos
                 return this.listaalumnos
               }
             },
    },
    props:{
        dataAlumnos:{}
    }
}