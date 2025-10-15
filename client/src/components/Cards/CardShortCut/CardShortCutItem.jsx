import { NavLink } from "react-router";
import { FaPlus as IconAdd} from "react-icons/fa";
import styles from "./CardShortCut.module.css";

export function CardShortCutItem() {
   return(
      <article className={styles.cardShortCutContainer}>
         <div className={styles.cardShortCut__icon}>
            <IconAdd/>
         </div>
         <hr />
         <NavLink to={"/home"} className={styles.cardShortCut__quickLink} end>
            Cadastrar Produto
         </NavLink>
      </article>
   )
}