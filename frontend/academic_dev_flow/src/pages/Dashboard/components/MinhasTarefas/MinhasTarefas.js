import { List, Tooltip } from "antd";
import React from "react";
import { MdCheckCircleOutline, MdOutlineCircle } from "react-icons/md";
import { limitarCaracteres } from "../../../../services/utils";

const MinhasTarefas = ({tarefas, atualizarStatus}) => {
    return (
        <div className="minhas-tarefas box-model">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                <h3>Minhas tarefas</h3>
                <h5>Visualize todas</h5>
            </div>

            <div> 
                <List                            
                    itemLayout="horizontal"
                    dataSource={tarefas}
                    pagination={{
                        pageSize: 4,
                    }}
                    renderItem={(item, index) => (
                        <List.Item
                            className="item-model"
                            actions={[
                                <a>
                                    { item.status === 'concluida' ? (
                                        <Tooltip title={"ReVisualizar"}>
                                            <MdCheckCircleOutline 
                                                onClick={() => atualizarStatus(item.id, "andamento")} size="20px"
                                            />
                                        </Tooltip>  
                                    ) : (
                                        <Tooltip title={"Concluir"}>
                                            <MdOutlineCircle 
                                                onClick={() => atualizarStatus(item.id, "concluida")}
                                                size="20px" />
                                        </Tooltip>
                                    )
                                    }
                                    
                                </a>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: "var(--primary-color)" }}>{String(index + 1).padStart(2, '0')}</div>
                                }
                                title={item.nome}
                                description={limitarCaracteres(item.descricao, 20)}
                                
                            />
                            <div 
                                style={{ 
                                    fontSize: '12px', 
                                    fontWeight: 'bold', 
                                    color: '#FFFFFF',
                                    padding: '5px',
                                    borderRadius: '5px', 
                                    backgroundColor: `${item.cor_categoria}` 
                                }}
                            >
                                {item.nome_categoria ? item.nome_categoria : 'Sem categoria'}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            
        </div>
    )
}

export default MinhasTarefas