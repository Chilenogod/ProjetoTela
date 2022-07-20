<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md2>
              <v-text-field hide-details outlined dense v-model="usuario.id" filled readonly label="Cod."/>
            </v-flex>
            <v-flex xs12 sm12 md5>
              <v-text-field hide-details outlined dense v-model="usuario.nome" label="Nome"/>
            </v-flex>
            <v-flex xs12 sm12 md5>
              <v-text-field hide-details outlined dense v-model="usuario.sobrenome" label="Sobrenome"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined dense v-model="usuario.email" label="E-mail"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field hide-details outlined dense v-model="usuario.cpf" label="CPF"/>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field hide-details outlined dense v-maska="'##/##/####'" v-model="usuario.nascimento" label="Nascimento"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field hide-details outlined dense v-model="usuario.cidade" label="Cidade"/>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-select hide-details outlined dense v-model="usuario.estado" :items="estados" item-text="nome" item-value="valor" label="Estado" />
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md8>
              <v-text-field hide-details outlined dense v-model="usuario.login" label="Login"/>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field hide-details outlined dense v-model="usuario.senha" label="Senha"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-radio-group row v-model="usuario.genero">
                <v-radio value="M" label="Masculino" />
                <v-radio value="F" label="Feminino" />
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="salvaUsuario" color="primary" >Salvar</v-btn>
        <v-btn @click="reset" color="secondary">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { baseUrl } from '@/global'
import axios from 'axios'

export default {
  name: 'ch-usuarioCadastro',
  props: [ 'value', 'mode' ],
  data() {
    return {
      dialog: false,
      usuario: {},
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
        this.usuario = { ...this.value }
        if(this.usuario.id) this.title = 'Alteraçao de Usuário'
        else this.title = 'Cadastro de Usuário'
      }
      this.dialog = this.mode
      this.usuario.nascimento = this.$options.filters.formatDate(this.value.nascimento);
    },
  },
  methods: {
    reset() {
      this.usuario = {}
      this.dialog = false
      this.title = ''
      this.$emit('fechaDialogo', null)
    },
    salvaUsuario() {
      const metod = this.usuario.id ? 'put' : 'post';
      axios[metod](`${ baseUrl }/usuario`, this.usuario)
      .then(res => {
        console.log(this.usuario)
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