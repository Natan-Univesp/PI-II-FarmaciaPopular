const { Router } = require("express");
const usersController = require("../controllers/UsersController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = Router();

router
   .route("/")
   .get(authMiddleware, usersController.getAllUsers)
   .post(usersController.createUser);

router
   .route("/total-registered")
   .get(usersController.getTotalUsersRegistered)

router
   .route("/logged")
   .get(authMiddleware, usersController.getUserLoggedById)

router
   .route("/default-users")
   .get(authMiddleware, usersController.getAllDefaultUsers)

router
   .route("/default-users/:idUser")
   .patch(authMiddleware, usersController.changeStatusUser)

router
   .route("/:id")
   .get(authMiddleware, usersController.getUserById)

module.exports = router;