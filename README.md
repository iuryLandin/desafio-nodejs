
<img src="https://content.pstmn.io/fb24b31b-60a9-4f8d-a57f-b760f566b2ad/aW1hZ2UucG5n" width="240">

#### Teste para desenvolvedor Back-end

PROCESSO SELETIVO - LÓGICA PROGRAMAÇÃO EM PRÁTICA – Aplicação de teste  
sobre lógica de programação e estruturação de código


## Como instalar / preparar ambiente

1. Primeiramente instale as bibliotecas necessárias:
```bash
npm install
```

2. Crie um banco de dados MySql e importe o dump contido na raiz do projeto: `database.sql`

3. Copie o arquivo `.env.example` para `.env` e prrencha as variáveis de acordo com seu ambiente

```ini
PORT=3333 # porta do servidor
APP_SECRET=hA3L3CBZEkG28wxz # chave secreta para o JWT - de preferencia uma cadeia de caracteres aletatória (https://www.avast.com/random-password-generator#pc)

DB_NAME=db_desafio  # nome do banco de dados
DB_USER=root        # usuario
DB_PASSWORD=admin   # senha
DB_HOST=localhost   # host
DB_PORT=3306        # porta / padrao: 3306
```

## Executar a aplicação

- Para executar em modo desenvolvimento onde cada alteração na pasta reinicia o servidor, execute: `npm run dev`
- Para execução em modo contínuo, execute: `npm start`
- Após isso você pode utilizar o postman ou o front-end da aplicação para criar um usuário e ter acesso à funcionalidades restritas à autenticação
- Para acessar o front-end, se você utilizou a porta `3333` como descrita no exemplo, basta colar o seguinte endereço no navegador: `http://127.0.0.1:3333`


Obs.: Se você está utilizando uma porta diferente, lembre de alterar nas variáveis de ambiente do Postman.

## Documentação

- Você pode utilizar a documentação descrita abaixo ou poderá importar no Postman a collection contida na raiz do projeto `postman_collection.json`

----

### Variáveis

| Key | Value | Type |
| --- | ------|-------------|
| base_url | http://127.0.0.1:3333 | string |
| token |  | string |



## Endpoints

* [Auth](#auth)
    1. [Cadastro de Usuario](#1-cadastro-de-usuario)
    1. [Login](#2-login)
* [Produtor](#produtor)
    1. [Cadastro](#1-cadastro)
    1. [Retornar por id](#2-retornar-por-id)
    1. [Listar produtores](#3-listar-produtores)
* [Propriedade](#propriedade)
    1. [Cadastro](#1-cadastro-1)
    1. [Retornar por id](#2-retornar-por-id-1)
    1. [Listar propriedades](#3-listar-propriedades)
    1. [Listar Propriedades por produtor](#4-listar-propriedades-por-produtor)

--------



## Auth



### 1. Cadastro de Usuario



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/auth/cadastro
```



***Body:***

```js        
{
    "nomeUsuario": "fulano",
    "senhaUsuario": "abc123"
}
```



### 2. Login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/auth
```



***Body:***

```js        
{
    "nomeUsuario": "fulano",
    "senhaUsuario": "abc123"
}
```



## Produtor



### 1. Cadastro



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/produtor
```



***Body:***

```js        
{
    "nomeProdutor": "Daniel Lemos",
    "cpfProdutor": "082.195.160-20"
}
```



### 2. Retornar por id



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/api/produtor/1
```



### 3. Listar produtores



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/api/produtor
```



## Propriedade



### 1. Cadastro



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{base_url}}/api/propriedade
```



***Body:***

```js        
{
    "nomePropriedade": "Fazenda Aguas Lindas",
    "cadastroRural": "OX-78671",
    "produtor_id": 1
}
```



### 2. Retornar por id



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/api/propriedade/1
```



### 3. Listar propriedades



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/api/propriedade
```



### 4. Listar Propriedades por produtor



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{base_url}}/api/propriedade
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| produtor_id | 1 |  |



---
