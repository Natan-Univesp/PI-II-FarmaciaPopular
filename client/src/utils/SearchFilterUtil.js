export function searchFilterData(dataCollection, searchValue, fieldsParams) {
   if (!searchValue) {
      return dataCollection;
   }

   const searchTerm = searchValue.toLowerCase();

   const filteredData = dataCollection.filter((item) => {
      return fieldsParams.some((keyField) => {
         const fieldValue = item[keyField];
         // Verifica se o campo existe e pode ser convertido para string
         return fieldValue !== null && String(fieldValue).toLowerCase().includes(searchTerm);
      });
   });

   return filteredData; 
}

export function searchFilterMedicamentos(medicamentoCollection, searchValue) {
   const fieldsForSearch = [
      "id",
      "nome"
   ];
   const filteredMedicamentos = searchFilterData(medicamentoCollection, searchValue, fieldsForSearch);

   return filteredMedicamentos;
}

export function searchFilterLoteMedicamentos(loteMedicamentoCollection, searchValue) {
   const fieldsForSearch = [
      "id",
      "nome_medicamento",
      "nome_laboratorio",
      "quantidade",
      "data_criacao",
      "data_validade",
   ];
   const filteredLoteMedicamentos = searchFilterData(loteMedicamentoCollection, searchValue, fieldsForSearch);

   return filteredLoteMedicamentos;
}

export function searchFilterRelatorioMedicamentos(relatMedicamentosCollection, searchValue) {
   const fieldsForSearch = [
      "id",
      "usuario",
      "fk_id_aquisicao",
      "fornecedor",
      "laboratorio",
      "situacao"
   ];
   const filteredRelatMedicamentos = searchFilterData(relatMedicamentosCollection, searchValue, fieldsForSearch);

   return filteredRelatMedicamentos;
}

export function searchFilterRetiradaMedicamentos(retiradaCollection, searchValue) {
   const fieldsForSearch = [
      "nome_usuario",
      "nome_medicamento",
      "quantidade_solicitada",
   ];
   const filteredRetirada = searchFilterData(retiradaCollection, searchValue, fieldsForSearch);

   return filteredRetirada;
}