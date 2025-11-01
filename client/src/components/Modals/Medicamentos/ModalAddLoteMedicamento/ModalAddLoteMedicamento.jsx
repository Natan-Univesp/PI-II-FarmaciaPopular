import { useEffect, useState } from "react";
import { useAlert } from "../../../../context/AlertContext";
import { useModal } from "../../../../context/ModalContext";
import { getMedicamentoByIdService } from "../../../../services/medicamentos.service";
import { FormLoteMedicamento } from "../../../Forms/FormLoteMedicamento/FormLoteMedicamento";

export function ModalAddLoteMedicamento() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { idMedicamento, createLoteMedicamento } = showDataInfo();
   const [nomeMedicamento, setNomeMedicamento] = useState("");

   const getMedicamento = async () => {
      try {
         const res = await getMedicamentoByIdService(idMedicamento);
         const { nome: nomeMedicamento } = res.data;
         setNomeMedicamento(nomeMedicamento);
      } catch (error) {
         console.log(error);
      }
   };

   const handleRegisterLoteMedicamento = async (loteMedicamentoData) => {
      try {
         if (await createLoteMedicamento({fk_id_medicamento: idMedicamento, ...loteMedicamentoData})) {
            showSuccessAlert({
               title: "Lote Cadastrado com Sucesso!",
            });
            closeModal();
         }
      } catch (error) {
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao cadastrar Lote",
               message: errMessage,
            });
         }
      }
   };

   useEffect(() => {
      getMedicamento();
   }, []);

   return (
      nomeMedicamento && (
         <FormLoteMedicamento
            handleLoteMedicamentoSubmit={handleRegisterLoteMedicamento}
            nomeMedicamento={nomeMedicamento}
            isNewRegister={true}
         />
      )
   );
}
