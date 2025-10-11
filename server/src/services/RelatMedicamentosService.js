const { createRelatorio, 
   getAllRetiradasByFilter,
   getAllRelatorios,
   getRelatorioById,
} = require("../repositories/RelatMedicamentosRepository.js");
const { Op } = require("sequelize");
   const { Relatorios_medicamentos, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");

async function createRelatorioService(relatData) {
   const { situacao, fk_id_aquisicao } = relatData;
    const formattedSituacao = situacao.toUpperCase().trim();

    const situacoes = ['SOLICITADO', 'ENVIADO', 'RECEBIDO'];

    if (!situacoes.includes(formattedSituacao)) {
      throw new ExistsDataError ("Situação inválida, utilize: 'SOLICITADO', 'ENVIADO' ou 'RECEBIDO' ")
    }
    
    const existsRelatorio = await Relatorios_medicamentos.findOne({
      where: { fk_id_aquisicao } 
    });

    if (existsRelatorio) {
      throw new ExistsDataError("Já existe um relatório para esta aquisição");
    }

   const createRelat = await createRelatorio({ situacao, fk_id_aquisicao })
   return createRelat;
}

async function getAllRelatoriosByFilterService(QueryParams = {}) {
   const { orderBy, ...filters } = QueryParams;

   const RelatoriosFilters = ["id", "situacao", "fk_id_aquisicao", "fornecedor", "usuario", "medicamento"];
   const FilterSelect = {};

   if (filters && Object.keys(filters).length > 0) {
      Object.keys(filters).forEach(key => {
         if (RelatoriosFilters.includes(key)) {

            //Filtra com base na ID 
            if (key == 'id') {
               FilterSelect[key] = { [Op.eq]: Number(filters[key]) };
            }
            //Filtra com base na SITUAÇÃO
            else if (key === 'situacao') {
               FilterSelect[key] = { [Op.eq]: filters[key] };
            }
            //Filtra com base na ID da AQUISIÇÃO
            else if (key === 'fk_id_aquisicao') {
               FilterSelect[key] = { [Op.eq]: filters[key] };
            }
            //Filtra com base no nome do FORNECEDOR
            else if (key === 'fornecedor') {
               FilterSelect["$aquisicao.fornecedor$"] = { [Op.like]: `%${filters[key]}%` };
            }
            //Filtra com base no nome do USUÁRIO
            else if (key === 'usuario') {
               FilterSelect["$aquisicao.user.usuario$"] = { [Op.like]: `%${filters[key]}%` };
            }
            //Filtra com base no nome do MEDICAMENTO
            else if (key === 'medicamento') {
               FilterSelect["$aquisicao.item_aquisicao.medicamento.nome$"] = { [Op.like]: `%${filters[key]}%` };
            }
         }
      });
   }
   const OrderSelect = [];
   if (orderBy) {
      const [field, direction] = orderBy.split(",");
      if (field && (direction === "ASC" || direction === "DESC" || direction === "asc" || direction === "desc")) {
         const formattedDirection = direction.toUpperCase();
         OrderSelect.push([field, formattedDirection]);
      }
   } else {
      OrderSelect.push(["id", "ASC"]);
   }
   const relatorios_medicamentos = await getAllRetiradasByFilter(FilterSelect, OrderSelect);
   return relatorios_medicamentos;
}

async function getAllRelatoriosService() {
   const allRelatorios = await getAllRelatorios();
   return allRelatorios;
}

async function getRelatorioByIdService(id) {
   const relatorio = await getRelatorioById(id)
   return relatorio;
}

module.exports = {
   createRelatorioService,
   getAllRelatoriosByFilterService,
   getAllRelatoriosService,
   getRelatorioByIdService,
}