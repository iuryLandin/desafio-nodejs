const { Sequelize, Model, DataTypes } = require("sequelize");
const database = require("../helpers/database");
const Produtor = require("./Produtor");

const Propriedade = database.define("propriedade", {
    idPropriedadde: { type: DataTypes.INTEGER, autoIncrement: true, autoIncrementIdentity: true, primaryKey: true },
    nomePropriedade: DataTypes.STRING,
    cadastroRural: DataTypes.STRING,
    produtor_id: DataTypes.INTEGER,
}, {
    tableName: "propriedade",
    timestamps: false
});

// Vincular associação 1-1 (One-To-One) com Produtor
Propriedade.belongsTo(Produtor, {
    foreignKey: 'produtor_id', // informar a chave estrangeira
    as: 'produtor' // alias para incluir na busca
});
module.exports = Propriedade;