import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { RelatMedicamentoProvider } from "../../context/RelatMedicamentoContext";

export function RelatorioMedicamento() {
   return(
      <RelatMedicamentoProvider>
         <MainLayout title="Relatório de Medicamentos">
            <Outlet/>
         </MainLayout>
      </RelatMedicamentoProvider>
   )
}