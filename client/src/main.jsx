import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.jsx'
import './index.css'
import { Home } from './pages/Home/Home.jsx'
import { Medicamento } from './pages/Medicamento/Medicamento.jsx'
import { ModeloMedicamento } from './pages/ModeloMedicamento/ModeloMedicamento.jsx'
import { Laboratorio } from './pages/Laboratorio/Laboratorio.jsx'
import { SolicitacaoMedicamento } from './pages/SolicitacaoMedicamento/SolicitacaoMedicamento.jsx'
import { UsuarioConvenio } from './pages/UsuarioConvenio/UsuarioConvenio.jsx'
import { Administrador } from './pages/Administrador/Administrador.jsx'
import { NavbarProvider } from './context/NavbarContext.jsx'
import { RelatorioMedicamento } from './pages/RelatorioMedicamento/RelatorioMedicamento.jsx'
import { RetiradaMedicamento } from './pages/RetiradaMedicamento/RetiradaMedicamento.jsx'
import { Autenticacao } from './pages/Autenticacao/Autenticacao.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { AlertProvider } from './context/AlertContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      //Home
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/medicamentos",
        element: <Medicamento/>,
      },
      {
        path: "/medicamentos/modelos",
        element: <ModeloMedicamento/>
      },
      {
        path: "/medicamentos/solicitacao",
        element: <SolicitacaoMedicamento/>
      },
      {
        path: "/medicamentos/relatorios",
        element: <RelatorioMedicamento/>
      },
      {
        path: "/medicamentos/retirada",
        element: <RetiradaMedicamento/>
      },
      {
        path: "/laboratorios",
        element: <Laboratorio/>
      },
      {
        path: "/usuarios-convenio",
        element: <UsuarioConvenio/>
      },
      {
        path: "/admin",
        element: <Administrador/>
      }
    ],
  },
  {
    path: "/auth",
    element: <Autenticacao/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavbarProvider>
      <UserProvider>
        <AlertProvider>
          <RouterProvider router={router}/>
        </AlertProvider>
      </UserProvider>
    </NavbarProvider>
  </StrictMode>,
)
