const { Router } = require('express');
const UsuarioController = require("../controllers/UsuarioController")
const { AppError } = require('../helpers/AppError');

const route = Router();

route.post('/', async (req, res, next) => {
    const { nomeUsuario, senhaUsuario } = req.body;
    try {
        const user = await UsuarioController.login(nomeUsuario, senhaUsuario);
        return res.status(200).json(user);
    } catch (e) {
        next(new AppError(e))
    }

});


module.exports = route;