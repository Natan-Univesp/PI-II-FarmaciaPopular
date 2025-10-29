import { MainLayout } from "../../components/Layout/MainLayout";
import { CardAction } from "../../components/cards/CardAction/CardAction";
import  CardRemedio  from "../../components/cards/CardRemedio/CardRemedio";
import { InfoStats } from "../../components/infostats/InfoStats";
import styles from "./Medicamento.module.css";

export function Medicamento() {
  // Apenas 3 medicamentos como solicitado
  const medicamentos = [
    { id: 1, nome: "Paracetamol 500mg", remessasDisponiveis: 5 },
    { id: 2, nome: "Ibuprofeno 400mg", remessasDisponiveis: 3 },
    { id: 3, nome: "Amoxicilina 500mg", remessasDisponiveis: 8 },
  ];

  // Apenas 3 estatísticas como solicitado - TODOS COM O MESMO TEXTO
  const infoStatsData = [
    { titulo: "TOTAL DE MEDICAMENTOS DISPONÍVEIS", valor: "45" },
    { titulo: "TOTAL DE MEDICAMENTOS DISPONÍVEIS", valor: "23" },
    { titulo: "TOTAL DE MEDICAMENTOS DISPONÍVEIS", valor: "5" }
  ];

  const handleVisualizarClick = (medicamentoId) => {
    console.log("Visualizar medicamento:", medicamentoId);
    // Sua lógica de navegação ou modal aqui
  };

  const handleCadastroClick = () => {
    console.log("Abrir cadastro de remessas");
    // Sua lógica de cadastro aqui
  };

  return (
    <MainLayout 
      title="MEDICAMENTOS" 
      infoStatsCollection={infoStatsData}
      customStyle={styles.container}
    >
      {/* Seção de Estatísticas - 3 InfoStats */}
      <div className={styles.statsSection}>
        {infoStatsData.map((stat, index) => (
          <InfoStats 
            key={index}
            titulo={stat.titulo} 
            valor={stat.valor} 
          />
        ))}
      </div>

      {/* Cards de Ação - 1 CardAction */}
      <div className={styles.actionsSection}>
        <CardAction 
          title="Cadastrar Remessa"
          onClick={handleCadastroClick}
        />
      </div>

      {/* Grid de Medicamentos - 3 CardRemedio */}
      <div className={styles.medicamentosSection}>
        <h2 className={styles.sectionTitle}>ESTOQUE DE MEDICAMENTOS</h2>
        <div className={styles.medicamentosGrid}>
          {medicamentos.map(med => (
            <CardRemedio
              key={med.id}
              nome={med.nome}
              remessasDisponiveis={med.remessasDisponiveis}
              onVisualizarClick={() => handleVisualizarClick(med.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}