import { useState } from "react";
import { createContext, useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getAllLaboratoriosForSelectService } from "../services/laboratorios.service";
import { useEffect } from "react";

const FormSolicitacaoContext = createContext(null);

export function FormSolicitacaoProvider({ children }) {
   const [laboratorioOptions, setLaboratorioOptions] = useState();
   const {
      control,
      register,
      watch,
      setValue,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         fornecedor: "",
         fk_id_laboratorio: null,
         lote_medicamentos: [{ fk_id_medicamento: null, quantidade_solicitada: null }],
      },
   });

   const { fields, append, remove } = useFieldArray({ control, name: "lote_medicamentos" });

   const defineOptionsLaboratorio = async () => {
      try {
         const res = await getAllLaboratoriosForSelectService();
         setLaboratorioOptions(res.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      defineOptionsLaboratorio();
   }, [])

   return (
      <FormSolicitacaoContext.Provider
         value={{
            control,
            register,
            watch,
            setValue,
            handleSubmit,
            errors,
            fields,
            append,
            remove,
            laboratorioOptions
         }}
      >
         {children}
      </FormSolicitacaoContext.Provider>
   );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useFormSolicitacao = () => useContext(FormSolicitacaoContext);
