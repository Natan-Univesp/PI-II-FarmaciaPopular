const errorResponse = require("../helper/ErrorResponseHelper.js");
const {
   getTotalRegisteredLaboratoriosService,
   getTotalMinEstoqueMedicamentosService,
   getMedicamentoWithMaxEstoqueService,
   getTotalAquisicoesSolicitadasService,
   getTotalAquisicoesEnviadasService,
   getTotalAquisicoesEntreguesService,
   getAllRetiradasOnMonthService,
   getMostMedicamentoRetiradoOnMonthService,
   getTotalUsersServices,
   getTotalActiveUsersServices,
   getTotalInactiveUsersServices,
} = require("../services/InfoStatsService.js");

async function getTotalRegisteredLaboratorios(req, res) {
   try {
      const info = await getTotalRegisteredLaboratoriosService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalMinEstoqueMedicamentos(req, res) {
   try {
      const info = await getTotalMinEstoqueMedicamentosService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMedicamentoWithMaxEstoque(req, res) {
   try {
      const info = await getMedicamentoWithMaxEstoqueService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalAquisicoesSolicitadas(req, res) {
   try {
      const info = await getTotalAquisicoesSolicitadasService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalAquisicoesEnviadas(req, res) {
   try {
      const info = await getTotalAquisicoesEnviadasService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalAquisicoesEntregues(req, res) {
   try {
      const info = await getTotalAquisicoesEntreguesService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRetiradasOnMonth(req, res) {
   try {
      const info = await getAllRetiradasOnMonthService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMostMedicamentoRetiradoOnMonth(req, res) {
   try {
      const info = await getMostMedicamentoRetiradoOnMonthService();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalUsers(req, res) {
   try {
      const info = await getTotalUsersServices();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalActiveUsers(req, res) {
   try {
      const info = await getTotalActiveUsersServices();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalInactiveUsers(req, res) {
   try {
      const info = await getTotalInactiveUsersServices();
      return res.status(200).json(info);
   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getTotalRegisteredLaboratorios,
   getTotalMinEstoqueMedicamentos,
   getMedicamentoWithMaxEstoque,
   getTotalAquisicoesSolicitadas,
   getTotalAquisicoesEnviadas,
   getTotalAquisicoesEntregues,
   getAllRetiradasOnMonth,
   getMostMedicamentoRetiradoOnMonth,
   getTotalUsers,
   getTotalActiveUsers,
   getTotalInactiveUsers,
}