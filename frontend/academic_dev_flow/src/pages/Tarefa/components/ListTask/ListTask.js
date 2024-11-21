import { Empty, List, Skeleton, Dropdown, Collapse, Button, Space, Tooltip } from "antd";
import React from "react";
import { limitarCaracteres } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import { FaEllipsisH, FaPause, FaPlay } from "react-icons/fa";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { optionsStatusTarefas } from "../../../../services/optionsStatus";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import RenderCategoria from "../../../../components/RenderCategoria/RenderCategoria";
import RenderTag from "../../../../components/RenderTag/RenderTag";
import { IoChatbubblesOutline } from "react-icons/io5";

const { Panel } = Collapse;

const ActionDropdown = ({ item, onUpdate, onDelete}) => {
    const items = [
        {
            key: 'edit',
            label: (
                <Button style={{ border: "none" }} onClick={() => onUpdate(item)}>
                    Editar
                </Button>
            ),
            icon: <IoMdCreate size="15px" />
        },
        {
            key: 'delete',
            label: (
                <Button style={{border: 'none'}} onClick={() => onDelete(item.projeto)}>
                    Excluir
                </Button>
            ),
            icon: <IoMdTrash size="15px" />
        },
    ];

    return (
        <Dropdown
            menu={{
                items
            }}
            placement="bottomRight"
            trigger={['click']}
        >
            <span style={{
                cursor: 'pointer'
            }}>
                <FaEllipsisH />
            </span>
        </Dropdown>
    );
};


const ListTask = ({ onUpdate, onDelete, onOpen, onPauseTarefa, onStartTarefa, onShowComments}) => {

    const {tarefas} = useContextoTarefa()


    return (
        <React.Fragment>
            {tarefas.length !== 0 ? (
                <List
                    itemLayout="vertical"
                    dataSource={tarefas}
                    pagination
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                borderRadius: '5px',
                                padding: '20px',
                                marginBottom: '20px',
                                borderLeft: `
                                    4px solid ${(optionsStatusTarefas.find(option => option.value === item.status)).color}`,
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

                                                <Space style={{ flex: '1', justifyContent: 'center' }}> {/* 20% */}
                                                    {
                                                        !item.estado_contagem_tempo ? (
                                                            <Button style={{
                                                                border: 'none',
                                                                padding: '10px', 
                                                                borderRadius: '5px', 
                                                                fontSize: '12px', 
                                                                fontWeight: 'bold', 
                                                                backgroundColor: '#A9E2F3', 
                                                                color: '#0B4C5F'
                                                            }} 
                                                                icon={<FaPlay />}
                                                                onClick={() => onStartTarefa(item)}
                                                            > 
                                                                Iniciar
                                                            </Button>
                                                        ) : (
                                                            <Button style={{
                                                                border: 'none',
                                                                padding: '10px', 
                                                                borderRadius: '5px', 
                                                                fontSize: '12px', 
                                                                fontWeight: 'bold', 
                                                                backgroundColor: '#F6CECE', 
                                                                color: '#B40404'
                                                            }} 
                                                                icon={<FaPause />}
                                                                onClick={() => onPauseTarefa(item)}
                                                            > 
                                                                Pausar
                                                            </Button>
                                                        )
                                                    }
                                                </Space>
                                                
                                                <Space style={{ flex: '1'}}> {/* 10% */}
                                                    <RenderCategoria nome={item.nome_categoria} cor={item.cor_categoria} />
                                                </Space>
                                                
                                                <Space style={{ flex: '1'}}> {/* 10% */}
                                                    <RenderStatus 
                                                        optionsStatus={optionsStatusTarefas} 
                                                        propStatus={item.status} 
                                                    />
                                                </Space>
</div>

                                        }
                                        key={item.id}
                                    >
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                           
                                            <div>{`Descrição: ${item.descricao ? item.descricao : ''}`}</div>
                                            <div style={{display: 'flex', gap: '10px'}}> 
                                                <RenderDate dateType="inicio" dateValue={item.data_inicio} />
                                                <RenderDate dateType="fim" dateValue={item.data_termino} />

                                                {item.dados_tags.slice(0,5).map((tag, index) => (
                                                    <RenderTag key={index} item={tag} />
                                                ))}
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
                    description="Nenhuma tarefa para exibir"
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

export default ListTask;
