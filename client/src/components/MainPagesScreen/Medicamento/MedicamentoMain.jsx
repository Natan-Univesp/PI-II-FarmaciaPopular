import { Outlet } from "react-router";
import { useMedicamento } from "../../../context/MedicamentoContext";
import { useModal } from "../../../context/ModalContext";
import { CardAction } from "../../Cards/CardAction/CardAction";

export function MedicamentoMain() {
   /*
   ==========================================
   PARTE JOSE
   ==========================================
   */

   const handleVisualizarClick = (medicamentoId) => {
      console.log("Visualizar medicamento:", medicamentoId);
      // Sua lógica de navegação ou modal aqui
   };

   const handleCadastroClick = () => {
      console.log("Abrir cadastro de remessas");
      // Sua lógica de cadastro aqui
   };

   const { showModal } = useModal();
   const { medicamentos, createMedicamento } = useMedicamento();

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Medicamento",
         text: "Cadastra um medicamento ainda não existente",
         textButton: "Cadastrar Medicamento",
         handleOpenModal: () => 
            showModal({
               modalName: "registerNewMedicamento",
               customStyle: {
                  height: "100%",
                  width: "600px",
               },
               data: {
                  createMedicamento,
               },
            })
      },
   ]


   return (
      <>

         <h2 className="subTitle">Ações</h2>
         <CardAction cardActionCollection={cardActionCollection}/>

         <button
            style={{ backgroundColor: "black" }}
            onClick={() =>
               showModal({
                  modalName: "registerNewLaboratorio",
                  data: {
                     createMedicamento,
                  },
               })
            }
         >
            CLIQUE
         </button>
         <h2 className="subTitle">Estoque de Medicamentos</h2>
         <Outlet context={{ medicamentos }} />
      </>
   );
}
