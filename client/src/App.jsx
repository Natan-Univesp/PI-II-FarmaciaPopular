import { Outlet } from "react-router";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Topbar } from "./components/Topbar/Topbar";
import { useNavbar } from "./context/NavbarContext";
import { ValidateLogin } from "./components/RoutesValidate/ValidateLogin";
import { AcessibilityButton } from "./components/Acessibility/AcessibilityButton";

function App() {
   const { isNavbarActive } = useNavbar();

   return (
      <ValidateLogin>
         <div className={`generalContainer ${!isNavbarActive ? "inactiveNavbar" : ""}`}>
            <Topbar />
            <Navbar />
            <AcessibilityButton />
            <main>
               <Outlet />
            </main>
         </div>
      </ValidateLogin>
   );
}

export default App;
