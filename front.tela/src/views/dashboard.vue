<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md4>
              <TotalVendas/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn fab small flat color="success" title="Venda"><v-icon>mdi-clipboard-text</v-icon></v-btn>
        <v-btn fab small falt @click="novoCliente" color="success" title="Cadastrar Cliente"><v-icon>mdi-account-plus</v-icon></v-btn>
      </v-card-actions>
      <ClienteCadastro  :value="clienteNovo" :mode="dialog" @fechaDialogo="dialog=false" @carrega="carregaCliente"/>
    </v-card>
  </div>
</template>

<script>
import ClienteCadastro from '@/components/ClienteCadastro'
import TotalVendas from '@/components/TotalVendas'
export default {
  components: { ClienteCadastro, TotalVendas },
  name: 'ch-dashboard',
  data() {
    return {
      dialog: false,
      titulo: 'Dahboard'
    }
  },
  methods: {
    novoCliente() {
      this.clienteNovo = {}
      this.dialog = true
    }
  }
}
</script>

<style>

</style>