const { Relatorios_medicamentos, sequelize } = require("../models/index.js");

async function createRelatorio(relatData) {
    const createRelat = await Relatorios_medicamentos.create(relatData);
    return createRelat;
}

async function getAllRetiradasByFilter(filterSelect = {}, orderSelect = []) {

    const queryOptions = {
        where: Object.keys(filterSelect).length > 0 ? filterSelect : {},
        order: orderSelect.length > 0 ? orderSelect : [['id', 'ASC']],
        attributes: ["id", "situacao",],
        include: [
            {
                association: "aquisicao",
                attributes: ["fornecedor", "data_solicitacao", "data_entrega",
                    [
                        sequelize.fn("DATE_FORMAT", sequelize.col("aquisicao.data_solicitacao"), "%d-%m-%Y"),
                        "data_solicitacao",
                    ],
                    [
                        sequelize.fn("DATE_FORMAT", sequelize.col("aquisicao.data_entrega"), "%d-%m-%Y"),
                        "data_entrega",
                    ]
                ],
                include: [
                    {
                        association: "user",
                        attributes: ["usuario"]
                    },
                    {
                        association: "item_aquisicao",
                        attributes: ["quantidade_solicitada"],
                        include: [{
                            association: "medicamento",
                            attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total"]
                        }]
                    }
                ]
            }
        ],
    }
    const allRelatorios = await Relatorios_medicamentos.findAll(queryOptions);
    return allRelatorios
}

async function getAllRelatorios() {
    const allRelatorios = await Relatorios_medicamentos.findAll({
        attributes: ["id", "situacao",],
        include: [
            {
                association: "aquisicao",
                attributes: ["fornecedor", "data_solicitacao", "data_entrega",
                    [
                        sequelize.fn("DATE_FORMAT", sequelize.col("aquisicao.data_solicitacao"), "%d-%m-%Y"),
                        "data_solicitacao",
                    ],
                    [
                        sequelize.fn("DATE_FORMAT", sequelize.col("aquisicao.data_entrega"), "%d-%m-%Y"),
                        "data_entrega",
                    ]
                ],
                include: [
                    {
                        association: "user",
                        attributes: ["usuario"]
                    },
                    {
                        association: "item_aquisicao",
                        attributes: ["quantidade_solicitada"],
                        include: [{
                            association: "medicamento",
                            attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total"]
                        }]
                    }
                ]
            }
        ],
    });
    return allRelatorios
}

async function getRelatorioById(id) {
    const relatorios = await Relatorios_medicamentos.findByPk(id,{})
    return relatorios;
}

module.exports = {
    getRelatorioById,
    createRelatorio,
    getAllRetiradasByFilter,
    getAllRelatorios,
}