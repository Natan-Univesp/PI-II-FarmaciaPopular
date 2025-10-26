import { createContext, useContext, useEffect, useState } from "react";
import {
   getAllRetiradasByFilterService,
   getAllRetiradasMedicamentosService,
} from "../services/retiradas.service";

const RetiradaContext = createContext(null);

export const RetiradaProvider = ({ children }) => {
   const [retiradas, setRetiradas] = useState();
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

   return (
      <RetiradaContext.Provider
         value={{
            retiradas,
            filter,
            searchValue,
            isLoading,
            setRetiradas,
            setFilter,
            setSearchValue,
            setIsLoading,
         }}
      >
         {children}
      </RetiradaContext.Provider>
   );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRetirada = () => useContext(RetiradaContext);
