import { Outlet } from "react-router";
import { useMedicamento } from "../../../context/MedicamentoContext";
import { useModal } from "../../../context/ModalContext";

export function MedicamentoMain() {
   const { showModal } = useModal();
   const { medicamentos, createMedicamento } = useMedicamento();

   return (
      <>
         <button
            style={{ backgroundColor: "black" }}
            onClick={() =>
               showModal({
                  modalName: "registerNewMedicamento",
                  customStyle: { 
                     height: "100%", 
                     width: "600px" 
                  },
                  data: {
                     createMedicamento
                  }
               })
            }
         >
            CLIQUE
         </button>
         <h2 className="subTitle">Estoque de Medicamentos</h2>
         <Outlet context={{ medicamentos }}/>
      </>
   );
}
