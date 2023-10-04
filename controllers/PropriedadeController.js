const Propriedade = require("../models/Propriedade")
const { AppError } = require('../helpers/AppError');

const store = async ({ nomePropriedade, cadastroRural, produtor_id }) => {
    try {
        // verifica se ja existe Propriedade com cadastroRural cadastrado - evitar duplicatas
        const verifica = await Propriedade.count({ where: { cadastroRural } })
        if (verifica > 0) throw new AppError(`Propriedade já existe`);

        const result = await Propriedade.create({
            nomePropriedade, cadastroRural, produtor_id
        })
        return result;
    } catch (e) {
        throw new AppError(e, e?.status, e.stack)
    }
};

const get = async (id) => {
    try {
        // buscar Propriedade a partir da chave primaria (id)
        const result = await Propriedade.findByPk(id, {
            include: ['produtor']
        });

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
        // listar e contabilizar a quantidade de propriedades
        const result = await Propriedade.findAndCountAll({
            include: ['produtor']
        });
        return result;
    } catch (e) {
        throw new AppError(e, e?.status, e.stack)
    }
};

module.exports = { store, get, list };
