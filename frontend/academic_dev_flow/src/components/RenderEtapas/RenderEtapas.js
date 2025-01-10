import { Space } from "antd";
import React from "react";

const RenderEtapas = ({data}) => {
     
    return (
        <React.Fragment>
            {data.length !== 0 && (
                <Space> 
                    {data.map((item, index) => (
                        <div 
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 'fit-content',         
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#FFFFFF', 
                                backgroundColor: "#000000",
                                padding: '10px',       
                                borderRadius: '5px',
                                textTransform: 'uppercase',
                                textAlign: 'center',  
                            }}
                        
                        key={index}> {item.nome} </div>
                    ))}
                </Space>
            )}
        </React.Fragment>
        
    )
}

export default RenderEtapas