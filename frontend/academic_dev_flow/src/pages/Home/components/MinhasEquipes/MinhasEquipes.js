import { List, Tooltip } from "antd";
import React from "react";
import { MdOpenInNew } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";

const MinhasEquipes = ({equipes}) => {

    return (
        <div className="minhas-equipes box-model">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h3 className="ff-pop">Minhas Equipes</h3>
                <a style={{fontSize: '12px', fontWeight: 'bold'}} href="/academic-dev-flow/aluno/membros">Visualize todos</a>
            </div>

            <div> 
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={equipes.slice(0, 4)}
                    pagination={false}
                    renderItem={(item, index) => (
                        <List.Item
                            key={index}
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
                                    avatar={<HiOutlineUserGroup size="20px" />}
                                    title={<span className="ff-pop fw-500"> {item.nome_projeto} </span>}
                                    description={
                                        <>
                                            <RenderMembers 
                                                maxAvatars={3} 
                                                membros={item.equipe} 
                                                quantMembros={(item.equipe).length}
                                            /> 
                                        </>
                                    }
                                />
                        </List.Item>
                    )}
                />
            </div>

        </div>
    )
}

export default MinhasEquipes