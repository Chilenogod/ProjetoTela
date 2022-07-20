<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>{{ titulo }}</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
               <v-flex xs12 sm12 md2>
                <v-text-field hide-details outlined dense v-model="funcionario.id" filled readonly label="Cód."/>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-text-field hide-details outlined dense v-model="funcionario.nome" label="Nome"/>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-text-field hide-details outlined dense  v-model="funcionario.sobrenome" label="Sobrenome"/>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field hide-details outlined dense v-model="funcionario.email" label="E-mail"/>
              </v-flex>  
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm12 md6>
                <v-text-field hide-details outlined dense v-model="funcionario.cidade" label="Cidade"/>
              </v-flex>
              <v-flex xs12 sm12 md6>
                <v-text-field hide-details outlined dense v-model="funcionario.pais" label="Pais"/>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm12 md8>
                <v-text-field hide-details outlined dense v-model="funcionario.empresa" label="Empresa"/>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field hide-details outlined dense v-model="funcionario.salario" label="Salario" prefix="R$"/>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-radio-group row v-model="funcionario.genero">
                  <v-radio value="M" label="Masculino" />
                  <v-radio value="F" label="Feminino" />
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-container> 
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="salvaFuncionario" color="primary">Salvar</v-btn>
          <v-btn @click="reset" color="secondary">Fechar</v-btn>
        </v-card-actions>
      </v-card> 
  </v-dialog>
</template>

<script>

import axios from 'axios'
import { baseUrl } from '@/global'

export default {
  name: 'ch-funcionarioCadastro',
  props: [ 'value', 'mode' ],
  data() {
    return {
      dialog: false,
      funcionario: {},
      titulo: '',
    }
  },
  watch: {
      mode() {
        if(this.mode) {
          this.funcionario = { ...this.value }
          if(this.funcionario.id) this.titulo =  'Alteraçao de Funcionário'
          else this.titulo = 'Cadastro de Funcionário'
        }
        this.dialog = this.mode
      }
  },
  methods: {
    reset() {
      this.funcionario = {}
      this.dialog = false
      this.titulo = ''
      this.$emit('fecharDialogo', null)
    },
    salvaFuncionario() {
      const metod = this.funcionario.id ? 'put' :  'post';
      axios[metod](`${ baseUrl }/funcionario`, this.funcionario)
      .then(res => {
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