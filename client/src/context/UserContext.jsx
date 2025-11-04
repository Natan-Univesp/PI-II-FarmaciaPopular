import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import localforage from "localforage";
import { Loading } from "../components/Loading/Loading";

const UserContext = createContext(null);

export function UserProvider({ children }) {
   const [user, setUser] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const getUserInfo = async () => {
      try {
         const token = Cookies.get("token");

         if (!token) return;

         const res = await localforage.getItem("user");
         if(res) {
            setUser(res);
         }
         setIsLoading(false);

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getUserInfo();
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {isLoading ? <Loading/> : children}
      </UserContext.Provider>
   );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
