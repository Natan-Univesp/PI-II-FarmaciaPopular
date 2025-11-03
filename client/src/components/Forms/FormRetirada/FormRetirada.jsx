import { MedicamentoBox } from "./MedicamentoBox/MedicamentoBox";
import { useFormRetirada } from "../../../context/FormRetiradaContext";

export function FormRetirada({
   handleRetiradaSubmit
}) {
   const {
      fields,
      append,
      remove,
      handleSubmit,
      medicamentoOptions,
   } = useFormRetirada();


   return(
      <form 
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(handleRetiradaSubmit)}
      >
         <MedicamentoBox
            fields={fields}
            append={append}
            remove={remove}
            medicamentoOptions={medicamentoOptions}
         />

         <button className="buttonForm-style1">
            Cadastrar Retirada
         </button>
      </form>
   )
}