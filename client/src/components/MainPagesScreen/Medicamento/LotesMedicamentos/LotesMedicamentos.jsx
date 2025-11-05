import {
   FaEdit as IconEdit,
   FaTrashAlt as IconTrash,
   FaLongArrowAltLeft as IconReturn,
} from "react-icons/fa";
import { TableDefault } from "../../../Tables/TableDefault/TableDefault";
import { InputSearch } from "../../../Inputs/InputSearch/InputSearch";
import styles from "./LotesMedicamentos.module.css";
import { Link, useOutletContext, useParams } from "react-router";
import { useLoteMedicamento } from "../../../../context/LoteMedicamentoContext";
import { useEffect } from "react";
import { Loading } from "../../../Loading/Loading";
import { TableSearch } from "../../../Tables/TableSearch/TableSearch";
import { getElementIdTable } from "../../../../utils/ManipulateDataUtil";
import { useModal } from "../../../../context/ModalContext";
import { CardAction } from "../../../Cards/CardAction/CardAction";

export function LotesMedicamentos() {
   const { showModal } = useModal();
   const { user } = useOutletContext();
   const {
      filteredLoteMedicamentos: loteMedicamentos,
      searchValue,
      setSearchValue,
      filter,
      setFilter,
      getAllLoteMedicamentosByIdMedicamento,
      getAllLoteMedicamentosByFilter,
      isLoading,
      createLoteMedicamento,
      updateLoteMedicamento,
   } = useLoteMedicamento();

   const { id } = useParams();

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Lote",
         text: "Cadastra um novo Lote de Medicamento ",
         textButton: "Cadastrar Lote",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewLoteMedicamento",
               data: {
                  createLoteMedicamento,
                  idMedicamento: id,
               },
            }),
      },
   ];

   const fieldCollection = [
      "Nº Lote",
      "Nome do Medicamento",
      "Laboratório",
      "Qtd Disponível",
      "Data de Recebimento",
      "Data de Validade",
   ];

   const handleEditTable = (e) => {
      const idLote = getElementIdTable(e);
      showModal({
         modalName: "editLoteMedicamento",
         data: {
            id: idLote,
            idMedicamento: id,
            updateLoteMedicamento,
         },
      });
   };

   const btnTableCollection = [
      {
         id: 1,
         infoView: <IconEdit />,
         className: "btnEdit",
         toolTipsText: "Editar",
         handleAction: handleEditTable,
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
   };

   useEffect(() => {
      initLoteMedicamentos(id);
   }, []);

   useEffect(() => {
      if (filter) {
         getAllLoteMedicamentosByFilter(id);
      }
   }, [filter]);

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         <Link to={"/medicamentos"} className={styles.linkReturn}>
            <IconReturn />
            Retornar
         </Link>
         {user?.nivel_acesso !== 3 && (
            <>
               <h2 className="subTitle">Ações</h2>
               <CardAction cardActionCollection={cardActionCollection} />
            </>
         )}

         <h2 className="subTitle">Lotes do Medicamento</h2>
         {loteMedicamentos && (
            <>
               <TableSearch
                  fieldCollection={fieldCollection}
                  dataCollection={loteMedicamentos}
                  btnCollection={user?.nivel_acesso !== 3 && btnTableCollection}
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
