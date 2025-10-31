import { useEffect, useState } from "react";
import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext"
import { FormMedicamento } from "../../../Forms/FormMedicamento/FormMedicamento";
import { getMedicamentoByIdService } from "../../../../services/medicamentos.service";

export function ModalEditMedicamentos() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { id, updateMedicamento } = showDataInfo();
   const [editableMedicamento, setEditableMedicamento] = useState();

   const serverImage = import.meta.env.VITE_SERVER_UPLOADS;

   const getMedicamento = async () => {
      try {
         const res = await getMedicamentoByIdService(id);
         const { 
            img,
            fk_id_laboratorio,
            nome,
            categoria,
            tipo_unidade,
            quantidade_minima,
            indicacao_uso
         } = res.data;
         const imgPath = `${serverImage}/${img}`;
         setEditableMedicamento({
            id,
            img: imgPath,
            fk_id_laboratorio,
            nome,
            categoria,
            tipo_unidade,
            quantidade_minima,
            indicacao_uso
         })
      } catch (error) {
         console.log(error);
      }
   }

   const handleEditMedicamento = async (newMedicamentoData) => {
      try {
         if(await updateMedicamento(id, newMedicamentoData)) {
            showSuccessAlert({
               title: "Alterações realizadas com sucesso!"
            });
            closeModal();
         }
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Editar Medicamento",
               message: errMessage
            })
         }
         console.log(error);
      }
   }

   useEffect(() => {
      getMedicamento();
   }, [])

   return(
      editableMedicamento && (
         <FormMedicamento
            dataMedicamento={editableMedicamento}
            handleMedicamentoSubmit={handleEditMedicamento}
         />
      )
   )
}