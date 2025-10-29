import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext";
import { FormLaboratorio } from "../../../Forms/FormLaboratorio/FormLaboratorio";

export function ModalAddLaboratorio() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { createLaboratorio } = showDataInfo();

   const handleRegisterLaboratorio = async(laboratorioData) => {
      try {
         if(await createLaboratorio(laboratorioData)) {
            showSuccessAlert({
               title: "Laboratório Cadastrado com sucesso!"
            });
            closeModal();
         }

      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao cadastrar Laboratório",
               message: errMessage
            })
         }
      }
   }

   return(
      <FormLaboratorio handleLaboratorioSubmit={handleRegisterLaboratorio}/>
   )
}