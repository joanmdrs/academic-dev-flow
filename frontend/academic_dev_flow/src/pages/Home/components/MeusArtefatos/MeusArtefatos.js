import { List, Tooltip } from "antd";
import React from "react";
import { MdOpenInNew } from "react-icons/md";

const MeusArtefatos = ({artefatos}) => {
    return (
        <div className="meus-artefatos box-model"> 
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h3 className="ff-pop">Meus artefatos</h3>
                <a 
                    style={{fontSize: '12px', fontWeight: 'bold'}} 
                    href="/academic-dev-flow/aluno/artefatos"
                > Visualize todos </a>
            </div>

            <div> 
                <List
                    itemLayout="horizontal"
                    dataSource={artefatos.slice(0, 4)}
                    pagination={false}
                    renderItem={(item, index) => (
                        <List.Item
                        className="item-model ff-pop"
                            actions={[
                                <Tooltip title="Visualizar">
                                    <a href={item.url} target="_blank" rel="noreferrer"> <MdOpenInNew /> </a>
                                </Tooltip>
                                
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <div 
                                        style={{ 
                                            fontSize: '15px', 
                                            fontWeight: 'bold',  
                                            color: "#BDBDBD"}}
                                        >{String(index + 1).padStart(2, '0')}
                                    </div>
                                }
                                title={<span className="ff-pop fw-500"> {item.nome} </span>}
                            />
                        </List.Item>
                    )}
                />
            </div>
            
        </div>
    )
}

export default MeusArtefatos