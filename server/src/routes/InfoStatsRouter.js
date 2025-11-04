const { Router } = require("express");
const infoStatsController = require("../controllers/InfoStatsController.js");

const router = Router();

router
   .route("/laboratorios/total-registered")
   .get(infoStatsController.getTotalRegisteredLaboratorios)

router
   .route("/medicamentos/total-min-stock")
   .get(infoStatsController.getTotalMinEstoqueMedicamentos)

router
   .route("/medicamentos/max-stock")
   .get(infoStatsController.getMedicamentoWithMaxEstoque)

router
   .route("/aquisicoes/total-solicitadas")
   .get(infoStatsController.getTotalAquisicoesSolicitadas)

router
   .route("/aquisicoes/total-enviadas")
   .get(infoStatsController.getTotalAquisicoesEnviadas)

router
   .route("/aquisicoes/total-entregues")
   .get(infoStatsController.getTotalAquisicoesEntregues)

router
   .route("/retiradas/total-month")
   .get(infoStatsController.getAllRetiradasOnMonth)

router
   .route("/retiradas/medicamento/most-month")
   .get(infoStatsController.getMostMedicamentoRetiradoOnMonth)

router
   .route("/users/total")
   .get(infoStatsController.getTotalUsers)

router
   .route("/users/active/total")
   .get(infoStatsController.getTotalActiveUsers)

router
   .route("/users/inactive/total")
   .get(infoStatsController.getTotalInactiveUsers)

module.exports = router;