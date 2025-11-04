import TBody from "../TableComponents/TBody/TBody";
import TBodyAquisicao from "../TableComponents/TBody/TBodyAquisicao";
import { THeadAquisicao } from "../TableComponents/THead/THeadAquisicao";

export function TableAquisicao({
   aquisicaoData,
   fieldsExcludes = [],
   customClassData = {},
   actionType = ""
}) {
   const fieldCollection = ["ID", "Medicamento", "Quantidade Solicitada", "Status"];
   const aquisicaoItens = aquisicaoData.itens_aquisicoes;
   const { status } = aquisicaoData;

   return (
      <div className="blocoTabela">
         <table className="tabelaDados">
            <thead>
               <THeadAquisicao
                  dataSolicitacao={aquisicaoData}
                  fieldNameCollection={fieldCollection}
                  actionType={actionType}
               />
            </thead>
            <tbody>
               {aquisicaoItens.map((item) => (
                  <TBodyAquisicao
                     key={item.id}
                     dataInfo={{ ...item, status }}
                     fieldsExcludes={fieldsExcludes}
                     customClassData={customClassData}
                  />
               ))}
            </tbody>
         </table>
      </div>
   );
}
