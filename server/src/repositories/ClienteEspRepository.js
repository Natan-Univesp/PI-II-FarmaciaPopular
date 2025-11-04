const NotFoundError = require("../classes/NotFoundError.js");
const ExistsDataError = require("../classes/ExistsDataError.js");
const {
   Clientes_especiais,
   Medicamentos_clientes_especiais,
   Medicamentos,
   sequelize,
} = require("../models/index.js");
const { Op } = require("sequelize");

// Busca todos os clientes especiais
async function getAllClientesEspeciais() {
   const allClientes = await Clientes_especiais.findAll({
      attributes: ["id", "nome_cliente", "telefone"],
      include: [
         {
            association: "cliente_medicamento",
            include: {
               association: "medicamento",
               attributes: [],
            },
            attributes: [
               "id",
               [sequelize.literal("`cliente_medicamento->medicamento`.`nome`"), "nome_medicamento"],
               [
                  sequelize.fn(
                     "DATE_FORMAT",
                     sequelize.col("cliente_medicamento.created_at"),
                     "%d-%m-%Y %H:%i:%s"
                  ),
                  "data_criacao",
               ],
               [
                  sequelize.fn(
                     "DATE_FORMAT",
                     sequelize.col("cliente_medicamento.updated_at"),
                     "%d-%m-%Y %H:%i:%s"
                  ),
                  "data_alteracao",
               ],
            ],
         },
      ],
      order: [["id", "ASC"]],
   });
   return allClientes;
}

// Busca todos os clientes com base na ID do medicamento
async function getAllClientesByMedicamento(fk_id_medicamento) {
   const clientesEsp = await Clientes_especiais.findAll({
      attributes: ["id", "nome_cliente", "telefone"],
      include: [
         {
            association: "cliente_medicamento",
            where: { fk_id_medicamento },
            required: true,
            include: [
               {
                  association: "medicamento",
                  attributes: ["id", "nome"],
               },
            ],
         },
      ],
   });
   return clientesEsp;
}

// Busca todos os clientes conforme sua ID
async function getClienteEspecialById(id) {
   const clientesEsp = await Clientes_especiais.findByPk(id, {
      attributes: ["id", "nome_cliente", "telefone"],
      include: [
         {
            association: "cliente_medicamento",
            attributes: ["fk_id_medicamento"],
            
         },
      ],
   });
   return clientesEsp;
}

// Cria um novo cliente especial
async function createClienteEspecial(clienteData, medicamentos) {
   const t = await sequelize.transaction();

   try {
      // Cria o cliente
      const newClient = await Clientes_especiais.create(
         {
            nome_cliente: clienteData.nome_cliente,
            telefone: clienteData.telefone,
         },
         { transaction: t }
      );

      // Cria o medicamento(s) associados a este cliente
      const newMed = medicamentos.map((medicamento) => {
         return {
            fk_id_cliente_especial: newClient.id,
            fk_id_medicamento: medicamento.fk_id_medicamento,
         };
      });

      await Medicamentos_clientes_especiais.bulkCreate(newMed, { transaction: t });

      await t.commit();

      const clienteFinal = await Clientes_especiais.findByPk(newClient.id, {
         attributes: ["id", "nome_cliente", "telefone"],
         include: [
            {
               association: "cliente_medicamento",
               include: [
                  {
                     association: "medicamento",
                     attributes: ["id", "nome"],
                  },
               ],
            },
         ],
      });
      return clienteFinal;
   } catch (error) {
      if (t && !t.finished) {
         await t.rollback();
      }
      throw error;
   }
}

// Atualiza um cliente já existente
async function updateClienteEspecial(id, nome_cliente, telefone, idMedicamentos) {
   /* 
      idMedicamentos é na verdade um array com objeto, então o nome não condiz com o parâmetro:
      [{fk_id_medicamento: XX}]
   */
   const t = await sequelize.transaction();

   try {
      const existsCliente = await Clientes_especiais.findByPk(id, {
         attributes: ["id", "nome_cliente", "telefone"],
      });

      if (!existsCliente) {
         throw new NotFoundError("Cliente não encontrado");
      }

      for(let medicamentoData of idMedicamentos) {
         const medicamentosInvalidos = await Medicamentos.findAll({
            where: {
               id: medicamentoData.fk_id_medicamento,
               categoria: { [Op.ne]: "CONVENIO" },
            },
         });

         if (medicamentosInvalidos.length > 0) {
            throw new ExistsDataError(
               "Apenas medicamentos com a categoria 'CONVÊNIO' podem ser associados a clientes especiais."
            );
         }
      }

      

      // Atualiza dados do cliente
      const updateFields = {};
      if (nome_cliente !== undefined && nome_cliente !== "")
         updateFields.nome_cliente = nome_cliente;
      if (telefone !== undefined && telefone !== "") updateFields.telefone = telefone;

      if (Object.keys(updateFields).length > 0) {
         await Clientes_especiais.update(updateFields, {
            where: { id },
            transaction: t,
         });
      }

      // Atualiza os medicamentos
      await Medicamentos_clientes_especiais.destroy({
         where: { fk_id_cliente_especial: id },
         transaction: t,
      });

      if (idMedicamentos && idMedicamentos.length > 0) {
         const itensParaCriar = idMedicamentos.map((medicamento) => {
            if(Object.keys(medicamento).length > 0) {
               return {
                  fk_id_cliente_especial: id,
                  fk_id_medicamento: medicamento.fk_id_medicamento,
               }
            }
         });

         await Medicamentos_clientes_especiais.bulkCreate(itensParaCriar, { transaction: t });
      }

      await t.commit();
      return [1];
   } catch (error) {
      if (t && !t.finished) {
         await t.rollback();
      }
      throw error;
   }
}

// Deleta o registro de um cliente com base na ID
async function deleteClienteEspecial(id) {
   const t = await sequelize.transaction();

   try {
      await Medicamentos_clientes_especiais.destroy({
         where: { fk_id_cliente_especial: id },
         transaction: t,
      });

      const deleteCliente = await Clientes_especiais.destroy({
         where: { id },
         transaction: t,
      });

      await t.commit();
      return deleteCliente;
   } catch (error) {
      if (t && !t.finished) {
         await t.rollback();
      }
      throw error;
   }
}

module.exports = {
   getAllClientesEspeciais,
   getAllClientesByMedicamento,
   getClienteEspecialById,
   createClienteEspecial,
   updateClienteEspecial,
   deleteClienteEspecial,
};
