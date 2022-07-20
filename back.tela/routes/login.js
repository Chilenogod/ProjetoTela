var express = require('express');
var router = express.Router();
const login = require('../api/login')

router.post('/', function(req,res) {
    login.usuarioLogin(req, res)
});




module.exports = router;