
# API de Gerenciamento de Pedidos

## 1. Descrição
API REST desenvolvida em Node.js e Express para gerenciamento de pedidos de uma pequena loja.

O projeto permite cadastrar, listar, consultar e atualizar pedidos.

## 2. Tecnologias utilizadas
- Node.js
- Express
- JavaScript
- Jest
- Postman
- Git e GitHub

## 3. Instalação e execução

Clone o repositório:

```bash
git clone COLOQUE_AQUI_O_LINK_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd projeto-pedidos
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

A API estará disponível em:
http://localhost:3000

## 4. Arquitetura do projeto

O projeto utiliza arquitetura em camadas:

- routes: define as rotas da API.
- controllers: recebe as requisições e retorna as respostas HTTP.
- services: contém as regras de negócio e validações.
- evidencias: armazena as capturas dos testes realizados no Postman.

## 5. Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | /pedidos | Cadastrar pedido |
| GET | /pedidos | Listar pedidos |
| GET | /pedidos/:id | Consultar pedido |
| PATCH | /pedidos/:id/status | Atualizar status |

## 6. Exemplo de cadastro

POST /pedidos

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

Resposta esperada: HTTP 201.

## 7. Validações

- Cliente obrigatório e não pode estar vazio.
- Valor deve ser numérico e maior que zero.
- Tipos permitidos: entrega e retirada.
- Prioridades permitidas: baixa, normal e alta.
- Identificadores inexistentes retornam HTTP 404.
- Dados inválidos retornam HTTP 400.

## 8. Transições de status

Os status disponíveis são:
- recebido
- em_preparacao
- enviado
- entregue
- cancelado

Transições permitidas:
- recebido -> em_preparacao ou cancelado.
- em_preparacao -> enviado ou cancelado.
- enviado -> entregue.
- entregue e cancelado são estados finais.

## 9. Testes

Foram realizados testes manuais utilizando Postman para verificar:
- Cadastro de pedidos.
- Validação de dados inválidos.
- Listagem de pedidos.
- Consulta de pedidos inexistentes.
- Atualização de status.

As evidências estão disponíveis na pasta evidencias/.

## 10. Armazenamento

Os pedidos são armazenados em memória. Os dados são perdidos quando o servidor é reiniciado.

## 11. Uso de IA

Foi utilizada inteligência artificial como apoio para revisar o código, identificar possíveis erros, melhorar o tratamento de exceções e organizar a documentação.

Uma sugestão aceita foi melhorar o tratamento centralizado de erros para diferenciar respostas HTTP 400, 404 e 500. A alteração foi adotada para atender aos requisitos da atividade.

## 12. Considerações finais

O projeto foi desenvolvido para aplicar conceitos de API REST, arquitetura em camadas, validação de dados, tratamento de erros e testes de requisições HTTP.
