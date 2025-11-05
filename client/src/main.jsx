import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { Home } from "./pages/Home/Home.jsx";
import { Medicamento } from "./pages/Medicamento/Medicamento.jsx";
import { Laboratorio } from "./pages/Laboratorio/Laboratorio.jsx";
import { SolicitacaoMedicamento } from "./pages/SolicitacaoMedicamento/SolicitacaoMedicamento.jsx";
import { ClienteConvenio } from "./pages/ClienteConvenio/ClienteConvenio.jsx";
import { Administrador } from "./pages/Administrador/Administrador.jsx";
import { NavbarProvider } from "./context/NavbarContext.jsx";
import { RelatorioMedicamento } from "./pages/RelatorioMedicamento/RelatorioMedicamento.jsx";
import { RetiradaMedicamento } from "./pages/RetiradaMedicamento/RetiradaMedicamento.jsx";
import { Autenticacao } from "./pages/Autenticacao/Autenticacao.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";
import { MedicamentoMain } from "./components/MainPagesScreen/Medicamento/MedicamentoMain.jsx";
import { AdministradorMain } from "./components/MainPagesScreen/Administrador/AdministradorMain.jsx";
import { LotesMedicamentos } from "./components/MainPagesScreen/Medicamento/LotesMedicamentos/LotesMedicamentos.jsx";
import { MedicamentosInfo } from "./components/MainPagesScreen/Medicamento/MedicamentosInfo/MedicamentoInfo.jsx";
import { LoteMedicamentoProvider } from "./context/LoteMedicamentoContext.jsx";
import { LaboratorioMain } from "./components/MainPagesScreen/Laboratorio/LaboratorioMain.jsx";
import { SolicitacaoMedicamentoMain } from "./components/MainPagesScreen/SolicitacaoMedicamento/SolicitacaoMedicamentoMain/SolicitacaoMedicamentoMain.jsx";
import { RelatorioMedicamentoMain } from "./components/MainPagesScreen/RelatorioMedicamento/RelatorioMedicamentoMain.jsx";
import { RetiradaMedicamentoMain } from "./components/MainPagesScreen/RetiradaMedicamento/RetiradaMedicamentoMain.jsx";
import { ClienteConvenioMain } from "./components/MainPagesScreen/ClienteConvenio/ClienteConvenioMain.jsx";
import { InfoStatsProvider } from "./context/InfoStatsContext.jsx";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         //Home
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/medicamentos",
            element: <Medicamento />,
            children: [
               {
                  path: "/medicamentos",
                  element: <MedicamentoMain />,
                  children: [
                     {
                        index: true,
                        element: <MedicamentosInfo />,
                     },
                     {
                        path: "/medicamentos/:id",
                        element: (
                           <LoteMedicamentoProvider>
                              <LotesMedicamentos />
                           </LoteMedicamentoProvider>
                        ),
                     },
                  ],
               },
            ],
         },
         {
            path: "/medicamentos/solicitacao",
            element: <SolicitacaoMedicamento />,
            children: [
               {
                  index: true,
                  element: <SolicitacaoMedicamentoMain/>
               }
            ]
         },
         {
            path: "/medicamentos/relatorios",
            element: <RelatorioMedicamento />,
            children: [
               {
                  index: true,
                  element: <RelatorioMedicamentoMain/>
               }
            ]
         },
         {
            path: "/medicamentos/retirada",
            element: <RetiradaMedicamento />,
            children: [
               {
                  index: true,
                  element: <RetiradaMedicamentoMain/>
               }
            ]
         },
         {
            path: "/laboratorios",
            element: <Laboratorio />,
            children: [
               {
                  index: true,
                  element: <LaboratorioMain/>
               }
            ]
         },
         {
            path: "/clientes-convenio",
            element: <ClienteConvenio />,
            children: [
               {
                  index: true,
                  element: <ClienteConvenioMain/>
               }
            ]
         },
         {
            path: "/admin",
            element: <Administrador />,
            children: [
               {
                  index: true,
                  element: <AdministradorMain />,
               },
            ],
         },
      ],
   },
   {
      path: "/auth",
      element: <Autenticacao />,
   },
]);

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <NavbarProvider>
         <UserProvider>
            <AlertProvider>
               <InfoStatsProvider>
                  <RouterProvider router={router} />
               </InfoStatsProvider>
            </AlertProvider>
         </UserProvider>
      </NavbarProvider>
   </StrictMode>
);
