import { useModal } from "../../../context/ModalContext";
import { InputSearch } from "../../Inputs/InputSearch/InputSearch";
import { TableDefault } from "../TableDefault/TableDefault";
import { FaEdit as IconEdit, FaTrashAlt as IconTrash } from "react-icons/fa";

export function TableSearch({
   fieldCollection = [],
   dataCollection = [],
   btnCollection = [],
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
            btnCollection={btnCollection}
            customClassData={customClassData}
         />
      </>
   );
}
