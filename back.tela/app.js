var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var clienteRouter = require('./routes/cliente');
var usuarioRouter = require('./routes/usuario');
var funcionarioRouter = require('./routes/funcionario');
var loginRouter = require('./routes/login');
var estoqueRouter = require('./routes/estoque');
var vendasRouter = require('./routes/vendas');
var totalVendasRouter = require('./routes/totalVendas');

var app = express();
var cors = require('cors')
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cliente', clienteRouter);
app.use('/usuario', usuarioRouter);
app.use('/funcionario', funcionarioRouter);
app.use('/login', loginRouter);
app.use('/estoque', estoqueRouter);
app.use('/vendas', vendasRouter);
app.use('/totalVendas', totalVendasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
