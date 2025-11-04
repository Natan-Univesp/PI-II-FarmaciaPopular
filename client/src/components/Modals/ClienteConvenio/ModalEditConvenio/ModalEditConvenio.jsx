import { useState } from "react";
import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext";
import { FormClienteConvenio } from "../../../Forms/FormClienteConvenio/FormClienteConvenio";
import { getClienteEspecialByIdService } from "../../../../services/clientesEsp.service";
import { useEffect } from "react";

export function ModalEditConvenio() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { id, updateClienteEspecial } = showDataInfo();
   const [editableConvenio, setEditableConvenio] = useState();

   const getClienteConvenio = async () => {
      try {
         const res = await getClienteEspecialByIdService(id);
         const { nome_cliente, telefone, cliente_medicamento: medicamentos } = res.data;
         setEditableConvenio({ nome_cliente, telefone, medicamentos });
      } catch (error) {
         console.log(error);
      }
   };

   const handleEditClienteConvenio = async (editedClienteConvData) => {
      try {
         if(await updateClienteEspecial(id, editedClienteConvData)) {
            showSuccessAlert({
               title: "Alterações realizadas com sucesso!"
            });
            closeModal();
         }

      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Editar Cliente de Convênio",
               message: errMessage
            })
         }
         console.log(error);
      }
   }

   useEffect(() => {
      getClienteConvenio();
   }, []);

   return (
      editableConvenio && (
         <FormClienteConvenio
            clienteConvenioData={editableConvenio}
            handleClienteSubmit={handleEditClienteConvenio}
         />
      )
   );
}
