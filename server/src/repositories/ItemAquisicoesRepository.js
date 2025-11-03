const { Itens_aquisicoes } = require("../models/index.js");

async function findAllItemAquisicoesByIdAquisicao(idAquisicao) {
   const itemAquisicoes = await Itens_aquisicoes.findAll({
      attributes: [
         "fk_id_medicamento",
         ["quantidade_solicitada", "quantidade"]
      ],
      where: {
         fk_id_aquisicao: idAquisicao
      }
   })
   return itemAquisicoes;
}

module.exports = {
   findAllItemAquisicoesByIdAquisicao
}