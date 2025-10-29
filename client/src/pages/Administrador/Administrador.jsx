import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { AdminProvider } from "../../context/AdminContext";
import { ValidateAdmin } from "../../components/RoutesValidate/ValidateAdmin";

export function Administrador() {
   return(
      <ValidateAdmin>
         <AdminProvider>
            <MainLayout title="Administrador">
               <Outlet/>
            </MainLayout>
         </AdminProvider>
      </ValidateAdmin>
   )
}