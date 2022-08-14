<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md2>
              <v-text-field hide-details outlined dense v-model="cliente.id" filled readonly label="Cod."/>
            </v-flex>
            <v-flex xs12 sm12 md5>
              <v-text-field hide-details outlined dense v-model="cliente.nome" label="Nome"/>
            </v-flex>
            <v-flex xs12 sm12 md5>
              <v-text-field hide-details outlined dense v-model="cliente.sobrenome" label="Sobrenome"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined dense v-model="cliente.email" label="E-mail"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field hide-details outlined dense v-model="cliente.documento" label="CPF"/>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <InputDate v-model="cliente.nascimento" label="Nascimento"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined dense v-model="cliente.telefone" label="Telefone"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md9>
              <v-text-field hide-details outlined dense v-model="cliente.rua" label="Rua"/>
            </v-flex>
            <v-flex xs12 sm12 md3>
              <v-text-field hide-details outlined dense v-model="cliente.numero" label="Numero"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field hide-details outlined dense v-model="cliente.cidade" label="Cidade"/>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select hide-details outlined dense v-model="cliente.estado" :items="estados" item-text="nome" item-value="valor" label="Estado" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="salvaCliente" color="primary" >Salvar</v-btn>
        <v-btn @click="reset" color="secondary">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { baseUrl } from '@/global'
import axios from 'axios'
import InputDate from '@/components/InputDate'

export default {
  name: 'ch-clienteCadastro',
  components: { InputDate },
  props: [ 'value', 'mode' ],
  data() {
    return {
      dialog: false,
      cliente: {},
      estados: [
        {
          nome: 'Acre',
          valor: 'AC',
        },
        {
          nome: 'Alagoas',
          valor: 'AL',
        },
        {
          nome: 'Amapá',
          valor: 'AP',
        },
        {
          nome: 'Amazonas',
          valor: 'AM',
        },
        {
          nome: 'Bahia',
          valor: 'BA',
        },
        {
          nome: 'Ceará',
          valor: 'CE',
        },
        {
          nome: 'Distrito Federal',
          valor: 'DF',
        },
        {
          nome: 'Espirito Santo',
          valor: 'ES',
        },
        {
          nome: 'Goiás',
          valor: 'GO',
        },
        {
          nome: 'Maranhão',
          valor: 'MA',
        },
        {
          nome: 'Mato Grosso',
          valor: 'MT',
        },
        {
          nome: 'Mato Grosse do Sul',
          valor: 'MS',
        },
        {
          nome: 'Minas Gerais',
          valor: 'MG',
        },
        {
          nome: 'Pará',
          valor: 'PA',
        },
        {
          nome: 'Paraíba',
          valor: 'PB',
        },
        {
          nome: 'Paraná',
          valor: 'PR',
        },
        {
          nome: 'Pernambuco',
          valor: 'PE',
        },
        {
          nome: 'Piauí',
          valor: 'PI',
        },
        {
          nome: 'Rio de Janeiro',
          valor: 'RJ',
        },
        {
          nome: 'Rio Grande do Norte',
          valor: 'RN',
        },
        {
          nome: 'Rio Grande do Sul',
          valor: 'RS',
        },
        {
          nome: 'Rondônia',
          valor: 'RO',
        },
        {
          nome: 'Roraima',
          valor: 'RR',
        },
        {
          nome: 'Santa Catarina',
          valor: 'SC',
        },
        {
          nome: 'São Paulo',
          valor: 'SP',
        },
        {
          nome: 'Sergipe',
          valor: 'SE',
        },
        {
          nome: 'Tocantins',
          valor: 'TO',
        },
      ],
      title: '',
    }
  }, 
  computed: {

  },
  watch: {
    mode() {
      if(this.mode) {
        this.cliente = { ...this.value }
        if(this.cliente.id) this.title = 'Alteraçao de Cliente'
        else this.title = 'Cadastro de Cliente'
      }
      this.dialog = this.mode
    },
  },
  methods: {
    reset() {
      this.cliente = {}
      this.dialog = false
      this.title = ''
      this.$emit('fechaDialogo', null)
    },
    salvaCliente() {
      const metod = this.cliente.id ? 'put' : 'post';
      axios[metod](`${ baseUrl }/cliente`, this.cliente)
      .then(res => {
        console.log(this.cliente)
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.$emit('carrega')
        this.reset() 
      })
      .catch(erro => this.$toasted.global.defaultError({msg: erro}))
    }
  }
}
</script>

<style>

</style>