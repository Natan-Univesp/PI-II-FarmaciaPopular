"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Clientes_especiais", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         fk_id_medicamentos: {
            type: Sequelize.DataTypes.INTEGER(11),
            references: {
               model: "Medicamentos",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
         },
         nome_cliente: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
         },
         telefone: {
            type: Sequelize.DataTypes.STRING(20),
            allowNull: false,
         },
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropDatabase("");
   },
};
