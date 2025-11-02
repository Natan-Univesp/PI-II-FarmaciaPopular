import { CardAction } from "../../../Cards/CardAction/CardAction";
import { FaEdit as IconEdit, FaTrashAlt as IconDel } from "react-icons/fa";
import { TableAquisicao } from "../../../Tables/TableComponents/TableAquisicao/TableAquisicao";
import { useModal } from "../../../../context/ModalContext";
import { useAquisicao } from "../../../../context/AquisicaoContext";

export function SolicitacaoMedicamentoMain() {
   const { showModal } = useModal();
   const { createAquisicao } = useAquisicao();
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
                  maxWidth: "750px"
               },
               data: {
                  createAquisicao
               }
            }),
      },
   ];

   const pendAq = [];
   const envAq = [];
   const finishAq = [];

   //Coleções de botões
   const buttonTableSolicitadaCollection = [
      {
         id: 1,
         infoView: "Confirmar Envio",
         handleAction: () => null,
         className: "btnPrim",
      },
      {
         id: 2,
         infoView: <IconDel />,
         handleAction: () => null,
         className: "btnDel",
         toolTipsText: "Excluir Solicitação",
      },
   ];

   const buttonTableEnviadoCollection = [
      {
         id: 1,
         infoView: "Confirmar Entrega",
         handleAction: () => null,
         className: "btnConfirm",
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
         {pendAq &&
            pendAq.map((aquisicaoData) => (
               <TableAquisicao
                  aquisicaoData={aquisicaoData}
                  btnCollection={buttonTableSolicitadaCollection}
               />
            ))}

         {/* Medicamentos Enviados */}
         <h2 className="subTitle" style={{ backgroundColor: "var(--colorYellow) !important" }}>
            Medicamentos Enviados
         </h2>
         {envAq &&
            envAq.map((aquisicaoData) => (
               <TableAquisicao
                  aquisicaoData={aquisicaoData}
                  btnCollection={buttonTableEnviadoCollection}
               />
            ))}

         {/* Medicamentos Entregues */}
         <h2 className="subTitle" style={{ backgroundColor: "var(--colorGreen) !important" }}>
            Medicamentos Entregues
         </h2>
         {finishAq &&
            finishAq.map((aquisicaoData) => (
               <TableAquisicao
                  aquisicaoData={aquisicaoData}
               />
            ))
         }
      </>
   );
}
