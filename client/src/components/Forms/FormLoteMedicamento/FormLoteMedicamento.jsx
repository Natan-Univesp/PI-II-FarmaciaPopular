import { useForm } from "react-hook-form"
import { InputDefault } from "../../Inputs/InputDefault/InputDefault"
import { useHookFormMask } from "use-mask-input";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";

export function FormLoteMedicamento({dataLoteMedicamento, handleLoteMedicamentoSubmit}) {
   const {
      register,
      handleSubmit,
      formState: {
         errors,
         isDirty,
         dirtyFields
      }
   } = useForm({
      defaultValues: dataLoteMedicamento || {
         id: "",
         nome_medicamento: "",
         nome_laboratorio: "",
         quantidade: null,
         data_validade: ""
      }
   })

   const registerQtd = register("quantidade", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: "Apenas valores positivos são permitidos"
   });
   const registerDataWithMask = useHookFormMask(register);

   const filterAndSubmit = (data) => {
      const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, data);
      handleLoteMedicamentoSubmit(fieldsModifiedOnly);
   }

   return(
      <form action="" className="layoutFormContentSpacing" onSubmit={handleSubmit(filterAndSubmit)}>
         <InputDefault
            type="text"
            id="id"
            placeholder="Nª Lote"
            textView="Nº do Lote"
            disabled={true}
            register={{...register("id")}}
            error={errors?.id}
         />
         <InputDefault
            type="text"
            id="nomeMedicamento"
            placeholder="Nome do Medicamento"
            textView="Nome do Medicamento"
            disabled={true}
            register={{...register("nome_medicamento")}}
            error={errors?.nome_medicamento}
         />
         <InputDefault
            type="text"
            id="nomeLaboratorio"
            placeholder="Nome do Laboratório"
            textView="Nome do Laboratório"
            disabled={true}
            register={{...register("nome_laboratorio")}}
            error={errors?.nome_laboratorio}
         />
         <InputDefault
            type="number"
            id="qtd"
            placeholder="Quantidade"
            textView="Quantidade do lote"
            register={registerQtd}
            error={errors?.quantidade}
         />
         <InputDefault
            type="text"
            id="dataValidade"
            placeholder="Data de Validade"
            textView="Data de Validade"
            register={{...registerDataWithMask("data_validade", ["99-99-9999"], {
               required: "Campo Obrigatório"
            })}}
            error={errors?.data_validade}
         />
         <button
            className={`buttonForm-style1 ${
               dataLoteMedicamento && !isDirty ? "buttonForm-style1__inactive" : ""
            }`}
         >
            Confirmar Alterações
         </button>
      </form>
   )
}