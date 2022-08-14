var express = require('express');
var router = express.Router();
const venda = require('../api/venda')

router.post('/', (req, res) => {
  venda.vendaSalva(req, res)
})

router.post('/search', (req, res) => {
  venda.vendaMostra(req, res)
});

router.put('/', (req, res) => {
  venda.vendaAtualiza(req, res)
});

router.delete('/', (req, res) => {
  venda.vendaApaga(req, res)
});

module.exports = router;
