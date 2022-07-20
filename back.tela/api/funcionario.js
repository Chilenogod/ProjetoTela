const pg = require('./pg')

let tabela = 'funcionarios'
let order = 'id'

//COALESCE(${req.query.order}, ${order})

function funcionarioMostra(req, res) {
    let sql = `SELECT `
        if(req.query.filter)   sql += ` ${req.query.filter}`
        else sql += `*`
    sql += ` FROM ${tabela} WHERE 1=1`
        if(req.query.id)       sql += ` and id =${req.query.id}`
        if(req.body.id)        sql += ` and id =${req.body.id}`
        if(req.body.nome)      sql += ` and UPPER(nome) like '%${req.body.nome.toUpperCase()}%'`
        if(req.body.sobrenome) sql += ` and UPPER(sobrenome) like '%${req.body.sobrenome.toUpperCase()}%'`
        if(req.body.email)     sql += ` and UPPER(email) like '%${req.body.email.toUpperCase()}%'`
        if(req.body.genero)    sql += ` and genero ='${req.body.genero}'` 
        if(req.body.cidade)    sql += ` and UPPER(cidade) like '%${req.body.cidade.toUpperCase()}%'`
        if(req.body.pais)      sql += ` and pais ='${req.body.pais}'`
        if(req.body.empresa)   sql += ` and UPPER(empresa) like '%${req.body.empresa.toUpperCase()}%'`
        if(req.body.salario)   sql += ` and salario >=${req.body.salario}` 
        if(req.body.search)    sql += ` and UPPER(nome || sobrenome || email) like '%${req.body.search.toUpperCase()}%'` 

    sql += ` ORDER BY`
        if(req.query.order)     sql += ` ${req.query.order}`
        else sql += ` nome`
    console.log(sql)
    pg.pool.query(sql, [] ,(erro, funcionarios) => {
        if(erro) {
            res.json(erro)
            return
        }
        if(funcionarios.rowCount > 0) {
           // funcionarios.rows.unshift({total: funcionarios.rows.length})
            res.json(funcionarios.rows);
        } else res.json({msg: 'Nenhum funcionario encontrado!'})
    })
}



function funcionarioSalva(req, res) {
    let sql = `INSERT INTO ${tabela} (nome, sobrenome, email, genero, cidade, pais, empresa, salario) 
               VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
    let val = [
        req.body.nome,
        req.body.sobrenome,
        req.body.email,
        req.body.genero,
        req.body.cidade,
        req.body.pais,
        req.body.empresa,
        req.body.salario
    ]
               pg.pool.query(sql, val, (erro, resultado) => {
        if(erro) {
            res.json(erro)
            return
        }
        res.json({msg:'Funcionario cadastrado com sucesso.'})
    })
}

function funcionarioAtualiza(req, res) {
    let sql = `UPDATE ${tabela} SET nome = $1,
                                    sobrenome = $2,
                                    email = $3,
                                    genero = $4,
                                    cidade = $5,
                                    pais = $6,
                                    empresa = $7,
                                    salario = $8
                                    WHERE id= $9`
    pg.pool.query(sql, [req.body.nome, req.body.sobrenome, req.body.email, req.body.genero, req.body.cidade,
                       req.body.pais, req.body.empresa, req.body.salario, req.body.id], (erro, funcionarios) => {
                       
        if(erro) {
            res.json(erro)
            return
        }
        res.json({msg:'Funcionario atualizado!'})
    })
}

function funcionarioApaga(req, res) {
    let sql = `DELETE FROM ${tabela} WHERE id=$1`
    pg.pool.query(sql, [req.query.id], (erro, funcionarios) => {
        if(erro) {
            res.json(erro)
            return
        }
        if(funcionarios.rowCount > 0) {
            res.json({msg:'Funcionario excluido com sucesso!'})
        } else res.json({msg:'Funcionario nao encontrado.'})
    })
}




module.exports = {
    funcionarioMostra,
    funcionarioSalva,
    funcionarioAtualiza,
    funcionarioApaga
}