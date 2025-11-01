import { Outlet } from "react-router";
import { useMedicamento } from "../../../context/MedicamentoContext";

export function MedicamentoMain() {
   const { 
      filteredMedicamentos: medicamentos, 
      searchValue,
      setSearchValue,
      createMedicamento,
   } = useMedicamento();



   return (
      <>
         <Outlet context={{ 
            medicamentos, 
            searchValue, 
            setSearchValue,
            createMedicamento
         }} />
      </>
   );
}
