import { MedicamentoBoxItem } from "./MedicamentoBoxItem";
//icones
import {AiOutlinePlus as IconAdd} from 'react-icons/ai';
import {AiOutlineMinus as IconRemove} from 'react-icons/ai';
import styles from "./MedicamentoBox.module.css";

export function MedicamentoBox({ fields, append, remove, medicamentoOptions = [] }) {
   /*
    =========================================================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Funções referentes ao BoxSupply (adiciona e remove Box de Suprimentos)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    =========================================================================
    */
   const addBoxList = () => {
      if (fields.length < 6) {
         append({ fk_id_medicamento: null, quantidade_solicitada: null });
      }
   };

   const delBoxList = () => {
      if (fields.length > 1) {
         remove(fields.length - 1);
      }
   };

   return (
      medicamentoOptions && (
         <>
            <div className={styles.boxForm__container}>
               {fields.map((item, index) => {
                  return(
                     <MedicamentoBoxItem 
                        key={item.id}
                        index={index}
                        options={medicamentoOptions}
                     />
                  )
               })}
            </div>
            <div className={styles.btnContainer}>
                {fields.length > 1 && 
                    <button type='button' onClick={delBoxList} className="fadeIn">
                        <IconRemove/>
                    </button>
                }
                {fields.length < 6 && 
                    <button type='button' onClick={addBoxList} className="fadeIn">
                        <IconAdd/>
                    </button>
                }
            </div>
         </>
      )
   );
}
