module.exports = (sequelize, DataTypes) => {
   const ClientesEspeciais = sequelize.define(
      "Clientes_especiais",
      {
         nome_cliente: {
            type: DataTypes.STRING(100),
            allowNull: false,
         },
         telefone: {
            type: DataTypes.STRING(20),
            allowNull: false,
         },
      },
      {
         freezeTableName: true,
         timestamps: false,
         underscored: true,
      }
   );

   ClientesEspeciais.associate = (models) => {
      ClientesEspeciais.belongsTo(models.Medicamentos, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento",
      });
   };

   return ClientesEspeciais;
};
