const { Sequelize, Model, DataTypes } = require("sequelize");
const database = require("../helpers/database")

const Produtor = database.define("produtor", {
    idProdutor: { type: DataTypes.INTEGER, autoIncrement: true, autoIncrementIdentity: true, primaryKey: true },
    nomeProdutor: DataTypes.STRING,
    cpfProdutor: DataTypes.STRING,
}, {
    tableName: "produtor",
    timestamps: false
});

module.exports = Produtor;