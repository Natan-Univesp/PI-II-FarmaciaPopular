const { Router } = require("express");
const lotesMedicamentos = require("../controllers/LotesMedicamentosController.js");

const router = Router();

router
   .route("/")
   .get(lotesMedicamentos.getAllLotesMedicamentos)
   .post(lotesMedicamentos.createLoteMedicamento);

router
   .route("/medicamentos/:idMedicamento")
   .get(lotesMedicamentos.getAllLotesMedicamentosByIdMedicamento);

router
   .route("/:idMedicamento/filter")
   .get(lotesMedicamentos.getAllLotesMedicamentosByFilter);

router
   .route("/:id")
   .get(lotesMedicamentos.getLoteMedicamentoById)
   .patch(lotesMedicamentos.updateLoteMedicamento);

module.exports = router;