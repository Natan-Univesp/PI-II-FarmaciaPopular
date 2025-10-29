import { Link, useOutletContext } from "react-router";

export function MedicamentosInfo() {
   const { medicamentos } = useOutletContext();

   return (
      <>
         {medicamentos &&
            medicamentos.map((medicamento) => (
               <div
                  style={{
                     width: "120px",
                     height: "120px",
                     backgroundColor: "white",
                     marginBottom: "10px",
                  }}
               >
                  <p>{medicamento.id}</p>
                  <p>{medicamento.nome}</p>
                  <Link to={`${medicamento.id}`}>Aqui</Link>
               </div>
            ))}
      </>
   );
}
