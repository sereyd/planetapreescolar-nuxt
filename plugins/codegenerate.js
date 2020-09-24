import Vue from 'vue';

Vue.prototype.$codegenerate=()=>{
            var codegen= + new Date() + Math.floor(Math.random() * 1000);
      return codegen
}

Vue.prototype.$codecorreo=()=>{
      var codegen= + new Date() + Math.floor(Math.random() * 1000000000);
return codegen
}