<template>
  <div>
    <v-toolbar flat >
      <v-toolbar-title>Funcionários</v-toolbar-title>
      <v-spacer/>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Procurar" hide-details/>
      <v-btn fab small  @click="atualizaFuncionario({})" dark color="success" title="Novo funcionário"><v-icon>mdi-account-plus</v-icon></v-btn>
      <v-btn @click="imprimir" color="info" dark fab small title="Imprimir"><v-icon>mdi-printer</v-icon></v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="funcionarios" :search="search" dense hide-default-footer disable-pagination @click:row="atualizaFuncionario">
      <template v-slot:[`item.nome`]="{ item }">{{ item.nome }} {{ item.sobrenome }}</template>
      <template v-slot:[`item.genero`]="{ item }">{{ item.genero == 'M' ? 'Masculino' : 'Feminino' }}</template>
      <template v-slot:[`item.salario`]="{ item }">R${{ parseFloat( item.salario || 0).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small id="no-print"  @click.stop="atualizaFuncionario(item)" color="primary" title="Alterar funcionário">mdi-pencil</v-icon>
        <v-icon small id="no-print"  @click.stop="apagaFuncionario(item)" color="error" title="Excluir funcionário">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <FuncionarioCadastro :value="funcionarioNovo" :mode="dialog" @fecharDialogo="dialog=false" @carrega="carregaFuncionario"/>  
  </div>
</template>
<script>
import FuncionarioCadastro from '@/components/FuncionarioCadastro'
import { baseUrl } from '@/global'
import axios from 'axios'


export default {
  name: "ch-funcionarios",
  components: { FuncionarioCadastro },
  data() {
    return {
      dialog: false,
      funcionarios:[],
      funcionarioNovo: {},
      headers:[
        {
          text: 'ID',
          value: 'id',
          align: 'end',
          sortable: true,
          width: 50,
          class: [ 'blue lighten-5' ],
        },
        {
          text: 'Funcionario',
          value: 'nome',
          align: 'left',
          sortable: true,
          class: [ 'blue lighten-5' ],
        },
        {
          text: 'E-mail',
          value: 'email',
          align: 'center',
          class: [ 'blue lighten-5' ],
        },
        {
          text: 'Genero',
          value: 'genero',
          align: 'center',
          class: [ 'blue lighten-5' ],
        },
        {
          text: 'Endereço',
          value: 'cidade',
          align: 'left',
          class: [ 'blue lighten-5' ]
        },
        {
          text: 'Empresa',
          value: 'empresa',
          align: 'left',
          class: [ 'blue lighten-5' ]
        },
        {
          text: 'Salario',
          value: 'salario',
          align: 'left',
          class: [ 'blue lighten-5' ]
        },
        {
          text: 'Ação',
          value: 'action',
          width: 70,
          sortable: false,
          class: [ 'no-print', 'blue lighten-5' ]
        }
      ],
      search: '',
      tipo: 'success',
    }
  },
  methods: {
    apagaFuncionario(item) {
      if(confirm(`Deseja excluir o funcionario ${item.nome}`))
      axios.delete(`${baseUrl}/funcionario?id=${item.id}`)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.carregaFuncionario()
      })
      .catch(erro => console.log(erro))  
    },
    atualizaFuncionario(item) {
      this.funcionarioNovo = { ...item };
      this.dialog = true

    },
    carregaFuncionario() {
      axios.get(`${baseUrl}/funcionario`)
      .then(res => this.funcionarios = res.data)
      .catch(erro => console.log(erro))
    },
    imprimir() {
      window.print()
    }

  },
  mounted() {
   this.carregaFuncionario()
  },
}
</script>
<style>
@media print {
  .v-text-field {
    display: none;
  }
}
</style>