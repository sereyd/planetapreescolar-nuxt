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
          <v-list-item-title class="white--text">John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
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
      :absolute="!fixed"
      app
      class="primary white--text"
    >
      <span>&copy; Sereyd 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-dashboard' },
          { title: 'About', icon: 'mdi-question_answer' },
        ],
    }
  }
}
</script>
