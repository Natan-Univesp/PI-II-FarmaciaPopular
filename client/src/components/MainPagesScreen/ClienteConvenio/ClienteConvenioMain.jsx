import { useClienteEsp } from "../../../context/ClienteEspContext";
import { useModal } from "../../../context/ModalContext";
import { CardAction } from "../../Cards/CardAction/CardAction";
import { Loading } from "../../Loading/Loading";
import { TableClientesConvenio } from "../../Tables/TableClientesConvenio/TableClientesConvenio";

export function ClienteConvenioMain() {
   const { showModal } = useModal();
   const { clientesEspeciais, isLoading, createClienteEspecial } = useClienteEsp();

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastra Cliente de Convênio",
         text: "Cadastra Cliente que utiliza de medicamentos do tipo Convênio",
         textButton: "Cadastrar Cliente",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewClienteConvenio",
               customStyle: {
                  maxWidth: "750px",
                  overflow: "initial",
               },
               data: {
                  createClienteEspecial,
               },
            }),
      },
   ];

   return (
      <>
         <h2 className="subTitle">Ações</h2>
         <CardAction cardActionCollection={cardActionCollection} />

         <h2 className="subTitle">Todos os Clientes de Convênio</h2>
         {isLoading ? 
            <Loading /> : 
            
            clientesEspeciais.map((clienteData) => (
               <TableClientesConvenio key={clienteData.id} clientesConvenioData={clienteData} />
            ))   
         }
      </>
   );
}
