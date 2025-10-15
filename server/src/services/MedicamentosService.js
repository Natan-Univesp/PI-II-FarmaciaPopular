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
   const formattedMedicamentos = medicamento.map((medicamento) => {
      return {
         medicamentoValue: medicamento.id,
         medicamentoLabel: medicamento.nome,
         laboratorioValue: medicamento.laboratorio.id,
         laboratorioLabel: medicamento.laboratorio.nome_laboratorio,
      };
   });
   return formattedMedicamentos;
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

async function createMedicamentoService(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, img) {

   const idExists = await getMedicamentoById(id);
   if(idExists) {
      throw new ExistsDataError("Existe um medicamento com este ID.","ID_EXISTS", {id})
   }

   const Newmedicamento = await createMedicamento (id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, 0, img, "ATIVO");
   return Newmedicamento;
}

async function updateMedicamentoService(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, img, situacao, quantidade_total) {
   const medicamento = await getMedicamentoById(id);
   if(!medicamento) {
      throw new NotFoundError("O medicamento não existe")
   }
   const updatedMedicamento = await updateMedicamento(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, img, situacao, quantidade_total);
   return updatedMedicamento;
}

async function changeSituacaoMedicamentoService(id, situacao) {
   const medicamento = await getMedicamentoById(id);
   if(!medicamento) {
      throw new NotFoundError("O medicamento não existe")
   }

   const formattedStatus = situacao.trim().toUpperCase();
   if (formattedStatus != 'ATIVO' && formattedStatus != 'INATIVO') {
      throw new ExistsDataError ("Use: ATIVO ou INATIVO");
   }
   const situacaoAtual = medicamento.situacao ? medicamento.situacao.trim().toUpperCase() : 'ATIVO';
      if (situacaoAtual == formattedStatus) {
         throw new ExistsDataError (`O medicamento já está ${formattedStatus}`);
      }
    const rowAffected = await changeSituacaoMedicamento(id, formattedStatus);
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