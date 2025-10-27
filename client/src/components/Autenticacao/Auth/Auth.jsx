import { useState } from "react";
import { useForm } from "react-hook-form";
import { PassEye } from "../PassEye/PassEye";
import styles from "./Auth.module.css";

export function Auth({ isFirstRegister = false, handleSubmitAuth }) {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

   const { 
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({defaultValues: { usuario: "", senha: "" }});

   const inputUsuario = register("usuario", { required: "Campo obrigatório." });
   const inputSenha = register("senha", { required: "Campo obrigatório." });

   const showOrHidePassword = () => {
      setIsPasswordVisible((prevValue) => !prevValue);
   };

   const handleSubmitAndReset = (data) => {
      handleSubmitAuth(data);
      reset();
   }

   return (
      <div className={styles.container}>
         <form id={styles.loginForm} onSubmit={handleSubmit(handleSubmitAndReset)}>
            <h1>{isFirstRegister ? " PRIMEIRO CADASTRO" : "LOGIN"}</h1>
            {
               isFirstRegister && (
                  <p className={styles.exceptionMessageAuth}>
                     <span>ATENÇÃO: </span>
                     Para o primeiro acesso, será necessário o cadastro de uma conta de <strong>Administrador</strong>
                  </p>
               )
            }

            <div className={`${styles.inputBox} ${errors?.usuario ? styles.inputError : ""}`} id="userBox">
               <input type="text" placeholder="Usuário" {...inputUsuario}/>
               {errors?.usuario && <span className={styles.errorMessage}>{errors?.usuario?.message}</span>}
            </div>

            <div className={`${styles.inputBox} ${errors?.senha ? styles.inputError : ""}`} id="passBox">
               <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Senha"
                  {...inputSenha}
               />
               <PassEye isPasswordVisible={isPasswordVisible} handleOnClick={showOrHidePassword} />
               {errors?.senha && <span className={styles.errorMessage}>{errors?.senha?.message}</span>}
            </div>

            <button type="submit" className={styles.login}>
               {isFirstRegister ? "CADASTRAR" : "ENTRAR"}
            </button>
         </form>
      </div>
   );
}
