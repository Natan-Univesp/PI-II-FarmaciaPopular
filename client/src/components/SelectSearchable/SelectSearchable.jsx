import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Loading } from '../Loading/Loading.jsx';
import styles from "./SelectSearchable.module.css";

export default function SelectSearchable({controlName = "", control, dataOptions, textView, placeholder, error}) {
    const [isLoadedData, setIsLoadedData] = useState(false);

        
    const findAndDefineValue = (dataOptions, value) => {
        if(value === null || value === undefined) {
            return null;
        }


        const optionValue = dataOptions.find((option) => {
            if(Array.isArray(option.value)) {
                const subOptions = option.value;
                return findAndDefineValue(subOptions, value);
            }

            if(typeof value === "number") {
                return option.value === Number(value);
            }

            return option.value === value;
            
        })
        return optionValue;
    }

    const customStyles = {
        groupHeading: (baseStyles) => ({
            ...baseStyles,
            fontSize: "18px",
            color: "var(--colorPrim)"
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            opacity: ".6",
            fontFamily: "var(--fontSec)",
            fontSize: "calc(16px * var(--font-size-scale, 1))"  
        }),
        control: (baseStyles) => ({
            ...baseStyles,
            marginTop: "3px",
            padding: "4px",
            borderRadius: "3px",
            border: (error) ? "1px solid var(--colorRed)" : "2px solid var(--colorPrim)",
            backgroundColor: "white",
            borderWidth: 0,
            boxShadow: "none",
            fontFamily: "var(--fontSec)",
            fontSize: "calc(16px * var(--font-size-scale, 1))"
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,

            fontFamily: "var(--fontSec)",
            fontWeight: 400,
            cursor: state.isFocused && "pointer",
            fontSize: "calc(16px * var(--font-size-scale, 1))"
        })
    }

    useEffect(() => {
        const hasOptions = Array.isArray(dataOptions);
        setIsLoadedData(hasOptions)

    }, [dataOptions])

    const customThemes = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: "var(--colorPrim)",
            primary25: "rgb(245, 245, 245)",
            primary50: "var(--colorInactive)",
        }
    })

    if(!isLoadedData) return <Loading/>

    return(
        <div className={styles.selectContainer}>
            <h4 style={(error) ? {backgroundColor: "var(--colorRed)"} : {}}>{textView}</h4>
            <Controller name={controlName}
                        control={control}
                        rules={{
                            required: "Campo Obrigatório"
                        }}
                        render={({field: {onChange, onBlur, value}}) => {
                            return <Select theme={customThemes} 
                                    styles={customStyles} 
                                    options={dataOptions} 
                                    placeholder={placeholder} 
                                    value={findAndDefineValue(dataOptions, value)}
                                    onChange={(({value}) => onChange(value))}
                                    onBlur={onBlur}/>
                        }}/>
            {error && <span className='errorMessage'>{error.message}</span>}
        </div>
    )
}