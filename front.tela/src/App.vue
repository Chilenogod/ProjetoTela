<template>
  <v-app>
    <Header @abriMenu="drawer =! drawer"/>
    <MenuPrincipal :mode="drawer"/>
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


export default {
  components: { Header, MenuPrincipal},
  name: "App",

  data: () => ({
    drawer: false,
  }),
};
</script>
