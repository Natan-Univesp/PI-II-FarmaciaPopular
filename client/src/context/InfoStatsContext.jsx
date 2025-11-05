import { createContext, useContext, useState } from "react";
import {
   getAllRetiradasOnMonthService,
   getMedicamentoWithMaxEstoqueService,
   getMostMedicamentoRetiradoOnMonthService,
   getTotalActiveUsersService,
   getTotalAquisicoesEntreguesService,
   getTotalAquisicoesEnviadasService,
   getTotalAquisicoesSolicitadasService,
   getTotalInactiveUsersService,
   getTotalMinEstoqueMedicamentosService,
   getTotalRegisteredLaboratoriosService,
   getTotalUsersService,
} from "../services/infoStats.service";

const InfoStatsContext = createContext(null);

export function InfoStatsProvider({ children }) {
   const [laboratorioStats, setLaboratorioStats] = useState();
   const [medicamentoStats, setMedicamentosStats] = useState();
   const [solicitacaoStats, setSolicitacaoStats] = useState();
   const [retiradaStats, setRetiradaStats] = useState();
   const [adminStats, setAdminStats] = useState();

const getAllLaboratorioPageStats = async () => {
      const resLab = await getTotalRegisteredLaboratoriosService();
      const { total_laboratorios: totalLabRegister } = resLab.data;
      setLaboratorioStats({
         totalLabRegister: String(totalLabRegister),
      });
   };

   const getAllMedicamentoPageStats = async () => {
      const resMinMedica = await getTotalMinEstoqueMedicamentosService();
      const resMaxMedica = await getMedicamentoWithMaxEstoqueService();
      const { total_minEstoque: totalMinEstoque } = resMinMedica.data;
      const { nome: medicamentoMaxEstoque } = resMaxMedica.data;
      setMedicamentosStats({
         totalMinEstoque: String(totalMinEstoque),
         medicamentoMaxEstoque: String(medicamentoMaxEstoque)
      })
   };

   const getAllSolicitacaoPageStats = async () => {
      const resAquisicSol = await getTotalAquisicoesSolicitadasService();
      const resAquisicEnv = await getTotalAquisicoesEnviadasService();
      const resAquisicEnt = await getTotalAquisicoesEntreguesService();
      const { total_aquisicaoSolicitada: totalSolicitado } = resAquisicSol.data;
      const { total_aquisicaoEnviada: totalEnviado } = resAquisicEnv.data;
      const { total_aquisicaoEntregue: totalEntregue } = resAquisicEnt.data;
      setSolicitacaoStats({
         totalSolicitado: String(totalSolicitado),
         totalEnviado: String(totalEnviado),
         totalEntregue: String(totalEntregue)
      })
   };

   const getAllRetiradasPageStats = async () => {
      const resRetMonth = await getAllRetiradasOnMonthService();
      const resRetMed = await getMostMedicamentoRetiradoOnMonthService();
      const { total_retiradasOnMonth: totalRetiradaOnMonth } = resRetMonth.data;
      const { nome_medicamento, total_retirada } = resRetMed.data;
      const mostRetiradaMedicamentoMonth = `${String(nome_medicamento)} - ${String(
         total_retirada
      )}`;
      setRetiradaStats({
         totalRetiradaOnMonth: String(totalRetiradaOnMonth),
         mostRetiradaMedicamentoMonth
      })
   };

   const getAllAdminPageStats = async () => {
      const resUser = await getTotalUsersService();
      const resActiveUser = await getTotalActiveUsersService();
      const resInactiveUser = await getTotalInactiveUsersService();
      const { total_users: totalUsers } = resUser.data;
      const { total_users: totalActiveUsers } = resActiveUser.data;
      const { total_users: totalInactiveUsers } = resInactiveUser.data;
      setAdminStats({
         totalUsers: String(totalUsers),
         totalActiveUsers: String(totalActiveUsers),
         totalInactiveUsers: String(totalInactiveUsers)
      });
   };


   return(
      <InfoStatsContext.Provider value={{
         laboratorioStats,
         medicamentoStats,
         solicitacaoStats,
         retiradaStats,
         adminStats,
         getAllLaboratorioPageStats,
         getAllMedicamentoPageStats,
         getAllSolicitacaoPageStats,
         getAllRetiradasPageStats,
         getAllAdminPageStats
      }}>
         {children}
      </InfoStatsContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInfoStats = () => useContext(InfoStatsContext);
