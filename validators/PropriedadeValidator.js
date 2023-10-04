const yup = require("yup");
const { AppError } = require("../helpers/AppError");


const store = async (req, res, next) => {
    try {
        const schema = yup.object({
            body: yup.object({
                nomePropriedade: yup.string().required("O campo Nome é obrigatório"),
                cadastroRural: yup.string().required("O campo Cadastro Rural é obrigatório"),
                produtor_id: yup.number().required("É necessário informar o ID do produtor")
            }),
        });

        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return next(new AppError(err))
    }
};


const get = async (req, res, next) => {
    try {
        const schema = yup.object({
            params: yup.object({
                id: yup.number().integer("O Parâmetro ID deve ser um numero inteiro").required("Parâmetro ID obrigatório"),
            }),
        });

        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return next(new AppError(err))
    }
};

module.exports = { store, get }