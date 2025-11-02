const { Where } = require("sequelize/lib/utils");
const { Medicamentos, Laboratorios, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");
const NotFoundError = require("../classes/NotFoundError.js");


// Busca Todos os medicamentos cadastrados
async function getAllMedicamentos() {
   const allMedicamentos = await Medicamentos.findAll({
      attributes: [
         "id",
         "nome",
         "indicacao_uso",
         "categoria",
         "tipo_unidade",
         "quantidade_minima",
         "img",
         "situacao",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
            "data_criacao",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ],
         [sequelize.col("laboratorio.nome_laboratorio"), "nome_laboratorio"],
         [
            sequelize.fn('COUNT', sequelize.col("medicamento_lote.id")),
            "total_lotes"
         ]
      ],
      include: [
         {
            association: "laboratorio",
            attributes: [],
         },
         {
            association: "medicamento_lote",
            attributes: []
         }
      ],
      group: ["Medicamentos.id"],
      order: [ //Ordena conforme a situação do medicamento (ATIVOS primeiro)
         ['situacao', 'ASC']
      ]
   });

   return allMedicamentos;
}

async function findAllActiveMedicamentos() {
   const allActiveMedicamentos = await Medicamentos.findAll({
      include: [
         {
            association: "laboratorio",
            attributes: [],
         },
         {
            association: "medicamento_lote",
            attributes: []
         }
      ],
      attributes: [
         "id",
         "nome",
         [sequelize.col("laboratorio.nome_laboratorio"), "nome_laboratorio"],
         "categoria",
         "tipo_unidade",
         "indicacao_uso",
         "quantidade_minima",
         "img",
         "situacao",
         [
            sequelize.fn('COUNT', sequelize.col("medicamento_lote.id")),
            "total_lotes"
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
            "data_criacao",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ],
      ],
      group: ["Medicamentos.id"],
      where: {
         situacao: "ATIVO"
      },
      order: [
         ['nome', 'ASC']
      ]
   })
   return allActiveMedicamentos;
}

// Busca todos os medicamentos com base na ID do LABORATÓRIO
async function getAllMedicamentosByLaboratorioId(idLab) {
   const allMedicamentos = await Medicamentos.findAll({
      where: { fk_id_laboratorio: idLab },
      include: {
         association: "laboratorio",
         attributes: [],
      },
      attributes: {
         include: [
            [sequelize.col("laboratorio.nome_laboratorio"), "nome_laboratorio"]
         ]
      }
   });

   return allMedicamentos;
}

// Busca todos os medicamentos com base na ID do MEDICAMENTO
async function getMedicamentoById(id) {
   const medicamento = await Medicamentos.findByPk(id, {
      include: {
         association: "laboratorio",
         attributes: [],
      },
      attributes: {
         include: [
            [sequelize.col("laboratorio.nome_laboratorio"), "nome_laboratorio"]
         ]
      }
   });
   return medicamento;
}



// Busca todos os medicamentos Inativos
async function getAllInactiveMedicamentos() {
   const medicamento = await Medicamentos.findAll({
      include: [
         {
            association: "laboratorio",
            attributes: [],
         },
         {
            association: "medicamento_lote",
            attributes: []
         }
      ],
      attributes: [
         "id",
         "nome",
         [sequelize.col("laboratorio.nome_laboratorio"), "nome_laboratorio"],
         "categoria",
         [
            sequelize.fn('COUNT', sequelize.col("medicamento_lote.id")),
            "total_lotes"
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ]
      ],
      group: ["Medicamentos.id"],
      where: {
         situacao: 'INATIVO'
      },
      order: [
         ["updated_at", "ASC"]
      ]
   });

   return medicamento;
}

// busca os medicamentos conforme o SELECT
async function getAllMedicamentosForSelect() {
   const medicamento = await Medicamentos.findAll({
      attributes: [
         ["id", "value"],
         ["nome", "label"]
      ]
   });
   return medicamento;
}

async function findAllMedicamentosForSelectByLabId(idLab) {
   const medicamento = await Medicamentos.findAll({
      attributes: [
         ["id", "value"],
         ["nome", "label"]
      ],
      where: {
         fk_id_laboratorio: idLab
      }
   });

   return medicamento;
}

