import { FaUniversalAccess, FaAngleDown } from 'react-icons/fa'; 
import { AcessibilityFontControl } from './FonteSizeControl';
import styles from './AcessibilityButton.module.css'; 

export function AcessibilityButton() {
  return (
    <div className={styles.mainContainer}>

      <div className={styles.icons}>
        <FaUniversalAccess />
      </div>

      <div className={styles.opencontent}>
        <AcessibilityFontControl />
      </div>

    </div>
  );
}