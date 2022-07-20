<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-title>{{ titulo }}</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <v-text-field hide-details outlined dense v-model="produto.id" filled readonly label="Cod."/>
            </v-flex>
            <v-flex xs12 sm12 md8>
              <v-text-field hide-details outlined dense v-model="produto.produto" label="Produto"/>
            </v-flex>
          </v-layout>
          <v-layout wrap>
          <v-flex xs12 sm12 md6>
            <v-text-field hide-details outlined dense v-model="produto.valor" label="Valor" prefix="R$"/>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-text-field hide-details outlined dense v-model="produto.qtd_estoque" label="Estoque"/>
          </v-flex>
          </v-layout>
          <v-layout wrap>
          <v-flex xs12 sm12 md12>
            <v-select hide-details outlined dense :items="categorias" item-text="nome" item-value="valor" v-model="produto.categoria" label="Produto"/>
          </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-textarea hide-details outlined dense v-model="produto.descricao" label="Descrição"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="salvaEstoque" color="success">Salvar</v-btn>
        <v-btn @click="reset" color="secondery">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import { baseUrl } from '@/global'
export default {
  name: 'ch-estoqueCadastro',
  props: [ 'value', 'mode' ],
  data() {
    return {
      categorias: [
        {
          nome: 'Acessório',
          valor: 'aces'
        },
        {
          nome: 'Informatica',
          valor: 'info'
        },
        {
          nome: 'Roupa',
          valor: 'roup'
        }
      ],
      dialog: null,
      produto: {},
      titulo: '',
    }
  },
  watch: {
    mode() {
      if(this.mode) {
        this.produto = { ...this.value }
        if(this.produto.produto_id) this.titulo = 'Alteração de Produto'
        else this.titulo = 'Cadastro de Produto'
      }
      this.dialog = this.mode 
    }
  },
  methods: {
    reset() {
      this.produto = {}
      this.dialog = false
      this.titulo = ''
      this.$emit('fecharDialogo')
    },
    salvaEstoque() {
      const metod = this.produto.id ? 'put' : 'post'
      axios[metod](`${ baseUrl }/estoque`, this.produto)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg : res.data.msg})
        this.$emit('carrega')
        this.reset()
      }) 
      .catch(erro => console.log(erro))
    },
  }
}
</script>

<style>

</style>