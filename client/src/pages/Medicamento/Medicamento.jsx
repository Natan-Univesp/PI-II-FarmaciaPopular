import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { ModalProvider } from "../../context/ModalContext";
import { MedicamentoProvider } from "../../context/MedicamentoContext";
import { useEffect, useState } from "react";
import { useInfoStats } from "../../context/InfoStatsContext";
import { Loading } from "../../components/Loading/Loading";

export function Medicamento() {
   const { medicamentoStats, getAllMedicamentoPageStats } = useInfoStats();

   const infoStatsData = [
      { 
         titulo: "TOTAL DE MEDICAMENTOS COM ESTOQUE BAIXO", 
         valor: medicamentoStats?.totalMinEstoque || <Loading/>
      },
      { 
         titulo: "MEDICAMENTO COM MAIOR ESTOQUE", 
         valor: medicamentoStats?.medicamentoMaxEstoque || <Loading/> 
      },
   ];

   const initStats = async () => {
      try {
         await getAllMedicamentoPageStats();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      initStats();
   }, [])

   return (
      <MedicamentoProvider>
         <MainLayout title="Medicamentos" infoStatsCollection={infoStatsData}>
            <Outlet />
         </MainLayout>
      </MedicamentoProvider>
   );
}
