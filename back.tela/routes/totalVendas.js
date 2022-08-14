var express = require('express');
var router = express.Router();
const totalVendas = require('../api/totalVendas')


router.post('/', (req, res) => {
  totalVendas.totalVendasShow(req, res)
});

router.post('/pedidos', (req, res) => {
  totalVendas.totalVendasPedidosShow(req, res)
});


module.exports = router;
