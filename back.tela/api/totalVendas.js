const pg = require('./pg')
let tabela = 'vendas_items'

function totalVendasShow(req, res) {
  let sql = `SELECT SUM(quantidade*preco) AS total_vendas FROM ${tabela}`
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