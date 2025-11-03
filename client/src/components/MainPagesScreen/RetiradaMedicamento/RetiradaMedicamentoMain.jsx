import { useModal } from "../../../context/ModalContext";
import { useRetirada } from "../../../context/RetiradaContext";
import { CardAction } from "../../Cards/CardAction/CardAction";

export function RetiradaMedicamentoMain() {
   const { showModal } = useModal();
   const {
      createRetirada
   } = useRetirada();

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Retirada",
         text: "Cadastra as retiradas de medicamentos",
         textButton: "Cadastrar Retirada",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewRetirada",
               customStyle: {
                  maxWidth: "750px",
                  overflow: "initial"
               },
               data: {
                  createRetirada
               }
            })
      }
   ]

   return(
      <>
         <h2 className="subTitle">Ações</h2>
         <CardAction cardActionCollection={cardActionCollection}/>

         <h2 className="subTitle">Histórico de Retiradas</h2>
      </>
   )
}