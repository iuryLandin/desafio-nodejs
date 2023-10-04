const { Router } = require('express');
const { AppError } = require('../helpers/AppError');

const ProdutorController = require("../controllers/ProdutorController");
const ProdutorValidator = require("../validators/ProdutorValidator");

const route = Router();

route.post('/', ProdutorValidator.store, async (req, res, next) => {
    const { nomeProdutor, cpfProdutor } = req.body;
    try {
        const result = await ProdutorController.store({ nomeProdutor, cpfProdutor });
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});

route.get('/', async (req, res, next) => {
    try {
        const result = await ProdutorController.list();
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});

route.get('/:id', ProdutorValidator.get, async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await ProdutorController.get(id);
        return res.status(200).json(result);
    } catch (e) {
        next(new AppError(e))
    }
});


module.exports = route;