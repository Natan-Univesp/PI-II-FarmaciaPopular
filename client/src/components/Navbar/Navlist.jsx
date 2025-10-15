import { useState } from 'react';
import {NavLink, useLocation} from 'react-router';
import PropTypes from 'prop-types';
import styles from "./Navbar.module.css";

import { IoIosArrowUp as IconDropList} from "react-icons/io";

export function Navlist({listContent=[]}) {
   const location = useLocation();

    const [dropDownInfo, setDropDownInfo] = useState({});

    const handleActiveDropDown = (e) => {
        const id = Number(e.target.id);

        setDropDownInfo({...dropDownInfo, [id]: !dropDownInfo[id]});      

    }

    //Validação que permite que a raiz ("/") continue ativa, mesmo que o primeiro neto esteja ativo
    const styleValidation = (isActive, linkContent) => {
        const subNav = linkContent.subNav;
        if((subNav && subNav.includes(location.pathname)) || isActive) {      
            return true
        
        } 
        return false;
    }

    return(
        <ul>
            {listContent.map((content) => {
               const {subList} = content;
               // Recursividade que verifica se há uma subList
               if(subList) {
                  return(
                     <li key={content.id} 
                           className={(dropDownInfo[content.id]) ? styles.activeDropDown : ""}>
                           <a href='#' id={content.id} onClick={handleActiveDropDown}>{content.icon} {content.title} <IconDropList className={styles.iconDropList}/></a>
                           <Navlist key={content.id} listContent={subList} styles={styles}/>
                     </li>
                  )
               }
               return(
                  <li key={content.id}>
                        <NavLink to={content.path} className={({isActive}) => isActive ? styles.active : ""} end>
                           {content.icon}{content.title}
                        </NavLink>
                  </li>
               )
            })}
        </ul>
    )
}