import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { ClienteEspProvider } from "../../context/ClienteEspContext";

export function ClienteConvenio() {
   return(
      <ClienteEspProvider>
         <MainLayout title="Usuários de Convênio">
            <Outlet/>
         </MainLayout>
      </ClienteEspProvider>
   )
}