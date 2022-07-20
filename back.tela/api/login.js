const pg = require('./pg')
let tabela = 'usuarios'

function usuarioLogin(req, res) {
  let sql = `SELECT * FROM ${tabela} WHERE login = '${req.body.login}'`
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