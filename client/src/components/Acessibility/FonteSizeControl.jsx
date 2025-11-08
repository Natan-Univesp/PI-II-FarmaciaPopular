import { createContext, useContext, useEffect, useState } from "react";
import './FontSizeControl.css';
import { FaSearchPlus, FaUndo, FaSearchMinus } from 'react-icons/fa';

export function AcessibilityFontControl() {
    const [defaultScale, setScale] = useState(1);

    const aumentarfonte = () => {
        if (defaultScale < 1.5) {
            const newScale = defaultScale + 0.1;
            setScale(newScale);
            document.documentElement.style.setProperty('--font-size-scale', newScale);
        }
    };

    const diminuirfonte = () => {
        if (defaultScale > 0.8) {
            const newScale = defaultScale - 0.1;
            setScale(newScale);
            document.documentElement.style.setProperty('--font-size-scale', newScale);
        }
    };

    const fontepadrao = () => {
        setScale(1);
        document.documentElement.style.setProperty('--font-size-scale', 1);
    };

    return (
        <div className="font-size-control">
            <button onClick={aumentarfonte} aria-label="Aumentar o tamanho da fonte"> 
                <FaSearchPlus />
            </button>
            <button onClick={fontepadrao} aria-label="Fonte normal">
                <FaUndo />
            </button>
            <button onClick={diminuirfonte} aria-label="Diminuir o tamanho da fonte">
                <FaSearchMinus />
            </button>
        </div>
    );
}