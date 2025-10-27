import { useForm } from "react-hook-form";
import { InputDefault } from "../../Inputs/InputDefault/InputDefault";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import { useAlert } from "../../../context/AlertContext";
import { useModal } from "../../../context/ModalContext";
import { registerNewUser } from "../../../services/admin.service";

export function ModalAddUser() {
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { getAllUsers } = showDataInfo();
   const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm({ defaultValues: { usuario: "", senha: "", nivel_acesso: null } });

   const registerUsuario = register("usuario", {
      required: "Campo Obrigatório!",
   });

   const registerSenha = register("senha", {
      required: "Campo Obrigatório!",
   });

   const selectOptions = [
      {
         label: "Administrador",
         value: 1,
      },
      {
         label: "Controlador de estoque",
         value: 2,
      },
      {
         label: "Solicitante de Medicamentos",
         value: 3,
      },
   ];

   const handleRegisterUser = async ({ usuario, senha, nivel_acesso }) => {
      if (!usuario || !senha || !nivel_acesso) {
         return showErrorAlert({
            title: "Erro ao cadastrar Usuário",
            message: "Um ou mais campos não foram devidamente preenchidos",
         });
      }
      try {
         const res = await registerNewUser({ usuario, senha, nivel_acesso });
         if (res.status === 201) {
            showSuccessAlert({
               title: "Cadastro Concluído",
               message: "O usuário foi cadastrado com Sucesso.",
            });
            reset();
            closeModal();
            await getAllUsers();
         }
         
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
               title: "Erro ao Cadastrar Novo Usuário",
               message: errMessage,
            });
         }
      }
   };

   const handleConfirmRegister = (data) => {
      showConfirmAlert({
         title: "Criação de Usuário",
         message: "Você está prestes a criar um novo Usuário. Está certo disso?",
         handleConfirm: () => handleRegisterUser(data),
      });
   };

   return (
      <form action="" className="layoutFormContentSpacing" onSubmit={handleSubmit(handleConfirmRegister)}>
         <InputDefault
            type="text"
            id="newUserName"
            placeholder="Nome do usuário..."
            textView="Usuário*"
            register={registerUsuario}
            error={errors?.usuario}
         />
         <InputDefault
            type="text"
            id="newUserName"
            placeholder="Senha do usuário"
            textView="Senha*"
            register={registerSenha}
            error={errors?.senha}
         />
         <SelectSearchable
            controlName="nivel_acesso"
            control={control}
            dataOptions={selectOptions}
            textView={"Nivel de Acesso"}
            placeholder={"Selecione o nível de acesso"}
            error={errors?.nivel_acesso}
         />
         <button className="buttonForm-style1">Cadastrar</button>
      </form>
   );
}
