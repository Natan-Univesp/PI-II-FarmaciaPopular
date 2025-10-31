import { useEffect, useState } from "react";
import { useModal } from "../../../../context/ModalContext"
import { getMedicamentoByIdService } from "../../../../services/medicamentos.service";
import { Loading } from "../../../Loading/Loading";
import { FormViewMedicamento } from "../../../Forms/FormViewMedicamento/FormViewMedicamento";
import styles from "./ModalViewMedicamento.module.css";

export function ModalViewMedicamento() {
   const { showDataInfo } = useModal();
   const { id } = showDataInfo();
   const [medicamento, setMedicamento] = useState();

   const serverImage = import.meta.env.VITE_SERVER_UPLOADS;

      const getMedicamento = async () => {
         try {
            const res = await getMedicamentoByIdService(id);
            const { 
               img,
               nome_laboratorio,
               nome,
               categoria,
               tipo_unidade,
               quantidade_minima,
               quantidade_total,
               indicacao_uso
            } = res.data;
            const imgPath = `${serverImage}/${img}`;
            setMedicamento({
               id,
               img: imgPath,
               nome_laboratorio,
               nome,
               categoria,
               tipo_unidade,
               quantidade_minima,
               quantidade_total,
               indicacao_uso
            })
         } catch (error) {
            console.log(error);
         }
      }

   useEffect(() => {
      getMedicamento();
   }, [])

   if(!medicamento) {
      return <Loading/>
   }

   return(
      <div className={styles.viewMedicamentoContainer}>
         <div className={styles.viewMedicamentoContent__coverImg}>
            <img src={medicamento.img} alt={`imagem do medicamento ${medicamento.nome}`} />
         </div>
         <FormViewMedicamento
            dataMedicamento={{
               id: medicamento.id,
               nome_laboratorio: medicamento.nome_laboratorio,
               nome: medicamento.nome,
               categoria: medicamento.categoria,
               tipo_unidade: medicamento.tipo_unidade,
               quantidade_minima: medicamento.quantidade_minima,
               quantidade_total: medicamento.quantidade_total,
               indicacao_uso: medicamento.indicacao_uso
            }}
         />
      </div>
   )
}