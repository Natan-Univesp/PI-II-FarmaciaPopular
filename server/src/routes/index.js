const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
// Todas as rotas 
const authRouter = require("./AuthRouter.js");
const userRouter = require("./UsersRouter.js");
const medicamentoRouter = require("./MedicamentosRouter.js");
const laboratorioRouter = require("./LaboratoriosRouter.js");
const loteMedicamento = require("./LotesMedicamentosRouter.js");
const aquisicaoMedicamento = require("./AquisicoesRouter.js");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", authMiddleware, userRouter);
router.use("/medicamentos", authMiddleware, medicamentoRouter);
router.use("/laboratorios", authMiddleware, laboratorioRouter);
router.use("/lotes-medicamentos", authMiddleware, loteMedicamento);
router.use("/aquisicoes", authMiddleware, aquisicaoMedicamento);


module.exports = router;