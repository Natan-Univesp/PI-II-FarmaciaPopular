const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
const { createRelatorioService,
   getAllRelatoriosByFilterService,
   getAllRelatoriosService,
   getRelatorioByIdService,
} = require("../services/RelatMedicamentosService.js");


async function getAllRelatorios(req, res) {
   try {
      const allRelatorios = await getAllRelatoriosService();
      return res.status(200).json(allRelatorios);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRelatoriosByFilter(req, res) {
   try {
      const { orderBy, ...filters } = req.query;


      if (!orderBy && Object.keys(filters).length === 0) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               orderBy,
               filters,
            },
         });
      }

      const filteredRelatorios = await getAllRelatoriosByFilterService({
         orderBy,
         ...filters
      });


      return res.status(200).json(filteredRelatorios);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getRelatorioById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const relatorio = await getRelatorioByIdService(id);

      if (!relatorio) {
         throw new NotFoundError("informação de relatório não encontrada", {
            fields: {
               id
            }
         })
      }
      
      return res.status(200).json(relatorio);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createRelatorio(req, res) {
   try {
      const { fk_id_aquisicao, situacao } = req.body;

      if (!fk_id_aquisicao || !situacao) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               fk_id_aquisicao,
               situacao
            },
         });
      }

      const createdRetirada = await createRelatorioService({ fk_id_aquisicao, situacao });


      if (!createdRetirada) {
         throw new CannotCreateError("Erro ao cadastrar Retirada", {
            retiradaData: req.body,
            inCreated: createdRetirada,
         });
      }

      return res.status(201).json({
         status: "success",
         message: "Relatório cadastrado com sucesso!",
         data: createdRetirada
      })

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getRelatorioById,
   getAllRelatorios,
   getAllRelatoriosByFilter,
   createRelatorio
}
