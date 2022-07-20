<template>
      <v-navigation-drawer app v-model="drawer" >
        <v-list nav dense>
          <v-list-item @click.stop="drawer=false" v-for="item in items" :key="item.title"  router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>
<script>
export default {
  name:  'ch-menuPrincial',
  props: [ 'mode' ],
  data() {
    return {
      drawer: false,
      items: [
        {
          title: 'Cliente', 
          icon: 'mdi-account-details',
          route: '/clientes',
        },
        {
          title: 'Estoque',
          icon: 'mdi-view-list',
          route: '/estoque',
        },
        {
          title: 'Funcionários', 
          icon: 'mdi-account-details',
          route: '/funcionarios',
        },
        {
          title: 'Usuarios',
          icon: 'mdi-account-details',
          route: '/usuarios',
        }
      ]
    }
  },
  methods: {
  },
  watch: {
    mode() {
      this.drawer = this.mode
    }
  }

}
</script>
<style>

</style>