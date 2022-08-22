<template>
      <v-navigation-drawer id="header" app v-model="drawer" class="no-print">
        <v-list dense>
          <v-list-group v-for="item in items" :key="item.title" :prepend-icon="item.icon"  no-action>
            <template v-slot:activator>
              <v-list-item-content >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="child in item.items" :key="child.title" link @click="abas(child.title, child.route, child.cdMenu)">
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          </v-list-group>
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
          title: 'DashBoard', 
          icon: 'mdi-view-list',
          items: [{ title: 'DashBoard', route: '/dashboard', cdMenu: 0 }],
        },
        {
          title: 'Clientes', 
          icon: 'mdi-account-details',
          items: [{ title: 'Clientes', route: '/clientes', cdMenu: 1 }],
        },
        {
          title: 'Estoque',
          icon: 'mdi-view-list',
          items: [{ title: 'Produtos', route: '/estoque', cdMenu: 2 }],
        },
        {
          title: 'Funcionários', 
          icon: 'mdi-account-details',
          items: [{ title: 'Funcionários', route: '/funcionarios', cdMenu: 3 }],
        },
        {
          title: 'Usuarios',
          icon: 'mdi-account-details',
          items: [{ title: 'Usuários', route: '/usuarios', cdMenu: 4 }],
        },
        {
          title: 'Vendas',
          active: true,
          icon: 'mdi-view-list',
          items: [
            { title: 'Vendas por Ordens', route: '/vendas', cdMenu: 5 },
            { title: 'Vendas por Funcionário', route: '/vendasPorFunc', cdMenu: 6 }
          ],
        }
      ],
      rotas: {}
    }
  },
  methods: {
    abas(t, r, c) {
      const rotas = { title: t, route: r, cdMenu: c}
      //console.log(rotas)
      this.rotas = { ...rotas }
      //console.log(this.nono.title)
      this.$emit('router', this.rotas);
      
      //console.log({title: t, route: r})
      //console.log({title: item.title, route: item.items[0].route})
      
    }
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