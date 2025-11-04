import { useOutletContext } from "react-router";
import { CardRemedio } from "../../../cards/CardRemedio/CardRemedio";
import { InputSearch } from "../../../Inputs/InputSearch/InputSearch";
import { useModal } from "../../../../context/ModalContext";
import { CardAction } from "../../../Cards/CardAction/CardAction";

export function MedicamentosInfo() {
   const { showModal } = useModal();
   const { medicamentos, searchValue, setSearchValue, createMedicamento, user } = useOutletContext();

   const updateSearchValue = (e) => {
      const value = e.target.value;
      setSearchValue(value);
   };

   const cardActionCollection = [
      {
         id: 1,
         title: "Cadastrar Medicamento",
         text: "Cadastra um medicamento ainda não existente",
         textButton: "Cadastrar Medicamento",
         handleOpenModal: () =>
            showModal({
               modalName: "registerNewMedicamento",
               customStyle: {
                  height: "100%",
                  width: "600px",
               },
               data: {
                  createMedicamento,
               },
            }),
      },
      {
         id: 2,
         title: "Visualizar Lixeira",
         text: "Visualiza Medicamentos movidos para a lixeira, sendo possivel a sua restauração",
         textButton: "Visualizar Lixeira",
         handleOpenModal: () =>
            showModal({
               modalName: "lixeiraMedicamentos",
            }),
      },
   ];

   return (
      <>
         {user.nivel_acesso !== 3 && (
            <>
               <h2 className="subTitle">Ações</h2>
               <CardAction cardActionCollection={cardActionCollection} />
            </>
         )}

         <h2 className="subTitle">Estoque de Medicamentos</h2>

         <InputSearch
            value={searchValue}
            handleOnChange={updateSearchValue}
            hasFilterButton={false}
         />
         <div className="layoutFlexCollectionCard">
            {medicamentos &&
               medicamentos.map((medicamento) => (
                  <CardRemedio key={medicamento.id} medicamentoData={medicamento} user={user}/>
               ))}
         </div>
      </>
   );
}
