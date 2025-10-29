import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllRelatorioMedicamentosService() {
   const res = await axios.get(`${localServer}/relatorios`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllRelatoriosByFilterService(params) {
   const {orderBy, ...filterOptions} = params;
   const res = await axios.get(`${localServer}/relatorios/filter`, {
      params: {
         orderBy,
         ...filterOptions
      },
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      },
   });
   return res;
}

export async function getRelatorioByIdService(id) {
   const res = await axios.get(`${localServer}/relatorios/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}