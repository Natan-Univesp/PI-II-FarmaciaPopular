import { Link, useOutletContext } from "react-router";
import { CardRemedio } from "../../../cards/CardRemedio/CardRemedio";
import { InputSearch } from "../../../Inputs/InputSearch/InputSearch";

export function MedicamentosInfo() {
   const { medicamentos, searchValue, setSearchValue } = useOutletContext();

   const updateSearchValue = (e) => {
      const value = e.target.value;
      setSearchValue(value);
   }

   return (
      <>
         <InputSearch 
            value={searchValue}
            handleOnChange={updateSearchValue}
            hasFilterButton={false}
         />
         <div className="layoutFlexCollectionCard">
            {medicamentos &&
               medicamentos.map((medicamento) => (
                  <CardRemedio
                     key={medicamento.id}
                     medicamentoData={medicamento}
                  />
               ))}
         </div>
      </>
   );
}
