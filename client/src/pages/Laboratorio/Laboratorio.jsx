import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { LaboratorioProvider } from "../../context/LaboratorioContext";

export function Laboratorio() {
   return(
      <LaboratorioProvider>
         <MainLayout title="Laboratório">
            <Outlet/>
         </MainLayout>
      </LaboratorioProvider>
   )
}