<template>
  <div>
    <v-toolbar dense flat >
      <v-toolbar-title>Vendas</v-toolbar-title>
      <v-spacer/>
      <v-text-field v-model="search" label="Pesquisa" hide-details/>
      <v-btn @click="atualizaVenda({})" color="success" dark fab small title="Nova Venda"><v-icon>mdi-clipboard-text</v-icon></v-btn>
      <v-btn @click="imprimir" color="info" dark fab small title="Imprimir"><v-icon>mdi-printer</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="vendas" :search="search" hide-default-footer disable-pagination dense  @click:row="atualizaVenda">
      <template v-slot:[`item.funcionario`]="{ item }">{{item.funcionario}} {{item.cliente_sobrenome}}</template>
      <template v-slot:[`item.total`]="{ item }">R$ {{ parseFloat( item.total || 0).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small id="no-print" class="mr-2" @click.stop="atualizaVenda(item)" color="primary" title="Alterar Venda">mdi-pencil</v-icon>
        <v-icon small id="no-print" class="mr-2" @click.stop="apagaVenda(item)" color="error" title="Excluir Venda">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <v-footer class="text-right" color="primary lighten-3">
      <v-layout>
        <v-spacer/>
        <v-flex>
          <p>Total: R$ {{ parseFloat(totalVendas.total_vendas).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</p>
        </v-flex>
      </v-layout>
    </v-footer>
    <VendaCadastro :value="vendaNovo" :mode="dialog" @fechaDialogo="dialog=false" @carrega="carregaVenda"/>
  </div>
</template>
<script>
import { baseUrl } from '@/global'
import axios from 'axios'
import VendaCadastro from '@/components/VendaCadastro'

export default {
  components: { VendaCadastro },
  name:  "ch-vendas",
  data() {
    return {
      dialog: false,
      vendas: [],
      vendaNovo: {},
			headers:[								
			{
        text:  'Funcionario',
				value: 'funcionario',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
        text: 'Qtd. Pedidos',
        value: 'qtd_pedidos' ,
        align: 'center',
        class: [ 'blue lighten-5' ]
      },
      {
				text:  'Total',
				value: 'total',
				align: 'left',
				class: ['blue lighten-5' ],
			},
			],
      search: '',
      totalVendas:{ total_vendas: ''}
    }
  },
  
	methods: {
    carregaVenda() {
      axios.post(`${ baseUrl }/venda/search?group=funcionario`)
      .then(res => this.vendas = res.data)
      //.catch(function(e) { console.log(e)})
      .catch(erro => console.log(erro))
    },
    imprimir() {
      window.print();
    },
    carregaTotalVendas() {
      axios.post(`${ baseUrl }/totalVendas`)
      .then(res => {
        this.totalVendas = res.data[0];
        console.log(res.data)
      })
      .catch(erro => console.log(erro))
    },
	},
	mounted() {
		this.carregaVenda()
    this.carregaTotalVendas()
	},
}
</script>
<style scoped>

</style>