import { useEffect, useState } from "react";
import { FaPlus as IconAdd} from "react-icons/fa";
import styles from "./InputFile.module.css";

export default function InputFile({register = {}, watchImg, error}) {
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if(typeof watchImg === "object") {
            setPreviewImage(URL.createObjectURL(watchImg[0]));
        } else {
            setPreviewImage(watchImg);
        }
        
    }, [watchImg])

    return(
        <>
            <div className={`${styles.inputImageContainer} ${(error) ? styles.inputImageError : ""}`}>
                <label htmlFor="imageSelect"><IconAdd/></label>
                <input type="file" id="imageSelect" style={{display: "none"}} {...register}/>
                {previewImage && <img src={previewImage} alt="impressora_imagem"/>}
                {error && <span className={`${styles.errorMsgCustom} errorMessage`}>{error?.message}</span>}
            </div>
        </>
    )
}