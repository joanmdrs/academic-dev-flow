import React from "react";
import { convertHexToRgba } from "../../services/utils";
import { Space } from "antd";

const RenderTag = ({item}) => {
    return (
        <Space align="center"

            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1px',
                width: 'fit-content',
                height: '30px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                backgroundColor: `${item.cor}`,
                padding: '10px',
                borderRadius: '5px',
                textTransform: 'uppercase',
                textAlign: 'center',        
                whiteSpace: 'nowrap', // Não permite quebra de linha
                overflow: 'hidden',   // Oculta o conteúdo que ultrapassa
                textOverflow: 'ellipsis',

            }}> #{item.nome}
        </Space>
    )
}

export default RenderTag