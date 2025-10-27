

import styles from "./CardShortCut.module.css";
import { CardShortCutItem } from "./CardShortCutItem";

export function CardShortCut({ shortCutCollection = []}) {
   return(
      <div className={styles.cardShortCutCollection}>
         {shortCutCollection.map((item) => (
            <CardShortCutItem 
               key={item.id}
               title={item.title}
               path={item.path}
            />
         ))}
      </div>
   )
}