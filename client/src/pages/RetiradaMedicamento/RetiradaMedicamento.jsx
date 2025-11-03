import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { RetiradaProvider } from "../../context/RetiradaContext";

export function RetiradaMedicamento() {
   return(
      <RetiradaProvider>
         <MainLayout title="Retirada de Medicamentos">
            <Outlet/>
         </MainLayout>
      </RetiradaProvider>
   )
}