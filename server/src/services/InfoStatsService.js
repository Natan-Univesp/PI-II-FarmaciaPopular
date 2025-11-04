const {
   findAndCountAllAquisicaoEntregue,
   findAndCountAllAquisicaoEnviada,
   findAndCountAllAquisicaoSolicitada,
   findAndCountAllInactiveUsers,
   findAndCountAllLaboratorios,
   findAndCountAllMinEstoqueMedicamentos,
   findAndCountAllRetiradasOnMonth,
   findMostMedicamentoRetiradoOnMonth,
   findOneMedicamentoWithMaxEstoque,
} = require("../repositories/InfoStatsRepository.js");
const {
   findAndCountAllActiveUsers,
   findAndCountAllUsers,
} = require("../repositories/UsersRepository");

async function getTotalRegisteredLaboratoriosService() {
   const allLabs = await findAndCountAllLaboratorios();
   return allLabs;
}

async function getTotalMinEstoqueMedicamentosService() {
   const minEstoqueMedica = await findAndCountAllMinEstoqueMedicamentos();
   return minEstoqueMedica;
}

async function getMedicamentoWithMaxEstoqueService() {
   const medicamentoMaxEstoque = await findOneMedicamentoWithMaxEstoque();
   return medicamentoMaxEstoque;
}

async function getTotalAquisicoesSolicitadasService() {
   const aquisicSolic = await findAndCountAllAquisicaoSolicitada();
   return aquisicSolic;
}

async function getTotalAquisicoesEnviadasService() {
   const aquisicEnvi = await findAndCountAllAquisicaoEnviada();
   return aquisicEnvi;
}

async function getTotalAquisicoesEntreguesService() {
   const aquisicEntregues = await findAndCountAllAquisicaoEntregue();
   return aquisicEntregues;
}

async function getAllRetiradasOnMonthService() {
   const month = new Date().getMonth() + 1;
   const allRetiradas = await findAndCountAllRetiradasOnMonth(month);
   return allRetiradas;
}

async function getMostMedicamentoRetiradoOnMonthService() {
   const month = new Date().getMonth() + 1;
   const mostRetirado = await findMostMedicamentoRetiradoOnMonth(month);
}

async function getTotalUsersServices() {
   const totalUsers = await findAndCountAllUsers();
   return totalUsers;
}

async function getTotalActiveUsersServices() {
   const totalActiveUsers = await findAndCountAllActiveUsers();
   return totalActiveUsers;
}

async function getTotalInactiveUsersServices() {
   const totalInactiveUsers = await findAndCountAllInactiveUsers();
   return totalInactiveUsers;
}

module.exports = {
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
};
