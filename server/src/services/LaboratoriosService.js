const { getAllLaboratorios,
    getLaboratorioById,
    getAllLaboratoriosForSelect,
    createLaboratorio,
    updateLaboratorio
} = require ("../repositories/LaboratoriosRepository.js");
const { Op } = require("sequelize");
const {Laboratorios, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");
const NotFoundError = require("../classes/NotFoundError.js");


async function getAllLaboratoriosService() {
    const allLaboratorios = await getAllLaboratorios ()
    return allLaboratorios;
}

async function getLaboratorioByIdService (id) {
    const laboratorio = await getLaboratorioById (id)
    return laboratorio;
}

async function getAllLaboratoriosForSelectService() {
    const laboratorio = await getAllLaboratoriosForSelect()
    return laboratorio;
}

async function createLaboratorioService(laboratorioData) {
    const { nome_laboratorio, cnpj, endereco } = laboratorioData;
    const createdLaboratorio = await createLaboratorio({nome_laboratorio, cnpj, endereco})
    return createdLaboratorio;
}

async function updateLaboratorioService(id, nome_laboratorio, cnpj, endereco) {
    const updatedData = await updateLaboratorio(id, nome_laboratorio, cnpj, endereco)
    return updatedData;
}

module.exports = {
   getAllLaboratoriosService,
   getLaboratorioByIdService,
   getAllLaboratoriosForSelectService,
   createLaboratorioService,
    updateLaboratorioService
}