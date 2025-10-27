const { hash } = require("bcrypt");
const ExistsDataError = require("../classes/ExistsDataError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const { removeAllAcentsForString } = require("../utils/DataFormatUtil.js");
const {
   createNewUser,
   findAllUsers,
   findAllDefaultUsers,
   updateUserStatus,
   findUserById,
   findUserByName,
   findUserLoggedById,
   findAndCountAllUsers,
} = require("../repositories/UsersRepository.js");
const CannotCreateError = require("../classes/CannotCreateError.js");
const AccessLevelError = require("../classes/AccessLevelError.js");

async function getAllUsersService() {
   const users = await findAllUsers();
   return users;
}

async function getAllDefaultUsersService() {
   const defaultUsers = await findAllDefaultUsers();
   return defaultUsers;
}

async function getUserByIdService(idUser) {
   const user = await findUserById(Number(idUser));
   return user;
}

async function getUserLoggedByIdService(idUser) {
   const user = await findUserLoggedById(idUser);
   return user;
}

async function getTotalUsersRegisteredService() {
   const totalUsers = await findAndCountAllUsers();
   return totalUsers;
}

async function createUserService(idLoggedUser, userInfo) {
   const { usuario, senha, nivel_acesso } = userInfo;
   const formattedUser = removeAllAcentsForString(usuario);
   const existsUser = await findUserByName(formattedUser);
   const trimPassword = String(senha).trim();

   // Verifica se o usuário que está tentando criar um novo usuário é um administrador ou superior e se é o primeiro usuário do sistema
   if(idLoggedUser) {
      const loggedUser = await findUserById(idLoggedUser);
      if(!loggedUser) {
         throw new NotFoundError("Usuário não encontrado!", {
            fields: {
               idLoggedUser
            }
         });
      }

      const { nivel_acesso: nivelAcessoLoggedUser } = loggedUser;

      if(nivelAcessoLoggedUser > 1) {
         throw new AccessLevelError(
            "Apenas Administradores ou acima podem criar novos usuários", {
               fields: {
                  nivel_acesso: nivelAcessoLoggedUser
               }
            }
         )
      }

   } else {
      const allUsers = await findAllUsers();

      if(allUsers.length > 0) {
         throw new CannotCreateError("Não foi possível criar o usuário. Nível de acesso inválido");
      }
   }


   if(existsUser) {
      throw new ExistsDataError("Usuário já existe", "USER_EXISTS", {
         user_informado: formattedUser,
         user_existente: existsUser.usuario 
      })
   }

   const hashedPassword = await hash(trimPassword, 10);
   const createdUser = await createNewUser({
      usuario: String(formattedUser).trim(),
      senha: hashedPassword,
      nivel_acesso,
      status: "ATIVO",
   });
   return createdUser;
}

async function changeStatusUserService(idUser, newStatus) {
   const formattedStatus = newStatus.toUpperCase();
   const user = await getUserByIdService(idUser);

   if(!user) {
      throw new NotFoundError("Usuário não cadastrado!");
   }

   const currStatus = user.status.toUpperCase();

   if (formattedStatus !== "ATIVO" && formattedStatus !== "INATIVO") {
      throw new ExistsDataError("Status inexistente", "STATUS_UNKNOWN", {
         status_passado: newStatus,
         status_esperado: ["ATIVO", "INATIVO"],
      });
   }
   if (currStatus === formattedStatus) {
      throw new ExistsDataError(`O Usuário já está ${newStatus.toUpperCase()}`, "STATUS_EQUAL", {
         status_passado: newStatus,
         status_atual: currStatus,
      });
   }

   const updatedUser = await updateUserStatus(idUser, newStatus);
   return updatedUser;
}

module.exports = {
   getAllUsersService,
   getAllDefaultUsersService,
   getUserByIdService,
   getUserLoggedByIdService,
   getTotalUsersRegisteredService,
   createUserService,
   changeStatusUserService,
};
