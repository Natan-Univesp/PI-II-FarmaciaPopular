import { useAlert } from "../../../../context/AlertContext";
import { FormSolicitacaoProvider } from "../../../../context/FormSolicitacaoContext";
import { useModal } from "../../../../context/ModalContext";
import { FormSolicitacao } from "../../../Forms/FormSolicitacao/FormSolicitacao";

export function ModalAddSolicitacao() {
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { createAquisicao } = showDataInfo();

   const handleRegisterAquisicao = async (aquisicaoData) => {
      try {
         if(await createAquisicao(aquisicaoData)) {
            showSuccessAlert({
               title: "Solicitação Cadastradas com Sucesso!"
            });
            closeModal();
         }
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao cadastrar Solicitação",
               message: errMessage
            })
         }
      }
   }

   return(
      <FormSolicitacaoProvider>
         <FormSolicitacao handleSolicitacaoSubmit={handleRegisterAquisicao}/>
      </FormSolicitacaoProvider>
   )
}