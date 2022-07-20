<template>
    <v-app-bar app dense color="primary" dark>
      <v-app-bar-nav-icon @click="$emit('abriMenu')"></v-app-bar-nav-icon>
      <v-app-bar-title class="flex text-center" @click="abrirDashboard">{{ title }}</v-app-bar-title>
    </v-app-bar>
</template>

<script>
export default {
  name: 'ch-headerPrincipal',
  data() {
    return {
      drawer: false,
      title: 'Aplicacao com Vuetify',
    }
  },
  methods: {
    abrirDashboard() {
      this.$router.replace('dashboard')
    }
  }
  
}
</script>

<style>

  

</style>