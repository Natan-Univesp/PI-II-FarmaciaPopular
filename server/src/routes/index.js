const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
// Todas as rotas 
const authRouter = require("./AuthRouter.js");
const userRouter = require("./UsersRouter.js");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", authMiddleware, userRouter);


module.exports = router;