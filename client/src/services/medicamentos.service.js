import axios from "axios";
import Cookies from "js-cookie";

const localServer = import.meta.env.VITE_SERVER_URL;

/* 
==================================
method = GET
==================================
*/
export async function getAllMedicamentosService() {
   const res = await axios.get(`${localServer}/medicamentos`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllActiveMedicamentosService() {
   const res = await axios.get(`${localServer}/medicamentos/situacao/ativo`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllInactiveMedicamentosService() {
   const res = await axios.get(`${localServer}/medicamentos/situacao/inativo`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllMedicamentosByFilterService(params) {
   const {orderBy, ...filterOptions} = params;

   const res = await axios.get(`${localServer}/medicamentos/filter`, { 
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

export async function getAllMedicamentosForSelectService() {
   const res = await axios.get(`${localServer}/medicamentos/select-options`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getAllMedicamentosByIdLaboratorioService(idLab) {
   const res = await axios.get(`${localServer}/medicamentos/laboratorios/${idLab}`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function getMedicamentoByIdService(id) {
   const res = await axios.get(`${localServer}/medicamentos/${id}`, {
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
export async function createMedicamentoService(body) {
   const { 
      id, 
      fk_id_laboratorio, 
      nome,
      indicacao_uso,
      categoria,
      quantidade_minima,
      tipo_unidade,
      img 
   } = body;

   const formData = new FormData();
   
   formData.append("id", id);
   formData.append("fk_id_laboratorio", fk_id_laboratorio);
   formData.append("nome", nome);
   formData.append("indicacao_uso", indicacao_uso);
   formData.append("categoria", categoria);
   formData.append("quantidade_minima", quantidade_minima);
   formData.append("tipo_unidade", tipo_unidade);
   formData.append("image", img[0]);

   const res = await axios.post(`${localServer}/medicamentos`, formData, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
         "Content-Type": "multipart/form-data"
      }
   });
   return res;
}

/* 
==================================
method = PATCH
==================================
*/
export async function updateMedicamentoService(id, body) {
   const formData = new FormData();
   if(body?.img) {
      formData.append("image", body.img[0]);
   }

   if(body?.fk_id_laboratorio) {
      formData.append("fk_id_laboratorio", body.fk_id_laboratorio);
   }

   if(body?.nome) {
      formData.append("nome", body.nome);
   }

   if(body?.indicacao_uso) {
      formData.append("indicacao_uso")
   }

   if(body?.categoria) {
      formData.append("categoria", body.categoria);
   }

   if(body?.quantidade_minima) {
      formData.append("quantidade_minima", body.quantidade_minima);
   
   }

   if(body?.tipo_unidade) {
      formData.append("tipo_unidade", body.tipo_unidade);
   }

   const res = await axios.patch(`${localServer}/medicamentos/${id}`, formData, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`,
         "Content-Type": "multipart/form-data"
      }
   });
   return res;
}

export async function inactivateMedicamentoService(id) {
   const situacao = "INATIVO";
   const res = await axios.patch(`${localServer}/medicamentos/${id}/situacao`, { situacao }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}

export async function restoreMedicamentoService(id) {
   const situacao = "ATIVO";
   const res = await axios.patch(`${localServer}/medicamentos/${id}/situacao`, { situacao }, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}


