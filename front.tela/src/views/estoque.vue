<template>
  <div>
    <v-toolbar flat >
      <v-toolbar-title>Estoque</v-toolbar-title>
      <v-spacer/>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Procurar" single-line hide-details></v-text-field> 
      <v-btn fab small flat @click="atualizaEstoque({})" dark color="success" title="Novo Produto"><v-icon>mdi-package-variant-closed-plus</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="produtos" :search="search" :items-per-page="5" dense @click:row="atualizaEstoque">
      <template v-slot:[`item.valor`]="{ item }">R${{ parseFloat( item.valor || 0).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</template>
      <template v-slot:[`item.valor_estoque`]="{ item }">R${{ parseFloat(item.valor_estoque || 0).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-2" @click.stop="atualizaEstoque(item)" color="primary" title="Alterar Produto">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @click.stop="apagaEstoque(item)" color="error" title="Excluir Produto">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <EstoqueCadastro :value="produtoNovo" :mode="dialog" @fecharDialogo="dialog=false" @carrega="carregaEstoque"/>
  </div>
</template>
<script>
import { baseUrl } from '@/global'
import axios from 'axios'
import EstoqueCadastro from '@/components/EstoqueCadastro'

export default {
  components: { EstoqueCadastro },
  name: "ch-estoque",
  data() {
    return {
      dialog: null,
      produtos:[],
      produtoNovo: {},
      headers:[
        {
          text: 'Cod.',
          value: 'id',
          align: 'end',
          sortable: true,
          width: 100,
          //class: [ 'blue lighten-5' ],
        },
        {
          text: 'Produto',
          value: 'produto',
          align: 'left',
          sortable: true,
          //class: [ 'blue lighten-5' ],
        },
        {
          text: 'Valor',
          value: 'valor',
          align: 'left',
          //class: [ 'blue lighten-5' ],
        },
        {
          text: 'Categoria',
          value: 'categoria',
          align: 'center',
          //class: [ 'blue lighten-5' ],
        },
        {
          text: 'Quant. estoque',
          value: 'qtd_estoque',
          align: 'center',
          //class: [ 'blue lighten-5' ]
        },
        {
          text: 'Valor do estoque',
          value: 'valor_estoque',
          align: 'left',
          //class: [ 'blue lighten-5' ]
        },
        {
          text: 'Ação',
          value: 'action',
          align: 'left',
          sortable: false,
          //class: [ 'blue lighten-5' ]
        }
      ],
      search: '',
    }
  },
  methods: {
    apagaEstoque(item) {
      if(confirm(`Deseja excluir o produto ${item.produto}`))
      axios.delete(`${ baseUrl }/estoque?id=${item.id}`)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.carregaEstoque()
      })
      .catch(erro => this.$toasted.global.defaultError({msg: erro}))  
    },
    atualizaEstoque(item) {
      this.produtoNovo = { ...item };
      this.dialog = true
    },
    carregaEstoque() {
      axios.post(`${baseUrl}/estoque/search`)
      .then(res => this.produtos = res.data)
      .catch(erro => console.log(erro))
    },
  },
  mounted() {
   this.carregaEstoque()
  },
}
</script>
<style>
   
</style>