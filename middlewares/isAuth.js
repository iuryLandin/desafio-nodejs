const { verify } = require('jsonwebtoken');
const { AppError } = require('../helpers/AppError');
require('dotenv').config()

const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Você não está atuenticado! Efetue login para acesssar", 401, "Token não Informado.\n Bearer Token obrigatório"); // gerar erro
    }

    const [, token] = authHeader.split(" "); // dividir o header para separar o token do prefixo (padrão: 'bearer xxxxxxxxx'; ou: 'token xxxxxxxxx')

    try {
        const decoded = verify(token, process.env.APP_SECRET); // verificar token fornecido no header
        const { id, nomeUsuario } = decoded;

        req.user = { id, nomeUsuario }; // se tudo estiver ok, salva no request para uso posterior
        return next();
    } catch (err) {
        throw new AppError("Token inválido", 401);
    }
};

module.exports = isAuth;