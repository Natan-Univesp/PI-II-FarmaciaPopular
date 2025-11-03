import SelectSearchable from "../../../SelectSearchable/SelectSearchable";
import styles from "./MedicamentoBox.module.css";

export function MedicamentoBoxItem({ index = 0, options, control, errors }) {

   const controlMedicamento = `medicamentos.${index}.fk_id_medicamento`;
   const errorMedicamento = errors?.['medicamentos']?.[index]?.fk_id_medicamento;

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
      </div>
   );
}
