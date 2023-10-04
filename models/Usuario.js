const { Sequelize, Model, DataTypes } = require("sequelize");
const database = require("../helpers/database")

const Usuario = database.define("usuario", {
    idUsuario: { type: DataTypes.INTEGER, autoIncrement: true, autoIncrementIdentity: true, primaryKey: true },
    nomeUsuario: DataTypes.STRING,
    senhaUsuario: DataTypes.STRING,
}, {
    tableName: "usuario",
    timestamps: false
});

module.exports = Usuario;