import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { AquisicaoProvider } from "../../context/AquisicaoContext";

export function SolicitacaoMedicamento() {
   return(
      <AquisicaoProvider>
         <MainLayout title="Solicitação de Medicamentos">
            <Outlet/>
         </MainLayout>
      </AquisicaoProvider>
   )
}