// busca os medicamentos conforme os FILTROS selecionados pelo usuário
async function getAllMedicamentosByFilter(filterSelect = {}, orderSelect = []) {

   const queryOptions = {
      where: Object.keys(filterSelect).length > 0 ? filterSelect : {},
      order: orderSelect.length > 0 ? orderSelect : [['id', 'ASC']],
      attributes: [
         "id",
         "fk_id_laboratorio",
         "nome",
         "indicacao_uso",
         "categoria",
         "tipo_unidade",
         "situacao",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
            "data_criacao",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ],
      ],
      include: {
         association: "laboratorio",
         attributes: [],
      },
      attributes: {
         include: [
            [sequelize.col("laboratorio.nome_laboratorio"), "nome_laboratorio"]
         ]
      },
   };


   const allRelatorios = await Medicamentos.findAll(queryOptions);
   return allRelatorios
}

// Função para a criação de um NOVO MEDICAMENTO
async function createMedicamento(medicamentoData) {
   const { id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, quantidade_total, img, situacao } = medicamentoData;

   // Verifica a existência da ID informada
   const idExists = await getMedicamentoById(id);
   if (idExists) {
      throw new ExistsDataError("Medicamento com o mesmo CÓDIGO já existe.", "ID_EXISTS", { id })
   }

   const Newmedicamentos = await Medicamentos.create({
      id,
      fk_id_laboratorio,
      nome,
      indicacao_uso,
      categoria,
      tipo_unidade,
      quantidade_minima,
      quantidade_total,
      img,
      situacao
   });

   return Newmedicamentos;
}


// Função para ATUALIZAR um MEDICAMENTO
async function updateMedicamento(medicamentoData) {
   const { id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, quantidade_total, img, situacao } = medicamentoData;

   // Verifica a existência da ID informada
   const medicamento = await getMedicamentoById(id);
   if (!medicamento) {
      throw new NotFoundError("O medicamento não existe")
   }

   const updateFields = {}
   if (fk_id_laboratorio !== undefined) updateFields.fk_id_laboratorio = fk_id_laboratorio;
   if (nome !== undefined && nome !== "") updateFields.nome = nome;
   if (indicacao_uso !== undefined && indicacao_uso !== "") updateFields.indicacao_uso = indicacao_uso;
   if (categoria !== undefined && categoria !== "") updateFields.categoria = categoria;
   if (tipo_unidade !== undefined && tipo_unidade !== "") updateFields.tipo_unidade = tipo_unidade;
   if (quantidade_minima !== undefined) updateFields.quantidade_minima = quantidade_minima;
   if (quantidade_total !== undefined) updateFields.quantidade_total = quantidade_total;
   if (img !== undefined) updateFields.img = img;
   if (situacao !== undefined) updateFields.situacao = situacao;

   const [rowsAffected] = await Medicamentos.update(updateFields, {
      where: { id: id }
   });
   return rowsAffected;
}

// Função para ATUALIZAR a situação dos MEDICAMENTOS
async function changeSituacaoMedicamento(id, situacao) {

   // Verifica a existência da ID informada
   const medicamento = await getMedicamentoById(id);
   if (!medicamento) {
      throw new NotFoundError("O medicamento não existe")
   }

   // Verifica se o usuário passou a situação de forma correta
   const formattedStatus = situacao.trim().toUpperCase();
   if (formattedStatus != 'ATIVO' && formattedStatus != 'INATIVO') {
      throw new ExistsDataError("Use: ATIVO ou INATIVO");
   }

   // Verifica se a situação informada não é a mesma da atual.
   const situacaoAtual = medicamento.situacao ? medicamento.situacao.trim().toUpperCase() : 'ATIVO';
   if (situacaoAtual == formattedStatus) {
      throw new ExistsDataError(`O medicamento já está ${formattedStatus}`);
   }

   const [rowsAffected] = await Medicamentos.update(
      { situacao: situacao },
      { where: { id: id } }
   );
   return rowsAffected;
}

module.exports = {
   getAllMedicamentos,
   findAllActiveMedicamentos,
   getAllMedicamentosByLaboratorioId,
   getMedicamentoById,
   getAllInactiveMedicamentos,
   getAllMedicamentosForSelect,
   findAllMedicamentosForSelectByLabId,
   getAllMedicamentosByFilter,
   createMedicamento,
   updateMedicamento,
   changeSituacaoMedicamento
}