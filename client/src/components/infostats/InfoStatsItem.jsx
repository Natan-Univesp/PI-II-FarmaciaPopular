import styles from "./InfoStats.module.css";

export function InfoStatsItem({ titulo, valor }) {
   return (
      <div className={styles.infoCard}>
         <h4>{titulo}</h4>
         <p>{valor}</p>
      </div>
   );
}
