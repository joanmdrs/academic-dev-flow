import { List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/AuthProvider";

const MeusArtefatos = ({artefatos}) => {

    const { user } = useAuth()
    return (
        <div className="meus-artefatos box-model"> 
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h3 className="ff-pop">Meus artefatos</h3>
                { user.role === 'admin' && <Link to={`/admin/artefatos`}> Visualize todos </Link> }
                { user.role === 'aluno' && <Link to={`/aluno/artefatos`}> Visualize todos </Link> }
                { user.role === 'professor' && <Link to={`/professor/artefatos`}> Visualize todos </Link> }
            </div>

            <div> 
                <List
                    itemLayout="horizontal"
                    dataSource={artefatos.slice(0, 4)}
                    pagination={false}
                    renderItem={(item, index) => (
                        <List.Item
                            className="item-model ff-pop"
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