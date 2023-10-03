const express = require('express');
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes'); // importar rotas

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/api', routes);

if (process.env.PORT) // verifica se foi informado a porta no .env; Caso seja utilizado como serverless function (vercel) não irá precisar fornecer porta.
    app.listen(process.env.PORT, () => console.log(`\n > Servico executando em: http://127.0.0.1:${process.env.PORT} \n`))