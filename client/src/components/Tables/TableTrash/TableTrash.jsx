//Icones
import { FaArrowRotateLeft as IconRestore } from "react-icons/fa6";

import { getElementIdTable } from "../../../utils/ManipulateDataUtil";
import { useAlert } from "../../../context/AlertContext";
import { TableDefault } from "../TableDefault/TableDefault";

export function TableTrash({fieldCollection = [], dataCollection = [], fieldsExcludes = [], handleRestore, modalConfirmText = {}}) {
    const { showConfirmAlert } = useAlert();

    const handleConfirmRestore = async (e) => {
        const id = getElementIdTable(e);
        await showConfirmAlert({
            title: modalConfirmText.title,
            message: modalConfirmText.message,
            handleConfirm: async () => await handleRestore(id)
        })
    }

    const btnTableCollection = [
        {
            id: 1,
            infoView: <IconRestore/>,
            handleAction: handleConfirmRestore,
            className: "restoreBtn"
        }
    ]

    return(
        <TableDefault fieldCollection={fieldCollection} 
                      dataCollection={dataCollection} 
                      btnCollection={btnTableCollection}
                      fieldsExcludes={fieldsExcludes}
                      isModalChildren={true}/>
    )
}