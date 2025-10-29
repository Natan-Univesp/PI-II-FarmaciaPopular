export default function THeadGeneral({ title = "", fieldCollection, hasActionBtn = false }) {
   return (
      <>
         {title && (
            <tr className={"tableTitle"}>
               <th>{title}</th>
            </tr>
         )}
         <tr>
            {fieldCollection.map((value, index) => (
               <th key={index}>{value}</th>
            ))}
            {hasActionBtn && <th className={"tabelaDadosContent__acoesHeader"}>Ações</th>}
         </tr>
      </>
   );
}
