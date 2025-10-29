import { Outlet } from "react-router";
import { MainLayout } from "../../components/Layout/MainLayout";
import { ModalProvider } from "../../context/ModalContext";
import { MedicamentoProvider } from "../../context/MedicamentoContext";
import { useState } from "react";

export function Medicamento() {

   const infoStatsData = [
      { titulo: "TOTAL DE MEDICAMENTOS DISPONÍVEIS", valor: "45" },
      { titulo: "TOTAL DE MEDICAMENTOS DISPONÍVEIS", valor: "23" },
      { titulo: "TOTAL DE MEDICAMENTOS DISPONÍVEIS", valor: "5" },
   ]

   return (
      <MedicamentoProvider>
         <MainLayout title="Medicamentos" infoStatsCollection={infoStatsData}>
            <Outlet />
         </MainLayout>
      </MedicamentoProvider>
   );
}
