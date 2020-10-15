import Vue from "vue";

Vue.prototype.$validasesion = (store, item) => {
  let ret = false;  
  
  if(!item.logeado){
        item.logeado=false
    }

    if(item.sinregistro===true){ /// valida lo que desaparece si esta o no registrado
      store.state.datosUsuario.userlogin===false ? ret=true : ret=false
    }else{

  item.logeado === false  //// verifica si requiere estar logeado
    ? (ret = true)        /// si es false retorna true  
    : store.state.datosUsuario.userlogin === true /// si es verdadero comprueba del store.state si esta logeado 
    ? store.state.datosUsuario.lvluser  >=  item.permisos           /// comprueba permisos 0 es cuenta gratis : 1 cuenta premium : 2 cuenta de administrador (todos los permisos)
    ? ret=true 
    : ret= false
    : (ret = false);            //// si no esta logeado retorna false
    
  }

  return ret;
};
