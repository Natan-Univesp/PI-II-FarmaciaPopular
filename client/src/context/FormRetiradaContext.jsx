import { useState } from "react";
import { createContext, useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { getAllMedicamentosForSelectRetiradaService } from "../services/medicamentos.service";

const FormRetiradaContext = createContext(null);

export function FormRetiradaProvider({ children }) {
   const [medicamentoOptions, setMedicamentoOptions] = useState();
   const {
      control,
      register,
      setValue,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         medicamentos_retirados: [{ fk_id_medicamento: null, quantidade_solicitada: null }],
      },
   });

   const { fields, append, remove } = useFieldArray({ control, name: "medicamentos_retirados" });

   const defineOptionsMedicamentos = async () => {
      try {
         const res = await getAllMedicamentosForSelectRetiradaService();
         setMedicamentoOptions(res.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      defineOptionsMedicamentos();
   }, [])

   return (
      <FormRetiradaContext.Provider
         value={{
            control,
            register,
            setValue,
            handleSubmit,
            errors,
            fields,
            append,
            remove,
            medicamentoOptions
         }}
      >
         {children}
      </FormRetiradaContext.Provider>
   );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useFormRetirada = () => useContext(FormRetiradaContext);
