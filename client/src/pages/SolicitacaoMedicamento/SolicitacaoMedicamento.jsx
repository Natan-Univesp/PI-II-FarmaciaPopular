import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { AquisicaoProvider } from "../../context/AquisicaoContext";
import { ValidateControladorEstoque } from "../../components/RoutesValidate/ValidateControladorEstoque";
import { useEffect } from "react";
import { Loading } from "../../components/Loading/Loading";
import { useInfoStats } from "../../context/InfoStatsContext";

export function SolicitacaoMedicamento() {
   const { solicitacaoStats, getAllSolicitacaoPageStats } = useInfoStats();

   const infoStatsData = [
      { 
         titulo: "TOTAL DE MEDICAMENTOS SOLICITADOS", 
         valor: solicitacaoStats?.totalSolicitado || <Loading/>
      },
      { 
         titulo: "TOTAL DE MEDICAMENTOS ENVIADOS", 
         valor: solicitacaoStats?.totalEnviado || <Loading/> 
      },
      { 
         titulo: "TOTAL DE MEDICAMENTOS ENTREGUES", 
         valor: solicitacaoStats?.totalEntregue || <Loading/> 
      },
   ];

   const initStats = async () => {
      try {
         await getAllSolicitacaoPageStats();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      initStats();
   }, [])

   return(
      <ValidateControladorEstoque>
         <AquisicaoProvider>
            <MainLayout title="Solicitação de Medicamentos" infoStatsCollection={infoStatsData}>
               <Outlet/>
            </MainLayout>
         </AquisicaoProvider>
      </ValidateControladorEstoque>
   )
}