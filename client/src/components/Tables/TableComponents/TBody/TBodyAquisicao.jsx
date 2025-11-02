import ButtonTable from "../ButtonTable/ButtonTable";
import TCell from "../TCell/TCell";

export default function TBodyAquisicao({
   dataInfo,
   btnInfoCollection = [],
   fieldsExcludes = [],
   customClassData = {},
}) {
   const handleSetStatusClass = (statusRef) => {
      const status = statusRef.toUpperCase();
      let statusClass;
      switch (status) {
         case "SOLICITADO":
            statusClass = "primStyle";
            break;
         case "ENVIADO":
            statusClass = "yellowStyle";
            break;
         case "ENTREGUE":
            statusClass = "greenStyle";
            break;
         default:
            statusClass = "";
            break;
      }
      return statusClass;
   };

   return (
      <tr id={dataInfo.id}>
         {Object.entries(dataInfo).map(([key, value], index) => {
            if (key === "status") {
               return (
                  <td key={index} className={handleSetStatusClass(value)}>
                     <p>
                        {value}
                     </p>
                  </td>
               );
            }
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
