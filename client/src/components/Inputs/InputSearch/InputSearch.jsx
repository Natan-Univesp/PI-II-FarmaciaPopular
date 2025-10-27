import styles from "./InputSearch.module.css";
import { FaSearch as IconSearch } from "react-icons/fa";

export function InputSearch() {
   return (
      <div className={styles.filterbarContainer}>
         <div className={styles.searchInputWrapper}>
            <IconSearch className={styles.searchIcon} />
            <input
               type="text"
               name="inputSearch"
               id="inputSearch"
               className={styles.searchInput}
               placeholder="Pesquisar..."
            />
         </div>

         <button className={styles.filterButton}>Filtrar e Organizar</button>
      </div>
   );
}
