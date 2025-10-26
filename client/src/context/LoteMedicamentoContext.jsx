import { createContext, useContext, useEffect, useState } from "react";
import { createLoteMedicamentoService, getAllLotesMedicamentosByFilterService, getAllLotesMedicamentosService } from "../services/lotesMedicamentos.service";

const LoteMedicamentoContext = createContext();

export function LoteMedicamentoProvider({ children }) {
   const [loteMedicamentos, setLoteMedicamentos] = useState();
   const [filter, setFilter] = useState();
   const [searchValue, setSearchValue] = useState("");
   const [isLoading, setIsLoading] = useState(true);

   const getAllLoteMedicamentos = async () => {
      if (!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllLotesMedicamentosService();
      setLoteMedicamentos(res.data);
      setIsLoading(false);
   }

   const getAllLoteMedicamentosByFilter = async () => {
      try {
         if(!isLoading) {
            setIsLoading(true);
         }
         const res = await getAllLotesMedicamentosByFilterService(filter);
         setLoteMedicamentos(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   }

   const createLoteMedicamento = async (loteMedicamentoData) => {
      const res = await createLoteMedicamentoService(loteMedicamentoData);
      if(res.data.status === "success"){
         await getAllLoteMedicamentos();
         return true;
      }
   }

   const init = async () => {
      try {
         await getAllLoteMedicamentos();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      init();
   }, [])


   return (
      <LoteMedicamentoContext.Provider value={{ 
         loteMedicamentos, 
         searchValue,
         isLoading,
         setLoteMedicamentos,
         setSearchValue,
         setIsLoading,
         setFilter,
         getAllLoteMedicamentos,
         getAllLoteMedicamentosByFilter,
         createLoteMedicamento,
      }}>
         {children}
      </LoteMedicamentoContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoteMedicamento = () => useContext(LoteMedicamentoContext);