import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllRetiradasMedicamentos() {
   const res = await axios.get(`${localServer}/retiradas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllRetiradasByFilterService(params) {
   const {orderBy, filterOptions} = params;

   const res = await axios.get(`${localServer}/retiradas/filter`, {
      params: {
         orderBy,
         filterOptions
      },
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      },
   });
   return res;
}

export async function getRetiradaByIdService(id) {
   const res = await axios.get(`${localServer}/retiradas/${id}`, {
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
export async function createRetiradaService(body) {
   const res = await axios.post(`${localServer}/retiradas`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}
