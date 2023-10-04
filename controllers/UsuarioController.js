const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AppError } = require('../helpers/AppError');
const Usuario = require("../models/Usuario")

const login = async (nomeUsuario, senhaUsuario) => {
    try {
        // faz a busca do usuario atraves do nomeUsuario
        const usuario = await Usuario.findOne({
            where: { nomeUsuario }
        })
        // verifica se existe o registro
        if (usuario) {
            // comparar a seha enviada na reques com o hash salvo no BD
            const match = await bcrypt.compare(senhaUsuario, usuario.senhaUsuario);

            // se deu match (a senha bate com o hash) -> prossegue para a geração do token
            if (match) {
                const token = jwt.sign({ id: usuario.id, nomeUsuario }, process.env.APP_SECRET); // gerar assinatura (token) jwt com o payload id e nome de usuario
                // retornar apenas as informações para uso posterior em requisições e exibiçõs no front
                return {
                    id: usuario.id,
                    token: token,
                    nomeUsuario
                }
            } else {
                throw new AppError("Usuário ou senha incorretos")
            }
        } else {
            // o erro aqui seria de usuario não encontrado, então por questões não é uma boa pratica informar que o email em si não existe, 
            // pois pode revelar informações confidenciais sobre contas cadastradas, um invasor pode utilizar brute force para encontrar usuarios válidos.
            // entao o melhor é retornar um erro genérico.
            throw new AppError("Usuário ou senha incorretos")
        }

    } catch (e) {
        throw new AppError(e)
    }
};

const store = async (nomeUsuario, senhaUsuario) => {
    try {
        // verificação se já existe usuario pra o nome informado
        const verifica = await Usuario.count({ where: { nomeUsuario } });
        if (verifica > 0) {
            throw new AppError("Usuário já existe", 400, '');
        }
        // caso nao exista, prossegue com a criação do hash da senha e insersão na tabela no BD
        const hashPwd = bcrypt.hashSync(senhaUsuario, 12);
        const inserted = await Usuario.create({
            nomeUsuario,
            senhaUsuario: hashPwd
        })
        return {
            id: inserted.idUsuario,
            nomeUsuario
        }
    } catch (e) {
        throw new AppError(e, 400, e.stack)
    }

};

module.exports = { login, store };