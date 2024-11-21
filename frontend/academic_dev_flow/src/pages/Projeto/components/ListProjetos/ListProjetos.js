import { Empty, List, Skeleton, Dropdown, Collapse, Button } from "antd";
import React from "react";
import { limitarCaracteres } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import { FaEllipsisH } from "react-icons/fa";
import { IoMdCreate, IoMdTrash, IoMdFolderOpen } from "react-icons/io";

const { Panel } = Collapse;

const ActionDropdown = ({ item, onOpen, onUpdate, onDelete }) => {
    const items = [
        {
            key: 'view',
            label: (
                <Button style={{border: 'none'}} onClick={() => onOpen(item)}>
                    Abrir
                </Button>
            ),
            icon: <IoMdFolderOpen size="15px" />
        },
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


const ListProjetos = ({ data, onUpdate, onDelete, onOpen }) => {

    

    return (
        <React.Fragment>
            {data.length !== 0 ? (
                <List
                    itemLayout="vertical"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                padding: '20px',
                                marginBottom: '20px',
                                borderLeft: `
                                    4px solid ${(optionsStatusProjetos.find(option => option.value === item.status_projeto)).color}`,
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }}
                            extra={
                                <ActionDropdown item={item} onDelete={onDelete} onUpdate={onUpdate} onOpen={onOpen} />
                            }
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <Collapse bordered={false}>
                                    <Panel
                                        header={
                                            <div 
                                                style={{
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: '20px'
                                                }}
                                            >
                                                <span 
                                                    style={{
                                                    width: '400px',
                                                    fontWeight: '600',
                                                    fontSize: '15px', 
                                                    fontFamily: 'Poppins, sans-serif'
                                                }}> {limitarCaracteres(item.nome_projeto, 100)} </span>

                                                    
                                                <RenderStatus optionsStatus={optionsStatusProjetos} propStatus={item.status_projeto} />
                                            </div>
                                        }
                                        key={item.nome_projeto}
                                    >
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                            <div>{`Fluxo: ${item.nome_fluxo ? item.nome_fluxo : 'Não informado'}`}</div>
                                            <div>{`Descrição: ${item.descricao_projeto ? item.descricao_projeto : ''}`}</div>
                                            <div style={{display: 'flex', gap: '10px'}}> 
                                                <RenderDate dateType="inicio" dateValue={item.data_inicio_projeto} />
                                                <RenderDate dateType="fim" dateValue={item.data_termino_projeto} />
                                            </div>
                                            <div>
                                                <RenderMembers 
                                                    membros={item.equipe} 
                                                    maxAvatars={3} 
                                                    quantMembros={item.quantidade_membros} 
                                                /> 

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
                    description="Nenhum projeto para exibir"
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

export default ListProjetos;
