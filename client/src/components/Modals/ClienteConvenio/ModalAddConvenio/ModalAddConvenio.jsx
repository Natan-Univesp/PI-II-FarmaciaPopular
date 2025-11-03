import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext";
import { FormClienteConvenio } from "../../../Forms/FormClienteConvenio/FormClienteConvenio";

export function ModalAddConvenio() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { createClienteEspecial } = showDataInfo();

   const handleRegisterClienteConvenio = async (clienteData) => {
      try {
         if(await createClienteEspecial(clienteData)) {
            showSuccessAlert({
               title: "Cliente de Convênio Cadastrado com sucesso!"
            });
            closeModal();
         }

      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao cadastrar Solicitação",
               message: errMessage,
            });
         }
      }
   };

   return <FormClienteConvenio handleClienteSubmit={handleRegisterClienteConvenio}/>;
}
