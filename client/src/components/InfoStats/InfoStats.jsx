import styles from "./InfoStats.module.css";
import { InfoStatsItem } from "./InfoStatsItem";

export function InfoStats({ infoStatsCollection = []}) {
   return (
      <div className={styles.statsSection}>
         {infoStatsCollection.map((item, index) => (
            <InfoStatsItem key={index} titulo={item.titulo} valor={item.valor} />
         ))}
      </div>
   );
}
