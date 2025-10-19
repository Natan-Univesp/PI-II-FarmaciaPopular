const { getAllMedicamentos,
   getAllMedicamentosByLaboratorioId,
   getMedicamentoById,
   getAllInactiveMedicamentos,
   getAllMedicamentosForSelect,
   getAllMedicamentosByFilter,
   createMedicamento,
    updateMedicamento,
    changeSituacaoMedicamento,
} = require("../repositories/MedicamentosRepository.js");
const { Op } = require("sequelize");
const { Medicamentos, Laboratorios, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");
const NotFoundError = require("../classes/NotFoundError.js");


async function getAllMedicamentosService() {
   const medicamentos = await getAllMedicamentos();
   return medicamentos;
}

async function getAllMedicamentosByLaboratorioIdService(idLab) {
   const medicamentos = await getAllMedicamentosByLaboratorioId(idLab);
   return medicamentos;
}

async function getMedicamentoByIdService(id) {
   const medicamento = await getMedicamentoById(id);
   return medicamento;
}

async function getAllInactiveMedicamentosService() {
   const medicamento = await getAllInactiveMedicamentos();
   return medicamento;
}

async function getAllMedicamentosForSelectService() {
   const medicamento = await getAllMedicamentosForSelect();
   return medicamento;
}

async function getAllMedicamentosByFilterService(orderBy, filters) {

   const MedicamentosFilters = ["id", "nome", "indicacao_uso", "categoria", "tipo_unidade", "situacao"];
   const FilterSelect = {};

   if (filters && Object.keys(filters).length > 0) {
      Object.keys(filters).forEach(key => {
         if (MedicamentosFilters.includes(key)) {

            //Filtra com base na ID 
            if (key == 'id') {
               FilterSelect[key] = { [Op.eq]: Number(filters[key]) };
            }
            //Filtra com base no NOME DO MEDICAMENTO
            else if (key === 'nome') {
               FilterSelect[key] = { [Op.like]: `%${filters[key]}%` };
            }
            //Filtra com base na INDICAÇÃO DE USO
            else if (key === 'indicacao_uso') {
               FilterSelect[key] = { [Op.like]: `%${filters[key]}%` };
            }
            //Filtra com base na CATEGORIA
            else if (key === 'categoria') {
               FilterSelect[key] = { [Op.eq]: (filters[key]) };
            }
            //Filtra com base no nome do USUÁRIO
            else if (key === 'tipo_unidade') {
               FilterSelect[key] = { [Op.like]: `%${filters[key]}%` };
            }
            //Filtra com base na SITUAÇÃO
            else if (key === 'situacao') {
               FilterSelect[key] = { [Op.eq]: (filters[key]) };
            }
         }
      });
   }

   const OrderSelect = [];
   if (orderBy) {
      const [field, direction] = orderBy.split(",");
      if (field && (direction.toUpperCase() === "ASC" || direction.toUpperCase() === "DESC")) {
         const formattedDirection = direction.toUpperCase();
         OrderSelect.push([field, formattedDirection]);
      }
   } else {
      OrderSelect.push(["id", "ASC"]);
   }
   const relatorios_medicamentos = await getAllMedicamentosByFilter(FilterSelect, OrderSelect);
   return relatorios_medicamentos;
}

async function createMedicamentoService(medicamentoData) {
   const { id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, img } = medicamentoData;

   const medicamento = {
      ...medicamentoData,
      quantidade_total: 0,
      situacao: "ATIVO"
   }

   const Newmedicamento = await createMedicamento (medicamento);
   return Newmedicamento;
}

async function updateMedicamentoService(medicamentoData) {
   const updatedMedicamento = await updateMedicamento(medicamentoData);
   return updatedMedicamento;
}

async function changeSituacaoMedicamentoService(id, situacao) {
    const rowAffected = await changeSituacaoMedicamento(id, situacao);
      return rowAffected;
} 

module.exports = {
   getAllMedicamentosService,
   getAllMedicamentosByLaboratorioIdService,
   getMedicamentoByIdService,
   getAllInactiveMedicamentosService,
   getAllMedicamentosForSelectService,
   getAllMedicamentosByFilterService,
   createMedicamentoService,
   updateMedicamentoService,
   changeSituacaoMedicamentoService,
};   