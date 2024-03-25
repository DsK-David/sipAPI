# Documentação da API SIP

Esta documentação detalha a API SIP, que permite a criação, consulta e manipulação de usuários e transferências em um sistema de pagamentos. A API é construída com Node.js e Express, e utiliza SQLite como banco de dados.


## Endpoints

### GET /api/users

- **Descrição:** Retorna uma lista de todos os usuários registrados no sistema.
- **Parâmetros:** Nenhum.
- **Resposta:** Um array de objetos, onde cada objeto representa um usuário com os seguintes campos:
 - `id`: Identificador único do usuário.
 - `nome`: Nome do usuário.
 - `saldo`: Saldo atual do usuário.
 - `numero_conta`: Número da conta do usuário.

### GET /api/users/:numero_conta

- **Descrição:** Retorna detalhes de um usuário específico com base no número da conta.
- **Parâmetros:** `numero_conta` (string) - O número da conta do usuário.
- **Resposta:** Um objeto representando o usuário com os campos `id`, `nome`, `saldo` e `numero_conta`.

### GET /api/users/nome/:nome

- **Descrição:** Retorna detalhes de um usuário específico com base no nome.
- **Parâmetros:** `nome` (string) - O nome do usuário.
- **Resposta:** Um objeto representando o usuário com os campos `id`, `nome`, `saldo` e `numero_conta`.

### GET /api/payment/:nome/

- **Descrição:** Retorna uma lista de todas as transferências realizadas pelo usuário especificado.
- **Parâmetros:** `nome` (string) - O nome do usuário.
- **Resposta:** Um array de objetos, onde cada objeto representa uma transferência com os campos `id`, `usuario`, `valor`, `status` e `data`.

### POST /api/users

- **Descrição:** Cria um novo usuário no sistema.
- **Parâmetros:** Corpo da requisição (JSON) com os campos `nome` e `saldo`.
- **Resposta:** Um objeto representando o novo usuário com os campos `id`, `nome`, `saldo` e `numero_conta`.

### POST /api/payment/:numero_conta

- **Descrição:** Realiza uma transferência para o usuário especificado.
- **Parâmetros:** `numero_conta` (string) - O número da conta do usuário. Corpo da requisição (JSON) com o campo `valor`.
- **Resposta:** Um objeto com a mensagem de sucesso e o `novoSaldo` do usuário após a transferência.

### DELETE /api/users/clear

- **Descrição:** Remove todos os usuários do banco de dados.
- **Parâmetros:** Nenhum.
- **Resposta:** Um objeto com a mensagem de sucesso.

## Exemplos de Uso

### Criar um novo usuário

```json
POST /api/users
{
 "nome": "João",
 "saldo": 1000
}
```

### Realizar uma transferência

```json
POST /api/payment/123456
{
 "valor": 500
}
```
## Como Rodar o Projeto

1. **Clone o Repositório:**
   Primeiro, clone o repositório do projeto para sua máquina local.
   ```
   git clone https://github.com/DsK-David/sipAPI
   ```

2. **Instale as Dependências:**
   Navegue até a pasta do projeto e instale as dependências necessárias usando o npm (Node Package Manager).
   ```
   cd sipAPI
   npm install
   ```
   

3. **Inicie o Servidor:**
   Inicie o servidor de desenvolvimento com o seguinte comando:
   ```
   npm run api
   ou
   yarn run api
   ```
   O servidor iniciará e estará ouvindo na porta especificada no arquivo `index.js` ou na porta padrão 3000 se nenhuma variável de ambiente `PORT` for definida.



## Como Contribuir

Contribuições são bem-vindas! Aqui estão algumas dicas sobre como você pode contribuir para o projeto:

1. **Relate Bugs:** Se você encontrar um bug, reporte-o usando o sistema de rastreamento de problemas do projeto. Certifique-se de fornecer detalhes suficientes para que outros desenvolvedores possam reproduzir o problema.

2. **Sugira Melhorias:** Se você tiver uma ideia para melhorar a API ou adicionar novas funcionalidades, abra uma issue descrevendo sua sugestão.

3. **Contribua com Código:** Se você deseja contribuir com código, siga estas etapas:
   - Faça um fork do repositório.
   - Crie uma nova branch com um nome descritivo.
   - Faça suas alterações e adicione testes, se necessário.
   - Envie um pull request para a branch principal do projeto.

4. **Documentação:** Melhorias na documentação são sempre bem-vindas. Se você acha que a documentação pode ser melhorada ou está faltando informações, sinta-se à vontade para contribuir.

Antes de contribuir, certifique-se de ler o arquivo `CONTRIBUTING.md` (se disponível) para obter diretrizes específicas sobre como contribuir para o projeto.
## Considerações

Esta API é projetada para ser simples e eficiente, permitindo a gestão de usuários e transferências de forma clara e direta. A documentação aqui apresentada fornece uma visão geral dos endpoints disponíveis, facilitando a integração com outras aplicações ou serviços.

