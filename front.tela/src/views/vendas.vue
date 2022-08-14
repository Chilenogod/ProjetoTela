<template>
  <div>
    <v-card max-width="500px">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex md12>
              <v-select v-model="search.group" :items="group" item-text="nome" item-value="valor" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <v-toolbar dense flat >
      <v-toolbar-title>Vendas</v-toolbar-title>
      <v-spacer/>
      <v-btn @click="atualizaVenda({})" color="success" dark fab small title="Nova Venda"><v-icon>mdi-clipboard-text</v-icon></v-btn>
      <v-btn @click="imprimir" color="info" dark fab small title="Imprimir"><v-icon>mdi-printer</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="vendas" hide-default-footer disable-pagination dense @click:row="atualizaVenda">
      <template v-slot:[`item.cliente_nome`]="{ item }">{{item.cliente_nome}} {{item.cliente_sobrenome}}</template>
      <template v-slot:[`item.emissao`]="{ item }">{{ formatDate(item.emissao) }}</template>
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
import { baseUrl, formatDate } from '@/global'
import axios from 'axios'
import VendaCadastro from '@/components/VendaCadastro'

export default {
  components: { VendaCadastro },
  name:  "ch-vendas",
  data() {
    return {
      dialog: false,
      group:[
        {
          nome: 'Cliente',
          valor: 'cliente_nome'
        },
        {
          nome: 'Funcionario',
          valor: 'funcionario'
        },
        {
          nome: 'Produto',
          valor: 'produto_nome'
        }
      ],
      vendas: [],
      vendaNovo: {},
			headers:[
			{
				text:  'Cod.',
				value: 'venda_id',
				align: 'end',
				sortable: true,
				width: 80,
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
				value: 'usuario_nome',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
        text:  'Emissão',
				value: 'emissao',
        align: 'center',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
				text:  'Total Pedido',
				value: 'total',
				align: 'left',
				class: ['blue lighten-5' ],
			},
      {
				text:  'Status',
				value: '',
				align: 'left',
				class: ['blue lighten-5' ],
			},
      {
        text: 'Ação',
        value: 'action',
        sortable: false,
        width: 90 ,
        class: ['blue lighten-5', 'no-print'],
      }
			],
      search: {},
      totalVendas:{ total_vendas: ''}
    }
  },
  watch: {
    search() {
        axios.post(`${ baseUrl }/venda/search`, this.search)
        .then(res => this.vendas = res.data)
        .catch(erro => console.log(erro))
    },
  },
	methods: {
    apagaVenda(item) {
      if(confirm(`Deseja cancelar a venda ${item.ordem_id}`))
      axios.delete(`${ baseUrl }/venda?ordem_id=${item.ordem_id}`)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.carregaVenda()
      })
      .catch(erro => console.log(erro))
    },
    atualizaVenda(item) {
      this.vendaNovo = { ...item } ;
      this.dialog = true
    },
    carregaVenda() {
      axios.post(`${ baseUrl }/venda/search`)
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
    formatDate(date) {
      return formatDate(date)
    }
	},
	mounted() {
		this.carregaVenda()
    this.carregaTotalVendas()
	},
}
</script>
<style scoped>

</style>