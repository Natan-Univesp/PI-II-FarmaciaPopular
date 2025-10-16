const { Laboratorios, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");
const { Op } = require("sequelize");
const NotFoundError = require("../classes/NotFoundError.js");

//Busca todos os laboratórios
async function getAllLaboratorios() {
    const allLaboratorios = await Laboratorios.findAll({
        attributes: [
            "id",
            "nome_laboratorio",
            "cnpj",
            "endereco",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Laboratorios.created_at"), "%d-%m-%Y %H:%i:%s"),
                "data_criacao",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Laboratorios.updated_at"), "%d-%m-%Y %H:%i:%s"),
                "data_alteracao",
            ]
        ],
        order: [ //Ordena conforme a ID do laboratório (Ordem Crescente)
            ['id', 'ASC']
        ]
    });

    return allLaboratorios;
}

//Filtra os laboratórios pela ID
async function getLaboratorioById(id) {
    const laboratorio = await Laboratorios.findByPk(id, {
        attributes: [
            "id",
            "nome_laboratorio",
            "cnpj",
            "endereco",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Laboratorios.created_at"), "%d-%m-%Y %H:%i:%s"),
                "data_criacao",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Laboratorios.updated_at"), "%d-%m-%Y %H:%i:%s"),
                "data_alteracao",
            ]
        ],
    })
    return laboratorio
}

// Informa os laboratórios conforme o select
async function getAllLaboratoriosForSelect() {
    const laboratorio = await Laboratorios.findAll({
         attributes: [
            ["id", "value"],
            ["nome_laboratorio", "label"],
        ],
    })
    return laboratorio
}

// Criação de laboratórios
async function createLaboratorio(LaboratorioData) {
    const { cnpj } = LaboratorioData;

    const existingLaboratorio = await Laboratorios.findOne ({
        where: {cnpj: cnpj}
    });

    if (existingLaboratorio) {
        throw new ExistsDataError ("Já existe um laboratório com este CNJP",{
            fields: {
                cnpj: cnpj
            }
        });   
    }

    const createdLaboratorio = await Laboratorios.create(LaboratorioData);
    return createdLaboratorio;
}

// Atualização de laboratórios
async function updateLaboratorio(id, nome_laboratorio, cnpj, endereco) {

    // Verifica se a ID informada existe
     const laboratorio = await getLaboratorioById(id);
    if(!laboratorio){
        throw new NotFoundError("O laboratório não existe");
    }

    // Verifica se o cnpj informado pelo usuário já não foi cadastrado anteriormente
    if (cnpj && cnpj !== laboratorio.cnpj) {
        const laboratorioSameCnpj = await Laboratorios.findOne({
            where: {
                cnpj: cnpj,
                id: { [Op.ne]: id}
            }
        });
    if (laboratorioSameCnpj) {
        throw new ExistsDataError("Outro laboratório já utiliza este CNPJ",{
            fields: {
                cnpj: cnpj
                },
                conflictingId: laboratorioSameCnpj.id
            });
        }
    }

// Faz a atualização conforme os dados passados.
    const updateFields = {};
    if (nome_laboratorio !== undefined) updateFields.nome_laboratorio = nome_laboratorio;
    if (cnpj !== undefined) updateFields.cnpj = cnpj;
    if (endereco !== undefined) updateFields.endereco = endereco;
    const updateLaboratorio = await Laboratorios.update (updateFields, {
        where: { id: id},
    });
    return updateLaboratorio;
}

module.exports = {
    getAllLaboratorios,
    getLaboratorioById,
    getAllLaboratoriosForSelect,
    createLaboratorio,
    updateLaboratorio
}
