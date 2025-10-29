import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { ModalProvider } from "../../context/ModalContext";
import { MedicamentoProvider } from "../../context/MedicamentoContext";

export function Medicamento() {

   return (
      <MedicamentoProvider>
         <ModalProvider>
            <MainLayout title="Medicamentos">
               <Outlet/>
            </MainLayout>
         </ModalProvider>
      </MedicamentoProvider>
   );
}
