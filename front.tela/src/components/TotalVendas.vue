<template>
<v-container grid-list-md>
  <v-layout wrap>
    <v-flex xs12 sm12 md4>
      <v-card color="primary">
        <v-card-title>Total Vendido <v-spacer/><v-icon>mdi-cash-check</v-icon></v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <p class="text-h3 mb-1" >
                  R$ {{ parseFloat( totalVendas.total_vendas ).toLocaleString('pt-br', {minimumFractionDigits:2}) }}
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md3>
      <v-card color="primary">
        <v-card-title>Total de Pedidos <v-spacer/><v-icon>mdi-cash-check</v-icon></v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <p class="text-h3 mb-1" >
                  {{ parseFloat( totalVendasPedidos.total_pedidos ) }}
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
import { baseUrl } from '@/global'
export default {
  name: 'ch-totalVendas',
  data() {
    return {
      totalVendas: {
        total_vendas: '',
      },
      totalVendasPedidos: {
        total_pedidos: '',
      },
    }
  },
  methods: {
    carregaTotalVendas() {
      axios.post(`${ baseUrl }/totalVendas`)
      .then(res => {
        this.totalVendas = res.data[0];
        console.log(res.data)
      })
      .catch(erro => console.log(erro))
    },

    carregaTotalVendasPedidos() {
      axios.post(`${ baseUrl }/totalVendas/pedidos`)
      .then(res => {
        this.totalVendasPedidos = res.data[0];
        console.log(res.data)
      })
      .catch(erro => console.log(erro))
    }
  },
  mounted() {
    this.carregaTotalVendas();
    this.carregaTotalVendasPedidos();
  }
}
</script>

<style>

</style>