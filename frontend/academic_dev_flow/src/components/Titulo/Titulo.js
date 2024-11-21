import React from "react";

const Titulo = ({titulo, paragrafo}) => {
    return (
        <div 
            style={{
                borderBottom: '1px solid var(--border-color)', 
                paddingLeft: '15px', 
                paddingBottom: '15px', 
                paddingTop: '15px',
                backgroundColor: '#FFFFFF'
            }}
        >
            <h3 className="ff-pop">{titulo}</h3>
            <p className="ff-pop">{paragrafo}</p>
        </div>
    );
}

export default Titulo;