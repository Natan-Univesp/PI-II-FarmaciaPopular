import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllAquisicoesService() {
   const res = await axios.get(`${localServer}/aquisicoes`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllAquisicoesSolicitadasService() {
   const res = await axios.get(`${localServer}/aquisicoes/status/solicitado`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllAquisicoesEnviadasService() {
   const res = await axios.get(`${localServer}/aquisicoes/status/enviado`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAllAquisicoesEntreguesService() {
   const res = await axios.get(`${localServer}/aquisicoes/status/entregue`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   })
   return res;
}

export async function getAquisicaoByIdService(id) {
   const res = await axios.get(`${localServer}/aquisicoes/${id}`, {
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
export async function createAquisicaoService(body) {
   const res = await axios.post(`${localServer}/aquisicoes`, body, {
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
export async function changeStatusAquisicaoService(id, status) {
   const res = await axios.patch(`${localServer}/aquisicoes/${id}/status`, { status }, {
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
export async function deleteAquisicaoService(id) {
   const res = await axios.delete(`${localServer}/aquisicoes/${id}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });

   return res;
}
