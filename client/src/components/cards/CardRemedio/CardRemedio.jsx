import styles from './CardRemedio.module.css';
import imgRemedio from '../../../assets/img/img-remedio.png';

function CardRemedio({ nome, remessasDisponiveis, imagemUrl, onVisualizarClick }) {
  return (
    <div className={styles.card}>
      <img 
        src={imagemUrl || imgRemedio} 
        alt={nome}
        className={styles.imagemRemedio}
      />
      
      <h3 className={styles.nome}>{nome}</h3>
      
      <div className={styles.remessasContainer}>
        <span className={styles.remessasLabel}>Remessas</span>
        <span className={styles.remessasValor}>{remessasDisponiveis ?? 0}</span>
      </div>
      
      <button className={styles.botaoVisualizar} onClick={onVisualizarClick}>
        Visualizar
      </button>
    </div>
  );
}

export default CardRemedio;


