const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const deleteFile = require("../helper/deleteFileHelper.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
const {
   getAllMedicamentosService,
   getAllMedicamentosByLaboratorioIdService,
   getMedicamentoByIdService,
   getAllInactiveMedicamentosService,
   getAllMedicamentosForSelectService,
   getAllMedicamentosByFilterService,
   createMedicamentoService,
   updateMedicamentoService,
   changeSituacaoMedicamentoService,
} = require("../services/MedicamentosService.js")

async function getAllMedicamentos(req, res) {
   try {
      const allMedicamentos = await getAllMedicamentosService();
      return res.status(200).json(allMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllInactiveMedicamentos(req, res) {
   try {
      const allInactiveMedicamentos = await getAllInactiveMedicamentosService ();
      return res.status(200).json(allInactiveMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMedicamentosByLaboratorioId(req, res) {
   try {
      const idLab = Number(req.params.idLab);

      if (!idLab) {
         throw new FieldUndefinedError("Campo idLab não identificado", {
            fields: {
               idLab,
            },
         });
      }

      const allMedicamentos = await getAllMedicamentosByLaboratorioIdService(idLab);
      return res.status(200).json(allMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMedicamentosByFilter(req, res) {
   try {
      const { orderBy, filterOptions } = req.query;

      if (!orderBy && !filterOptions) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               orderBy,
               filterOptions,
            },
         });
      }

      const filteredMedicamentos = await getAllMedicamentosByFilterService(orderBy, filterOptions);
      return res.status(200).json(filteredMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMedicamentoById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const medicamento = await getMedicamentoByIdService(id);

      if (!medicamento) {
         throw new NotFoundError("Medicamento não encontrado", {
            fields: {
               id,
            },
         });
      }

      return res.status(200).json(medicamento);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMedicamentosForSelect(req, res) {
   try {
      const allMedicamentos = await getAllMedicamentosForSelectService();
      return res.status(200).json(allMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function createMedicamento(req, res) {
   try {
      if(!req.body) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            fields: req.body
         })
      }

      const {
         id,
         fk_id_laboratorio,
         nome,
         indicacao_uso,
         categoria,
         quantidade_minima,
         tipo_unidade,
      } = req.body;

      const file = req.file;

      if (
         !id ||
         !fk_id_laboratorio ||
         !nome ||
         !indicacao_uso ||
         !categoria ||
         (quantidade_minima === undefined || 
          quantidade_minima === null) ||
         !tipo_unidade ||
         !file
      ) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            dados_passados: {
               ...req.body,
               ...req.file,
            },
         });
      }

      const medicamentoData = {
         id: Number(id),
         fk_id_laboratorio: Number(fk_id_laboratorio),
         nome: nome,
         indicacao_uso,
         categoria,
         tipo_unidade,
         quantidade_minima: Number(quantidade_minima),
         img: file.filename,
      };

      const createdMedicamento = await createMedicamentoService(medicamentoData);

      if (!createdMedicamento) {
         throw new CannotCreateError("Erro ao cadastrar Medicamento", {
            medicamentoData: req.body,
            inCreated: createdMedicamento,
         });
      }

      return res.status(201).json({
         status: "success",
         message: "Medicamento Cadastrado com sucesso!",
         data: createdMedicamento,
      });
   } catch (error) {
      if (req.file) {
         await deleteFile(req.file.filename);
      }

      errorResponse(error, res);
   }
}

async function updateMedicamento(req, res) {
   try {
      const id = Number(req.params.id);
      const {
         fk_id_laboratorio,
         nome,
         indicacao_uso,
         categoria,
         tipo_unidade,
         quantidade_minima,
      } = req.body;

      const file = req?.file;

      if (
         !id ||
         (!fk_id_laboratorio &&
         !nome &&
         !indicacao_uso &&
         !categoria &&
         !tipo_unidade &&
         !file &&
         (quantidade_minima === undefined || 
          quantidade_minima === null))
      ) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               ...req.body,
               file,
            },
         });
      }

         const medicamentoData = {
         id,
         fk_id_laboratorio: fk_id_laboratorio ? Number(fk_id_laboratorio) : undefined,
         nome,
         indicacao_uso,
         categoria,
         tipo_unidade,
         quantidade_minima: quantidade_minima ? Number(quantidade_minima) : undefined,
         img: file ? file.filename : undefined,
      };

      const rowAffected = await updateMedicamentoService(medicamentoData);

      if (rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Informações de medicamento alterado com sucesso!",
         });
      }
   } catch (error) {
      if (req.file) {
         await deleteFile(req.file.filename);
      }
      errorResponse(error, res);
   }
}

async function changeSituacaoMedicamento(req, res) {
   try {
      const id = Number(req.params.id);
      const { situacao } = req.body;

      if (!id || !situacao) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               situacao,
            },
         });
      }
      const rowAffected = await changeSituacaoMedicamentoService(id, situacao);
      if (rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Situação de medicamento alterada com sucesso!",
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllMedicamentos,
   getAllInactiveMedicamentos,
   getAllMedicamentosByLaboratorioId,
   getAllMedicamentosByFilter,
   getMedicamentoById,
   getAllMedicamentosForSelect,
   createMedicamento,
   updateMedicamento,
   changeSituacaoMedicamento,
};
