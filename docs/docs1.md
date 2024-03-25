# Documentação do Sistema de Pagamento

## Introdução

Este sistema de pagamento é uma aplicação web construída com Node.js e Express, utilizando SQLite como banco de dados. O objetivo é gerenciar usuários e suas transações de pagamento.

## Tecnologias Utilizadas

- Node.js
- Express
- SQLite3

## Estrutura do Banco de Dados

O sistema utiliza duas tabelas principais:

- **Usuário (`usuario`)**: Armazena informações sobre os usuários, incluindo nome, saldo e número da conta.
- **Transferência (`transferencia`)**: Registra as transferências realizadas pelos usuários, incluindo o usuário responsável, o valor da transferência e o status da transferência.

## Rotas Disponíveis

### Usuários

- `GET /api/users`: Lista todos os usuários.
- `POST /api/users`: Cria um novo usuário.
- `DELETE /api/users/clear`: Remove todos os usuários.


## Implementação

### Criação das Tabelas

As tabelas são criadas no início da aplicação, utilizando o método `db.serialize` para garantir que as operações sejam executadas em série.

### Rotas de Usuários

- A rota `GET /api/users` utiliza o método `db.all` para listar todos os usuários.
- A rota `POST /api/users` verifica se já existe um usuário com o mesmo nome antes de inserir um novo usuário.
- A rota `DELETE /api/users/clear` utiliza o método `db.run` para remover todos os usuários.

### Rotas de Transferências

- As rotas de transferências são semelhantes às rotas de usuários, mas operam na tabela `transferencia`.

## Considerações

- A aplicação utiliza o SQLite, que é um banco de dados leve e fácil de usar, ideal para desenvolvimento e testes.
- A aplicação é projetada para ser simples e direta, focando na funcionalidade básica de gerenciamento de usuários e transferências.
- A segurança e a validação dos dados de entrada não foram abordadas neste exemplo, mas são aspectos críticos a serem considerados em uma aplicação real.

## Conclusão

Este sistema de pagamento é uma base sólida para o desenvolvimento de aplicações de gerenciamento de usuários e transferências. Com a adição de mais funcionalidades e melhorias de segurança, ele pode ser expandido para atender a uma ampla gama de necessidades de pagamento.