<template>
  <v-app>
    <Header v-if="this.user"  id="no-print" :value="sistemaAbas" @abriMenu="drawer =! drawer"/>
    <MenuPrincipal v-if="this.user"  @router="set" :mode="drawer"/>
    <v-container fluid>
    <v-main>
      <router-view/>
    </v-main>
    </v-container>
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
    sistemaAbas: {}
  }),
  //watch: {
   // rota(title, route){
     // console.log(title, route)
    //}
 // },
  methods: {
    set(rotas) {
      this.sistemaAbas = { ...rotas }
      //console.log(this.sistemaAbas)
    }
  },
  mounted() {
   if (!this.user) this.$router.replace('login')
  }
};
</script>
