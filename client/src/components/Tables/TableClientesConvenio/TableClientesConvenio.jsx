import TBody from "../TableComponents/TBody/TBody";
import { THeadClienteConvenio } from "../TableComponents/THead/THeadClienteConvenio";

export function TableClientesConvenio({
   clientesConvenioData,
   fieldsExcludes = [],
   customClassData = {},
}) {
   const fieldCollection = ["ID", "Medicamento", "Criado em", "Alterado em"];
   const { cliente_medicamento } = clientesConvenioData;

   return(
      <div className="blocoTabela">
         <table className="tabelaDados">
            <thead>
               <THeadClienteConvenio 
                  clienteData={clientesConvenioData}
                  fieldCollection={fieldCollection}
               />
            </thead>
            <tbody>
               {cliente_medicamento && cliente_medicamento.map((data) => (
                  <TBody
                     key={data.id}
                     dataInfo={data}
                     fieldsExcludes={fieldsExcludes}
                     customClassData={customClassData}
                  />
               ))}
            </tbody>
         </table>
      </div>
   )
}