import { Outlet } from "react-router";
import { useMedicamento } from "../../../context/MedicamentoContext";
import { useModal } from "../../../context/ModalContext";
import { CardAction } from "../../Cards/CardAction/CardAction";

export function MedicamentoMain() {
   const { showModal } = useModal();
   const { 
      filteredMedicamentos: medicamentos, 
      searchValue,
      setSearchValue,
      createMedicamento,
   } = useMedicamento();

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
   ];

   return (
      <>
         <h2 className="subTitle">Ações</h2>
         <CardAction cardActionCollection={cardActionCollection} />

         <h2 className="subTitle">Estoque de Medicamentos</h2>
         <Outlet context={{ 
            medicamentos, 
            searchValue, 
            setSearchValue, 
         }} />
      </>
   );
}
