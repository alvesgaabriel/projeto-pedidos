
const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

// Permite receber dados em JSON
app.use(express.json());

// Rotas da API
app.use('/pedidos', pedidoRoutes);

// Tratamento de rotas inexistentes
app.use((req, res) => {
  return res.status(404).json({
    erro: 'Rota não encontrada.'
  });
});

// Tratamento centralizado de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);

  const status = err.status || 500;

  return res.status(status).json({
    erro: status === 500
      ? 'Erro interno do servidor.'
      : err.message
  });
});

module.exports = app;
