<template>
  <v-card color="green">
    <v-card-title>Total Vendido <v-spacer/><v-icon>mdi-cash-check</v-icon></v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12 md12>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h3 mb-1" >
                  R$ {{ parseFloat( totalVendas.total_vendas ).toLocaleString('pt-br', {minimumFractionDigits:2}) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
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
    }
  },
  mounted() {
    this.carregaTotalVendas();
  }
}
</script>

<style>

</style>