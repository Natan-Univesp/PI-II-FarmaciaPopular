const { Relatorios_medicamentos, sequelize } = require("../models/index.js");

async function createRelatorio(relatData) {
    const createRelat = await Relatorios_medicamentos.create(relatData);
    return createRelat;
}

async function getAllRelatoriosByFilter(filterSelect = {}, orderSelect = []) {

    const queryOptions = {
        where: Object.keys(filterSelect).length > 0 ? filterSelect : {},
        order: orderSelect.length > 0 ? orderSelect : [['id', 'ASC']],
        attributes: [
            "id",
            "situacao",
            [sequelize.col("aquisicao.fornecedor"), "fornecedor"],
            [sequelize.col("aquisicao.user.usuario"), "usuario"],
            [sequelize.col("aquisicao.laboratorio.nome_laboratorio"), "laboratorio"],
            [sequelize.fn("DATE_FORMAT", sequelize.col("aquisicao.data_solicitacao"), "%d-%m-%Y"), "data_solicitacao"],
            [sequelize.fn("DATE_FORMAT", sequelize.col("aquisicao.data_entrega"), "%d-%m-%Y"), "data_entrega"]
        ],
        include: [
            {
                association: "aquisicao",
                attributes: [],
                include: [
                    {
                        association: "user",
                        attributes: []
                    },
                    {
                        association: "laboratorio",
                        attributes: []
                    },
                ]
            }
        ],
    }
    const allRelatorios = await Relatorios_medicamentos.findAll(queryOptions);
    return allRelatorios
}

async function getAllRelatorios() {
    const allRelatorios = await Relatorios_medicamentos.findAll({
        attributes: [
            "id",
            [sequelize.col("aquisicao.user.usuario"), "usuario"],
            "fk_id_aquisicao",
            [sequelize.col("aquisicao.fornecedor"), "fornecedor"],
            [sequelize.col("aquisicao.laboratorio.nome_laboratorio"), "laboratorio"],
            "situacao",
            [sequelize.fn("DATE_FORMAT", sequelize.col("relatorios_medicamentos.created_at"), "%d-%m-%Y"), "data_solicitacao"],
        ],
        include: [
            {
                association: "aquisicao",
                attributes: [],
                include: [
                    {
                        association: "user",
                        attributes: []
                    },
                    {
                        association: "laboratorio",
                        attributes: []
                    },
                ]
            }
        ],
    });
    return allRelatorios
}

async function getRelatorioById(id) {
    const relatorios = await Relatorios_medicamentos.findByPk(id, {})
    return relatorios;
}

module.exports = {
    getRelatorioById,
    createRelatorio,
    getAllRelatoriosByFilter,
    getAllRelatorios,
}