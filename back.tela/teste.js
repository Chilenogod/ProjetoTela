const cliente = {
    nome: 'Leandro',
    telefone: '27 997262223',
    idade: 48,
    calculaIdade(ano, anoNascimento) {
        return ano-anoNascimento
    }
}
let a = { ...cliente }
let b = 8
let c = b
c = 4
a.nome =  'Roger'

console.log(a.telefone)