import { createContext, useContext, useEffect, useState } from "react";
import { getAllRelatorioMedicamentosService, getAllRelatoriosByFilterService } from "../services/relatMedicamentos.service";
import { searchFilterRelatorioMedicamentos } from "../utils/SearchFilterUtil";

const RelatMedicamentoContext = createContext(null);

export function RelatMedicamentoProvider({ children }) {
   const [relatoriosMedicamentos, setRelatoriosMedicamentos] = useState();
   const [filteredRelatMedicamentos, setFilteredRelatMedicamentos] = useState();
   const [filter, setFilter] = useState();
   const [searchValue, setSearchValue] = useState("");
   const [isLoading, setIsLoading] = useState(true);

   const getAllRelatoriosMedicamentos = async () => {
      if (!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllRelatorioMedicamentosService();
      setRelatoriosMedicamentos(res.data);
      setIsLoading(false);
   }

   const getAllRelatoriosMedicamentosByFilter = async () => {
      try {
         if(!isLoading) {
            setIsLoading(true);
         }
         const res = await getAllRelatoriosByFilterService(filter);
         setRelatoriosMedicamentos(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   }

   const init = async () => {
      try {
         await getAllRelatoriosMedicamentos();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      init();
   }, []);

   useEffect(() => {
      if(relatoriosMedicamentos && Array.isArray(relatoriosMedicamentos)) {
         const filteredRelatoriosMedicamentos = searchFilterRelatorioMedicamentos(relatoriosMedicamentos, searchValue);
         setFilteredRelatMedicamentos(filteredRelatoriosMedicamentos)
      }
   }, [relatoriosMedicamentos, searchValue]);

   return (
      <RelatMedicamentoContext.Provider value={{ 
         relatoriosMedicamentos, 
         filteredRelatMedicamentos,
         searchValue, 
         isLoading, 
         filter, 
         setRelatoriosMedicamentos, 
         setFilter, 
         setSearchValue, 
         getAllRelatoriosMedicamentos,
         getAllRelatoriosMedicamentosByFilter 
      }}>
         {children}
      </RelatMedicamentoContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRelatMedicamento = () => useContext(RelatMedicamentoContext);