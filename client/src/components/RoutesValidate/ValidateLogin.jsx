import { useEffect } from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import { useAlert } from "../../context/AlertContext";
import { getNecessaryInfoUserService, logoutService } from "../../services/user.service";

export function ValidateLogin({children}) {
   const token = Cookies.get("token");
   const { showErrorAlert } = useAlert();

   const getLoggedUser = async () => {
      try {
         const res = await getNecessaryInfoUserService();
         if(res.data) {
            const { status } = res.data;
            if(status.toUpperCase() !== "ATIVO") {
               showErrorAlert({
                  title: "Usuário INATIVO",
                  message: "O seu usuário não está mais ativo!"
               })
               await logoutService();
               return <Navigate to={"/auth"}/>
            }
         }
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if(token) {
         getLoggedUser();
      }
      
   }, [])

   if(!token) {
      return <Navigate to={"/auth"}/>
   }

   return children;
}