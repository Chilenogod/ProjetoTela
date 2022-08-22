<template>
  <v-app>
    <Header v-if="user"  id="no-print" @abriMenu="drawer =! drawer"/>
    <MenuPrincipal v-if="user"  @router="sistemaAbas" :mode="drawer"/>
    <v-main fluid >
      <v-tabs v-if="user" height="22" :background-color="'blue-grey darken-3'" >
        <v-tab v-for="item in items" :key="item.title" :to="item.route">{{ item.title }}<v-icon  @click.stop="removeAba(item)">mdi-close</v-icon></v-tab>
      </v-tabs>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';
import MenuPrincipal from './components/MenuPrincipal';
import { mapState } from 'vuex'
import './print.css'


export default {
  components: { Header, MenuPrincipal},
  name: "App",
  computed: mapState(['user']),
  data: () => ({
    drawer: false,
    tabs: 0,
    items: [{
      title: 'DashBoard',
      route: '/dashboard',
      cdMenu: 0
    }],
  }),
  methods: {
    sistemaAbas(item) {
      const index = this.items.indexOf(this.items.find(el => el.cdMenu === item.cdMenu))
      if(index === -1) {
      this.items.push(item)
      this.$router.push(item.route)
      } else this.$router.push(this.items[index].route)
    },
    removeAba(item) {
      let index = this.items.indexOf(item)
      this.items.splice(index, 1)
      if(this.items.length === 0){ 
        this.resetTab()
      }else { setTimeout(() => { this.$router.push(this.items[0].route) }, 100)}
    },
    resetTab() {
			this.items = [{
				title: 'DashBoard',
				route: '/dashboard',
        cdMenu: 0
			}]
      setTimeout(() => { this.$router.push(this.items[0].route) }, 100)
		},
  },
  mounted() {
    if (!this.user) {
      this.$router.replace('/login')
    } else this.resetTab()
  }
}; 
</script>
