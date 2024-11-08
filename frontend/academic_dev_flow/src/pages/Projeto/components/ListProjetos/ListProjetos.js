import { Empty, List, Skeleton, Space, Tooltip, Collapse } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { getRandomColor, limitarCaracteres } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";
import RenderDate from "../../../../components/RenderDate/RenderDate";

const { Panel } = Collapse;

const ListProjetos = ({ data, onUpdate, onDelete }) => {

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
                                <Space>
                                    <Tooltip title="Editar">
                                        <a onClick={() => onUpdate(item)}><IoMdCreate /></a>
                                    </Tooltip>
                                    <Tooltip title="Excluir">
                                        <a onClick={() => onDelete(item.projeto)}><IoMdTrash /></a>
                                    </Tooltip>
                                </Space>
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
                                                <span style={{
                                                    width: '400px',
                                                    fontWeight: '600',
                                                    fontSize: '15px', 
                                                    fontFamily: 'Poppins, sans-serif'
                                                }}>{limitarCaracteres(item.nome_projeto, 100)}</span>

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
                                            <RenderMembers 
                                                membros={item.equipe} 
                                                maxAvatars={3} 
                                                quantMembros={item.quantidade_membros} 
                                            /> 
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
