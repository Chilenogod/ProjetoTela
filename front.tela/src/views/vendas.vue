<template>
  <div>
    <v-toolbar dense flat >
      <v-toolbar-title>Vendas</v-toolbar-title>
      <v-spacer/>
      <v-btn @click.stop="novaVenda" color="success" dark fab small title="Nova Venda"><v-icon>mdi-clipboard-text</v-icon></v-btn>
      <v-btn @click="imprimir" color="info" dark fab small title="Imprimir"><v-icon>mdi-printer</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="vendas" hide-default-footer disable-pagination dense @click:row="atualizaVenda">
      <template v-slot:[`item.emissao`]="{ item }">{{ formatDate(item.emissao) }}</template>
      <template v-slot:[`item.venda_total`]="{ item }">R$ {{ parseFloat( item.venda_total || 0).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small id="no-print" class="mr-2" @click.stop="atualizaVenda(item)" color="primary" title="Alterar Venda">mdi-pencil</v-icon>
        <v-icon small id="no-print" class="mr-2" @click.stop="apagaVenda(item)" color="error" title="Excluir Venda">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <v-footer class="text-right" color="primary lighten-3">
      <v-layout>
        <v-spacer/>
        <v-flex>
          <p>Total: R$ {{ parseFloat(total.vendas).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</p>
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
      vendas: [],
      vendaNovo: {},
			headers:[
			{
				text:  'Cod.',
				value: 'cd_venda',
				align: 'end',
				sortable: true,
				width: 80,
				class: ['blue lighten-5'],
			},								
			{
        text:  'Cliente',
				value: 'ds_cliente',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
        text:  'Funcionario',
				value: 'ds_usuario',
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
				value: 'venda_total',
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
      total: { vendas: '' },
    }
  },

	methods: {
    apagaVenda(item) {
      if(confirm(`Deseja cancelar a venda ${item.cd_venda}`))
      axios.delete(`${ baseUrl }/venda?cd_venda=${item.cd_venda}`)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.carregaVenda()
        this.totalVenda()
      })
      .catch(erro => console.log(erro))
    },
    atualizaVenda(item) {
      this.vendaNovo = { ...item } ;
      this.loadItems(item.cd_venda)
      this.loadCliente(item.cd_cliente)
    },
    carregaVenda() {
      axios.post(`${ baseUrl }/venda/search`)
      .then(res => this.vendas = res.data)
      //.catch(function(e) { console.log(e)})
      .catch(erro => console.log(erro))
    },
    loadCliente(id) {
      if(id) {
        axios(`${ baseUrl }/venda/cliente?id=${id}`)
        .then(res => {
          console.log(res.data)
        })
        .catch(erro => console.log(erro))
      }
    },
    loadItems(id) {
      if(id) {
        axios(`${ baseUrl }/venda/items?id=${id}`)
        .then(res => {
          this.vendaNovo.items = res.data
          this.dialog = true
        })
        .catch(erro => console.log(erro))
      }
    },
    imprimir() {
      window.print();
    },
    totalVenda() {
     let rowCount = this.vendas.length
     let total = 0
     for(let i=0; i<rowCount; i++) {
      total = this.vendas[i].venda_total + total
     }
     this.total.vendas = total
    },
    novaVenda() {
      this.vendaNovo = {}
      this.dialog = true
    },
    formatDate(date) {
      return formatDate(date)
    }
	},
	mounted() {
		this.carregaVenda()
    setTimeout(() => { this.totalVenda() }, 200)
	},
}
</script>
<style scoped>

</style>