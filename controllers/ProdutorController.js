const Produtor = require("../models/Produtor")
const { AppError } = require('../helpers/AppError');

const store = async ({ nomeProdutor, cpfProdutor }) => {
    try {
        // verifica se ja existe produtor com CPF cadastrado - evitar duplicatas
        const verifica = await Produtor.count({ where: { cpfProdutor } })
        if (verifica > 0) throw new AppError(`Produtor já existe`);

        const result = await Produtor.create({
            nomeProdutor, cpfProdutor
        })
        return result;
    } catch (e) {
        throw new AppError(e, e?.status, e.stack)
    }
};

const get = async (id) => {
    try {
        // buscar produtor a partir da chave primaria (id)
        const result = await Produtor.findByPk(id);

        // se não existir registro para o id informado -> lançar mensagem de erro (evitar que retorne um json vazio)
        if (!result)
            throw new AppError("Registro não encontrado", 404)
        return result;
    } catch (e) {
        throw new AppError(e, e?.status, e.stack)
    }
};

const list = async () => {
    try {
        // listar e contabilizar a quantidade de produtores
        const result = await Produtor.findAndCountAll();
        return result;
    } catch (e) {
        throw new AppError(e, e?.status, e.stack)
    }
};

module.exports = { store, get, list };
