<template>
    <v-app-bar app dense color="primary" dark>
      <v-app-bar-nav-icon @click="$emit('abriMenu')"></v-app-bar-nav-icon>
      <v-app-bar-title class="flex text-center" >{{ title }}</v-app-bar-title>
      <v-spacer/>
      <v-menu bottom left v-model="menu1" >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark icon @click="menu1 = true"><v-icon>mdi-dots-vertical</v-icon></v-btn>
        </template>
        <v-list dense>
          <v-list-item >
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>{{ user.nome }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="option in menu" :key="option.title" :to="option.action" link>
            <v-list-item-content>
              <v-list-item-title>{{ option.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ch-headerPrincipal',
  props: [ 'value' ],
  data() {
    return {
      drawer: false,
      menu1: false,
      menu: [
        {
          title: 'Configurações',
        },
        {
          title: 'Logout',
          action: '$emit(logout)'
        }
      ],
      title: 'Aplicacao com Vuetify',
    }
  },
  computed: mapState(['user']),
  methods: {
    logout() {
      this.$store.state.user = {}
    },
  },
  
}
</script>

<style>


</style>