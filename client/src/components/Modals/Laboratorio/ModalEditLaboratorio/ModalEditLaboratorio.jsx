import { useEffect, useState } from "react";
import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext"
import { getLaboratorioByIdService, updateLaboratorioService } from "../../../../services/laboratorios.service";
import { FormLaboratorio } from "../../../Forms/FormLaboratorio/FormLaboratorio";

export function ModalEditLaboratorio() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { id, updateLaboratorio } = showDataInfo();
   const [editableLab, setEditableLab] = useState();

   const getLaboratorio = async () => {
      try {
         const res = await getLaboratorioByIdService(id);
         const { nome_laboratorio, cnpj, endereco } = res.data;
         setEditableLab({nome_laboratorio, cnpj, endereco});
      } catch (error) {
         console.log(error);
      }
   }

   const handleEditLaboratorio = async (editedLabData) => {
      try {
         if(await updateLaboratorio(id, editedLabData)) {
            showSuccessAlert({
               title: "Alterações realizadas com sucesso!"
            });
            closeModal();
         }
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Editar Laboratório",
               message: errMessage
            })
         }
         console.log(error);
      }
   }

   useEffect(() => {
      getLaboratorio();
   }, [])

   return(
      editableLab && (
         <FormLaboratorio
            dataLaboratorio={editableLab} 
            handleLaboratorioSubmit={handleEditLaboratorio}
         />
      )
   )
}