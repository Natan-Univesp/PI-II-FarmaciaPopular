import { Link } from "react-router";
import styles from "./CardRemedio.module.css";
import { FaEdit as IconEdit, FaTrashAlt as IconDel} from "react-icons/fa";

export function CardRemedio({ medicamentoData }) {
   const serverImage = import.meta.env.VITE_SERVER_UPLOADS;

   return (
      <div className={styles.card} id={medicamentoData.id}>
         <div className={styles.cardContent__btnAdminCollection}>
            <button className={styles.btnAdminContent__btnEdit}><IconEdit/></button>
            <button className={styles.btnAdminContent__btnDel}><IconDel/></button>
         </div>

         <div className={styles.cardContent__imgContainer}>
            <img
               src={`${serverImage}/${medicamentoData.img}`}
               alt={medicamentoData.nome}
               className={styles.imagemRemedio}
            />
         </div>

         <h3 className={styles.nome}>{medicamentoData.nome}</h3>

         <div className={styles.remessasContainer}>
            <p className={styles.remessasContent__textTitle}>Lotes Disponíveis</p>
            <p className={styles.remessasContent__textValue}>{20}</p>
         </div>

         <div className={styles.cardContent__botaoCollection}>
            <button className={styles.botaoDetalhes} onClick={() => null}>
               Detalhes
            </button>
            <Link className={styles.botaoVisualizar} to={`${medicamentoData.id}`}>
               Visualizar Lotes
            </Link>
         </div>
      </div>
   );
}
