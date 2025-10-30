import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllLaboratoriosService() {
   const res = await axios.get(`${localServer}/laboratorios`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllLaboratoriosForSelectService() {
   const res = await axios.get(`${localServer}/laboratorios/select-options`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getLaboratorioByIdService(id) {
   const res = await axios.get(`${localServer}/laboratorios/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

/* 
==================================
method = POST
==================================
*/
export async function createLaboratorioService(body) {
   const res = await axios.post(`${localServer}/laboratorios`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}


/* 
==================================
method = PATCH
==================================
*/
export async function updateLaboratorioService(id, body) {
   const res = await axios.patch(`${localServer}/laboratorios/${id}`, body, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}