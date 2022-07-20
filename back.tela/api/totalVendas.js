const pg = require('./pg')
let tabela = 'ordem_saida'

function totalVendasMostra(req, res) {
  let sql = `SELECT SUM(qtd_saida*valor) AS total_vendas FROM ${tabela}`
  console.log(sql)
  pg.pool.query(sql, [], (erro, totalVendas) => {
    if(erro) {
      console.log(erro)
      return
    }
    res.json(totalVendas.rows);
  })
}

module.exports = {
    totalVendasMostra,
}