const { Router } = require('express');
const PropriedadeController = require("../controllers/PropriedadeController")
const { AppError } = require('../helpers/AppError');

const route = Router();

route.post('/', async (req, res, next) => {
    const { nomePropriedade, cadastroRural, produtor_id } = req.body;
    try {
        const result = await PropriedadeController.store({  nomePropriedade, cadastroRural, produtor_id  });
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});

route.get('/', async (req, res, next) => {
    try {
        const result = await PropriedadeController.list();
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});

route.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await PropriedadeController.get(id);
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});


module.exports = route;