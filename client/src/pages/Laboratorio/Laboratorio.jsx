import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { LaboratorioProvider } from "../../context/LaboratorioContext";
import { ValidateSolicitanteMedicamentos } from "../../components/RoutesValidate/ValidateSolicitanteMedicamentos";

export function Laboratorio() {
   return(
      <ValidateSolicitanteMedicamentos>
         <LaboratorioProvider>
            <MainLayout title="Laboratório">
               <Outlet/>
            </MainLayout>
         </LaboratorioProvider>
      </ValidateSolicitanteMedicamentos>
   )
}