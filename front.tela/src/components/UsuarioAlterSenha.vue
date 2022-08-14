<template>
  <v-dialog v-model="dialog" max-width="300px" persistent>
    <v-card>
      <v-card-title>{{ title }} <!--Usuario logado: {{ user.login }}--></v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined dense type="password" v-model="usuario.senhaAntiga" label="Senha Antiga"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined dense type="password" v-model="usuario.senhaNova" label="Nova Senha"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field hide-details outlined dense type="password" v-model="usuario.senhaRepeat" label="Repetir Nova Senha"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="atualizaUsuarioSenha" color="primary" >Salvar</v-btn>
        <v-btn @click="reset" color="secondary">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { baseUrl } from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'ch-usuarioAlterSenha',
  props: [ 'value', 'mode' ],
  data() {
    return {
      dialog: false,
      usuario: {},
      usuarioSenha: {},
      title: '',
    }
  }, 
  computed: mapState(['user']),
  watch: {
    mode() {
      if(this.mode) {
        this.usuario = { ...this.value }
        this.title = 'Alteracao de Senha'
      }
      this.dialog = this.mode
      //this.usuario.nascimento = this.$options.filters.formatDate(this.value.nascimento);
    },
  },
  methods: {
    reset() {
      this.usuario = {}
      this.dialog = false
      this.title = ''
      this.$emit('fechaDialogo', null)
    },
    atualizaUsuarioSenha() {
      console.log(this.usuario)
      axios.put(`${ baseUrl }/usuario/senha`, this.usuario)
      .then(res => {
        console.log(this.usuario)
      
        this.$toasted.global.defaultSuccess({msg: res.data.msg})
        this.$emit('carrega')
        this.reset() 
      })
      .catch(erro => {
        console.log(erro)
        this.$toasted.global.defaultError({msg: erro.response.data.msg})
      })
    }
  }
}
</script>

<style>

</style>