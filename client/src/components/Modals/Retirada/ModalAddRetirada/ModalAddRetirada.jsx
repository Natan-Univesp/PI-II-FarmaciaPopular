import { useAlert } from "../../../../context/AlertContext";
import { FormRetiradaProvider } from "../../../../context/FormRetiradaContext";
import { useModal } from "../../../../context/ModalContext";
import { FormRetirada } from "../../../Forms/FormRetirada/FormRetirada";

export function ModalAddRetirada() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { createRetirada } = showDataInfo();

   const handleRegisterRetirada = async (retiradaData) => {
      try {
         if(await createRetirada(retiradaData)) {
            showSuccessAlert({
               title: "Retirada Cadastrada com Sucesso!"
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

   return (
      <FormRetiradaProvider>
         <FormRetirada handleRetiradaSubmit={handleRegisterRetirada} />
      </FormRetiradaProvider>
   );
}
