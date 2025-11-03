import { useFieldArray, useForm } from "react-hook-form"
import { InputDefault } from "../../Inputs/InputDefault/InputDefault"
import { MedicamentoBox } from "./MedicamentoBox/MedicamentoBox";
import { getAllMedicamentosForSelectService } from "../../../services/medicamentos.service";
import { useState } from "react";
import { useEffect } from "react";

export function FormClienteConvenio({clienteConvenioData, handleClienteSubmit}) {
   const [medicamentoOptions, setMedicamentoOptions] = useState();

   const {
      control,
      register,
      watch,
      setValue,
      handleSubmit,
      formState: { errors, isDirty, dirtyFields }
   } = useForm({
      defaultValues: clienteConvenioData || {
         nome_cliente: "",
         telefone: "",
         medicamentos: [{ fk_id_medicamento: null }]
      }
   })

   const {
      fields,
      append,
      remove
   } = useFieldArray({
      control,
      name: "medicamentos"
   })

   const registerCliente = register("nome_cliente", {
      required: "Campo Obrigatório!"
   });
   
   const registerTelefone = register("telefone", {
      required: "Campo Obrigatório!"
   })

   const defineMedicamentoOptions = async () => {
      try {
         const res = await getAllMedicamentosForSelectService();
         setMedicamentoOptions(res.data);
         
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      defineMedicamentoOptions();
   }, [])

   return(
      <form 
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(handleClienteSubmit)}
      >
         <InputDefault
            type="text"
            id="nomeCliente"
            placeholder="Informe o Cliente..."
            textView="Cliente*"
            register={registerCliente}
            error={errors?.nome_cliente}
         />
         <InputDefault
            type="text"
            id="telefone"
            placeholder="Informe o Telefone..."
            textView="Telefone*"
            register={registerTelefone}
            error={errors?.telefone}
         />
         <MedicamentoBox
            fields={fields}
            append={append}
            remove={remove}
            medicamentoOptions={medicamentoOptions}
            control={control}
            errors={errors}
         />

         <button className={`buttonForm-style1 ${
            clienteConvenioData && !isDirty ? "buttonForm-style1__inactive" : ""
         }`}>
            {clienteConvenioData ? "Confirmar Alterações" : "Cadastrar Cliente"}
         </button>
      </form>
   )
}