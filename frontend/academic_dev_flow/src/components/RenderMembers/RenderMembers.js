import { Avatar, Tooltip } from "antd";
import React from "react";
import { getRandomColor } from "../../services/utils";
import { UserOutlined } from "@ant-design/icons";

const RenderMembers = ({membros, quantMembros, maxAvatars}) => {
    
    return (
        <React.Fragment>
            { membros.length !== 0 && (
                <div style={{ display: 'flex', marginLeft: '8px'}}>
                    <div style={{ display: 'flex', position: 'relative', marginLeft: -8 }}>
                        {
                            membros.slice(0, maxAvatars).map((item, index) => (
                                <Tooltip title={`${item.nome}`}>
                                    <Avatar
                                        key={index}
                                        style={{
                                            backgroundColor: getRandomColor(),
                                            zIndex: quantMembros + index,
                                            marginLeft: index > 0 ? -10 : 0
                                        }}
                                    >
                                        {item?.nome ? item.nome.charAt(0).toUpperCase() : <UserOutlined />}

                                    </Avatar>
                                </Tooltip>
                                
                            ))
                        }
                        {
                            (quantMembros - maxAvatars ) > 0 && 
                                <Avatar
                                    key={quantMembros - maxAvatars}
                                    style={{
                                        fontSize: '12px',
                                        backgroundColor: "var(--primary-color)",
                                        color: "#FFFFFF",
                                        zIndex: `${quantMembros *2}`,
                                        marginLeft: (quantMembros - maxAvatars) > 0 ? -10 : 0
                                    }}
                                >
                                    { `+${(quantMembros - maxAvatars)}`}
                                </Avatar>
                        }
                    </div>
                </div>
            )}
        </React.Fragment>
        
    )
}

export default RenderMembers