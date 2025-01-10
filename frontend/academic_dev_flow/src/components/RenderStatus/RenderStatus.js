import { Space } from "antd";
import React from "react";

const RenderStatus = ({optionsStatus, propStatus}) => {
     
    const statusOption = optionsStatus.find(option => option.value === propStatus);

    return (

        <React.Fragment>
            {optionsStatus && propStatus && (
                <Space align="center" style={{
                    display: 'flex',
                    width: 'fit-content',
                    height: '30px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    backgroundColor: `${statusOption.color}`,
                    padding: '10px',
                    borderRadius: '5px',
                    textTransform: 'uppercase',
                    textAlign: 'center',        
                    whiteSpace: 'nowrap', // Não permite quebra de linha
                    overflow: 'hidden',   // Oculta o conteúdo que ultrapassa
                    textOverflow: 'ellipsis', // Adiciona "..." quando o texto ultrapassa o limite
                }}>  
                    {statusOption.name} 
                </Space>
            )}
        </React.Fragment>
    )
}

export default RenderStatus