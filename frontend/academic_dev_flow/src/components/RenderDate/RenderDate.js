import React from "react";
import { FaRegClock } from "react-icons/fa";
import { formatDate } from "../../services/utils";
import { Space } from "antd";

const RenderDate = ({dateType, dateValue}) => {   
    return (
        <Space align="center" style={{
            display: 'flex',
            gap: '2px',
            padding: '10px',
            width: 'fit-content',
            borderRadius: '5px',
            height: '30px',
            fontSize: '10px',
            fontWeight: 'bold',
            backgroundColor: `${dateType === 'inicio' ? "#00BFFF" : "#DF013A"}`,
            color: "#FFFFFF",
            whiteSpace: 'nowrap', // Não permite quebra de linha
            overflow: 'hidden',   // Oculta o conteúdo que ultrapassa
            textOverflow: 'ellipsis', // 
        }}> 
            <FaRegClock /> {formatDate(dateValue)}
        </Space>
    )
}

export default RenderDate