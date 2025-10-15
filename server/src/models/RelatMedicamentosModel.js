module.exports = (sequelize, DataTypes) => {
   const RelatoriosMedicamentos = sequelize.define(
      "Relatorios_medicamentos",
      {
      id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         situacao: {
            type: DataTypes.ENUM("SOLICITADO", "ENVIADO", "RECEBIDO"),
            allowNull: false,
         },
      },
      {
         freezeTableName: true,
         timestamps: true,
         underscored: true,
         updatedAt: false
      }
   );

   RelatoriosMedicamentos.associate = (models) => {
      RelatoriosMedicamentos.belongsTo(models.Aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_aquisicao",
         as: "aquisicao"         
      })
   }

   return RelatoriosMedicamentos;
};
