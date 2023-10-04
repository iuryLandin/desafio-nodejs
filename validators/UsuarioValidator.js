const yup = require("yup");
const { AppError } = require("../helpers/AppError");


const UsuarioValidator = async (req, res, next) => {
    try {
        const schema = yup.object({
            body: yup.object({
                nomeUsuario: yup.string().required("O campo Nome é obrigatório"),
                senhaUsuario: yup.string().required("O campo Senha é obrigatório"),
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


module.exports = UsuarioValidator;