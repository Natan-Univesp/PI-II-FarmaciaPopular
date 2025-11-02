import { createContext, useContext, useEffect, useState } from "react";
import { createAquisicaoService, getAllAquisicoesEntreguesService, getAllAquisicoesEnviadasService, getAllAquisicoesSolicitadasService } from "../services/aquisicoes.service";

const AquisicaoContext = createContext(null);

export function AquisicaoProvider({ children }) {
   const [aquisicoesSolicitadas, setAquisicoesSolicitadas] = useState();
   const [aquisicoesEnviadas, setAquisicoesEnviadas] = useState();
   const [aquisicoesEntregues, setAquisicoesEntregues] = useState();
   // Loading states
   const [isLoadingSolicitadas, setIsLoadingSolicitadas] = useState(true);
   const [isLoadingEnviadas, setIsLoadingEnviadas] = useState(true);
   const [isLoadingEntregues, setIsLoadingEntregues] = useState(true);

   const getAllAquisicoesSolicitadas = async () => {
      if(!isLoadingSolicitadas) {
         setIsLoadingSolicitadas(true);
      }

      const res = await getAllAquisicoesSolicitadasService();  
      setAquisicoesSolicitadas(res.data);
      setIsLoadingSolicitadas(false);
   }

   const getAllAquisicoesEnviadas = async () => {
      if(!isLoadingEnviadas) {
         setIsLoadingEnviadas(true);
      }
      const res = await getAllAquisicoesEnviadasService();
      setAquisicoesEnviadas(res.data);
      setIsLoadingEnviadas(false);
   }

   const getAllAquisicoesEntregues = async () => {
      if(!isLoadingEntregues) {
         setIsLoadingEntregues(true);
      }

      const res = await getAllAquisicoesEntreguesService();
      setAquisicoesEntregues(res.data);
      setIsLoadingEntregues(false);
   }

   const createAquisicao = async (aquisicaoData) => {
      const res = await createAquisicaoService(aquisicaoData);
      if(res.data.status === "success"){
         await getAllAquisicoesSolicitadas();
         return true;
      }
   }
   
   const init = async () => {
      try {
         await getAllAquisicoesSolicitadas();
         await getAllAquisicoesEnviadas();
         await getAllAquisicoesEntregues();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      init();
   }, []);

   return (
      <AquisicaoContext.Provider value={{
         aquisicoesSolicitadas,
         aquisicoesEnviadas,
         aquisicoesEntregues,
         isLoadingSolicitadas,
         isLoadingEnviadas,
         isLoadingEntregues,
         setAquisicoesSolicitadas,
         setAquisicoesEnviadas,
         setAquisicoesEntregues,
         setIsLoadingSolicitadas,
         setIsLoadingEnviadas,
         setIsLoadingEntregues,
         createAquisicao
      }}>
         {children}
      </AquisicaoContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAquisicao = () => useContext(AquisicaoContext);