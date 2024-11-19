import { Avatar, Tooltip } from "antd";
import React from "react";
import { getRandomColor, limitarCaracteres } from "../../../../../services/utils";
import { IoMdClose } from "react-icons/io";

const ItemEquipe = ({data, onDelete}) => {

    return (
        <div 
            style={{
                backgroundColor: "#FFFFFF",
                border: '1px solid #ddd',
                borderRadius: '20px',
                height: '280px',
                width: '220px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                cursor: 'pointer'
            }}
        > 
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                <span 
                    onClick={() => onDelete(data.id)}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.1)', 
                    borderRadius: '50%',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                }}> 
                    <Tooltip title="Remover membro">
                        <IoMdClose size="20px" />
                    </Tooltip>
                </span>
            </div>
            <div> 
                <Avatar 
                    style={{
                        width: '60px', 
                        height: '60px'
                    }} 
                    src={`https://avatar.iran.liara.run/public/${data.avatar}`} />
            </div>

            <div> 
                <h4 style={{textAlign: 'center'}}> {limitarCaracteres(data.nome_membro, 15)} </h4>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
                {data.funcoes_membro.map((item, index) => (
                    <>
                        {
                            item.status && (
                                <div key={index}> {item.nome_categoria_funcao} </div>
                            )
                        }
                    </>
                    
                    
                ))}
                </div>

        </div>
    )
}

export default ItemEquipe