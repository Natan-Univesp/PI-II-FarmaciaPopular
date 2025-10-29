import styles from "./CardAction.module.css";

export function CardActionItem({ title = "Titulo", text = "Texto", textButton = "", handleOpenModal}) {
   return (
      <div className={styles.card} onClick={handleOpenModal}>
         <div className={styles.cardContent__textContainer}>
            <div className={styles.cardContent__textTitle}>
               <h4>{title}</h4>
            </div>
            <div className={styles.cardContent__textInfo}>
               <p>{text}</p>
            </div>
         </div>

         <button className={styles.cardContent__btnAction}>{textButton}</button>
      </div>
   );
}
