import { Empty, List, Skeleton, Collapse, Space, Tooltip } from "antd";
import React from "react";
import { limitarCaracteres } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import { IoChatbubblesOutline } from "react-icons/io5";

const { Panel } = Collapse;

const ListArtefatos = ({data, onUpdate, onDelete, onShowComments}) => {



    return (
        <React.Fragment>
            {data.length !== 0 ? (
                <List
                    itemLayout="vertical"
                    dataSource={data}
                    pagination
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                borderRadius: '5px',
                                padding: '20px',
                                marginBottom: '20px',
                                borderLeft: `
                                    4px solid ${(optionsStatusArtefatos.find(option => option.value === item.status)).color}`,
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }}
                            
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <Collapse bordered={false}>
                                    <Panel
                                        header={
                                            <div 
                                                style={{
                                                    display: 'flex', 
                                                    gap: '20px',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <div 
                                                    style={{
                                                        flex: '2', /* 40% */
                                                        fontWeight: '600',
                                                        fontSize: '15px', 
                                                        fontFamily: 'Poppins, sans-serif'
                                                    }}> 
                                                    {limitarCaracteres(item.nome, 50)} 
                                                </div>

                                                <Space style={{ flex: '1'}}> {/* 20% */}
                                                    <RenderMembers 
                                                        membros={item.membros_info} 
                                                        maxAvatars={3} 
                                                        quantMembros={item.membros_info.length} 
                                                    /> 
                                                </Space>

                                                <RenderDate dateType="fim" dateValue={item.data_entrega} />

                                                <Space style={{ flex: '1'}}> {/* 10% */}
                                                    <RenderStatus 
                                                        optionsStatus={optionsStatusArtefatos} 
                                                        propStatus={item.status} 
                                                    />
                                                </Space>

                                                <Space style={{ flex: '1', justifyContent: 'center' }}> {/* 20% */}
                                                    <Tooltip title="Comentários">
                                                        <span style={{cursor: 'pointer'}} onClick={() => onShowComments(item)}>
                                                            <IoChatbubblesOutline size="20px" />
                                                        </span>
                                                    </Tooltip>
                                                    
                                                    <Tooltip title="Editar">
                                                        <span style={{cursor: 'pointer'}}  onClick={() => onUpdate(item)}>
                                                            <IoMdCreate />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip title="Excluir">
                                                        <span style={{cursor: 'pointer'}} onClick={() => onDelete(item.id)}>
                                                            <IoMdTrash />
                                                        </span>
                                                    </Tooltip>
                                                </Space>

                                            </div>

                                        }
                                        key={item.id}
                                    >
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                           
                                            <div>{`Descrição: ${item.descricao ? item.descricao : ''}`}</div>
                                            <div style={{display: 'flex', gap: '10px'}}> 
                                                <RenderDate dateType="fim" dateValue={item.data_entrega} />
                                            </div>


                                        
                                            
                                        </div>
                                    </Panel>
                                </Collapse>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            ) : (
                <Empty
                    description="Nenhuma artefato para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        padding: '40px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default ListArtefatos;
