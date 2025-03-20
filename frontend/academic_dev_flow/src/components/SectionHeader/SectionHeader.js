import React from "react";
import "./SectionHeader.css"
const SectionHeader = ({title, children}) => {

    return (
        <div 
            className="section-header" 
            style={{
                padding: '20px',
                display: 'flex', 
                alignItems: 'baseline',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd'
            }}
        >
            {children}
        </div>
    )
}

export default SectionHeader