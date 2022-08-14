const pg = require('./pg')
let tabela = 'produtos'

function estoqueMostra(req, res) {
  let sql = `SELECT * FROM estoque_view WHERE 1=1`
    if(req.body.search) sql += ` AND UPPER(produto) like '%${req.body.search.toUpperCase()}%'`
    if(req.query.search) sql += ` AND UPPER(produto) like '%${req.query.search.toUpperCase()}%'`
    console.log(sql)
  pg.pool.query(sql, [], (erro, produtos) => {
    if(erro) {
      console.log(erro)
      return
    }
    if(produtos.rowCount > 0) {
      res.json(produtos.rows);
    } else res.json({msg: 'Produto nao encontrado!'})
  })  
}

function estoqueSalva(req, res) {
  let sql = `INSERT INTO ${tabela} (produto, valor, categoria, qtd_estoque, descricao)
             VALUES($1, $2, $3, $4, $5)`
  let val = [
    req.body.produto,
    req.body.valor,
    req.body.categoria,
    req.body.qtd_estoque,
    req.body.descricao
  ]
  pg.pool.query(sql, val, (erro, produtos) => {
    if(erro) {
      res.json(erro)
      return
    }
    res.json({msg:'Produto cadastrado com sucesso.'})
    })
}

function estoqueAtualiza(req, res) {
  let sql = `UPDATE ${tabela} SET produto = $1, 
                                  valor = $2 , 
                                  categoria = $3,
                                  qtd_estoque = $4,
                                  descricao = $5
                                  WHERE id = $6`
  let val = [
    req.body.produto,
    req.body.valor,
    req.body.categoria,
    req.body.qtd_estoque,
    req.body.descricao,
    req.body.id
  ]
  pg.pool.query(sql, val, (erro, produtos) => {
    if(erro) {
      res.json(erro)
      return
    }
    res.json({msg:'Produto atualizado com sucesso!'})
  })    
}

function estoqueApaga(req, res) {
  let sql = `DELETE FROM ${tabela} WHERE id=$1`
  pg.pool.query(sql, [req.query.id], (erro, produtos) => {
    if(erro) {
      res.json(erro)
      return
    }
    if(produtos.rowCount > 0) res.json({msg: 'Produto excluido com sucesso.'})
    else res.json({msg: 'Produto nao encontrado.'})
  })
}
module.exports = {
    estoqueMostra,
    estoqueSalva,
    estoqueAtualiza,
    estoqueApaga
}