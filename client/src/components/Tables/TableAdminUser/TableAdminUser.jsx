import THeadGeneral from "../TableComponents/THead/THeadGeneral";
import { TBodyAdminUser } from "../TableComponents/TBody/TBodyAdminUser.jsx";

export function TableAdminUser({ userCollection = [] }) {
   const fieldCollection = [
      "ID",
      "Usuário",
      "Nível de Acesso",
      "Status",
      "Criado em",
      "Ultima Alteração em",
   ];

   return (
      <>
         {userCollection.length > 0 ? (
            <div className="blocoTabela fadeIn">
               <table className="tabelaDados">
                  <thead>
                     <THeadGeneral fieldCollection={fieldCollection} />
                  </thead>
                  <tbody>
                     {userCollection.map((userData) => (
                        <TBodyAdminUser key={userData.id} userData={userData} />
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <p className="textInfoNotAvaliable">Dados não encontrados</p>
         )}
      </>
   );
}
