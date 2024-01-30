import React from "react";
import './Titulo.css';

const Titulo = ({titulo, paragrafo}) => {
    return (
        <div className="component-title">
            <h3>{titulo}</h3>
            <p>{paragrafo}</p>
        </div>
    );
}

export default Titulo;