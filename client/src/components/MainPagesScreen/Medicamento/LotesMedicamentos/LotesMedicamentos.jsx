import {
   FaEdit as IconEdit,
   FaTrashAlt as IconTrash,
   FaLongArrowAltLeft as IconReturn,
} from "react-icons/fa";
import { TableDefault } from "../../../Tables/TableDefault/TableDefault";
import { InputSearch } from "../../../Inputs/InputSearch/InputSearch";
import styles from "./LotesMedicamentos.module.css";
import { Link, useParams } from "react-router";
import { useLoteMedicamento } from "../../../../context/LoteMedicamentoContext";
import { useEffect } from "react";
import { Loading } from "../../../Loading/Loading";
import { TableSearch } from "../../../Tables/TableSearch/TableSearch";

export function LotesMedicamentos() {
   const { 
      filteredLoteMedicamentos: loteMedicamentos,
      searchValue, 
      setSearchValue,
      filter,
      setFilter,
      getAllLoteMedicamentosByIdMedicamento,
      getAllLoteMedicamentosByFilter,
      isLoading 
   } = useLoteMedicamento();

   const { id } = useParams();

   const fieldCollection = [
      "Nº Lote",
      "Nome do Medicamento",
      "Laboratório",
      "Qtd Disponível",
      "Data de Recebimento",
      "Data de Validade"
   ];

   const btnTableCollection = [
      {
         id: 1,
         infoView: <IconEdit />,
         className: "btnEdit",
         toolTipsText: "Editar",
      },
      {
         id: 2,
         infoView: <IconTrash />,
         className: "btnDelete",
         toolTipsText: "Excluir",
      },
   ];

   const customClassForFields = {
      indicacao_uso: "customLimitWidthText",
   };

   const initLoteMedicamentos = async (idMedicamento) => {
      try {
         await getAllLoteMedicamentosByIdMedicamento(idMedicamento);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      initLoteMedicamentos(id);
   }, [])

   useEffect(() => {
      if(filter) {
         getAllLoteMedicamentosByFilter(id)
      }
   }, [filter])

   if(isLoading) {
      return <Loading/>
   }

   return (
      <>
         <Link to={"/medicamentos"} className={styles.linkReturn}>
            <IconReturn />
            Retornar
         </Link>
         {loteMedicamentos && (
            <>
               <TableSearch
                  fieldCollection={fieldCollection}
                  dataCollection={loteMedicamentos}
                  btnCollection={btnTableCollection}
                  customClassData={customClassForFields}
                  filterType="filterLoteMedicamentos"
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  filterParams={filter}
                  setFilterParams={setFilter}
               />
            </>
         )}
      </>
   );
}
