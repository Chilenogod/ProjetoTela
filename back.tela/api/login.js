const pg = require('./pg')
const md5 = require('md5')

let tabela = 'usuarios'

function usuarioLogin(req, res) {
  let sql = `SELECT * FROM ${tabela} WHERE senha = '${md5(req.body.login.toUpperCase()+req.body.senha)}'`
  console.log(sql)

  pg.pool.query(sql, [], (erro, usuario) =>{
    if(erro) {
      res.json(erro)
      return
    }
    if(usuario.rowCount > 0) {
       res.json(usuario.rows)
   } else res.json({msg: 'Usuário não encontrado!'})
  })
}



module.exports = {
    usuarioLogin
}