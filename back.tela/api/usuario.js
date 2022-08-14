const pg = require('./pg')
const md5 = require('md5')
let tabela = 'usuarios'

function usuarioApaga(req, res) {
    let sql = `DELETE FROM ${tabela} WHERE id=${req.query.id}`
    console.log(sql)

    pg.pool.query(sql, [], (erro, usuarios) => {
        if(erro) {
            res.json(erro)
            return
        }
        if(usuarios.rowCount > 0) res.json({mgs:'Usuario apagado com sucesso!'})
        else res.json({msg:'Nenhum usuario encontrado!'})
    })
}

function usuarioAtualiza(req, res) {
    let sql = `UPDATE ${tabela} SET nome = $1,
                                    sobrenome = $2,
                                    cpf = $3,
                                    nascimento = $4,
                                    cidade = $5,
                                    estado = $6,
                                    login = $7,
                                    genero = $8,
                                    email = $9
                                    WHERE id = $10`

    let val = [
        req.body.nome,
        req.body.sobrenome,
        req.body.cpf,
        req.body.nascimento,
        req.body.cidade,
        req.body.estado,
        req.body.login,
        req.body.genero,
        req.body.email,
        req.body.id
    ]
    pg.pool.query(sql, val, (erro, usuarios) => {
        if(erro) {
            res.json(erro)
            return
        }
        res.json({msg:'Usuario atualizado com sucesso!'})
    })
}

function usuarioAtualizaSenha(req, res) {
    
  let sql1 = `SELECT id, login, senha FROM usuarios WHERE id = ${req.body.id}`

  pg.pool.query(sql1, [], (erro, usuarios) => {
    if(erro) {
      res.status(401).json(erro)
      return
    }
   
    const user = usuarios.rows[0]
    console.log(user)
    if(user.senha === md5(user.login.toUpperCase() + req.body.senhaAntiga)) {
      if(req.body.senhaNova === req.body.senhaRepeat){
        if(req.body.senhaNova !== req.body.senhaAntiga){

        let sql = `UPDATE ${tabela} SET senha = $1 WHERE id = $2`

        let val = [
                    md5(user.login.toUpperCase() + req.body.senhaNova),
                    req.body.id
                  ]

        pg.pool.query(sql, val, (erro, usuarios) => {
          if(erro) {
            res.json(erro)
            return
          }
          res.status(200).json({msg:'Senha atualizada com sucesso!'})
        })
        }else res.status(401).json({msg: 'A senha nova deve ser diferente da antiga'})
      } else res.status(401).json({msg: 'As novas senhas devem ser escritas iguais!'})
    } else res.status(401).json({msg: 'Senha antiga incorreta!'})
  })  
}

function usuarioMostra(req, res) {
    let sql = `SELECT `
        if(req.query.filter)    sql += `${req.query.filter}`
        else sql += `*`
    sql += ` FROM ${tabela} WHERE 1=1`
        if(req.query.id)        sql += ` AND id = %${req.query.id}`
        if(req.body.id)         sql += ` AND id = %${req.body.id}`
        if(req.body.nome)       sql += ` AND UPPER(nome) LIKE '%${req.body.nome.toUpperCase()}%'`
        if(req.body.sobrenome)  sql += ` AND UPPER(sobrenome) LIKE '%${req.body.sobrenome.toUpperCase()}%'`
        if(req.body.cpf)        sql += ` AND cpf = ${req.body.cpf}`
        if(req.body.nascimento) sql += ` AND nascimento = ${req.body.nascimento}`
        if(req.body.cidade)     sql += ` AND cidade LIKE '%${req.body.cidade.toUpperCase()}%'`
        if(req.body.estado)     sql += ` AND estado LIKE '%${req.body.estado.toUpperCase()}%'`
        if(req.body.login)      sql += ` AND login = '${req.body.login}'`
        if(req.body.senha)      sql += ` AND senha = ${req.body.senha}`
        if(req.body.search)     sql += ` AND UPPER( nome || sobrenome || cpf || cidade || estado)  LIKE '%${req.body.search.toUpperCase()}%'`
    sql += ` ORDER BY`
        if(req.query.order)     sql += ` ${req.query.order}`
        else sql += ` nome`

    console.log(sql)

    pg.pool.query(sql, [], (erro, usuarios) => {
        if(erro) {
            res.json(erro)
            return
        }
        res.json(usuarios.rows)
    })
}

function usuarioSalva(req, res) {
    let sql = `INSERT INTO ${tabela} (nome, sobrenome, cpf, nascimento, cidade, estado, login, senha, genero, email)
               VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
    let val = [
        req.body.nome,
        req.body.sobrenome,
        req.body.cpf,
        req.body.nascimento,
        req.body.cidade,
        req.body.estado,
        req.body.login,
        md5(req.body.login.toUpperCase() + req.body.senha),
        req.body.genero,
        req.body.email
    ]

    console.log(sql)

    pg.pool.query(sql, val, (erro, usuarios) => {
        if(erro) {
            res.json(erro)
            return
        }
        res.json({msg:'Usuario cadastrado com sucesso!'})
    })
    
}




module.exports = {
    usuarioApaga,
    usuarioAtualiza,
    usuarioAtualizaSenha,
    usuarioMostra,
    usuarioSalva
}