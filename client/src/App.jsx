import { Outlet } from "react-router";
import "./App.css";
import { Navbar } from "./components/NavBar/NavBar";
import { Topbar } from "./components/TopBar/TopBar";
import { useNavbar } from "./context/NavbarContext";

function App() {
   const { isNavbarActive } = useNavbar();

   return (
      <div className={`generalContainer ${!isNavbarActive ? "inactiveNavbar" : ""}`}>
         <Topbar />
         <Navbar />
         <main>
            <Outlet />
         </main>
      </div>
   );
}

export default App;
