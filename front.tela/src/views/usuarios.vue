<template>
  <div>
    <v-layout class="on-print">Usuário Logado:{{ user.nome }}<v-spacer />Emissão: {{formatDateTime()}}</v-layout>
    <v-toolbar flat>
      <v-toolbar-title>Usuários</v-toolbar-title>
      <v-spacer/>
      <v-btn @click="atualizaUsuario({})" color="success" dark fab small title="Novo Usuário"><v-icon>mdi-account-plus</v-icon></v-btn>
      <v-btn @click="imprimir" color="info" dark fab small title="Imprimir"><v-icon>mdi-printer</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="usuarios" hide-default-footer disable-pagination dense @click:row="atualizaUsuario">
      <template v-slot:[`item.cidade`]="{ item }">{{item.cidade}}/{{item.estado}}</template>
      <template v-slot:[`item.nome`]="{ item }">{{item.nome}} {{item.sobrenome}}</template>
      <template v-slot:[`item.nascimento`]="{ item }">{{ formatDate(item.nascimento)  }}</template>
      <template v-slot:[`item.genero`]="{ item }">{{ item.genero == 'M' ? 'Masculino' : 'Feminino' }}</template>
      <template v-slot:[`item.cpf`]="{ item }">{{ item.cpf | formatDocument }}</template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small id="no-print" class="mr-2 no-print" @click.stop="atualizaUsuario(item)" color="primary" title="Alterar Usuário">mdi-pencil</v-icon>
        <v-icon small id="no-print" class="mr-2 no-print" @click.stop="apagaUsuario(item)" color="error" title="Excluir Usuário">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <UsuarioCadastro :value="usuarioNovo" :mode="dialog" @fechaDialogo="dialog=false" @carrega="carregaUsuario"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { baseUrl, formatDate, formatDateTime, getNow } from '@/global'
import axios from 'axios'
import UsuarioCadastro from '@/components/UsuarioCadastro'

export default {
  components: { UsuarioCadastro },
  computed: mapState(['user']),
  name:  "ch-usuarios",
  data() {
    return {
      dialog: false,
      usuarios:[],
      usuarioNovo: {},
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
        text:  'Usuário',
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
        text:  'CPF',
				value: 'cpf',
				align: 'center',
				sortable: true,
				class: ['blue lighten-5'],
			},
      {
				text:  'Nascimento',
				value: 'nascimento',
				align: 'center',
				class: ['blue lighten-5'],
			},
      {
        text:  'Genero',
				value: 'genero',
        align: 'left',
				sortable: false,
				class: ['blue lighten-5'],
			},
			{
				text:  'Cidade/UF',
				value: 'cidade',
				align: 'center',
				class: ['blue lighten-5'],
			},
      {
        text: 'Ação',
        value: 'action',
        sortable: false,
        width: 100 ,
        class: ['blue lighten-5', 'no-print'],
      }
			]
    }
  },
	methods: {
    apagaUsuario(item) {
      if(confirm(`Deseja apagar a usuário ${item.nome}`))
      axios.delete(`${ baseUrl }/usuario?id=${item.id}`)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.carregaUsuario()
      })
      .catch(erro => console.log(erro))
    },
    atualizaUsuario(item) {
      this.usuarioNovo = { ...item };
      this.dialog = true
    },
    carregaUsuario() {
      axios.get(`${baseUrl}/usuario`)
      .then(res => this.usuarios = res.data)
      //.catch(function(e) { console.log(e)})
      .catch(erro => console.log(erro))
    },
    formatDate(value) {
      return formatDate(value)
    },
    formatDateTime() {
      return formatDateTime(getNow())
    },
    imprimir() {
      setTimeout(() => { window.print() }, 4000)
    }
	},
	mounted() {
		this.carregaUsuario();
	},
}
</script>
<style scoped>

</style>