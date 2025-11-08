import styles from "./CardAction.module.css";
import { CardActionItem } from "./CardActionItem";

export function CardAction({ cardActionCollection = [] }) {
  console.log("teste");
  return (
    <div className={`${styles.cardCollection} fadeIn`}>
      {cardActionCollection.map(card => (
        <CardActionItem 
          key={card.id}
          title={card.title}
          text={card.text}
          textButton={card.textButton}
          handleOpenModal={card.handleOpenModal}
        />
      ))}
    </div>
  );
}
