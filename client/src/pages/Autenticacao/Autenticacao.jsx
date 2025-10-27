import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router";
import {
   getTotalRegisteredUsersService,
   loginService,
   registerFirstUserService,
} from "../../services/user.service";
import Cookies from "js-cookie";
import localforage from "localforage";
import { Auth } from "../../components/Autenticacao/Auth/Auth";
import styles from "./Autenticacao.module.css";
import { ValidateAuth } from "../../components/RoutesValidate/ValidateAuth";

export function Autenticacao() {
   const [isFirstRegister, setIsFirstRegister] = useState(true);
   const { setUser } = useUser();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const navigate = useNavigate();

   const getTotalUsersRegistered = async () => {
      try {
         const res = await getTotalRegisteredUsersService();
         const { total_users } = res.data;
         if (total_users > 0) {
            setIsFirstRegister(false);
         } else {
            setIsFirstRegister(true);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleLogin = async ({ usuario, senha }) => {
      try {
         const res = await loginService({ usuario, senha });
         const { usuario: usuarioLogged, nivel_acesso } = res.data;

         Cookies.set("token", res.data.token, { expires: 1 });
         await localforage.setItem("user", { usuario: usuarioLogged, nivel_acesso });
         setUser({ usuario: usuarioLogged, nivel_acesso });

         navigate("/");
      } catch (error) {
         if (error?.response?.data) {
            const errInfo = error.response.data;
            showErrorAlert({
               title: errInfo.errMessage,
            });
         } else {
            console.log(error);
         }
      }
   };

   useEffect(() => {
      getTotalUsersRegistered();
   }, []);

   const handleFirstRegister = async ({ usuario, senha }) => {
      try {
         if (!usuario || !senha) {
            return showErrorAlert({
               title: "Erro ao cadastrar Usuário",
               message: "Um ou mais campos não foram preenchidos.",
            });
         }

         const res = await registerFirstUserService({ usuario, senha, nivel_acesso: 1 });
         if (res.status === 201) {
            showSuccessAlert({
               title: "Cadastro Concluído",
               message:
                  "Usuário Administrador cadastrado com sucesso! Efetue o login para continuar.",
            });
         }
         setIsFirstRegister(false);
      } catch (error) {
         if (error?.response?.data) {
            const errInfo = error.response.data;
            showErrorAlert({
               title: errInfo.errMessage,
            });
         } else {
            console.log(error);
         }
      }
   };

   useEffect(() => {}, []);

   return (
      <ValidateAuth>
         <section className={styles.autenticacaoContainer}>
            <Auth
               isFirstRegister={isFirstRegister}
               handleSubmitAuth={isFirstRegister ? handleFirstRegister : handleLogin}
            />
         </section>
      </ValidateAuth>
   );
}
