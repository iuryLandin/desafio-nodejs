const { Router } = require('express');

// Middleware para validação de atutenticação
const isAuth = require('../middlewares/isAuth');

// importação das rotas
const AuthRoutes = require('./auth.route');
const ProdutorRoutes = require('./produtor.route');
// const PropriedadeRoutes = require('./propriedade.route');


const routes = Router();

routes.use('/auth', AuthRoutes); // adicionar rotas de autenticação. Aqui poderá ser adicionado rotas de (cadastro, "recuperar senha" e login)

// rotas privadas, que necessida de autenticação, sempre será adicionado a middleware isAuth
routes.use('/produtor', isAuth, ProdutorRoutes);
// routes.use('/propriedade', isAuth, PropriedadeRoutes);


routes.use((error, req, res, next) => {
    let code = error.status || 400; // pegar o codigo de erro HTTP caso nao consiga, utilizar por padrao o 400
    let message;
    if (typeof error == 'string' || error instanceof String)
        (message) = error
    else
        (message) = error.error
    return res.status(code).json({ ok: false, message, stack: error }); // retornar o erro, utilizando o padrao: {ok: bool, message: string, stack: string}
});


module.exports = routes;