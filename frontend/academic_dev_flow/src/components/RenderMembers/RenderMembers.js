import { Avatar, Tooltip } from "antd";
import React from "react";
import { getRandomColor } from "../../services/utils";

const RenderMembers = ({membros, quantMembros, maxAvatars}) => {
    
    return (
        <div style={{ display: 'flex', marginLeft: '8px'}}>
            <div style={{ display: 'flex', position: 'relative', marginLeft: -8 }}>
                {
                    membros.slice(0, maxAvatars).map((item, index) => (
                        <Tooltip title={`${item.nome}`}>
                            <Avatar
                                src={`https://avatar.iran.liara.run/public/${item.avatar}`}
                                key={index}
                                style={{
                                    zIndex: quantMembros + index,
                                    marginLeft: index > 0 ? -10 : 0
                                }}
                            />
                        </Tooltip>
                        
                    ))
                }
                {
                    (quantMembros - maxAvatars ) > 0 && 
                        <Avatar
                            key={quantMembros - maxAvatars}
                            style={{
                                fontSize: '12px',
                                fontFamily: 'Poppins, sans-serif',
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
    )
}

export default RenderMembers