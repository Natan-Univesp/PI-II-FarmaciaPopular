import styles from "./CardRemedio.module.css";

export function CardRemedio({ 
  nome, 
  remessasDisponiveis = 0, 
  onVisualizarClick 
}) {
  return (
    <div className={styles.card}>
      <h3 className={styles.nome}>{nome}</h3>
      
      <div className={styles.remessasContainer}>
        <span className={styles.remessasLabel}>Remessas disponíveis</span>
        <span className={styles.remessasValor}>{remessasDisponiveis}</span>
      </div>

      <button 
        className={styles.botaoVisualizar}
        onClick={onVisualizarClick}
      >
        Visualizar →
      </button>
    </div>
  );
}
