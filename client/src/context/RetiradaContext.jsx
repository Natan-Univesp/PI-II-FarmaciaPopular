import { createContext, useContext, useEffect, useState } from "react";
import {
   createRetiradaService,
   getAllRetiradasByFilterService,
   getAllRetiradasMedicamentosService,
} from "../services/retiradas.service";
import { searchFilterRetiradaMedicamentos } from "../utils/SearchFilterUtil";

const RetiradaContext = createContext(null);

export const RetiradaProvider = ({ children }) => {
   const [retiradas, setRetiradas] = useState();
   const [filteredRetiradas, setFilteredRetiradas] = useState();
   const [filter, setFilter] = useState();
   const [searchValue, setSearchValue] = useState("");
   const [isLoading, setIsLoading] = useState(true);

   const getAllRetiradas = async () => {
      if (!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllRetiradasMedicamentosService();
      setRetiradas(res.data);
      setIsLoading(false);
   };

   const getAllRetiradasByFilter = async () => {
      try {
         if (!isLoading) {
            setIsLoading(true);
         }
         const res = await getAllRetiradasByFilterService(filter);
         setRetiradas(res.data);
         setIsLoading(false);
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   const createRetirada = async (retiradaData) => {
      const res = await createRetiradaService(retiradaData);
      if(res.data.status === "success") {
         await getAllRetiradas();
         return true;
      }
   }

   const init = async () => {
      try {
         await getAllRetiradas();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      init();
   }, []);

   useEffect(() => {
      if(retiradas && Array.isArray(retiradas)) {
         const filteredRetiradas = searchFilterRetiradaMedicamentos(retiradas, searchValue);
         setFilteredRetiradas(filteredRetiradas);
      }
   }, [retiradas, searchValue])

   return (
      <RetiradaContext.Provider
         value={{
            retiradas,
            filteredRetiradas,
            filter,
            searchValue,
            isLoading,
            setRetiradas,
            setFilter,
            setSearchValue,
            setIsLoading,
            createRetirada
         }}
      >
         {children}
      </RetiradaContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRetirada = () => useContext(RetiradaContext);
