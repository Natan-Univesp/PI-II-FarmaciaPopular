import { CardShortCut } from "../../components/Cards/CardShortCut/CardShortCut";
import { MainLayout } from "../../components/Layout/MainLayout";

export function Home() {
   const shortCutCollection = [
      {
         id: 1,
         title: "Visualizar Medicamentos",
         path: "/medicamentos",
         min_nivel_acesso: 3
      },
      {
         id: 2,
         title: "Visualizar Relatórios",
         path: "/medicamentos/relatorios",
         min_nivel_acesso: 3
      },
      {
         id: 3,
         title: "Visualizar Laboratórios",
         path: "/laboratorios",
         min_nivel_acesso: 1          
      },
      {
         id: 4,
         title: "Retirada de Medicamentos",
         path: "/medicamentos/retirada",
         min_nivel_acesso: 2
      },
      {
         id: 5,
         title: "Solicitação de Medicamentos",
         path: "/medicamentos/solicitacao",
         min_nivel_acesso: 3
      }
   ]

   return(
      <MainLayout title="Principais Serviços">
         <CardShortCut shortCutCollection={shortCutCollection}/>
      </MainLayout>
   )
}