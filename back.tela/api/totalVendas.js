const pg = require('./pg')
let tabela = 'vendas'

function totalVendasShow(req, res) {
  let sql = `SELECT SUM(total) AS total_vendas FROM ${tabela}`
  console.log(sql)
  pg.pool.query(sql, [], (erro, totalVendas) => {
    if(erro) {
      console.log(erro)
      return
    }
    res.json(totalVendas.rows);
  })
}

function totalVendasPedidosShow(req, res) {
  let sql = `SELECT COUNT(*) AS total_pedidos FROM ${tabela}`
  console.log(sql)
  pg.pool.query(sql, [], (erro, totalPedidos) => {
    if(erro) {
      console.log(erro)
      return
    }
    res.json(totalPedidos.rows);
  })
}

module.exports = {
    totalVendasShow,
    totalVendasPedidosShow
}