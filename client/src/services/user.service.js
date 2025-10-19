import axios from "axios";
import Cookies from "js-cookie";
import localforage from "localforage";

const localServer = import.meta.env.VITE_SERVER_URL;

// O login utiliza o método POST pois se trava da inserção de informações sensíveis (usuário e senha)
export async function loginService(body) {
   const res = await axios.post(`${localServer}/auth`, body);
   return res;
}

export async function logoutService() {
   Cookies.remove("token");
   await localforage.removeItem("user");
}

export async function getNecessaryInfoUserService() {
   const res = await axios.get(`${localServer}/users/logged`, {
      headers: {
         Authorization: `Bearer ${Cookies.get("token")}`
      }
   });
   return res;
}