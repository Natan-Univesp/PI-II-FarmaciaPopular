import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { ClienteEspProvider } from "../../context/ClienteEspContext";
import { ValidateSolicitanteMedicamentos } from "../../components/RoutesValidate/ValidateSolicitanteMedicamentos";

export function ClienteConvenio() {
   return(
      <ValidateSolicitanteMedicamentos>
         <ClienteEspProvider>
            <MainLayout title="Usuários de Convênio">
               <Outlet/>
            </MainLayout>
         </ClienteEspProvider>
      </ValidateSolicitanteMedicamentos>
   )
}