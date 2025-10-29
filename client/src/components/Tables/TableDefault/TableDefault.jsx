import TBody from "../TableComponents/TBody/TBody";
import THeadGeneral from "../TableComponents/THead/THeadGeneral";
import "../../../assets/css/table.css";

export function TableDefault({
   title = "",
   fieldCollection = [],
   dataCollection = [],
   btnCollection = [],
   fieldsExcludes = [],
   customClassData = {},
   isModalChildren = false,
}) {
   return (
      <>
         {dataCollection.length > 0 ? (
            <div className={`blocoTabela ${!isModalChildren ? "fadeIn" : ""}`}>
               <table className="tabelaDados">
                  <thead>
                     <THeadGeneral
                        title={title}
                        fieldCollection={fieldCollection}
                        hasActionBtn={btnCollection.length > 0}
                     />
                  </thead>
                  <tbody>
                     {dataCollection.map((data) => (
                        <TBody
                           key={data.id}
                           dataInfo={data}
                           btnInfoCollection={btnCollection}
                           fieldsExcludes={fieldsExcludes}
                           customClassData={customClassData}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <p className="textInfoNotAvaliable textMargin">Dados não encontrados</p>
         )}
      </>
   );
}
