import Vue from 'vue';

Vue.prototype.$loaderIntent=(schema)=>{
   
    if(schema.watch===''){
         //// en caso de que este vacio se repite 
       setTimeout(()=>{this.$loaderIntent(schema)},500)
    
    }else{
      /// en espera   de datos del valor
     var variable=schema.watch
       var type=typeof variable
       var len=0
       console.log(type)
        switch(type){
            case 'object':
              len=Object.keys(variable).length
                break;
            case 'array':
               len=Object.keys(variable).length
                break;
            case 'string':
                len=variable
                break; 
            case 'number':
                len=variable.length
                break;   
        }

 ///ejecuta funcion de respuesta 
       return true
        
    }
       

   
}