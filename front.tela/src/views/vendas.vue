<template>
  <div>
    <v-toolbar >
      <v-toolbar-title>Pedidos</v-toolbar-title>
      <v-spacer/>
      <v-btn @click="atualizaCliente({})" color="success" dark fab small title="Novo Cliente"><v-icon>mdi-account-plus</v-icon></v-btn>
      <v-btn @click="imprimir" color="info" dark fab small title="Imprimir"><v-icon>mdi-printer</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="vendas" :items-per-page="5" dense @click:row="atualizaCliente">
      <template v-slot:[`item.cidade`]="{ item }">{{item.cidade}}/{{item.estado}}</template>
      <template v-slot:[`item.cliente_nome`]="{ item }">{{item.cliente_nome}} {{item.cliente_sobrenome}}</template>
      <template v-slot:[`item.total`]="{ item }">R${{ parseFloat( item.total || 0).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</template>
      <template v-slot:[`item.valor`]="{ item }">R${{ parseFloat( item.valor || 0).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</template>
      <template v-slot:[`item.telefone`]="{ item }">{{ item.telefone | formatTel }}</template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-2" @click.stop="atualizaCliente(item)" color="primary" title="Alterar Cliente">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @click.stop="apagaCliente(item)" color="error" title="Excluir Cliente">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <ClienteCadastro :value="clienteNovo" :mode="dialog" @fechaDialogo="dialog=false" @carrega="carregaCliente"/>
  </div>
</template>
<script>
import { baseUrl } from '@/global'
import axios from 'axios'
import ClienteCadastro from '@/components/ClienteCadastro'

export default {
  components: { ClienteCadastro },
  name:  "ch-clientes",
  data() {
    return {
      dialog: false,
      vendas: [],
      clienteNovo: {},
			headers:[
			{
				text:  'Cod.',
				value: 'ordem_id',
				align: 'end',
				sortable: true,
				width: 50,
				class: ['blue lighten-5'],
			},								
			{
        text:  'Cliente',
				value: 'cliente_nome',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
        text:  'Funcionario',
				value: 'funcionario',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
        text:  'Produto',
				value: 'produto_nome',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
			{
        text:  'Valor Unitário',
				value: 'valor',
				align: 'center',
				sortable: true,
				class: ['blue lighten-5'],
			},
			{
				text:  'Quant.',
				value: 'qtd_vendida',
				align: 'center',
				class: ['blue lighten-5'],
			},
      {
				text:  'Total Pedido',
				value: 'total',
				align: 'center',
				class: ['blue lighten-5'],
			},
      {
        text: 'Ação',
        value: 'action',
        sortable: false,
        width: 100 ,
        class: ['blue lighten-5'],
      }
			]
    }
  },
	methods: {
    apagaCliente(item) {
      if(confirm(`Deseja apagar a cliente ${item.nome}`))
      axios.delete(`${ baseUrl }/cliente?id=${item.id}`)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.carregaCliente()
      })
      .catch(erro => console.log(erro))
    },
    atualizaCliente(item) {
      this.clienteNovo = { ...item };
      this.dialog = true
    },
    carregaVendas() {
      axios.post(`${baseUrl}/vendas/search`)
      .then(res => this.vendas = res.data)
      //.catch(function(e) { console.log(e)})
      .catch(erro => console.log(erro))
    },
    imprimir() {
      window.print();
    }
	},
	mounted() {
		this.carregaVendas();
	},
}
</script>
<style scoped>

</style>