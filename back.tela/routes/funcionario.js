var express = require('express');
var router = express.Router();
const funcionario = require('../api/funcionario')

router.get('/', function(req, res) {
    funcionario.funcionarioMostra(req, res)
})

router.post('/search', function(req, res) {
    funcionario.funcionarioMostra(req, res)
})

router.post('/', function(req, res) {
    if(req.body.id) funcionario.funcionarioAtualiza(req, res)
    else  funcionario.funcionarioSalva(req, res)  
});

router.put('/', function(req, res) {
    funcionario.funcionarioAtualiza(req, res)
});

router.delete('/', function(req, res) {
    funcionario.funcionarioApaga(req, res)
});



module.exports = router;