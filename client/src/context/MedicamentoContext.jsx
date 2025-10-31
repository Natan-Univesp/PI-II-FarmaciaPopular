import { createContext, useContext, useEffect, useState } from "react";
import { createMedicamentoService, getAllInactiveMedicamentosService, getAllMedicamentosService, updateMedicamentoService } from "../services/medicamentos.service";
import { searchFilterMedicamentos } from "../utils/SearchFilterUtil";

const MedicamentoContext = createContext(null);

export function MedicamentoProvider({ children }) {
   const [medicamentos, setMedicamentos] = useState();
   const [filteredMedicamentos, setFilteredMedicamentos] = useState();
   const [inactiveMedicamentos, setInactiveMedicamentos] = useState();
   const [searchValue, setSearchValue] = useState("");
   const [isLoading, setIsLoading] = useState(true); 
   const [isInactiveLoading, setIsInactiveLoading] = useState(true);

   const getAllMedicamentos = async () => {
      if (!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllMedicamentosService();
      setMedicamentos(res.data);
      setIsLoading(false);
   }

   const getAllInactiveMedicamentos = async () => {
      if (!isInactiveLoading) {
         setIsInactiveLoading(true);
      }
      const res = await getAllInactiveMedicamentosService();
      setInactiveMedicamentos(res.data);
      setIsInactiveLoading(false);
   }

   const createMedicamento = async (medicamentoData) => {
      const res = await createMedicamentoService(medicamentoData);
      if(res.data.status === "success"){
         await getAllMedicamentos();
         return true;
      }
      
   }

   const updateMedicamento = async (id, newMedicamentoData) => {
      const res = await updateMedicamentoService(id, newMedicamentoData);
      if(res.data.status === "success") {
         await getAllMedicamentos();
         return true;
      }
   }

   const init = async () => {
      try {
         await getAllMedicamentos();
         await getAllInactiveMedicamentos();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      init();
   }, []);

   useEffect(() => {
      if(medicamentos && Array.isArray(medicamentos)) {
         const filteredMedicamentos = searchFilterMedicamentos(medicamentos, searchValue);
         setFilteredMedicamentos(filteredMedicamentos);
      }

   }, [medicamentos, searchValue]);

   return (
      <MedicamentoContext.Provider value={{ 
         medicamentos, 
         filteredMedicamentos, 
         inactiveMedicamentos,
         searchValue, 
         isLoading,
         isInactiveLoading,
         setMedicamentos,
         setFilteredMedicamentos,
         setInactiveMedicamentos,
         setSearchValue,
         createMedicamento,
         updateMedicamento
      }}>
         {children}
      </MedicamentoContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMedicamento = () => useContext(MedicamentoContext);

