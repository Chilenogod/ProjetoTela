var express = require('express');
var router = express.Router();
const usuario = require('../api/usuario')


router.get('/', function(req, res) {
  usuario.usuarioMostra(req, res)
});

router.post('/search', function(req, res) {
  usuario.usuarioMostra(req, res)
});

router.post('/', function(req, res) {
    if(req.body.id) usuario.usuarioAtualiza(req, res)
    else usuario.usuarioSalva(req, res)
  });

router.put('/', function(req, res) {
  usuario.usuarioAtualiza(req, res)
});

router.delete('/', function(req, res) {
  usuario.usuarioApaga(req, res)
});

module.exports = router;
