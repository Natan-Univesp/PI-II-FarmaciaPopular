import { useRelatMedicamento } from "../../../context/RelatMedicamentoContext";
import { InputSearch } from "../../Inputs/InputSearch/InputSearch";
import { Loading } from "../../Loading/Loading";
import { TableDefault } from "../../Tables/TableDefault/TableDefault";

export function RelatorioMedicamentoMain() {
   const tableFields = [
      "Nº Relatório",
      "Usuário",
      "ID de Aquisicao",
      "Fornecedor",
      "Laboratorio",
      "Situacao",
      "Data da Ação",
   ];
   const {
      filteredRelatMedicamentos: relatoriosMedicamentos,
      searchValue,
      setSearchValue,
      isLoading,
   } = useRelatMedicamento();

   const updateSearchValue = (e) => {
      const value = e.target.value;
      setSearchValue(value);
   };

   return (
      <>
         <h2 className="subTitle">Relatório de Medicamentos</h2>
         {isLoading ? (
            <Loading />
         ) : (
            <>
               <InputSearch
                  value={searchValue}
                  handleOnChange={updateSearchValue}
                  hasFilterButton={false}
               />
               <TableDefault fieldCollection={tableFields} dataCollection={relatoriosMedicamentos} />
            </>
         )}
      </>
   );
}
