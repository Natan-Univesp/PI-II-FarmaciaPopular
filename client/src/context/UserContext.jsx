import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import localforage from "localforage";

const UserContext = createContext(null);

export function UserProvider({ children }) {
   const [user, setUser] = useState();

   const getUserInfo = async () => {
      try {
         const token = Cookies.get("token");

         if (!token) return;

         const res = await localforage.getItem("user");
         if(res) {
            setUser(res);
         }

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getUserInfo();
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
