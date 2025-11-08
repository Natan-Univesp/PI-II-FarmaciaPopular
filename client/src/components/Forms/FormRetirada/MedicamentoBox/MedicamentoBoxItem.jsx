import { useFormRetirada } from "../../../../context/FormRetiradaContext";
import { InputDefault } from "../../../Inputs/InputDefault/InputDefault";
import SelectSearchable from "../../../SelectSearchable/SelectSearchable";
import styles from "./MedicamentoBox.module.css";

export function MedicamentoBoxItem({ index = 0, options }) {
   const { register, control, errors } = useFormRetirada();

   const registerQtd = register(`medicamentos_retirados.${index}.quantidade_solicitada`, {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: {
         value: 0,
         message: "Insira um valor maior ou igual a zero",
      },
   });

   const controlMedicamento = `medicamentos_retirados.${index}.fk_id_medicamento`;
   const errorQtd = errors?.['medicamentos_retirados']?.[index]?.quantidade_solicitada;
   const errorMedicamento = errors?.['medicamentos_retirados']?.[index]?.fk_id_medicamento;

   return(
      <div className={`${styles.boxForm__content} fadeLeft`} style={{width: `calc(19rem * var(--font-size-scale, 1))`}}>
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
