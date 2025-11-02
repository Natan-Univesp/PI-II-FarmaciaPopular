import { InputDefault } from "../../Inputs/InputDefault/InputDefault";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import { MedicamentoBox } from "./MedicamentoBox/MedicamentoBox";
import { useFormSolicitacao } from "../../../context/FormSolicitacaoContext";
import { useEffect } from "react";
import { useState } from "react";
import { getAllMedicamentosForSelectByIdMedicamentoService } from "../../../services/medicamentos.service";

export function FormSolicitacao({ handleSolicitacaoSubmit }) {
   const [medicamentosOptions, setMedicamentosOptions] = useState([]);
   const { 
      register, 
      errors, 
      watch,
      control,
      fields,
      append,
      remove,
      handleSubmit,
      laboratorioOptions
   } = useFormSolicitacao();

   const watchLab = watch("fk_id_laboratorio");

   const registerFornecedor = register("fornecedor", {
      required: "Campo Obrigatório",
   });

   const defineMedicamentoOptions = async (idLab) => {
      try {
         const res = await getAllMedicamentosForSelectByIdMedicamentoService(idLab);
         setMedicamentosOptions(res.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if(watchLab) {
         defineMedicamentoOptions(watchLab);
      }
   }, [watchLab]);

   return (
      <form 
         action="" 
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(handleSolicitacaoSubmit)}
      >
         <InputDefault
            type="text"
            id="fornecedor"
            placeholder="informe o fornecedor..."
            textView="Fornecedor*"
            register={registerFornecedor}
            error={errors?.fornecedor}
         />
         <SelectSearchable
            controlName="fk_id_laboratorio"
            control={control}
            dataOptions={laboratorioOptions}
            textView={"Laboratório"}
            placeholder={"Selecione o Laboratório..."}
            error={errors?.fk_id_laboratorio}
         />
         <MedicamentoBox 
            fields={fields} 
            append={append} 
            remove={remove} 
            medicamentoOptions={medicamentosOptions}
         />


         <button className="buttonForm-style1">
            Cadastrar Solicitação
         </button>
      </form>
   );
}
