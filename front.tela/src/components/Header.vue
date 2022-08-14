<template>
    <v-app-bar app dense color="primary" dark>
      <v-app-bar-nav-icon @click="$emit('abriMenu')"></v-app-bar-nav-icon>
      <v-app-bar-title class="flex text-center" >{{ title }}</v-app-bar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab">
          <v-tab  v-for="(item,i) in items" :key="i"  route :to="item.route">{{ item.title }}<v-icon  @click.stop="removeAba(item)" >mdi-close</v-icon></v-tab>

        </v-tabs> 
      </template>
      <v-spacer/>
      <v-menu bottom left v-model="menu1" >
        <template v-slot:activator>
          <v-btn dark icon @click="menu1 = true"><v-icon>mdi-dots-vertical</v-icon></v-btn>
        </template>
        <v-list dense>
          <v-list-item >
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            <v-list-item-title>{{ }}</v-list-item-title>
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
      tab: 0,
      items: [],
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
  watch:{
    value() {
    //const abas = {title: this.value.title, route: this.value.route}
    //console.log(abas)
     this.items.push(this.value)
     this.tabs = this.items -1
    // if (this.items.indexOf(this.value)) {}
     //console.log(this.items)
    }
  },
  methods: {
    logout() {
      this.items = []
      this.$store.state.user = {}
      this.$router.replace('login')
    },
    removeAba(aba) {
      let index = this.items.indexOf(aba)
      this.items.splice(index, 1)
      this.tabs = 0
      console.log(this.items)
    }
  },
  mounted() {
    this.items = []
  }
  
}
</script>

<style>


</style>