const { Router } = require('express');
const { AppError } = require('../helpers/AppError');
const UsuarioController = require("../controllers/UsuarioController")
const UsuarioValidator = require("../validators/UsuarioValidator");

const route = Router();

route.post('/', UsuarioValidator, async (req, res, next) => {
    const { nomeUsuario, senhaUsuario } = req.body;
    try {
        const result = await UsuarioController.login(nomeUsuario, senhaUsuario);
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }

});

route.post('/cadastro', UsuarioValidator, async (req, res, next) => {
    const { nomeUsuario, senhaUsuario } = req.body;
    try {
        const result = await UsuarioController.store(nomeUsuario, senhaUsuario);
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }

});


module.exports = route;