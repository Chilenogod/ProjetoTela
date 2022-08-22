const pg = require('./pg')
let tabela = 'clientes'

function clienteApaga(req, res) {
  let sql = `DELETE FROM ${tabela} WHERE id=${req.query.id}`
  console.log(sql)
  pg.pool.query(sql, [], (erro, clientes) => {
    if(erro) {
      res.json(erro)
      return
    }
    if(clientes.rowCount > 0) res.json({mgs:'cliente apagado com sucesso!'})
    else res.json({msg:'Nenhum cliente encontrado!'})
    })
}

function clienteAtualiza(req, res) {
  let sql = `UPDATE ${tabela} SET nome = $1,
                                  sobrenome = $2,
                                  documento = $3,
                                  nascimento = $4,
                                  rua = $5,
                                  cidade = $6,
                                  numero = $7,
                                  estado = $8,
                                  telefone = $9,
                                  email = $10
                                  WHERE id = $11`

  let val = [
    req.body.nome,
    req.body.sobrenome,
    req.body.documento,
    req.body.nascimento,
    req.body.rua,
    req.body.cidade,
    req.body.numero,
    req.body.estado,
    req.body.telefone,
    req.body.email,
    req.body.id
  ]
  pg.pool.query(sql, val, (erro, clientes) => {
    if(erro) {
      res.json(erro)
      return
    }
    res.json({msg:'Cliente atualizado com sucesso!'})
  })
}

function clienteMostra(req, res) {
  let sql = `SELECT *,nome || ' ' || sobrenome as ds_cliente FROM ${tabela} WHERE 1=1`
    if(req.body.search) sql += ` AND UPPER( nome || sobrenome || documento )  LIKE '%${req.body.search.toUpperCase()}%'`
    if(req.query.search) sql += ` AND UPPER( nome || sobrenome || documento )  LIKE '%${req.query.search.toUpperCase()}%'`

  pg.pool.query(sql, [], (erro, clientes) => {
    if(erro) {
      res.json(erro)
      return
    }
    res.json(clientes.rows)
  })
}

function clienteSalva(req, res) {
  let sql = `INSERT INTO ${tabela} (nome, sobrenome, documento, nascimento, rua, cidade, numero, estado, telefone, email)
             VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
  let val = [
    req.body.nome,
    req.body.sobrenome,
    req.body.documento,
    req.body.nascimento,
    req.body.rua,
    req.body.cidade,
    req.body.numero,
    req.body.estado,
    req.body.telefone,
    req.body.email
  ]

  console.log(sql)

  pg.pool.query(sql, val, (erro, clientes) => {
    if(erro) {
      res.json(erro)
      return
    }
    res.json({msg:'Cliente cadastrado com sucesso!'})
  })
    
}




module.exports = {
  clienteApaga,
  clienteAtualiza,
  clienteMostra,
  clienteSalva
}