import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { LaboratorioProvider } from "../../context/LaboratorioContext";
import { ValidateSolicitanteMedicamentos } from "../../components/RoutesValidate/ValidateSolicitanteMedicamentos";
import { useInfoStats } from "../../context/InfoStatsContext";
import { Loading } from "../../components/Loading/Loading";
import { useEffect } from "react";

export function Laboratorio() {
   const { laboratorioStats, getAllLaboratorioPageStats } = useInfoStats();

   const infoStatsData = [
      {
         titulo: "TOTAL DE LABORATÓRIOS CADASTRADOS",
         valor: laboratorioStats?.totalLabRegister || <Loading />,
      },
   ];

   const initStats = async () => {
      try {
         await getAllLaboratorioPageStats();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      initStats();
   }, []);

   return (
      <ValidateSolicitanteMedicamentos>
         <LaboratorioProvider>
            <MainLayout title="Laboratório" infoStatsCollection={infoStatsData}>
               <Outlet />
            </MainLayout>
         </LaboratorioProvider>
      </ValidateSolicitanteMedicamentos>
   );
}
