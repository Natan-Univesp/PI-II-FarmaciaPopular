import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllClientesEspeciaisService() {
   const res = await axios.get(`${localServer}/clientes-especiais`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllClientesEspeciaisByIdMedicamentoService(idMedicacamento) {
   const res = await axios.get(`${localServer}/clientes-especiais/medicamentos/${idMedicacamento}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllClientesByIdService(id) {
   const res = await axios.get(`${localServer}/clientes-especiais/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

/* 
==================================
method = POST
==================================
*/
export async function createClienteEspecialService(body) {
   const res = await axios.get(`${localServer}/clientes-especiais`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

/* 
==================================
method = PATCH
==================================
*/
export async function updateClienteEspecialService(id, body) {
   const res = await axios.patch(`${localServer}/clientes-especiais/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

/* 
==================================
method = DELETE
==================================
*/
export async function removeClienteEspecialService(id) {
   const res = await axios.delete(`${localServer}/clientes-especiais/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });

   return res;
}