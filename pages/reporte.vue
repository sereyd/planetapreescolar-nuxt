<template>
    <v-card>
        <v-card-title class="melon white--text">
            Reporta un problema
        </v-card-title>
        <v-card-text>
            <v-text-field v-model="reporte.titulo" label="Titulo de problema"> </v-text-field>
            <v-textarea v-model="reporte.cuerpo" label="describe el problema"></v-textarea>
            <v-text-field v-model="reporte.telefono" label="Teléfono de contacto"></v-text-field>
            <v-text-field v-model="reporte.correo" label="Correo de cuenta registrado"></v-text-field>
            <v-text-field v-model="reporte.pass" label="Contraseña de cuenta"></v-text-field>
            <v-btn class="melon white--text" @click="crearReporte()">Crear Reporte</v-btn>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data(){
        return {
            reporte:{}
        }
    },
    methods:{
    async crearReporte(){
        this.reporte.status="abierto"
        this.reporte.fecha=new Date()
        await this.$fireStore.collection('reportes').add(this.reporte)
        alert('Reporte creado, el área de soporte revisara y contactara cuando se tenga una respuesta de su problema')
            this.$router.push('/')
        }
    }
}
</script>