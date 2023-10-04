const yup = require("yup");
const { AppError } = require("../helpers/AppError");

const validarCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    // verificando se tem a quantidade certa de caracter e se não tem todos caracteres iguais
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
        return false;
    let soma = 0,
        resto;
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)))
        return false;
    soma = 0;
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(cpf.substring(10, 11)))
        return false;
    return true;
}

yup.addMethod(yup.string, "validarCpf", function (errorMessage) {
    return this.test(`validar-cpf`, errorMessage, function (value) {
        const { path, createError } = this;

        return (
            validarCpf(value) ||
            createError({ path, message: errorMessage })
        );
    });
});


const store = async (req, res, next) => {
    try {
        const schema = yup.object({
            body: yup.object({
                nomeProdutor: yup.string().required("O campo Nome é obrigatório"),
                cpfProdutor: yup.string().min(14, "CPF inválido, preencha todos os dígitos").max(14, "CPF inválido, preencha os dígitos corretamente") // tamanhos com mascara 000.000.00-00
                    .required("O campo CPF é obrigatório")
                    .validarCpf("CPF inválido"), // executar função personalizada de validação de cpf
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
                id: yup.number().required("Parâmetro ID obrigatório"),
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