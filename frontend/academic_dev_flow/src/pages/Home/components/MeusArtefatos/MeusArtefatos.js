import { List, Tooltip } from "antd";
import React from "react";
import { MdOpenInNew } from "react-icons/md";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { Link } from "react-router-dom";

const MeusArtefatos = ({artefatos}) => {
    const {grupo} = useContextoGlobalUser()

    return (
        <div className="meus-artefatos box-model"> 
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h3 className="ff-pop">Meus artefatos</h3>
                { grupo === 'Administradores' && <Link to={`/admin/artefatos`}> Visualize todos </Link> }
                { grupo === 'Discentes' && <Link to={`/aluno/artefatos`}> Visualize todos </Link> }
                { grupo === 'Docentes' && <Link to={`/professor/artefatos`}> Visualize todos </Link> }
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