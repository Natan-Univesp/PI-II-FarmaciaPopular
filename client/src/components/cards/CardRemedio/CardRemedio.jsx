import { Link } from "react-router";
import styles from "./CardRemedio.module.css";
import { FaEdit as IconEdit, FaTrashAlt as IconDel} from "react-icons/fa";
import { useMedicamento } from "../../../context/MedicamentoContext";
import { useModal } from "../../../context/ModalContext";
import { useAlert } from "../../../context/AlertContext";

export function CardRemedio({ medicamentoData }) {
   const { updateMedicamento, changeStatusMedicamento } = useMedicamento();
   const { 
      showSuccessAlert, 
      showConfirmAlert,
      showErrorAlert 
   } = useAlert();
   const { showModal } = useModal();
   const serverImage = import.meta.env.VITE_SERVER_UPLOADS;

   const handleOpenEditModal = () => {
      showModal({
         modalName: "editMedicamento",
         customStyle: {
            height: "100%",
            width: "600px"
         },
         data: {
            id: medicamentoData.id,
            updateMedicamento
         }
      })
   }

   const moveToTrashMedicamento = async (id) => {
      try {
         const newStatus = "INATIVO";

         if(await changeStatusMedicamento(id, newStatus)) {
            showSuccessAlert({
               title: "Medicamento Movido para a lixeira",
               message: "O medicamento não será mais exibido, porém a ação pode ser revertida acessando o card VISUALIZAR LIXEIRA"
            })
         }
      } catch (error) {
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao mover o Medicamento para a lixeira",
               message: errMessage
            })
         }
         console.log(error);
      }
   }

   const handleConfirmDelete = async (id) => {
      await showConfirmAlert({
         title: "Mover para a Lixeira",
         message: "Você tem certeza que deseja mover o Medicamento para a Lixeira? Esse medicamento não aparecerá mais, porém poderá ser restaurado posteriormente",
         handleConfirm: async () => await moveToTrashMedicamento(id)
      })
   }

   return (
      <div className={styles.card} id={medicamentoData.id}>
         <div className={styles.cardContent__btnAdminCollection}>
            <button className={styles.btnAdminContent__btnEdit} onClick={handleOpenEditModal}><IconEdit/></button>
            <button className={styles.btnAdminContent__btnDel} onClick={async () => await handleConfirmDelete(medicamentoData.id)}><IconDel/></button>
         </div>

         <div className={styles.cardContent__imgContainer}>
            <img
               src={`${serverImage}/${medicamentoData.img}`}
               alt={medicamentoData.nome}
               className={styles.imagemRemedio}
            />
         </div>

         <h3 className={styles.nome}>{medicamentoData.nome}</h3>

         <div className={styles.remessasContainer}>
            <p className={styles.remessasContent__textTitle}>Lotes Disponíveis</p>
            <p className={styles.remessasContent__textValue}>{20}</p>
         </div>

         <div className={styles.cardContent__botaoCollection}>
            <button className={styles.botaoDetalhes} onClick={() => null}>
               Detalhes
            </button>
            <Link className={styles.botaoVisualizar} to={`${medicamentoData.id}`}>
               Visualizar Lotes
            </Link>
         </div>
      </div>
   );
}
