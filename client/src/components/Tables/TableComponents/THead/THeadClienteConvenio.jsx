import { useAlert } from "../../../../context/AlertContext";
import { useClienteEsp } from "../../../../context/ClienteEspContext";
import { useModal } from "../../../../context/ModalContext";
import ButtonTable from "../ButtonTable/ButtonTable";
import { FaEdit as IconEdit, FaTrash as IconTrash } from "react-icons/fa";

export function THeadClienteConvenio({ clienteData, fieldCollection = [] }) {
   const maxColumn = fieldCollection.length;
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();
   const { showModal } = useModal();
   const { updateClienteEspecial, deleteClienteEspecial } = useClienteEsp();

   const handleDelete = async () => {
      try {
         const { id } = clienteData;
         if (await deleteClienteEspecial(id)) {
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
         message: "Você tem certeza de que deseja deletar o Cliente Convênio?",
         handleConfirm: handleDelete
      })
   }

   return (
      <>
         <tr className="tableHeader">
            <td colSpan={maxColumn + 1}>
               <div className="generalInfo__container">
                  <div className="splitContainer">
                     <div className="generalInfo__content">
                        <span>Nome do Cliente: </span>
                        <p>{clienteData.nome_cliente}</p>
                     </div>
                     <div className="generalInfo__content">
                        <span>Contato: </span>
                        <p>{clienteData.telefone}</p>
                     </div>
                     <ButtonTable
                        infoView={
                           <>
                              <IconEdit /> Editar
                           </>
                        }
                        handleAction={() =>
                           showModal({
                              modalName: "editClienteConvenio",
                              customStyle: {
                                 maxWidth: "750px",
                                 overflow: "initial",
                              },
                              data: {
                                 id: clienteData.id,
                                 updateClienteEspecial,
                              },
                           })
                        }
                        classBtn={"btnHeaderEdit"}
                        customStyle={{
                           display: "flex",
                           gap: "8px",
                        }}
                        toolTipsText="Editar"
                     />
                     <ButtonTable
                        infoView={
                           <>
                              <IconTrash /> Excluir
                           </>
                        }
                        handleAction={handleConfirmDelete}
                        classBtn={"btnDelete"}
                        customStyle={{
                           display: "flex",
                           gap: "8px",
                        }}
                        toolTipsText="Editar"
                     />
                  </div>
               </div>
            </td>
         </tr>
         <tr>
            {fieldCollection.map((field, index) => (
               <th key={index}>{field}</th>
            ))}
         </tr>
      </>
   );
}
