var express = require('express');
var router = express.Router();
const cliente = require('../api/cliente')


router.post('/search', (req, res) => {
  cliente.clienteMostra(req, res)
});

router.post('/', (req, res) => {
  cliente.clienteSalva(req, res)
});

router.get('/search', (req, res) => {
  cliente.clienteMostra(req, res)
});

router.put('/', function(req, res) {
  cliente.clienteAtualiza(req, res)
});

router.delete('/', function(req, res) {
  cliente.clienteApaga(req, res)
});

module.exports = router;
