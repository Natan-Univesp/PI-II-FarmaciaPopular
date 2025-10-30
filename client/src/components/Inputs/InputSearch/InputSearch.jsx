import styles from "./InputSearch.module.css";
import { FaSearch as IconSearch } from "react-icons/fa";

export function InputSearch({
   type = "text",
   name = "inputSearch",
   id = "inputSearch",
   placeholder = "Pesquisar...",
   hasFilterButton = true,
   value = "",
   handleOpenFilter,
   handleOnChange
}) {
   return (
      <div className={`${styles.filterbarContainer} ${!hasFilterButton ? styles.notHasFilterBtn : ""}`}>
         <div className={styles.searchInputWrapper}>
            <IconSearch className={styles.searchIcon} />
            <input
               type={type}
               name={name}
               id={id}
               className={styles.searchInput}
               value={value}
               placeholder={placeholder}
               onChange={handleOnChange}
            />
         </div>
         {hasFilterButton && (
            <button className={styles.filterButton} onClick={handleOpenFilter}>
               Filtrar e Organizar
            </button>
         )}
      </div>
   );
}
