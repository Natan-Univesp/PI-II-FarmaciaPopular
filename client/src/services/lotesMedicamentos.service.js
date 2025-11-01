import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllLotesMedicamentosService() {
   const res = await axios.get(`${localServer}/lotes-medicamentos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllLotesMedicamentosByFilterService(idMedicamento, params) {
   const { orderBy, ...filterOptions } = params;

   const res = await axios.get(`${localServer}/lotes-medicamentos/${idMedicamento}/filter`, {
      params: {
         orderBy,
         ...filterOptions
      },
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });

   return res;
}

export async function getAllLotesMedicamentosByIdMedicamentoService(idMedicamento) {
   const res = await axios.get(`${localServer}/lotes-medicamentos/medicamentos/${idMedicamento}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getLoteMedicamentoByIdService(id) {
   const res = await axios.get(`${localServer}/lotes-medicamentos/${id}`, {
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
export async function createLoteMedicamentoService(body) {
   const res = await axios.post(`${localServer}/lotes-medicamentos`, body, {
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
export async function updateLoteMedicamentoService(id, body) {
   const res = await axios.patch(`${localServer}/lotes-medicamentos/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}