<template>
  <div>
    <v-card class="blue lighten-4">
      <v-card-text>
        <TotalVendas/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn fab small @click="novoVenda" color="success" title="Venda"><v-icon>mdi-clipboard-text</v-icon></v-btn>
        <v-btn fab small @click="novoCliente" color="success" title="Cadastrar Cliente"><v-icon>mdi-account-plus</v-icon></v-btn>
      </v-card-actions>
      <ClienteCadastro  :value="clienteNovo" :mode="dialogCli" @fechaDialogo="dialogCli=false" />
      <VendaCadastro :value="vendaNovo" :mode="dialogVen" @fechaDialogo="dialogVen=false" />
    </v-card>
  </div>
</template>

<script>
import ClienteCadastro from '@/components/ClienteCadastro'
import TotalVendas from '@/components/TotalVendas'
import VendaCadastro from '@/components/VendaCadastro'
export default {
  components: { ClienteCadastro, TotalVendas, VendaCadastro },
  name: 'ch-dashboard',
  data() {
    return {
      clienteNovo: {},
      dialogCli: false,
      dialogVen: false,
      titulo: 'Dahboard', 
      vendaNovo: {},
    }
  },
  methods: {
    novoCliente() {
      this.clienteNovo = {}
      this.dialogCli = true
    },
    novoVenda() {
      this.vendaNovo = {}
      this.dialogVen = true
    }
  }
}
</script>

<style>

</style>