import React from "react";
import ItemGridArtefato from "./ItemGridArtefato/ItemGridArtefato";
import RenderEmpty from "../../../../components/Empty/Empty";
import { Avatar } from "antd";
import { IoIosAdd } from "react-icons/io";

const GridArtefatos = ({data, onCreate, onUpdate, onDelete, onShowComments}) => {

    return (
        <div>

            {
                data.length !== 0 ? (
                    <div style={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}> 

                        <div
                            onClick={onCreate}
                            style={{
                                width: "250px",
                                borderRadius: "10px",
                                padding: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center',
                                flexDirection: "column",
                                gap: "10px",
                                paddingTop: "40px",
                                backgroundColor: '#D9D9D9',
                                cursor: 'pointer'
                            }}
                        >
                            <div> 
                                <Avatar size="large" icon={<IoIosAdd />} />
                            </div>

                            <div> 
                                <h4 style={{color: '#585858'}}> Adicionar Artefato </h4>
                            </div>
                        
                        </div>
                        {data.map((item, index) => (
                            <ItemGridArtefato 
                                key={index}
                                item={item} 
                                onUpdate={onUpdate} 
                                onDelete={onDelete} 
                                onShowComments={onShowComments} 
                            />
                        ))} 
                    </div>
                   
                                           
                ) : (
                    <RenderEmpty title="Nenhum artefato para exibir " />
                )
            }
        </div>
    );
};

export default GridArtefatos;
