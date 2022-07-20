var express = require('express');
var router = express.Router();
const totalVendas = require('../api/totalVendas')


router.post('/', (req, res) => {
  totalVendas.totalVendasMostra(req, res)
});


module.exports = router;
