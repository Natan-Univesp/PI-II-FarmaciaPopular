const { Association } = require("sequelize");
const { Itens_retiradas, Retiradas, Medicamentos, sequelize, Lotes_medicamentos } = require("../models/index.js");
const CannotCreateError = require("../classes/CannotCreateError.js");

// Cria uma nova retirada
async function createRetirada(itensRetirada, idUser) {
   const t = await sequelize.transaction();
   const medicamentosRetirada = [];

   try {
      for (const retirados of itensRetirada) {
         const medicamentoLote = await Lotes_medicamentos.findByPk(retirados.fk_id_medicamento);

         if (!medicamentoLote) {
            throw new CannotCreateError("O medicamento informado não existe");
         }

         if (retirados.quantidade_solicitada > medicamentoLote.quantidade) {
            throw new CannotCreateError("Não há estoque suficiente do medicamento solicitado");
         }

         const newQtd = Number(medicamentoLote.quantidade) - Number(retirados.quantidade_solicitada);
         const updatedLote = await Lotes_medicamentos.update(
            {
               quantidade: newQtd,
            },
            {
               where: { id: retirados.fk_id_medicamento },
            }
         );

         medicamentosRetirada.push({
            fk_id_medicamento: medicamentoLote.fk_id_medicamento,
            quantidade_solicitada: retirados.quantidade_solicitada,
         });
      }
      // Cria a retirada
      const createRetirada = await Retiradas.create(
         {
            fk_id_user: idUser,
         },
         { transaction: t }
      );

      // Cria o item a ser retirado em Itens Retiradas
      const createItem = medicamentosRetirada.map((item) => {
         return {
            fk_id_medicamento: item.fk_id_medicamento,
            fk_id_retirada: createRetirada.id,
            quantidade_solicitada: item.quantidade_solicitada,
         };
      });
      await Itens_retiradas.bulkCreate(createItem, { transaction: t });

      await t.commit();

      const retiradaFinal = await Retiradas.findByPk(createRetirada.id, {
         attributes: [
            "id",
            "data_retirada",
            "fk_id_user",
            [
               sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
               "data_retirada",
            ],
         ],
         include: [
            {
               association: "itens_retirada",
               include: [
                  {
                     association: "medicamento",
                     attributes: ["id", "nome", "quantidade_total"],
                  },
               ],
            },
         ],
      });
      return retiradaFinal;
   } catch (error) {
      if (t && t.commit) {
         await t.rollback();
      }
      throw error;
   }
}

// Encontra todas as retiradas
async function getAllRetiradas() {
   const retiradas = await Retiradas.findAll({
      attributes: [
         "id",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
            "data_retirada",
         ],
      ],
      include: [
         {
            association: "user",
            attributes: ["usuario"],
         },
         {
            association: "itens_retirada",
            attributes: ["quantidade_solicitada"],
            include: [
               {
                  association: "medicamento",
                  attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total", "img"],
               },
            ],
         },
      ],
      order: [["data_retirada", "DESC"]],
   });
   return retiradas;
}

// Encontra as retiradas conforme o filtro selecionado
async function getAllRetiradasByFilter(filterSelect = {}, orderSelect = []) {
   const queryOptions = {
      where: Object.keys(filterSelect).length > 0 ? filterSelect : {},
      order: orderSelect.length > 0 ? orderSelect : [["id", "ASC"]],
      attributes: [
         "id",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
            "data_retirada",
         ],
      ],
      include: [
         {
            association: "user",
            attributes: ["usuario"],
         },
         {
            association: "itens_retirada",
            attributes: ["quantidade_solicitada"],
            include: [
               {
                  association: "medicamento",
                  attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total", "img"],
               },
            ],
         },
      ],
   };
   const retiradas = await Retiradas.findAll(queryOptions);
   return retiradas;
}

// Encontra a retirada conforme ID.
async function getRetiradaById(id) {
   const idretiradas = await Retiradas.findByPk(id, {
      attributes: [
         "id",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
            "data_retirada",
         ],
      ],
      include: [
         {
            association: "user",
            attributes: ["usuario"],
         },
         {
            association: "itens_retirada",
            attributes: ["quantidade_solicitada"],
            include: [
               {
                  association: "medicamento",
                  attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total", "img"],
               },
            ],
         },
      ],
      order: [["data_retirada", "DESC"]],
   });
   return idretiradas;
}

module.exports = {
   createRetirada,
   getAllRetiradas,
   getAllRetiradasByFilter,
   getRetiradaById,
};
