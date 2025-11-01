import { useEffect, useState } from "react";
import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext"
import { getLoteMedicamentoByIdService } from "../../../../services/lotesMedicamentos.service";
import { FormLoteMedicamento } from "../../../Forms/FormLoteMedicamento/FormLoteMedicamento";

export function ModalEditLoteMedicamentos() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { id, idMedicamento, updateLoteMedicamento } = showDataInfo();
   const [editableLoteMedicamento, setEditableLoteMedicamento] = useState();

   const getLoteMedicamento = async () => {
      try {
         const res = await getLoteMedicamentoByIdService(id);
         const {
            nome_medicamento,
            nome_laboratorio,
            quantidade,
            data_validade
         } = res.data;
         setEditableLoteMedicamento({id, nome_medicamento, nome_laboratorio, quantidade, data_validade});

      } catch (error) {
         console.log(error);
      }
   }

   const handleEditLoteMedicamento = async (newLoteMedicamentoData) => {
      try {
         if(await updateLoteMedicamento(id, idMedicamento, newLoteMedicamentoData)) {
            showSuccessAlert({
               title: "Alterações realizadas com sucesso!"
            });
            closeModal();
         }
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Editar Lote",
               message: errMessage
            })
         }
         console.log(error);
      }
   }

   useEffect(() => {
      getLoteMedicamento();
   }, [])

   return(
      editableLoteMedicamento && (
         <FormLoteMedicamento
            dataLoteMedicamento={editableLoteMedicamento}
            handleLoteMedicamentoSubmit={handleEditLoteMedicamento}
         />
      )
   )
}