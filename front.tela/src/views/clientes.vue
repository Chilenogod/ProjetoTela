<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Clientes</v-toolbar-title>
      <v-spacer/>
      <v-btn @click="atualizaCliente({})" color="success" dark fab small title="Novo Cliente"><v-icon>mdi-account-plus</v-icon></v-btn>
      <v-btn @click="imprimir" color="info" dark fab small title="Imprimir"><v-icon>mdi-printer</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="clientes" hide-default-footer disable-pagination dense @click:row="atualizaCliente">
      <template v-slot:[`item.cidade`]="{ item }">{{item.cidade}}/{{item.estado}}</template>
      <template v-slot:[`item.nome`]="{ item }">{{item.nome}} {{item.sobrenome}}</template>
      <template v-slot:[`item.nascimento`]="{ item }">{{  formatDate(item.nascimento) }}</template>
      <template v-slot:[`item.documento`]="{ item }">{{ item.documento | formatDocument }}</template>
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
import { baseUrl , formatDate } from '@/global'
import axios from 'axios'
import ClienteCadastro from '@/components/ClienteCadastro'

export default {
  components: { ClienteCadastro },
  name:  "ch-clientes",
  data() {
    return {
      dialog: false,
      clientes: [],
      clienteNovo: {},
			headers:[
			{
				text:  'ID',
				value: 'id',
				align: 'end',
				sortable: true,
				width: 50,
				class: ['blue lighten-5'],
			},								
			{
        text:  'Cliente',
				value: 'nome',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
        text:  'E-mail',
				value: 'email',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
        text:  'Telefone',
				value: 'telefone',
        align: 'left',
				sortable: true,
				class: ['blue lighten-5'],
			},
			{
        text:  'CPF/CNPJ',
				value: 'documento',
				align: 'center',
				sortable: true,
				class: ['blue lighten-5'],
			},
			{
				text:  'Cidade/UF',
				value: 'cidade',
				align: 'center',
				class: ['blue lighten-5'],
			},
      {
				text:  'Nascimento',
				value: 'nascimento',
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
    carregaCliente() {
      axios.post(`${baseUrl}/cliente/search`)
      .then(res => this.clientes = res.data)
      //.catch(function(e) { console.log(e)})
      .catch(erro => console.log(erro))
    },
    formatDate(date) {
      return formatDate(date)
    },
    imprimir() {
      window.print();
    }
	},
	mounted() {
		this.carregaCliente();
	},
}
</script>
<style scoped>

</style>