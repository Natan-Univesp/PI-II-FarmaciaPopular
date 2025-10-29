import { useForm } from "react-hook-form";
import InputRadio from "../../../Inputs/InputRadio/InputRadio";
import { useModal } from "../../../../context/ModalContext";

export function ModalFilterLoteMedicamentos() {
   const { showDataInfo, closeModal } = useModal();
   const { filterParams, setFilterParams } = showDataInfo(); 
   const {
      register,
      handleSubmit,
      formState: { isDirty },
   } = useForm({ defaultValues: filterParams || { orderBy: "data_criacao,asc", vencendo: "" } });

   const registerOrderBy = register("orderBy");
   const registerVencendo = register("vencendo");

   const handleApplyFilter = (filter) => {
      setFilterParams(filter);
      closeModal();
   }

   return (
      <form action="" className="modalFilterContainer" onSubmit={handleSubmit(handleApplyFilter)}>
         <div className="modalFilterContent">
            <div className="modalFilterContent__orderByOptionsCollection">
               <h2>Ordernar Por:</h2>
               <hr />
               <h3>Data de Recebimento</h3>
               <div className="inputCollectionColumn">
                  <InputRadio
                     id="dataCriacaoDesc"
                     value="data_criacao,desc"
                     textView="Mais Recentes"
                     register={registerOrderBy}
                  />
                  <InputRadio
                     id="dataCriacaoAsc"
                     value="data_criacao,asc"
                     textView="Mais Antigos"
                     register={registerOrderBy}
                  />
               </div>
               <h3>Data de Validade</h3>
               <div className="inputCollectionColumn">
                  <InputRadio
                     id="dataValidadeDesc"
                     value="data_validade,desc"
                     textView="Mais Distantes"
                     register={registerOrderBy}
                  />
                  <InputRadio
                     id="dataValidadeAsc"
                     value="data_validade,asc"
                     textView="Mais Próximos"
                     register={registerOrderBy}
                  />
               </div>
            </div>
            <div className="modalFilterContent__filterOptionsCollection">
               <h2>Opções de Filtragem:</h2>
               <hr />
               <div className="filterOptionsCollection__filterOptions">
                  <h3>Prazo de Vencimento</h3>
                  <div className="inputCollectionRow__gridStyle">
                     <InputRadio id="all" value="" textView={"Todos"} register={registerVencendo} />
                     <InputRadio
                        id="30"
                        value="30"
                        textView={"30 dias"}
                        register={registerVencendo}
                     />
                     <InputRadio
                        id="60"
                        value="60"
                        textView={"60 dias"}
                        register={registerVencendo}
                     />
                     <InputRadio
                        id="90"
                        value="90"
                        textView={"90 dias"}
                        register={registerVencendo}
                     />
                  </div>
               </div>
            </div>
         </div>

         <div className="modalFilterButton">
            <button className={!isDirty ? "buttonForm-style1__inactive" : ""}>
               Aplicar Filtros
            </button>
         </div>
      </form>
   );
}
