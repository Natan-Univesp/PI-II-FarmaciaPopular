import { FaRegCircleUser as IconUser } from "react-icons/fa6";
import { IoMenu as IconMenu, IoLogOutOutline as IconLogout } from "react-icons/io5";

import styles from "./Topbar.module.css";
import FarmaciaLogo from "../../assets/img/icone-farmacia-popular.png";
import { useNavbar } from "../../context/NavbarContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { logoutService } from "../../services/user.service";

export function Topbar() {
   const { user } = useUser();
   console.log(user);
   const { changeActiveNavbarState } = useNavbar();
   const navigate = useNavigate();

   const handleLogout = async () => {
      try {
         await logoutService();
         navigate("/auth");
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <header className={styles.topBarContainer}>
         <section className={styles.topBar__leftSide}>
            <div className={styles.topBar__logo}>
               <img src={FarmaciaLogo} alt="logo da farmácia popular" />
            </div>
            <h1>FARMÁCIA POPULAR</h1>
            <button className={styles.topBar__buttonMenu} onClick={changeActiveNavbarState}>
               <IconMenu />
            </button>
         </section>
         <section className={styles.topBar__rightSide}>
            {user && (
               <>
                  <div className={styles.topBar__userInfo}>
                     <p>
                        Bem vindo(a),<span>{user?.usuario}</span>
                     </p>
                  </div>
                  <button className={styles.topBar__buttonLogout} onClick={handleLogout}>
                     <IconLogout className={styles.logoutIcon} />
                     Sair
                  </button>
               </>
            )}
         </section>
      </header>
   );
}
