import React from "react";

const Titulo = ({titulo, paragrafo}) => {
    return (
        <div style={{borderBottom: '1px solid #ddd', paddingLeft: '10px', paddingBottom: '10px'}}>
            <h3 className="ff-pop">{titulo}</h3>
            <p className="ff-pop">{paragrafo}</p>
        </div>
    );
}

export default Titulo;