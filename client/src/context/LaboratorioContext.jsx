import { createContext, useContext, useEffect, useState } from "react";
import { createLaboratorioService, getAllLaboratoriosService } from "../services/laboratorios.service";

const LaboratorioContext = createContext(null);

export function LaboratorioProvider({ children }) {
   const [laboratorios, setLaboratorios] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const getAllLaboratorios = async () => {
      if(!isLoading) {
         setIsLoading(true);
      }

      const res = await getAllLaboratoriosService();
      setLaboratorios(res.data);
      setIsLoading(false);
   }

   const createLaboratorio = async (laboratorioData) => {
      const res = await createLaboratorioService(laboratorioData);
      if(res.data.status === "success") {
         await getAllLaboratorios();
         return true;
      }
   }

   const init = async () => {
      try {
         await getAllLaboratorios();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      init();
   }, []);

   return (
      <LaboratorioContext.Provider value={{ 
         laboratorios, 
         isLoading,
         setLaboratorios, 
         createLaboratorio, 
      }}>
         {children}
      </LaboratorioContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLaboratorio = () => useContext(LaboratorioContext);
