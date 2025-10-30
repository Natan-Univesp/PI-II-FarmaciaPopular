import { useAdmin } from "../../../context/AdminContext";
import { useModal } from "../../../context/ModalContext";
import { CardAction } from "../../Cards/CardAction/CardAction";
import { Loading } from "../../Loading/Loading";
import { TableAdminUser } from "../../Tables/TableAdminUser/TableAdminUser";

export function AdministradorMain() {
   const { allUsers: users, isLoading, getAllUsers } = useAdmin();
   const { showModal } = useModal();

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Usuário",
         text: "Cadastra um Novo Usuário",
         textButton: "Cadastrar Usuário",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewUser",
               customStyle: {
                  overflow: "initial"
               },
               data: {
                  getAllUsers
               }
            }),
      },
   ];

   return (
      <>
         <h2 className="subTitle">Ações</h2>
         <CardAction cardActionCollection={cardActionCollection}/>

         <h2 className="subTitle">Todos os usuários</h2>
         {isLoading ? <Loading /> : users && <TableAdminUser userCollection={users} />}
      </>
   );
}
