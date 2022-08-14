
export const baseUrl = 'http://localhost:3000'
import { format as dateFormat, parseISO } from 'date-fns'

export function formatDate(value) {
	if (value) return dateFormat(parseISO(value), 'dd/MM/yyyy')
}

export function formatDateAnsi(value = null) {
	if (value) {
		try {
			return dateFormat(parseISO(String(value).slice(0, 10)), 'yyyy-MM-dd')
		} catch (e) {
			return ''
		}
	} else {
		return dateFormat(new Date, 'yyyy-MM-dd')
	}
}

export function formatDateTime(value) {
	if (value) {
		try {
			return dateFormat(parseISO(value), 'dd/MM/yyyy HH:mm')
		} catch (e) {
			return ''
		}
	}
}

export function formatDateTimeAnsi(value = null) {
	if (value) {
		return dateFormat(parseISO(value), 'yyyy-MM-dd HH:mm:ss')
	} else {
		return dateFormat(new Date, 'yyyy-MM-dd HH:mm:ss')
	}
}

export function formatDay(value) {
	if (value) return dateFormat(parseISO(value), 'dd/MM')
}

export function formatNumber(value, dec) {
	return parseFloat(value) ? parseFloat(value).toLocaleString('pt-br', { minimumFractionDigits: dec }) : '0'
}

export function getNow(locale = null) {
	const dNow = new Date()
	let month = (dNow.getMonth() + 1)
	if (month.toString().length == 1) {
		month = '0' + month
	}
	if (locale == 'pt-br') return dNow.getDate() + '/' + month + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes()
	if (locale == 'MMAAAA') return month + '/' + dNow.getFullYear()
	if (locale == 'AAAAMM') return dNow.getFullYear() + '/' + month
	if (locale == 'AAAA') return dNow.getFullYear()
	if (locale == 'HH') return dNow.getHours()
	if (locale == 'd1') dNow.setDate(dNow.getDate() + 1)
	if (locale == 'd-1') dNow.setDate(dNow.getDate() - 1)
	if (locale == 'm') dNow.setDate(1)
	return dNow.toISOString()
}

export default {
    baseUrl,
    formatDate,
    formatDateAnsi,
    getNow,
    


}
