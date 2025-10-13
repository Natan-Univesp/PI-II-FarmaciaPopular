const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
   const LotesMedicamentos = sequelize.define("Lotes_medicamentos", {
      quantidade: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
      },
      data_validade: {
         type: DataTypes.DATEONLY,
         allowNull: false,
         set(value) {
            // Converte o DD-MM-YYYY para YYYY-MM-DD
            if (value && typeof value === 'string') {
                const dataMoment = moment(value, 'DD-MM-YYYY');
                if (dataMoment.isValid()) {
                    this.setDataValue('data_validade', dataMoment.format('YYYY-MM-DD'));
                } else {
                    throw new Error('Formato de data inválido. Use DD-MM-YYYY');
                }
            }
         }
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true      
   });

   LotesMedicamentos.associate = (models) => {
      LotesMedicamentos.belongsTo(models.Medicamentos, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento"
      });
   }

   return LotesMedicamentos;
};
