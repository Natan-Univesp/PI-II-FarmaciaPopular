import { useFormSolicitacao } from "../../../../context/FormSolicitacaoContext";
import { InputDefault } from "../../../Inputs/InputDefault/InputDefault";
import SelectSearchable from "../../../SelectSearchable/SelectSearchable";
import styles from "./MedicamentoBox.module.css";

export function MedicamentoBoxItem({ index = 0, options }) {
   const { register, control, errors } = useFormSolicitacao();

   const registerQtd = register(`lote_medicamentos.${index}.quantidade_solicitada`, {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a zero",
      },
   });

   const controlMedicamento = `lote_medicamentos.${index}.fk_id_medicamento`;
   const errorQtd = errors?.['lote_medicamentos']?.[index]?.quantidade_solicitada;
   const errorMedicamento = errors?.['lote_medicamentos']?.[index]?.fk_id_medicamento;

   return(
      <div className={`${styles.boxForm__content} fadeLeft`}>
         <SelectSearchable
            controlName={controlMedicamento}
            control={control}
            dataOptions={options}
            textView={"Medicamento*"}
            placeholder={"Buscar..."}
            error={errorMedicamento}
         />
         <InputDefault
            type="number"
            id="medicaQtd"
            textView="Quantidade*"
            placeholder="Informe a quantidade..."
            register={registerQtd}
            error={errorQtd}
         />
      </div>
   );
}
