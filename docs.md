# Nomeclaturas para Rotas de Sistema de Pagamento

Este documento lista as nomeclaturas utilizadas para as rotas do sistema de pagamento. A estruturação segue um padrão RESTful, facilitando a compreensão e a implementação das rotas.

## Rotas de Usuários

- `GET /users`: Lista todos os usuários.
- `POST /users`: Cria um novo usuário.
- `GET /users/{id}`: Obtém detalhes de um usuário específico.
- `PUT /users/{id}`: Atualiza detalhes de um usuário específico.
- `DELETE /users/{id}`: Remove um usuário específico.

## Rotas de Pagamentos

- `GET /payments`: Lista todos os pagamentos.
- `POST /payments`: Cria um novo pagamento.
- `GET /payments/{id}`: Obtém detalhes de um pagamento específico.
- `PUT /payments/{id}`: Atualiza detalhes de um pagamento específico.
- `DELETE /payments/{id}`: Remove um pagamento específico.

## Rotas de Transações

- `GET /transactions`: Lista todas as transações.
- `POST /transactions`: Cria uma nova transação.
- `GET /transactions/{id}`: Obtém detalhes de uma transação específica.
- `PUT /transactions/{id}`: Atualiza detalhes de uma transação específica.
- `DELETE /transactions/{id}`: Remove uma transação específica.

## Rotas de Cartões de Crédito

- `GET /credit-cards`: Lista todos os cartões de crédito.
- `POST /credit-cards`: Cria um novo cartão de crédito.
- `GET /credit-cards/{id}`: Obtém detalhes de um cartão de crédito específico.
- `PUT /credit-cards/{id}`: Atualiza detalhes de um cartão de crédito específico.
- `DELETE /credit-cards/{id}`: Remove um cartão de crédito específico.

## Rotas de Notificações

- `GET /notifications`: Lista todas as notificações.
- `POST /notifications`: Cria uma nova notificação.
- `GET /notifications/{id}`: Obtém detalhes de uma notificação específica.
- `PUT /notifications/{id}`: Atualiza detalhes de uma notificação específica.
- `DELETE /notifications/{id}`: Remove uma notificação específica.

## Rotas de Autenticação

- `POST /auth/login`: Autentica um usuário e retorna um token de acesso.
- `POST /auth/logout`: Revoga um token de acesso.
- `POST /auth/refresh`: Renova um token de acesso.

Este documento serve como um guia para a implementação e manutenção das rotas do sistema de pagamento, garantindo que todas as partes interessadas tenham uma compreensão clara das funcionalidades disponíveis e como acessá-las.