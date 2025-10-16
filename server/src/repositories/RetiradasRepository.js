const { Association } = require("sequelize");
const { Itens_retiradas, Retiradas, Medicamentos, sequelize } = require("../models/index.js");
const CannotCreateError = require("../classes/CannotCreateError.js");

// Cria uma nova retirada
async function createRetirada(itensRetirada, idUser) {
    const t = await sequelize.transaction();
    console.log(idUser);

    try {
        for (const retirados of itensRetirada) {
            const medicamentos = await Medicamentos.findByPk(retirados.fk_id_medicamento);

        if(!medicamentos){
            throw new CannotCreateError("O medicamento informado não existe")
        }

        if (medicamentos.situacao !== "ATIVO") {
            throw new CannotCreateError ("O medicamento informado encontra-se desativado")
        }

        if (retirados.quantidade_solicitada > medicamentos.quantidade_total) {
            throw new CannotCreateError ("Não há estoque suficiente do medicamento solicitado")
        }
        
    }
        // Cria a retirada
        const createRetirada = await Retiradas.create({
            fk_id_user: idUser,
        }, { transaction: t });

        // Cria o item a ser retirado em Itens Retiradas 
        const createItem = itensRetirada.map(item => {
            return {
                fk_id_medicamento: item.fk_id_medicamento,
                fk_id_retirada: createRetirada.id,
                quantidade_solicitada: item.quantidade_solicitada
            }
        });
        await Itens_retiradas.bulkCreate(createItem, { transaction: t });

        // Atualiza o estoque conforme a quantidade solicitada
        for (const item of itensRetirada) {
            const medicamento = await Medicamentos.findByPk(item.fk_id_medicamento, {
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            medicamento.quantidade_total -= item.quantidade_solicitada;

            await medicamento.save({ transaction: t });
        }

        await t.commit();

        const retiradaFinal = await Retiradas.findByPk(createRetirada.id, {
            attributes: ["id",
                "data_retirada",
                "fk_id_user",
                [
                    sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
                    "data_retirada",
                ]
            ],
            include: [{
                association: "itens_retirada",
                include: [{
                    association: "medicamento",
                    attributes: ["id", "nome", "quantidade_total"]
                }]
            }]
        });
        return retiradaFinal;
    }
    catch (error) {
        if (t && t.commit) {
            await t.rollback();
        }
        throw error;
    }
}

// Encontra todas as retiradas
async function getAllRetiradas() {
    const retiradas = await Retiradas.findAll({
        attributes: ["id", [
            sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
            "data_retirada",
        ]
        ],
        include: [
            {
                association: "user",
                attributes: ["usuario"]
            },
            {
                association: "itens_retirada",
                attributes: ["quantidade_solicitada"],
                include: [
                    {
                        association: "medicamento",
                        attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total", "img"]
                    }
                ]
            }
        ],
        order: [['data_retirada', 'DESC']]
    });
    return retiradas;
}

// Encontra as retiradas conforme o filtro selecionado
async function getAllRetiradasByFilter(filterSelect = {}, orderSelect = []) {

    const queryOptions = {
        where: Object.keys(filterSelect).length > 0 ? filterSelect : {},
        order: orderSelect.length > 0 ? orderSelect : [['id', 'ASC']],
        attributes: ["id", [
            sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
            "data_retirada",
        ]],
        include: [
            {
                association: "user",
                attributes: ["usuario"]
            },
            {
                association: "itens_retirada",
                attributes: ["quantidade_solicitada"],
                include: [
                    {
                        association: "medicamento",
                        attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total", "img"]
                    }
                ]
            }
        ],
    }
    const retiradas = await Retiradas.findAll(queryOptions);
    return retiradas;
}

// Encontra a retirada conforme ID.
async function getRetiradaById(id) {
    const idretiradas = await Retiradas.findByPk(id, {
        attributes: ["id", [
            sequelize.fn("DATE_FORMAT", sequelize.col("Retiradas.data_retirada"), "%d-%m-%Y"),
            "data_retirada",
        ]
        ],
        include: [
            {
                association: "user",
                attributes: ["usuario"]
            },
            {
                association: "itens_retirada",
                attributes: ["quantidade_solicitada"],
                include: [
                    {
                        association: "medicamento",
                        attributes: ["nome", "indicacao_uso", "categoria", "quantidade_total", "img"]
                    }
                ]
            }
        ],
        order: [['data_retirada', 'DESC']]
    })
    return idretiradas;
}

module.exports = {
    createRetirada,
    getAllRetiradas,
    getAllRetiradasByFilter,
    getRetiradaById,
}