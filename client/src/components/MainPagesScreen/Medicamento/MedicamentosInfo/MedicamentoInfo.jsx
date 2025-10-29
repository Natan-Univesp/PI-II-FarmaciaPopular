import { Link, useOutletContext } from "react-router";
import { CardRemedio } from "../../../cards/CardRemedio/CardRemedio";

export function MedicamentosInfo() {
   const { medicamentos } = useOutletContext();
   console.log(medicamentos);

   return (
      <div className="layoutFlexCollectionCard">
         {medicamentos &&
            medicamentos.map((medicamento) => (
               <CardRemedio
                  key={medicamento.id}
                  medicamentoData={medicamento}
               />
            ))}
      </div>
   );
}
