var express = require('express');
var router = express.Router();
const vendas = require('../api/vendas')

router.post('/', (req, res) => {
  vendas.vendasSalva(req, res)
})

router.post('/search', (req, res) => {
  vendas.vendasMostra(req, res)
});

router.put('/', function(req, res) {
  vendas.vendasAtualiza(req, res)
});

router.delete('/', function(req, res) {
  vendas.vendasApaga(req, res)
});

module.exports = router;
