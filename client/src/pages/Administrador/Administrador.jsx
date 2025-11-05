import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { AdminProvider } from "../../context/AdminContext";
import { ValidateAdmin } from "../../components/RoutesValidate/ValidateAdmin";
import { useEffect } from "react";
import { useInfoStats } from "../../context/InfoStatsContext";
import { Loading } from "../../components/Loading/Loading";

export function Administrador() {
   const { adminStats, getAllAdminPageStats } = useInfoStats();

   const infoStatsData = [
      {
         titulo: "USUÁRIOS CADASTRADOS",
         valor: adminStats?.totalUsers || <Loading />,
      },
      {
         titulo: "USUÁRIOS ATIVOS",
         valor: adminStats?.totalActiveUsers || <Loading />,
      },
      {
         titulo: "USUÁRIOS INATIVOS",
         valor: adminStats?.totalInactiveUsers || <Loading />,
      },
   ];

   const initStats = async () => {
      try {
         await getAllAdminPageStats();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      initStats();
   }, []);

   return (
      <ValidateAdmin>
         <AdminProvider>
            <MainLayout title="Administrador" infoStatsCollection={infoStatsData}>
               <Outlet />
            </MainLayout>
         </AdminProvider>
      </ValidateAdmin>
   );
}