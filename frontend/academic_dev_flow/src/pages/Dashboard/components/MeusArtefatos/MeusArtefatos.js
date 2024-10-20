import { List, Tooltip } from "antd";
import React from "react";
import { MdOpenInNew } from "react-icons/md";
import { limitarCaracteres } from "../../../../services/utils";

const MeusArtefatos = ({artefatos}) => {
    return (
        <div className="meus-artefatos box-model"> 
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h4>Meus artefatos</h4>
                <h5>Visualize todos</h5>
            </div>

            <div> 
                <List
                    itemLayout="horizontal"
                    dataSource={artefatos}
                    pagination={{
                        pageSize: 4,
                    }}
                    renderItem={(item, index) => (
                        <List.Item
                        className="item-model"
                            actions={[
                                <a>
                                    <Tooltip title="Visualizar">
                                        <MdOpenInNew />
                                    </Tooltip>
                                </a>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: "var(--primary-color)" }}>{String(index + 1).padStart(2, '0')}</div>
                                }
                                title={item.nome}
                                description={limitarCaracteres(item.descricao, 20)}
                            />
                        </List.Item>
                    )}
                />
            </div>
            
        </div>
    )
}

export default MeusArtefatos