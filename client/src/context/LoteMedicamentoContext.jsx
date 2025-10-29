import { createContext, useContext, useEffect, useState } from "react";
import { createLoteMedicamentoService, getAllLotesMedicamentosByFilterService, getAllLotesMedicamentosByIdMedicamentoService, getAllLotesMedicamentosService } from "../services/lotesMedicamentos.service";
import { searchFilterLoteMedicamentos } from "../utils/SearchFilterUtil";

const LoteMedicamentoContext = createContext();

export function LoteMedicamentoProvider({ children }) {
   const [loteMedicamentos, setLoteMedicamentos] = useState();
   const [filteredLoteMedicamentos, setFilteredLoteMedicamentos] = useState()
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

   const getAllLoteMedicamentosByIdMedicamento = async (idMedicamento) => {
      if(!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllLotesMedicamentosByIdMedicamentoService(idMedicamento);
      setLoteMedicamentos(res.data);
      setFilteredLoteMedicamentos(res.data);
      setIsLoading(false);
   }

   const getAllLoteMedicamentosByFilter = async (idMedicamento) => {
      try {
         if(!isLoading) {
            setIsLoading(true);
         }
         const res = await getAllLotesMedicamentosByFilterService(idMedicamento, filter);
         setLoteMedicamentos(res.data);
         setFilteredLoteMedicamentos(res.data);
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

   useEffect(() => {
      if(loteMedicamentos && Array.isArray(loteMedicamentos)) {
         const filteredData = searchFilterLoteMedicamentos(loteMedicamentos, searchValue);
         setFilteredLoteMedicamentos(filteredData);
      }
   }, [loteMedicamentos, searchValue])

   return (
      <LoteMedicamentoContext.Provider value={{ 
         loteMedicamentos,
         filteredLoteMedicamentos,
         searchValue,
         filter,
         isLoading,
         setLoteMedicamentos,
         setFilteredLoteMedicamentos,
         setSearchValue,
         setIsLoading,
         setFilter,
         getAllLoteMedicamentos,
         getAllLoteMedicamentosByIdMedicamento,
         getAllLoteMedicamentosByFilter,
         createLoteMedicamento,
      }}>
         {children}
      </LoteMedicamentoContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoteMedicamento = () => useContext(LoteMedicamentoContext);