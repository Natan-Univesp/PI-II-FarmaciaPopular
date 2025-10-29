import ButtonTable from "../ButtonTable/ButtonTable";
import TCell from "../TCell/TCell";

export default function TBody({
   dataInfo,
   btnInfoCollection = [],
   fieldsExcludes = [],
   customClassData = {},
}) {
   return (
      <tr id={dataInfo.id}>
         {Object.entries(dataInfo).map(([key, value], index) => {
            if (!fieldsExcludes.includes(key)) {
               return (
                  <TCell
                     key={index}
                     indexValue={index}
                     keyValue={key}
                     fieldValue={value}
                     customClassData={customClassData}
                  />
               );
            }
         })}
         {btnInfoCollection.length > 0 && (
            <td>
               <div className={"tabelaDadosContent__actions"}>
                  {btnInfoCollection.map((btnInfo) => (
                     <ButtonTable
                        key={btnInfo.id}
                        infoView={btnInfo.infoView}
                        classBtn={btnInfo.className}
                        toolTipsText={btnInfo.toolTipsText}
                        handleAction={btnInfo.handleAction}
                     />
                  ))}
               </div>
            </td>
         )}
      </tr>
   );
}

