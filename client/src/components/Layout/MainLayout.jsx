import { ModalProvider } from "../../context/ModalContext";
import { InfoStats } from "../InfoStats/InfoStats";

export function MainLayout({title ="", infoStatsCollection = [], customStyle = null, children}) {
   return(
      <ModalProvider>
         <section className={customStyle ? customStyle : ""}>
            <h1 className="mainTitle">{title}</h1>
            {infoStatsCollection.length > 0 &&
               <InfoStats infoStatsCollection={infoStatsCollection}/>
            }
            {children}
         </section>
      </ModalProvider>
   )
}