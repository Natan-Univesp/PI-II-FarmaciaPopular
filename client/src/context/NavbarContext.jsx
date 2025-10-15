import { createContext, useContext, useState } from "react";

const NavbarContext = createContext(null);

export function NavbarProvider({children}) {
   const [isNavbarActive, setIsNavbarActive] = useState(true);

   const changeActiveNavbarState = () => {
      if(isNavbarActive) {
         setIsNavbarActive(false);
      } else {
         setIsNavbarActive(true);
      }
   } 

   return(
      <NavbarContext.Provider value={{isNavbarActive, setIsNavbarActive, changeActiveNavbarState}}>
         {children}
      </NavbarContext.Provider>
   )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNavbar = () => useContext(NavbarContext);