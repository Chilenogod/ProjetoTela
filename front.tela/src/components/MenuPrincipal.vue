<template>
      <v-navigation-drawer id="header" app v-model="drawer" class="no-print">
        <v-list dense>
          <v-list-item href="/#/dashboard">
            <v-list-item-icon><v-icon>mdi-view-list</v-icon></v-list-item-icon>
            <v-list-item-title>DashBoard</v-list-item-title>
          </v-list-item>
          <v-list-group v-for="item in items" :key="item.title" :prepend-icon="item.icon"  no-action>
            <template v-slot:activator>
              <v-list-item-content >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="child in item.items" :key="child.title" link @click="abas(item.title, child.route)">
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
          title: 'Clientes', 
          icon: 'mdi-account-details',
          items: [{ title: 'Cadastros', route: '/clientes' }],
        },
        {
          title: 'Estoque',
          icon: 'mdi-view-list',
          items: [{ title: 'Produtos', route: '/estoque' }],
        },
        {
          title: 'Funcionários', 
          icon: 'mdi-account-details',
          items: [{ title: 'Cadastros', route: '/funcionarios' }],
        },
        {
          title: 'Usuarios',
          icon: 'mdi-account-details',
          items: [{ title: 'Cadastros', route: '/usuarios' }],
        },
        {
          title: 'Vendas',
          active: true,
          icon: 'mdi-view-list',
          items: [
            { title: 'Vendas por Ordens', route: '/vendas' },
            { title: 'Vendas por Funcionário', route: '/vendasPorFunc'}
          ],
        }
      ],
      rotas: {}
    }
  },
  methods: {
    abas(t, r) {
      const rotas = { title: t, route: r}
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