import { useModal } from "../../../context/ModalContext";
import { InputSearch } from "../../Inputs/InputSearch/InputSearch";
import { TableDefault } from "../TableDefault/TableDefault";
import { FaEdit as IconEdit, FaTrashAlt as IconTrash } from "react-icons/fa";

export function TableSearch({
   fieldCollection,
   dataCollection,
   fieldsExcludes,
   filterType = "",
   searchValue,
   setSearchValue,
   filterParams,
   setFilterParams,
   customClassData = {},
}) {
   const { showModal } = useModal();

   const updateSearchValue = (e) => {
      const value = e.target.value;
      setSearchValue(value);
   };

   const btnTableCollection = [
      {
         id: 1,
         infoView: <IconEdit />,
         className: "btnEdit",
         toolTipsText: "Editar",
      },
      {
         id: 2,
         infoView: <IconTrash />,
         className: "btnDelete",
         toolTipsText: "Excluir",
      },
   ];

   return (
      <>
         <InputSearch
            value={searchValue}
            hasFilterButton={true}
            handleOnChange={updateSearchValue}
            handleOpenFilter={() =>
               showModal({
                  modalName: filterType,
                  customStyle: {
                     maxWidth: "530px",
                  },
                  data: {
                     filterParams,
                     setFilterParams,
                  },
               })
            }
         />
         <TableDefault
            fieldCollection={fieldCollection}
            dataCollection={dataCollection}
            fieldsExcludes={fieldsExcludes}
            btnCollection={btnTableCollection}
            customClassData={customClassData}
         />
      </>
   );
}
