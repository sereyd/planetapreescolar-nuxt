import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    data(){
        return {
            verCometario : false,
            post:null,
        }
},
computed:{
    ...mapState(['itemsnotifi','datosUsuario']),
    noticount(){
            var num=0
            num=this.itemsnotifi.length
            // console.log(this.itemsnotifi)

            return num
        }
    },     
async mounted(){
    await this.tomanotificaciones()
    // console.log(this.itemsnotifi)
},

methods:{

    ...mapActions(['tomanotificaciones','cerrarconexion','creaNotificacion']),
    ...mapMutations(['changeDialogPost']),
    async notivisto(p){
        console.log(p);
           await this.$fireStore.collection('Notificaciones').doc(this.datosUsuario.id).collection('notify').doc(p.id).update({
            status:1
        })

        this.verCometario = false;
    },
    async abrirLink(p){
        this.$router.push(p.data().link)
        this.notivisto(p)
    },
    async verPost(){

        this.changeDialogPost(true);

    },
    async accion(req){
        const id =  this.post.data().comentario.idRecurso
        // post.data().comentario.urlImagen
        const categoriaQuery = await this.$fireStore.collection('CATEGORIAS').doc(id);
        const cat = await categoriaQuery.get();
        let nuevosComentarios = [];
        let categoria = cat.data();
        // console.log(cat.data());
        // console.log(categoria);

        if(req === "aceptar")
        {
            categoria.comentarios.map(com => {
                if(com.idUsuario ===  this.post.data().comentario.idUsuario && com.comentario ===  this.post.data().comentario.comentario)
                    com.valido = true;
            })
        }else
        {
            const indice = categoria.comentarios.indexOf(com => com.idUsuario ===  this.post.data().comentario.idUsuario && com.comentario ===  this.post.data().comentario.comentario); // obtenemos el indice
            console.log(indice);
            categoria.comentarios.splice(indice, 1); 
        }
        nuevosComentarios = categoria.comentarios;

        console.log(nuevosComentarios);
        //SE ACTUALIZA EN FIREBASE EL CAMPO DE COMENTARIOS
        categoriaQuery.update({
             comentarios: nuevosComentarios
        })
        .then(() => {

            this.notivisto(this.post);
            this.verCometario = false;
 
        })
        .catch((error) => {
            console.error("ErroR al agregar nuevo comentario: ", error);
        });
    },
}    

}