import { Space } from "antd";
import React from "react";

const RenderStatus = ({optionsStatus, propStatus}) => {
     
    const statusOption = optionsStatus.find(option => option.value === propStatus);

    return (
        <Space style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',         
            height: '30px',  
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#FFFFFF', 
            backgroundColor: `${statusOption.color}`,
            padding: '10px',       
            borderRadius: '5px',
            textTransform: 'uppercase',
            textAlign: 'center',  
            margin: '0 auto'  
        }}> 
            {statusOption.label} 
        </Space>
    )
}

export default RenderStatus