import { FaEye as IconEyeVisible, FaEyeSlash as IconEyeNotVisible } from "react-icons/fa";
import styles from "./PassEye.module.css";
export function PassEye({ isPasswordVisible = false, handleOnClick }) {
   return (
      <div onClick={handleOnClick}>
         {isPasswordVisible ? (
            <IconEyeNotVisible className={styles.iconEye} />
         ) : (
            <IconEyeVisible className={styles.iconEye} />
         )}
      </div>
   );
}
