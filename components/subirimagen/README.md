Componente para subir imagene 

Funciona con el store (VUEX - mapMutations  ) para la comunicación entre componente 
función mapMutations
*************dentro del componente 
debe tener declarado en el store 
en state 
    imgupload:"",  --- para pasar la imagene subida en inputfile 


************** fuera del componente tiene la funcion 

almacenarFotoStorage(ubicacion)

para almacenar la imagene en el storage de firebase