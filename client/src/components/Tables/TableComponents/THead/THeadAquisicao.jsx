import { FaEdit as IconEdit, FaTrashAlt as IconDel } from "react-icons/fa";
import ButtonTable from "../ButtonTable/ButtonTable";
import { useAquisicao } from "../../../../context/AquisicaoContext";
import { useAlert } from "../../../../context/AlertContext";

export function THeadAquisicao({ dataSolicitacao, fieldNameCollection = [], actionType = "" }) {
   const maxColumn = fieldNameCollection.length;
   const { changeStatusAquisicao, deleteAquisicao } = useAquisicao();
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();

   const handleSendDelivery = async () => {
      try {
         const newStatus = "ENVIADO";
         const { id } = dataSolicitacao;

         if (await changeStatusAquisicao(id, newStatus)) {
            showSuccessAlert({
               title: "Solicitação Enviada",
               message:
                  "Você confirmou que a solicitação dos medicamentos foi enviada. Assim que ela chegar, você poderá confirmar essa chegada",
            });
         }
      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Editar Laboratório",
               message: errMessage,
            });
         }
         console.log(error);
      }
   };

   const handleChegada = async () => {
      try {
         const newStatus = "ENTREGUE";
         const { id } = dataSolicitacao;

         if (await changeStatusAquisicao(id, newStatus)) {
            showSuccessAlert({
               title: "Entrega de Solicitação Confirmada"
            });
         }
      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Editar Laboratório",
               message: errMessage,
            });
         }
         console.log(error);
      }
   };

   const handleDelete = async () => {
      try {
         const { id } = dataSolicitacao;
         if (await deleteAquisicao(id)) {
            showSuccessAlert({
               title: "Deleção Realizada com sucesso!",
            });
         }
      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Editar Laboratório",
               message: errMessage,
            });
         }
         console.log(error);
      }
   };

   const handleConfirmDelete = async () => {
      await showConfirmAlert({
         title: "Confirmar Exclusão",
         message: "Você tem certeza de que deseja deletar a Solicitação?",
         handleConfirm: handleDelete,
      });
   };

   const handleConfirmChegada = async () => {
      await showConfirmAlert({
         title: "Confirmar Recebimento",
         message: "Os pedidos foram entregues?",
         handleConfirm: handleChegada
      })
   }

   const buttonTableData = {
      SENDCONFIRM: [
         {
            id: 1,
            infoView: "Confirmar Envio",
            handleAction: handleSendDelivery,
            className: "btnHeaderPrim",
         },
         {
            id: 2,
            infoView: <IconDel />,
            handleAction: handleConfirmDelete,
            className: "btnDelete",
            toolTipsText: "Excluir Solicitação",
         },
      ],
      DELIVERYCONFIRM: [
         {
            id: 1,
            infoView: "Confirmar Entrega",
            handleAction: handleConfirmChegada,
            className: "btnHeaderConfirm",
         },
      ],
   };

   return (
      <>
         <tr className={"tableHeader"}>
            <td colSpan={maxColumn + 1}>
               <div className={"generalInfo__container"}>
                  <div className="splitContainer">
                     <div className={"generalInfo__content"}>
                        <span>Nº Aquisição:</span>
                        <p>{dataSolicitacao.id}</p>
                     </div>
                     <div className={"generalInfo__content"}>
                        <span>Usuário Solicitante:</span>
                        <p>{dataSolicitacao.nome_usuario}</p>
                     </div>
                     <div className={"generalInfo__content"}>
                        <span>Laboratorio:</span>
                        <p>{dataSolicitacao.nome_laboratorio}</p>
                     </div>
                     <div className={"generalInfo__content"}>
                        <span>Fornecedor:</span>
                        <p>{dataSolicitacao.fornecedor}</p>
                     </div>
                     <div className={"generalInfo__content"}>
                        <span>Solicitado em:</span>
                        <p>{dataSolicitacao.data_solicitacao_formatada}</p>
                     </div>
                     {
                        !actionType &&
                           <div className={"generalInfo__content"}>
                              <span>Entregue em:</span>
                              <p>{dataSolicitacao.data_entrega_formatada}</p>
                           </div>
                     }
                  </div>
                  {actionType && (
                     <div className="splitContainer splitButton">
                        {Array.isArray(buttonTableData[actionType]) &&
                           buttonTableData[actionType].map((button) => (
                              <ButtonTable
                                 key={button.id}
                                 infoView={button.infoView}
                                 handleAction={button.handleAction}
                                 classBtn={button.className}
                                 toolTipsText={button.toolTipsText}
                              />
                           ))}
                     </div>
                  )}
               </div>
            </td>
         </tr>
         <tr>
            {fieldNameCollection.map((field, index) => (
               <th key={index}>{field}</th>
            ))}
         </tr>
      </>
   );
}
