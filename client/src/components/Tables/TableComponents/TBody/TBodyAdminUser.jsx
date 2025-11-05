import { useAdmin } from "../../../../context/AdminContext";
import { useAlert } from "../../../../context/AlertContext";
import { useInfoStats } from "../../../../context/InfoStatsContext";
import { changeStatusUserService } from "../../../../services/admin.service";

export function TBodyAdminUser({ userData }) {
   const {
      showConfirmAlert,
      showSuccessAlert,
      showErrorAlert
   } = useAlert();
   const { getAllUsers } = useAdmin();
   const { getAllAdminPageStats } = useInfoStats();

   const nivelAcessoData = {
      1: "ADMINISTRADOR",
      2: "CONTROLADOR DE ESTOQUE",
      3: "SOLICITANTE DE MEDICAMENTOS"
   }

   const handleChangeUserStatus = async () => {
      try {
         const newStatus = userData.status === "ATIVO" ? "INATIVO" : "ATIVO";
         const res = await changeStatusUserService(userData.id, newStatus);
         if (res?.data?.status === "success") {
            showSuccessAlert({
               title: "Alteração Concluída",
               message: "Status de usuário alterado com sucesso!",
            });
            await getAllUsers();
            await getAllAdminPageStats();
         }
         
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
               title: "Erro ao Alterar Status de Usuário",
               message: errMessage,
            });
         }
      }
   };
   
   const handleConfirmChangeStatus = async () => {
      showConfirmAlert({
         title: "Alteração de Status",
         message:
            "Você tem certeza que deseja Desativar o usuário? (Esta ação poderá ser desfeita)",
         handleConfirm: handleChangeUserStatus,
      });
   };

   return (
      <tr id={userData.id}>
         <td>
            <p>{userData.id}</p>
         </td>
         <td>
            <p>{userData.usuario}</p>
         </td>
         <td>
            <p>{nivelAcessoData[userData.nivel_acesso]}</p>
         </td>
         <td className={"celulaStatus"}>
            <input type="checkbox" 
                   name={`userStatus${userData.id}`}
                   id={`userStatus${userData.id}`} 
                   className={"statusToggle"}
                   checked={userData?.status === "ATIVO"}
                   onChange={handleConfirmChangeStatus}/>
            <label htmlFor={`userStatus${userData.id}`} 
                   className={"toggleSwitch"}></label>
         </td>
         <td>
            <p>{userData.data_criacao}</p>
         </td>
         <td>
            <p>{userData.data_alteracao}</p>
         </td>
      </tr>
   );
}
