<template>
  <v-dialog v-model="dialog" max-width="900" persistent>
    <v-card>
      <v-card-title>{{ titulo }}</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md2>
              <v-text-field hide-details outlined dense v-model="venda.venda_id" filled readonly label="Cod."/>
            </v-flex>
            <v-flex xs12 sm12 md3>
              <v-text-field hide-details outlined dense v-model="venda.emissao" label="Data"/>
            </v-flex>
            <v-flex xs12 sm12 md7>
              <v-text-field hide-details outlined dense v-model="user.nome" label="Vendedor"/>
            </v-flex>
          </v-layout>
          <v-toolbar flat dense>
            <v-toolbar-title>Dados do Cliente</v-toolbar-title>
            <v-spacer/>
            <v-autocomplete v-model="modelCliente" :items="itemsCliente" :search-input.sync="searchCliente" item-text="ds_cliente" item-value="id" outlined dense return-object></v-autocomplete>
          </v-toolbar>
          <!--Dados do Cliente-->
          <v-expand-transition v-if="modelCliente">
            <v-card>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md1>
                      <v-text-field hide-details outlined dense v-model="modelCliente.id" readonly label="Cod." />
                    </v-flex>
                    <v-flex xs12 sm12 md3>
                      <v-text-field hide-details outlined dense v-model="modelCliente.nome" readonly label="Nome" placeholder="Nome"/>
                    </v-flex>
                    <v-flex xs12 sm12 md3>
                      <v-text-field hide-details outlined dense v-model="modelCliente.sobrenome" readonly label="Sobrenome" placeholder="Sobrenome"/>
                    </v-flex>
                    <v-flex xs12 sm12 md3>
                      <v-text-field hide-details outlined dense v-model="modelCliente.documento" readonly label="Documento"/>
                    </v-flex>
                    <v-flex xs12 sm12 md2>
                      <v-text-field hide-details outlined dense v-model="modelCliente.nascimento" readonly label="Data Nascimento"/>
                    </v-flex>
                  </v-layout>
                  <!--Dados do Endereço-->
                  <v-layout wrap>
                    <v-flex xs12 sm12 md3>
                      <v-text-field hide-details outlined dense v-model="modelCliente.rua" readonly label="Rua"/>
                    </v-flex>
                    <v-flex xs12 sm12 md2>
                      <v-text-field hide-details outlined dense v-model="modelCliente.numero" readonly label="Numero"/>
                    </v-flex>
                    <v-flex xs12 sm12 md4>
                      <v-text-field hide-details outlined dense v-model="modelCliente.cidade" readonly label="Cidade"/>
                    </v-flex>
                    <v-flex xs12 sm12 md1>
                      <v-text-field hide-details outlined dense v-model="modelCliente.estado" readonly label="Estado"/>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn @click="atualizaCliente">Alterar</v-btn>
                <v-btn :disabled="!modelCliente" @click="modelCliente = null">Limpar</v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
          <v-toolbar flat dense >
            <v-toolbar-title>Produto</v-toolbar-title>
            <v-spacer/>
            <v-autocomplete v-model="modelProd" :items="itemsProd" :search-input.sync="searchProd" item-text="produto" item-value="id" outlined dense no-data-text="Digite para consultar" return-object></v-autocomplete>
          </v-toolbar>
          <!--Dados do Produto-->
          <v-expand-transition v-if="modelProd">
            <v-card>
              <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md2>
                  <v-text-field hide-details outlined dense  v-model="modelProd.id" readonly label="Cod. Prod."/>
                </v-flex>
                <v-flex xs12 sm12 md7>
                  <v-text-field hide-details outlined dense  v-model="modelProd.produto" readonly label="Produto"/>
                </v-flex>
                <v-flex xs12 sm12 md3>
                  <v-text-field hide-details outlined dense  v-model="modelProd.valor" readonly label="Valor" prefix="R$"/>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-textarea hide-details outlined dense  v-model="modelProd.descricao" readonly label="Qtd."/>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field hide-details outlined dense  v-model="modelProd.qtd" :default="1" label="Qtd."/>
                </v-flex>
              </v-layout>
            </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn :disabled="!modelProd" @click="adicionaProd">Adicionar</v-btn>
                <v-btn :disabled="!modelProd" @click="limpaProd">Limpar</v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
          <v-data-table :headers="headersProd" :items="itemsVenda" hide-default-footer disable-pagination dense>
            <template v-slot:[`item.valor`]="{ item }">R$ {{ parseFloat(item.valor).toLocaleString('pt-br', {minimumFractionDigits:2} )}}</template>
            <template v-slot:[`item.subtotal`]="{ item }"> R$ {{ parseFloat(item.qtd * item.valor).toLocaleString('pt-br', {minimumFractionDigits:2})}}</template> 
            <template v-slot:[`item.action`]="{ item }">
              <v-icon small id="no-print" class="mr-2 no-print" @click.stop="apagaProd(item)" color="error" title="Excluir Usuário">mdi-delete</v-icon>
            </template>
          </v-data-table>
          <v-footer v-if="ifTotal" class="text-right" color="primary lighten-3">
            <v-layout>
              <v-spacer/>
              <v-flex>
                <p>Total: R$ {{ parseFloat(venda.total).toLocaleString('pt-br', {minimumFractionDigits:2}) }}</p>
              </v-flex>
            </v-layout>
          </v-footer>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="salvaVenda" color="success">Salvar</v-btn>
        <v-btn @click="reset" color="secondery">Fechar</v-btn>
      </v-card-actions>
    </v-card>
    <ClienteCadastro :value="clienteAlter" :mode="dialogUser" @fechaDialogo="dialogUser=false" />
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { baseUrl } from '@/global'
import ClienteCadastro from '@/components/ClienteCadastro'
export default {
  name: 'ch-vendaCadastro',
  components: { ClienteCadastro },
  props: [ 'value', 'mode' ],
  data() {
    return {
      clienteAlter: {},
      dialog: false,
      dialogUser: false,
      searchCliente: '',
      searchProd: '',
      itemsCliente: [],
      itemsProd: [],
      itemsVenda: [],
      ifTotal: false,
      headersProd:[
        {
				text:  'Cod.Produto',
				value: 'id',
				align: 'end',
				sortable: true,
				class: ['blue lighten-5'],
        },
        {
				text:  'Produto',
				value: 'produto',
				align: 'end',
				sortable: true,
			
				class: ['blue lighten-5'],
        },
        {
				text:  'Qtd.',
				value: 'qtd',
				align: 'end',
				sortable: true,
	
				class: ['blue lighten-5'],
        },
        {
				text:  'Valor Unid.',
				value: 'valor',
				align: 'end',
				sortable: true,

				class: ['blue lighten-5'],
        },
        {
				text:  'Sub.Total',
				value: 'subtotal',
				align: 'end',
				sortable: true,

				class: ['blue lighten-5'],
        },
        {
        text: 'Ação',
        value: 'action',
        sortable: false,
        width: 100 ,
        class: ['blue lighten-5', 'no-print'],
      }
      ],
      venda: {},
      titulo: '',
      total: '',
      modelProd: null,
      modelCliente: null,
    }
  },
  computed: mapState(['user']),
  watch: {
    mode() {
      if(this.mode) {
        this.venda = { ...this.value }
        this.searchCliente = this.value.cliente
        this.venda.total = this.value.venda_total
        this.itemsVenda = this.value && this.value.items ? [ ...this.value.items ] : []
        if(this.venda.ordem_id) this.titulo = 'Alteração de Pedido'
        else this.titulo = 'Nova Pedido'
      }
      this.dialog = this.mode 
    },
    itemsVenda() {
      if(this.itemsVenda.length > 0) this.ifTotal = true
      else this.ifTotal = false
    },
    searchCliente() {
      //if(this.searchCliente.length == 0) return

      axios(`${baseUrl}/cliente/search?search=${this.searchCliente}`)
      .then(res => this.itemsCliente = res.data)
      .catch(erro => console.log(erro)) 
    },
    searchProd() {
      //if(this.searchProd.length == 0) return

      axios(`${baseUrl}/estoque/?search=${this.searchProd}`)
      .then(res => this.itemsProd = res.data)
      
      .catch(erro => console.log(erro)) 
    },
  },
  methods: {
    adicionaProd() {
      this.itemsVenda.push(this.modelProd)
      this.totalVenda()
      this.modelProd = null
      this.itemsProd = []
      this.searchProd = ''
    },
    apagaProd(prod) {
      let index = this.itemsVenda.indexOf(prod)
      this.itemsVenda.splice(index, 1)
      this.totalVenda()
    },
    atualizaCliente() {
      this.clienteAlter = { ...this.modelCliente };
      this.dialogUser = true
    },
    reset() {
      this.itemsCliente = []
      this.itemsProd = []
      this.itemsVenda = []
      this.modelCliente = null
      this.modelProd = null
      this.searchCliente = ''
      this.searchProd = ''
      this.venda = {}
      this.dialog = false
      this.titulo = ''
      this.$emit('fechaDialogo')
    },
    limpaProd() {
      this.modelProd = null
      this.itemsProd = []
      this.searchProd = null
    },
    salvaVenda() {
      this.venda.vendedor = this.user.id 
      this.venda.cliente = { ...this.modelCliente }
      this.venda.items = [ ...this.itemsVenda ]
      console.log(this.venda.vendedor)
      axios.post(`${ baseUrl }/venda/`, this.venda)
      .then(res => {
        this.$toasted.global.defaultSuccess({msg : res.data.msg})
        this.$emit('carrega')
        this.reset()
      }) 
      .catch(erro => console.log(erro))
    },
    totalVenda() {
     /*let rowCount = this.itemsVenda.length;
     let total = 0
     for(let i=0; i<rowCount; i++) {
      total = (this.itemsVenda[i].valor * this.itemsVenda[i].qtd) + total
     }*/
     this.venda.total = this.itemsVenda.reduce((prev, el) => prev += (el.qtd * el.valor),0)
     //console.log(total)
    }
  },
}
</script>

<style>

</style>