
let pedidos = [];
let proximoId = 1;

const TIPOS_PERMITIDOS = ['entrega', 'retirada'];

const PRIORIDADES_PERMITIDAS = [
  'baixa',
  'normal',
  'alta'
];

const TRANSICOES_PERMITIDAS = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue'],
  entregue: [],
  cancelado: []
};

function criarPedido(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    const erro = new Error('Informe os dados do pedido.');
    erro.status = 400;
    throw erro;
  }

  const { cliente, tipo, valor, prioridade } = dados;

  if (typeof cliente !== 'string' || !cliente.trim()) {
    const erro = new Error('O cliente é obrigatório.');
    erro.status = 400;
    throw erro;
  }

  if (
    typeof valor !== 'number' ||
    !Number.isFinite(valor) ||
    valor <= 0
  ) {
    const erro = new Error(
      'O valor deve ser um número maior que zero.'
    );
    erro.status = 400;
    throw erro;
  }

  if (!TIPOS_PERMITIDOS.includes(tipo)) {
    const erro = new Error(
      'Tipo inválido. Use entrega ou retirada.'
    );
    erro.status = 400;
    throw erro;
  }

  if (!PRIORIDADES_PERMITIDAS.includes(prioridade)) {
    const erro = new Error(
      'Prioridade inválida. Use baixa, normal ou alta.'
    );
    erro.status = 400;
    throw erro;
  }

  const pedido = {
    id: proximoId++,
    cliente: cliente.trim(),
    tipo,
    valor,
    prioridade,
    status: 'recebido'
  };

  pedidos.push(pedido);

  return pedido;
}

function listarPedidos() {
  return pedidos;
}

function buscarPedidoPorId(id) {
  return pedidos.find(
    (pedido) => pedido.id === Number(id)
  );
}

function atualizarStatus(id, novoStatus) {
  const pedido = buscarPedidoPorId(id);

  if (!pedido) {
    const erro = new Error('Pedido não encontrado.');
    erro.status = 404;
    throw erro;
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      TRANSICOES_PERMITIDAS,
      novoStatus
    )
  ) {
    const erro = new Error('Status inválido.');
    erro.status = 400;
    throw erro;
  }

  const transicoes = TRANSICOES_PERMITIDAS[pedido.status];

  if (!transicoes.includes(novoStatus)) {
    const erro = new Error(
      `Não é permitido alterar de ${pedido.status} para ${novoStatus}.`
    );
    erro.status = 400;
    throw erro;
  }

  pedido.status = novoStatus;

  return pedido;
}

module.exports = {
  criarPedido,
  listarPedidos,
  buscarPedidoPorId,
  atualizarStatus
};
