import { useAdmin } from "../../../context/AdminContext";
import { Loading } from "../../Loading/Loading";
import { TableAdminUser } from "../../Tables/TableAdminUser/TableAdminUser";

export function AdministradorMain() {
   const { allUsers: users, isLoading, getAllUsers } = useAdmin();

   return (
      <>
         <h2 className="subTitle">Todos os usuários</h2>
         {isLoading ? <Loading /> : users && <TableAdminUser userCollection={users} />}
      </>
   );
}
