import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { RetiradaProvider } from "../../context/RetiradaContext";
import { useEffect } from "react";
import { useInfoStats } from "../../context/InfoStatsContext";
import { Loading } from "../../components/Loading/Loading";

export function RetiradaMedicamento() {
   const { retiradaStats, getAllRetiradasPageStats } = useInfoStats();

   const infoStatsData = [
      { 
         titulo: "TOTAL DE MEDICAMENTOS RETIRADOS NO MÊS", 
         valor: retiradaStats?.totalRetiradaOnMonth || <Loading/>
      },
      { 
         titulo: "MEDICAMENTO MAIS RETIRADA NO MÊS (medicamento/quantidade)", 
         valor: retiradaStats?.mostRetiradaMedicamentoMonth || <Loading/> 
      },
   ];

   const initStats = async () => {
      try {
         await getAllRetiradasPageStats();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      initStats();
   }, [])

   return(
      <RetiradaProvider>
         <MainLayout title="Retirada de Medicamentos" infoStatsCollection={infoStatsData}>
            <Outlet/>
         </MainLayout>
      </RetiradaProvider>
   )
}