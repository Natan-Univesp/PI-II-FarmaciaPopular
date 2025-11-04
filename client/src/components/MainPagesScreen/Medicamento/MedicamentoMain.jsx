import { Outlet } from "react-router";
import { useMedicamento } from "../../../context/MedicamentoContext";
import { useUser } from "../../../context/UserContext";

export function MedicamentoMain() {
   const { 
      filteredMedicamentos: medicamentos, 
      searchValue,
      setSearchValue,
      createMedicamento,
   } = useMedicamento();
   const { user } = useUser();


   return (
      <>
         <Outlet context={{ 
            medicamentos, 
            searchValue, 
            setSearchValue,
            createMedicamento,
            user
         }} />
      </>
   );
}
