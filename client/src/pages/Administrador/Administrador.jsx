import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { AdminProvider } from "../../context/AdminContext";

export function Administrador() {
   return(
      <AdminProvider>
         <MainLayout title="Administrador">
            <Outlet/>
         </MainLayout>
      </AdminProvider>
   )
}