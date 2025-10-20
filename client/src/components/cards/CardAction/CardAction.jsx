import styles from "./CardAction.module.css";

// Componente de ícone de exemplo
export const ExampleIconText = () => (
  <span className={styles.exampleIconText}>CADASTRO DE REMESSAS</span>
);

export function CardAction({ icon, title, onClick }) {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.iconContainer}>
        {icon || <ExampleIconText />}
      </div>
      <div className={styles.footer}>
        {title}
      </div>
    </button>
  );
}
