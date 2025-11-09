const { Op } = require("sequelize");
const {
   Aquisicoes,
   Itens_retiradas,
   Laboratorios,
   Medicamentos,
   Retiradas,
   Users,
   sequelize,
} = require("../models/index.js");

/* 
============================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Laboratorios 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
============================================================
*/

async function findAndCountAllLaboratorios() {
   const { count } = await Laboratorios.findAndCountAll();
   return { total_laboratorios: count };
}

/* 
============================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                       Medicamentos 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
============================================================
*/

async function findAndCountAllMinEstoqueMedicamentos() {
   const { count } = await Medicamentos.findAndCountAll({
      where: {
         [Op.and]: [
            sequelize.literal("quantidade_total <= quantidade_minima"),
            {
               situacao: "ATIVO"
            }
         ]
      },
   });
   return { total_minEstoque: count };
}

async function findOneMedicamentoWithMaxEstoque() {
   const maxEstoque = await Medicamentos.findOne({
      attributes: ["nome"],
      order: [["quantidade_total", "DESC"]],
   });
   return maxEstoque || {
      nome: "Nenhum"
   };
}

/* 
============================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                          Aquisicao 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
============================================================
*/

async function findAndCountAllAquisicaoSolicitada() {
   const { count } = await Aquisicoes.findAndCountAll({
      where: {
         status: "SOLICITADO",
      },
   });
   return { total_aquisicaoSolicitada: count };
}

async function findAndCountAllAquisicaoEnviada() {
   const { count } = await Aquisicoes.findAndCountAll({
      where: {
         status: "ENVIADO",
      },
   });
   return { total_aquisicaoEnviada: count };
}

async function findAndCountAllAquisicaoEntregue() {
   const { count } = await Aquisicoes.findAndCountAll({
      where: {
         status: "ENTREGUE",
      },
   });
   return { total_aquisicaoEntregue: count };
}

/* 
============================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Retirada 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
============================================================
*/
async function findAndCountAllRetiradasOnMonth(currMonth) {
   const { count } = await Retiradas.findAndCountAll({
      where: [
         sequelize.where(sequelize.fn("MONTH", sequelize.col("data_retirada")), currMonth)
      ]
   });
   return { total_retiradasOnMonth: count }
}

async function findMostMedicamentoRetiradoOnMonth(currMonth) {
   const mostRetirada = await Itens_retiradas.findOne({
      where: [
         sequelize.where(sequelize.fn("MONTH", sequelize.col("Itens_retiradas.created_at")), currMonth)
      ],
      include: {
         association: "medicamento",
         attributes: []
      },
      attributes: [
         "fk_id_medicamento",
         [sequelize.col("medicamento.nome"), "nome_medicamento"],
         [sequelize.fn("SUM", sequelize.col("quantidade_solicitada")), "total_retirada"]
      ],
      group: ["fk_id_medicamento", "medicamento.nome"],
      order: [
         [sequelize.literal("total_retirada"), "DESC"]
      ]
   });

   return mostRetirada || {
      nome_medicamento: "Nenhum",
      total_retirada: "0"
   };
}

/* 
============================================================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Users 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
============================================================
*/
async function findAndCountAllUsers() {
   const { count } = await Users.findAndCountAll();
   return { total_users: count }
}

async function findAndCountAllActiveUsers() {
   const { count } = await Users.findAndCountAll({
      where: {
         status: "ATIVO"
      }
   })
   return { total_users: count };
}

async function findAndCountAllInactiveUsers() {
   const { count } = await Users.findAndCountAll({
      where: {
         status: "INATIVO"
      }
   })
   return { total_users: count };
}


module.exports = {
   // Laboratorios
   findAndCountAllLaboratorios,
   // Medicamentos
   findAndCountAllMinEstoqueMedicamentos,
   findOneMedicamentoWithMaxEstoque,
   // Aquisicao
   findAndCountAllAquisicaoSolicitada,
   findAndCountAllAquisicaoEnviada,
   findAndCountAllAquisicaoEntregue,
   // Retiradas
   findAndCountAllRetiradasOnMonth,
   findMostMedicamentoRetiradoOnMonth,
   // Users
   findAndCountAllUsers,
   findAndCountAllActiveUsers,
   findAndCountAllInactiveUsers
}