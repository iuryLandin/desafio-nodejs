const { Router } = require('express');
const { AppError } = require("../helpers/AppError");

const PropriedadeController = require("../controllers/PropriedadeController")
const PropriedadeValidator = require("../validators/PropriedadeValidator");

const route = Router();

route.post('/', PropriedadeValidator.store, async (req, res, next) => {
    const { nomePropriedade, cadastroRural, produtor_id } = req.body;
    try {
        const result = await PropriedadeController.store({ nomePropriedade, cadastroRural, produtor_id });
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});

route.get('/', async (req, res, next) => {
    try {
        const { produtor_id } = req.query;
        let result = [];
        if (produtor_id)
            result = await PropriedadeController.listByProdutor(produtor_id);
        else
            result = await PropriedadeController.list();
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});

route.get('/:id', PropriedadeValidator.get, async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await PropriedadeController.get(id);
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});


module.exports = route;