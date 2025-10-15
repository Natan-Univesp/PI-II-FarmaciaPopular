import styles from "./Navbar.module.css";
import { Navlist } from "./Navlist";

//Icones
import { FaHome as IconHome} from "react-icons/fa";
import { GiMedicines as IconMedicamento} from "react-icons/gi";
import { CiPillsBottle1 as IconPill} from "react-icons/ci";
import { LuClipboardPlus as IconRelatorio} from "react-icons/lu";
import { PiHandWithdrawLight as IconRetirada} from "react-icons/pi";
import { MdOutlineScience as IconLaboratorio} from "react-icons/md";
import { MdOutlineAdminPanelSettings as IconAdmin} from "react-icons/md";
import { useNavbar } from "../../context/NavbarContext";


export function Navbar() {
   const { isNavbarActive } = useNavbar();

   const navListCollection = [
      {
         id: 1,
         title: "Home",
         path: "/",
         icon: <IconHome className={styles.iconList}/>
      },
      {
         id: 2,
         title: "Medicamentos",
         icon: <IconMedicamento className={styles.iconList}/>,
         subList: [
            {
               id: 3,
               title: "Geral",
               path: "/medicamentos",
               icon: <IconMedicamento className={styles.iconList}/>
            },
            {
               id: 4,
               title: "Modelos",
               path: "/medicamentos/modelos",
               icon: <IconPill className={styles.iconList}/>
            },
            {
               id: 5,
               title: "Relatórios",
               path: "/medicamentos/relatorios",
               icon: <IconRelatorio className={styles.iconList}/>
            }
         ]
      },
      {
         id: 6,
         title: "Laboratorios",
         path: "/laboratorios",
         icon: <IconLaboratorio className={styles.iconList}/>
      },
      {
         id: 7, 
         title: "Retirada de Medicamentos",
         path: "/medicamentos/retirada",
         icon: <IconRetirada className={styles.iconList}/>
      },
      {
         id: 8,
         title: "Administrador",
         path: "/admin",
         icon: <IconAdmin className={styles.iconList}/>
      }
   ] 


   return (
      <nav className={`${styles.navContainer} ${!isNavbarActive ? styles.inactive : ""}`}>
         <Navlist listContent={navListCollection}/>
      </nav>
   );
}
