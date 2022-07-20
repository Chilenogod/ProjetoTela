var express = require('express');
var router = express.Router();
const estoque = require('../api/estoque')

router.post('/', (req, res) => {
    estoque.estoqueSalva(req, res)
})

router.post('/search', function(req, res) {
    estoque.estoqueMostra(req, res)
})

router.put('/', (req, res) => {
    estoque.estoqueAtualiza(req, res)
})

router.delete('/', (req, res) => {
    estoque.estoqueApaga(req, res)
})




module.exports = router;