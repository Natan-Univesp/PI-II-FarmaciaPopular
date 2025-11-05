import { useUser } from "../../../context/UserContext";
import styles from "./CardShortCut.module.css";
import { CardShortCutItem } from "./CardShortCutItem";

export function CardShortCut({ shortCutCollection = [], nivelAcessoExcludesData }) {
   const { user } = useUser();
   return (
      <div className={styles.cardShortCutCollection}>
         {shortCutCollection.map((item) => {
            if (!nivelAcessoExcludesData[user.nivel_acesso].includes(item.id)) {
               return <CardShortCutItem key={item.id} title={item.title} path={item.path} />;
            }
         })}
      </div>
   );
}
