<template>
	<v-menu v-model="menuPicker" :close-on-content-click="false" :nudge-right="10" offset-y min-width="290px">
		<template v-slot:activator="{ on }">
			<v-text-field outlined 
										clearable 
										dense 
										:dark="dark" 
										v-model="dataDig" 
										hide-details 
										:label="label" 
										append-icon="mdi-calendar" 
										:readonly="readonly" 
										:disabled="disabled" 
										v-mask="mask" 
										v-on="on"
										@input="mudaData" 
										@keyup.m="mes"
										@keyup.h="hoje"
										@keyup.o="ontem"
										@keyup.a="amanha"></v-text-field>
		</template>
		<v-date-picker locale="pt" v-model="actualDate" @input="changeDate"></v-date-picker>
	</v-menu>
</template>

<script>
import { formatDateAnsi, formatDate, getNow } from '@/global'
import { mask } from 'vue-the-mask'

export default {
	name: 'ay-input-date',
	props: ['value', 'label', 'disabled', 'readonly', 'dark'],
	directives: {
		mask,
	},
	data() {
		return {
			mask: '##/##/####',
			menuPicker: false,
			actualDate: formatDateAnsi(this.value),
			dataDig: formatDate(this.value),
		}
	},
	watch: {
		value() {
			this.actualDate = formatDateAnsi(this.value)
			this.dataDig = formatDate(this.value)
		},
	},
	methods: {
		mes() {
			this.dataDig = formatDate(getNow('m'))
			this.actualDate = formatDateAnsi(getNow('m'))
			this.changeDate()
		},
		hoje() {
			this.dataDig = formatDate(getNow())
			this.actualDate = formatDateAnsi(getNow())
			this.changeDate()
		},
		ontem() {
			this.dataDig = formatDate(getNow('d-1'))
			this.actualDate = formatDateAnsi(getNow('d-1'))
			this.changeDate()
		},
		amanha() {
			this.dataDig = formatDate(getNow('d1'))
			this.actualDate = formatDateAnsi(getNow('d1'))
			this.changeDate()
		},
		changeDate() {
			this.dataDig = formatDate(this.actualDate)
			this.exit()
		},
		mudaData() {
			if (!this.dataDig) {
				this.actualDate = null
				this.exit()
			}	
			else if(this.dataDig.length == 10) {
				let dt = this.dataDig.slice(6, 10) + '-' + this.dataDig.slice(3, 5) + '-' + this.dataDig.slice(0, 2)
				this.actualDate = dt
				this.exit()
			}	
		},
		exit() {
			this.$emit('input', this.actualDate)
			this.menuPicker = false
		}
	},
}
</script>

<style></style>
