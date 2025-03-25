import { Space } from "antd";
import React from "react";
import { MdOutlineLabel } from "react-icons/md";

const RenderCategoria = ({nome, cor}) => {
    return (
        <React.Fragment>
            { nome && cor && (
                <Space style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1px',
                    width: 'fit-content',
                    height: '30px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    backgroundColor: `${cor}`,
                    padding: '10px',
                    borderRadius: '5px',
                    textTransform: 'uppercase',
                    textAlign: 'center',        
                    whiteSpace: 'nowrap', // Não permite quebra de linha
                    overflow: 'hidden',   // Oculta o conteúdo que ultrapassa
                    textOverflow: 'ellipsis', // Adiciona "..." quando o texto ultrapassa o limite
                }}> 
                    <MdOutlineLabel size="15px" /> {nome} 
                </Space>
            )}
        </React.Fragment>
        
    )
}

export default RenderCategoria