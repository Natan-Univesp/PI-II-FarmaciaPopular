import { Navigate } from "react-router";
import { useUser } from "../../context/UserContext";

export function ValidateSolicitanteMedicamentos({children}) {
   const {user} = useUser();

   if(user?.nivel_acesso === 3) {
      return <Navigate to={"/"}/>
   }
   return children;
}