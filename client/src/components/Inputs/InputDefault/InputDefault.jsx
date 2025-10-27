import styles from "./InputDefault.module.css";

export function InputDefault({
   type = "text",
   id = "",
   placeholder = "",
   disabled = false,
   customClass = "",
   textView = "",
   register = {},
   error,
}) {
   return (
      <div className={`${styles.inputContainer} ${customClass} ${error ? styles.error : ""}`}>
         <label className={styles.inputLabel} htmlFor={id}>
            {textView}
         </label>
         <input
            type={type}
            id={id}
            className={styles.inputField}
            placeholder={placeholder}
            onWheel={(e) => e.target.blur()}
            disabled={disabled}
            {...register}
         />
         {error && <span className="errorMessage">{error.message}</span>}
      </div>
   );
}
