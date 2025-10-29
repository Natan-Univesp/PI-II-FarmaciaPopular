import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext";
import { FormMedicamento } from "../../../Forms/FormMedicamento/FormMedicamento";

export function ModalAddNewMedicamento() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { createMedicamento } = showDataInfo();

   const handleRegisterMedicamento = async (medicamentoData) => {
      try {
         if(await createMedicamento(medicamentoData)) {
            showSuccessAlert({
               title: "Medicamento Cadastrado com Sucesso!"
            })
            closeModal();
         }
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao cadastrar Medicamento",
               message: errMessage
            })
         }
      }
   }

   return(
      <FormMedicamento handleMedicamentoSubmit={handleRegisterMedicamento}/>
   )
}