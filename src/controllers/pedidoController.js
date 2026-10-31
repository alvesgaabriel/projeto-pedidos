
const pedidoService = require('../services/pedidoService');

function criar(req, res, next) {
  try {
    const pedido = pedidoService.criarPedido(req.body);
    return res.status(201).json(pedido);
  } catch (erro) {
    return next(erro);
  }
}

function listar(req, res, next) {
  try {
    const pedidos = pedidoService.listarPedidos();
    return res.status(200).json(pedidos);
  } catch (erro) {
    return next(erro);
  }
}

function buscarPorId(req, res, next) {
  try {
    const pedido = pedidoService.buscarPedidoPorId(req.params.id);

    if (!pedido) {
      return res.status(404).json({
        erro: 'Pedido não encontrado.'
      });
    }

    return res.status(200).json(pedido);
  } catch (erro) {
    return next(erro);
  }
}

function atualizarStatus(req, res, next) {
  try {
    const { status } = req.body || {};

    if (typeof status !== 'string' || !status.trim()) {
      return res.status(400).json({
        erro: 'Informe um status válido.'
      });
    }

    const pedido = pedidoService.atualizarStatus(
      req.params.id,
      status.trim()
    );

    return res.status(200).json(pedido);
  } catch (erro) {
    return next(erro);
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizarStatus
};
