import { useLaboratorio } from "../../../context/LaboratorioContext";
import { useModal } from "../../../context/ModalContext";
import { getElementIdTable } from "../../../utils/ManipulateDataUtil";
import { CardAction } from "../../Cards/CardAction/CardAction";
import { Loading } from "../../Loading/Loading";
import { TableDefault } from "../../Tables/TableDefault/TableDefault";
import { FaEdit as IconEdit } from "react-icons/fa";

export function LaboratorioMain() {
   const { showModal } = useModal();
   const { 
      laboratorios, 
      isLoading, 
      createLaboratorio,
      updateLaboratorio
   } = useLaboratorio();
   const tableFields = [
      "ID",
      "Nome do Laboratório",
      "CNPJ",
      "Endereço",
      "Criado em",
      "Modificado em",
   ];

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Laboratório",
         text: "Cadastra um laboratório ainda não existente",
         textButton: "Cadastrar Laboratório",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewLaboratorio",
               data: {
                  createLaboratorio
               }
            }),
      },
   ];

   const handleEditTable = (e) => {
      const id = getElementIdTable(e);
      showModal({
         modalName: "editLaboratorio",
         data: {
            id,
            updateLaboratorio
         }
      })
   }

   const btnTableCollection = [
      {
         id: 1,
         infoView: <IconEdit />,
         className: "btnEdit",
         toolTipsText: "Editar",
         handleAction: handleEditTable
      },
   ];

   return (
      <>
         <h2 className="subTitle">Ações</h2>
         <CardAction cardActionCollection={cardActionCollection} />

         <h2 className="subTitle">Laboratórios</h2>
         {isLoading ? 
            <Loading /> : 
            <TableDefault 
               fieldCollection={tableFields}
               dataCollection={laboratorios} 
               btnCollection={btnTableCollection}
            />}
      </>
   );
}
