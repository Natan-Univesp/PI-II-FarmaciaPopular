import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

export async function getTotalRegisteredLaboratoriosService() {
   const res = await axios.get(`${localServer}/infostats/laboratorios/total-registered`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalMinEstoqueMedicamentosService() {
   const res = await axios.get(`${localServer}/infostats/medicamentos/total-min-stock`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getMedicamentoWithMaxEstoqueService() {
   const res = await axios.get(`${localServer}/infostats/medicamentos/max-stock`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalAquisicoesSolicitadasService() {
   const res = await axios.get(`${localServer}/infostats/aquisicoes/total-solicitadas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalAquisicoesEnviadasService() {
   const res = await axios.get(`${localServer}/infostats/aquisicoes/total-enviadas`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalAquisicoesEntreguesService() {
   const res = await axios.get(`${localServer}/infostats/aquisicoes/total-entregues`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllRetiradasOnMonthService() {
   const res = await axios.get(`${localServer}/infostats/retiradas/total-month`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getMostMedicamentoRetiradoOnMonthService() {
   const res = await axios.get(`${localServer}/infostats/retiradas/medicamento/most-month`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalUsersService() {
   const res = await axios.get(`${localServer}/infostats/users/total`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalActiveUsersService() {
   const res = await axios.get(`${localServer}/infostats/users/active/total`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getTotalInactiveUsersService() {
   const res = await axios.get(`${localServer}/infostats/users/inactive/total`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}