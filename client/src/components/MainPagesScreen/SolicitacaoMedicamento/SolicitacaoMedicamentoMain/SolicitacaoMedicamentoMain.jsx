import { CardAction } from "../../../Cards/CardAction/CardAction";
import { FaEdit as IconEdit, FaTrashAlt as IconDel } from "react-icons/fa";
import { TableAquisicao } from "../../../Tables/TableAquisicao/TableAquisicao";
import { useModal } from "../../../../context/ModalContext";
import { useAquisicao } from "../../../../context/AquisicaoContext";
import { Loading } from "../../../Loading/Loading";

export function SolicitacaoMedicamentoMain() {
   const { showModal } = useModal();
   const {
      aquisicoesSolicitadas,
      aquisicoesEnviadas,
      aquisicoesEntregues,
      isLoadingSolicitadas,
      isLoadingEnviadas,
      isLoadingEntregues,
      createAquisicao,
   } = useAquisicao();
   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Solicitação",
         text: "Permite o cadastro da solicitação dos medicamentos realizados pela farmácia",
         textButton: "Cadastrar Solicitação",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewSolicitacao",
               customStyle: {
                  maxWidth: "750px",
               },
               data: {
                  createAquisicao,
               },
            }),
      },
   ];

   return (
      <>
         <h2 className="subTitle">Ações</h2>
         <CardAction cardActionCollection={cardActionCollection} />
         {/* Medicamentos Solicitados */}
         <h2 className="subTitle" style={{ backgroundColor: "var(--colorBlue) !important" }}>
            Medicamentos Solicitados
         </h2>
         {isLoadingSolicitadas ? (
            <Loading />
         ) : (
            aquisicoesSolicitadas && (
               aquisicoesSolicitadas.length > 0 ? (
                  aquisicoesSolicitadas.map((aquisicaoData) => (
                     <TableAquisicao aquisicaoData={aquisicaoData} actionType="SENDCONFIRM" />
                  ))
               ) : (
                  <p className="textInfoNotAvaliable">Nenhum Medicamento Solicitado</p>
               )
            )
            
         )}

         {/* Medicamentos Enviados */}
         <h2 className="subTitle" style={{ backgroundColor: "var(--colorYellow) !important", marginTop: "3em"}}>
            Medicamentos Enviados
         </h2>
         {isLoadingEnviadas ? (
            <Loading />
         ) : (
            aquisicoesEnviadas &&
               (aquisicoesEnviadas.length > 0 ? (
                  aquisicoesEnviadas.map((aquisicaoData) => (
                     <TableAquisicao aquisicaoData={aquisicaoData} actionType="DELIVERYCONFIRM" />
                  ))
               ) : (
                  <p className="textInfoNotAvaliable">Nenhum Pedido Enviado</p>
               ))
         )}

         {/* Medicamentos Entregues */}
         <h2 className="subTitle" style={{ backgroundColor: "var(--colorGreen) !important", marginTop: "3em" }}>
            Medicamentos Entregues
         </h2>
         {isLoadingEntregues ? (
            <Loading />
         ) : (
            aquisicoesEntregues &&
               (aquisicoesEntregues.length > 0 ? (
                  aquisicoesEntregues.map((aquisicaoData) => (
                     <TableAquisicao aquisicaoData={aquisicaoData} />
                  ))
               ) : (
                  <p className="textInfoNotAvaliable">Nenhum Pedido entregue</p>
               ))
         )}
      </>
   );
}
