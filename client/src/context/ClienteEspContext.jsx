import { createContext, useContext, useEffect, useState } from "react";
import { createClienteEspecialService, getAllClientesEspeciaisService, removeClienteEspecialService, updateClienteEspecialService } from "../services/clientesEsp.service";

const ClienteEspContext = createContext(null);

export function ClienteEspProvider({ children }) {
   const [clientesEspeciais, setClientesEspeciais] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const getAllClientesEspeciais = async () => {
      if (!isLoading) {
         setIsLoading(true);
      }
      const res = await getAllClientesEspeciaisService()
      setClientesEspeciais(res.data);
      setIsLoading(false);
   }

   const createClienteEspecial = async (clienteData) => {
      const res = await createClienteEspecialService(clienteData);
      if(res.data.status === "success"){
         await getAllClientesEspeciais();
         return true;
      }
   }

   const updateClienteEspecial = async (id, newClienteData) => {
      const res = await updateClienteEspecialService(id, newClienteData);
      if(res.data.status === "success") {
         await getAllClientesEspeciais();
         return true;
      }
   }

   const deleteClienteEspecial = async (id) => {
      const res = await removeClienteEspecialService(id);
      if(res.data.status === "success") {
         await getAllClientesEspeciais();
         return true;
      }
   }

   const init = async () => {
      try {
         await getAllClientesEspeciais();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      init();
   }, [])

   return (
      <ClienteEspContext.Provider value={{   
         clientesEspeciais, 
         isLoading,
         setClientesEspeciais, 
         createClienteEspecial,
         updateClienteEspecial,
         deleteClienteEspecial
      }}>
         {children}
      </ClienteEspContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useClienteEsp = () => useContext(ClienteEspContext);