import { Navigate } from "react-router";
import { useUser } from "../../context/UserContext";

export function ValidateAdmin({children}) {
   const {user} = useUser();

   if(user?.nivel_acesso > 1) {
      return <Navigate to={"/"}/>
   }

   return children;
}