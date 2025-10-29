import Tippy from "@tippy.js/react";
import styles from "./ButtonTable.module.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/material.css";

export default function ButtonTable({ infoView, handleAction, classBtn, toolTipsText = "" }) {
   return (
      <Tippy
         content={<div>{toolTipsText}</div>}
         theme="light-border"
         className={styles.customToolTips}
      >
         <button
            type="button"
            onClick={handleAction}
            className={`${styles[classBtn]} ${styles.btnTable} fadeIn`}
         >
            {infoView}
         </button>
      </Tippy>
   );
}
