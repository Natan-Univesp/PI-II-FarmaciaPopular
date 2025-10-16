const {
    createRetirada,
    getAllRetiradas,
    getAllRetiradasByFilter,
    getRetiradaById,
} = require("../repositories/RetiradasRepository.js");
const { Op } = require("sequelize");
const { Itens_retiradas, Retiradas, Medicamentos, sequelize } = require("../models/index.js");



async function createdRetiradaService(medicamentos_retirados, idUser) {
    const novaRetirada = await createRetirada(medicamentos_retirados, idUser)
    return novaRetirada;
}  

async function getAllRetiradasService(){
    const retirada = await getAllRetiradas()
    return retirada;
}

async function getAllRetiradasByFilterService(QueryParams = {}) {
     const { orderBy, ...filters } = QueryParams;

    const RetiradasFilters = ["id", "data_retirada", "fk_id_user"];
    const FilterSelect = {};


    if (filters && Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(key => {
            if(RetiradasFilters.includes(key)) {

                //Filtra com base na ID 
                if (key == 'id') {
                    FilterSelect[key] = { [Op.eq]: Number(filters[key]) };
                }
                //Filtra com base na data da retirada
                else if (key === 'data_retirada') {
                    FilterSelect[key] = { [Op.eq]: filters[key] };
                }
                //Filtra com base na ID do USUÁRIO
                else if (key === 'fk_id_user') {
                    FilterSelect[key] = { [Op.eq]: filters[key] };
                }
            }
        });
    }
    const OrderSelect = [];
    if (orderBy) {
        const [field, direction] = orderBy.split(",");
        if (field && (direction === "ASC" || direction === "DESC" || direction === "asc" || direction === "desc")) {
            const formattedDirection = direction.toUpperCase();
            OrderSelect.push([field, formattedDirection]);
        }
    } else {
        OrderSelect.push(["id", "ASC"]);
    }
    const retiradas = await getAllRetiradasByFilter(FilterSelect, OrderSelect);
    return retiradas;
}

async function getRetiradaByIdService(id) {
    const idretiradas = await getRetiradaById(id)
    return idretiradas;
}

module.exports = {
    createdRetiradaService,
    getAllRetiradasService,
    getAllRetiradasByFilterService,
    getRetiradaByIdService,
}