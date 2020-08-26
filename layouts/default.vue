<template>
  <v-app >
     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="primary"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">John Leider {{dialog}} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="blue"
        >
          <v-list-item-icon  class="red">
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <div v-if="item.title !== 'Register'">
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </div>
          <div v-else>
          <v-list-item-content>
            <v-list-item-title class="white--text"  @click.stop="abrirRegistro">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          </div>
          <!-- <v-btn
            color="primary"
            dark
            @click.stop="dialog = true"
          >
            Open Dialog
          </v-btn> -->
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer>
    <v-card>
      <v-card-title class="primary white--text">
      <v-btn class="secondary" @click.stop="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-btn> Menu 
      </v-card-title>
      </v-card>


      <!----Espacio de carga de vistas------>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
      <!----Espacio de carga de vistas------>

    <v-footer
  
      app
      class="primary white--text"
    >
      <span >&copy; Sereyd 2020</span>
    </v-footer>

    
    <Registro></Registro>


  </v-app>
</template>

<script>
  import Registro from '~/components/Registro/registro.vue'
  import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      drawer: null,
      // dialog: false,
        items: [
          { title: 'Home', icon: 'mdi-dashboard' },
          { title: 'About', icon: 'mdi-question_answer' },
          { title: 'Register', icon: 'mdi-question_answer' },
        ],
    }
  },
  computed:{
    ...mapState(['dialog', 'test'])
  },
  methods:{
    ...mapMutations(['abrirRegistro'])
  },
  components:{
    Registro
  }
  
}
</script>

