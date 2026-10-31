const request = require('supertest');
const app = require('../src/app');

describe('API de gerenciamento de pedidos', () => {
  describe('POST /pedidos', () => {
    test('deve cadastrar um pedido válido', async () => {
      const resposta = await request(app)
        .post('/pedidos')
        .send({
          cliente: 'Maria Silva',
          tipo: 'entrega',
          valor: 150,
          prioridade: 'normal'
        });

      expect(resposta.status).toBe(201);
      expect(resposta.body).toHaveProperty('id');
      expect(resposta.body.cliente).toBe('Maria Silva');
      expect(resposta.body.status).toBe('recebido');
    });

    test('deve rejeitar cliente vazio', async () => {
      const resposta = await request(app)
        .post('/pedidos')
        .send({
          cliente: '   ',
          tipo: 'entrega',
          valor: 150,
          prioridade: 'normal'
        });

      expect(resposta.status).toBe(400);
      expect(resposta.body).toHaveProperty('erro');
    });

    test('deve rejeitar valor menor ou igual a zero', async () => {
      const resposta = await request(app)
        .post('/pedidos')
        .send({
          cliente: 'Maria Silva',
          tipo: 'entrega',
          valor: 0,
          prioridade: 'normal'
        });

      expect(resposta.status).toBe(400);
    });
  });

  describe('GET /pedidos', () => {
    test('deve listar os pedidos', async () => {
      const resposta = await request(app).get('/pedidos');

      expect(resposta.status).toBe(200);
      expect(Array.isArray(resposta.body)).toBe(true);
    });
  });

  describe('GET /pedidos/:id', () => {
    test('deve retornar 404 para pedido inexistente', async () => {
      const resposta = await request(app).get('/pedidos/999999');

      expect(resposta.status).toBe(404);
      expect(resposta.body).toHaveProperty('erro');
    });
  });

  describe('PATCH /pedidos/:id/status', () => {
    test('deve atualizar o status de um pedido existente', async () => {
      const cadastro = await request(app)
        .post('/pedidos')
        .send({
          cliente: 'João Souza',
          tipo: 'retirada',
          valor: 200,
          prioridade: 'alta'
        });

      const resposta = await request(app)
        .patch(`/pedidos/${cadastro.body.id}/status`)
        .send({
          status: 'em_preparacao'
        });

      expect(resposta.status).toBe(200);
      expect(resposta.body.status).toBe('em_preparacao');
    });

    test('deve rejeitar status inválido', async () => {
      const cadastro = await request(app)
        .post('/pedidos')
        .send({
          cliente: 'Ana Costa',
          tipo: 'entrega',
          valor: 90,
          prioridade: 'baixa'
        });

      const resposta = await request(app)
        .patch(`/pedidos/${cadastro.body.id}/status`)
        .send({
          status: 'invalido'
        });

      expect(resposta.status).toBe(400);
    });
  });
});