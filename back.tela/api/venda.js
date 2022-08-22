const pg = require('./pg')
let tabela = 'vendas'

function vendaMostra(req, res) {
  let sql = `SELECT `
    if(req.query.group) { sql += `${req.query.group}, SUM(venda_total) as venda_total, count(${req.query.group}) AS qtd_pedidos` } 
    else sql += `* `
      sql += ` FROM vendas_view WHERE 1=1`
    if(req.query.group) sql += ` GROUP BY ${req.query.group} ORDER BY ${req.query.group} `
    if(req.body.sss)  sql += ` AND `
    console.log(sql)
  pg.pool.query(sql, [], (erro, vendas) => {
    if(erro) {
      console.log(erro)
      return
    }
    if(vendas.rowCount > 0) {
      res.json(vendas.rows);
    } else res.json({msg: 'Pedido nao encontrado!'})
  })  
}

function vendaClienteMostra(req, res) {
  let sql = `SELECT c.id, c.nome, c.sobrenome FROM vendas as v, clientes as c WHERE v.cd_cliente=c.id and v.id=$1 order by id`

  pg.pool.query(sql, [req.query.id], (erro, vendas) => {
    if(erro) {
      console.log(erro)
      return
    }
    if(vendas.rowCount > 0) {
      res.json(vendas.rows);
    } else res.json({msg: 'Cliente nao encontrado!'})
  })  
}

function vendaItemsMostra(req, res) {
  let sql = `SELECT i.valor as valor,i.qtd as qtd,p.id,p.produto FROM vendas_items as i,produtos as p WHERE i.cd_produto=p.id and i.cd_venda=$1 order by id`

  pg.pool.query(sql, [req.query.id], (erro, cliente) => {
    if(erro) {
      console.log(erro)
      return
    }
    if(cliente.rowCount > 0) {
      res.json(cliente.rows);
    } else res.json({msg: 'Itens nao encontrados!'})
  })  
}

function vendaSalva(req, res) {
  let sql = `INSERT INTO ${tabela} (cd_cliente, cd_usuario, total)
             VALUES($1, $2, $3) returning id `
  let val = [
    req.body.cliente.id,
    req.body.vendedor,
    req.body.total,
  ]
  pg.pool.query(sql, val, (erro, venda) => {
    if(erro) {
      res.status(500).json(erro)
      return
    }
    let id = venda.rows[0].id
    sql =  `INSERT INTO vendas_items (cd_venda, cd_usuario, cd_produto, qtd, valor) values($1 ,$2 ,$3, $4, $5)`
    req.body.items.forEach(item => {
      val =[
        id,
        req.body.vendedor,
        item.id,
        item.qtd,
        item.valor,
      ]
      pg.pool.query(sql, val, (erro, venda) => {
        if(erro) {
          res.json(erro)
          return
        }
      })  
    });
    res.status(200).json({msg:'Pedido efetuado com sucesso.'})
  })
}

function vendaAtualiza(req, res) {
  let sql = `UPDATE ${tabela} SET cd_cliente = $1, 
                                  cd_usuario = $2 , 
                                  total = $3,
                                  WHERE ordem_id = $4`
  let val = [
    req.body.cliente,
    req.body.usuario,
    req.body.total,
    req.body.id
  ]
  pg.pool.query(sql, val, (erro, produtos) => {
    if(erro) {
      res.status(500).json(erro)
      return
    }
    sql =  `DELETE FROM vendas_items WHERE cd_venda=${req.body.id}`
    pg.pool.query(sql, val, (erro, produtos) => {
      if(erro) {
        res.status(500).json(erro)
        return
      }
      sql =  `INSERT INTO vendas_items (cd_venda, cd_usuario, cd_produto, qtd, valor) values($1 ,$2 ,$3, $4, $5)`
      req.body.itens.forEach(item => {
        val =[
          req.body.id,
          req.body.usuario,
          item.produto,
          item.quantidade,
          item.preco
        ]
        pg.pool.query(sql, val, (erro, venda) => {
          if(erro) {
            res.status(500).json(erro)
            return
          }
        })
      })    
    });
    res.json({msg:'Pedido atualizado com sucesso!'})
  })    
}

function vendaApaga(req, res) {
  let sql = `DELETE FROM ${tabela} WHERE id=$1`
  pg.pool.query(sql, [req.query.cd_venda], (erro, produtos) => {
    if(erro) {
      res.json(erro)
      return
    }
    if(produtos.rowCount > 0) res.json({msg: 'Pedido cancelado com sucesso.'})
    else res.json({msg: 'Pedido nao encontrado.'})
  })
}
module.exports = {
    vendaMostra,
    vendaClienteMostra,
    vendaItemsMostra,
    vendaSalva,
    vendaAtualiza,
    vendaApaga
}