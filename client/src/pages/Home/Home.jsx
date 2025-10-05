import { CardShortCut } from "../../components/Cards/CardShortCut/CardShortCut";
import { MainLayout } from "../../components/Layout/MainLayout";

export function Home() {
   return(
      <MainLayout title="Principais Serviços">
         <CardShortCut/>
      </MainLayout>
   )
}