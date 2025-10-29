import { useForm } from "react-hook-form";
import { InputDefault } from "../../Inputs/InputDefault/InputDefault";
import { useHookFormMask } from "use-mask-input";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";

export function FormLaboratorio({ dataLaboratorio, handleLaboratorioSubmit }) {
   const {
      register,
      handleSubmit,
      formState: { errors, isDirty, dirtyFields },
   } = useForm({
      defaultValues: dataLaboratorio || {
         nome_laboratorio: "",
         cnpj: "",
         endereco: "",
      },
   });

   const registerNomeLab = register("nome_laboratorio", {
      required: "Campo Obrigatório",
   });
   const registerCnpjWithMask = useHookFormMask(register);
   const registerEndereco = register("endereco", {
      required: "Campo Obrigatório",
   });

   const validateAndSubmit = (data) => {
      if(dataLaboratorio) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, data);
         handleLaboratorioSubmit(fieldsModifiedOnly)
      } else {
         handleLaboratorioSubmit(data);
      }
   }

   return (
      <form action="" className="layoutFormContentSpacing" onSubmit={handleSubmit(validateAndSubmit)}>
         <InputDefault
            type="text"
            id="nomeLaboratorio"
            placeholder="ex: Cinemed"
            textView="Nome do Laboratório*"
            register={registerNomeLab}
            error={errors?.nome_laboratorio}
         />
         <InputDefault
            type="text"
            id="cnpj"
            placeholder="ex: 00.000.000/0001-00"
            textView="Cnpj*"
            register={{
               ...registerCnpjWithMask("cnpj", ["99.999.999/0001-99"], {
                  required: "Campo Obrigatório",
               }),
            }}
            error={errors?.cnpj}
         />
         <InputDefault
            type="text"
            id="endereco"
            placeholder="ex: Rua Salvador, 25"
            textView="Endereço*"
            register={registerEndereco}
            error={errors?.endereco}
         />
         <button
            className={`buttonForm-style1 ${
               dataLaboratorio && !isDirty ? "buttonForm-style1__inactive" : ""
            }`}
         >
            {dataLaboratorio ? "Confirmar Alterações" : "Cadastrar Laboratório"}
         </button>
      </form>
   );
}
