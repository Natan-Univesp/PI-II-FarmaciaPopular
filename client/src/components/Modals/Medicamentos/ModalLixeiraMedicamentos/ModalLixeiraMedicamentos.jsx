import { useAlert } from "../../../../context/AlertContext";
import { useMedicamento } from "../../../../context/MedicamentoContext";
import { useModal } from "../../../../context/ModalContext";
import { Loading } from "../../../Loading/Loading";
import { TableTrash } from "../../../Tables/TableTrash/TableTrash";

export function ModalLixeiraMedicamentos() {
   const fieldNameCollection = ["Código", "Nome", "Laboratório", "Categoria", "Data de remoção"];
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { closeModal } = useModal();
   const {
      inactiveMedicamentos,
      isInactiveLoading,
      changeStatusMedicamento
   } = useMedicamento();

   const modalConfirmText = {
      title: "Restaurar Medicamento",
      message: "Você tem certeza que deseja restaurar este Medicamento?"
   }

   console.log(inactiveMedicamentos);

   const handleRestoreMedicamento = async (id) => {
      try {
         if(await changeStatusMedicamento(id, "ATIVO")) {
            showSuccessAlert({
               title: "Medicamento Restaurado",
               message: "Agora é possível, novamente, visualizar o medicamento e suas respectivas informações"
            })
         }
      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Restaurar Medicamento",
               message: errMessage,
            });
         }
         console.log(error);
      }
   }

   if (isInactiveLoading) return <Loading/>

   return(
      inactiveMedicamentos && (
         <TableTrash
            fieldCollection={fieldNameCollection}
            dataCollection={inactiveMedicamentos}
            handleRestore={handleRestoreMedicamento}
            modalConfirmText={modalConfirmText}
         />
      )
   )
}