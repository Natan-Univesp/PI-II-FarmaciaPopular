

import styles from "./CardShortCut.module.css";
import { CardShortCutItem } from "./CardShortCutItem";

export function CardShortCut() {
   return(
      <div className={styles.cardShortCutCollection}>
         <CardShortCutItem/>
         <CardShortCutItem/>
         <CardShortCutItem/>
         <CardShortCutItem/>
      </div>
   )
}