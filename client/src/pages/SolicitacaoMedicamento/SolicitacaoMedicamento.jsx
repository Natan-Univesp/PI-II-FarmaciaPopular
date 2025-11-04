import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { AquisicaoProvider } from "../../context/AquisicaoContext";
import { ValidateControladorEstoque } from "../../components/RoutesValidate/ValidateControladorEstoque";

export function SolicitacaoMedicamento() {
   return(
      <ValidateControladorEstoque>
         <AquisicaoProvider>
            <MainLayout title="Solicitação de Medicamentos">
               <Outlet/>
            </MainLayout>
         </AquisicaoProvider>
      </ValidateControladorEstoque>
   )
}