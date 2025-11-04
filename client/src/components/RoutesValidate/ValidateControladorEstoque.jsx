import { Navigate } from "react-router";
import { useUser } from "../../context/UserContext";

export function ValidateControladorEstoque({children}) {
   const { user } = useUser();

   if(user?.nivel_acesso === 2) {
      return <Navigate to={"/"}/>
   }
   return children
}