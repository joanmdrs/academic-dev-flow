import React from "react";
import ItemEquipe from "./ItemEquipe/ItemEquipe";
import { Avatar } from "antd";
import { IoIosAdd } from "react-icons/io";

const GridEquipe = ({data, onDelete, onAdd}) => {

    return (
        <div style={{display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap'}}>
            <div 
                onClick={onAdd}
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    height: '280px',
                    width: '220px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#D9D9D9',
                    cursor: 'pointer'
                }}
            > 
                <div> 
                    <Avatar size="large" icon={<IoIosAdd />} />
                </div>

                <div> 
                    <h4 style={{color: '#585858'}}> Adicionar Membro </h4>
                </div>

            </div>

            {data.map((item, index) => (
                <ItemEquipe key={index} data={item} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default GridEquipe;
