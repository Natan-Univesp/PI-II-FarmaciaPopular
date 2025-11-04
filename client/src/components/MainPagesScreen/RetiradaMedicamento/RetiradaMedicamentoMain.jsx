import { useModal } from "../../../context/ModalContext";
import { useRetirada } from "../../../context/RetiradaContext";
import { useUser } from "../../../context/UserContext";
import { CardAction } from "../../Cards/CardAction/CardAction";
import { InputSearch } from "../../Inputs/InputSearch/InputSearch";
import { Loading } from "../../Loading/Loading";
import { TableDefault } from "../../Tables/TableDefault/TableDefault";

export function RetiradaMedicamentoMain() {
   const { user } = useUser();

   const fieldsCollection = [
      "ID de Retirada",
      "Nome do Usuário",
      "Nome do Medicamento",
      "Quantidade Solicitada",
      "Data de Retirada",
   ];

   const { showModal } = useModal();
   const {
      filteredRetiradas: retiradas,
      searchValue,
      setSearchValue,
      createRetirada,
      isLoading,
   } = useRetirada();

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Retirada",
         text: "Cadastra as retiradas de medicamentos",
         textButton: "Cadastrar Retirada",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewRetirada",
               customStyle: {
                  maxWidth: "750px",
                  overflow: "initial",
               },
               data: {
                  createRetirada,
               },
            }),
      },
   ];

   const updateSearchValue = (e) => {
      const value = e.target.value;
      setSearchValue(value);
   };

   return (
      <>
         {
            user.nivel_acesso !== 3 && (
               <>
                  <h2 className="subTitle">Ações</h2>
                  <CardAction cardActionCollection={cardActionCollection} />
               </>
            )
         }

         <h2 className="subTitle">Histórico de Retiradas</h2>
         {isLoading ? (
            <Loading />
         ) : (
            <>
               <InputSearch
                  value={searchValue}
                  handleOnChange={updateSearchValue}
                  hasFilterButton={false}
               />
               <TableDefault fieldCollection={fieldsCollection} dataCollection={retiradas} />
            </>
         )}
      </>
   );
}
