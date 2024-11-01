import { Empty, List, Skeleton, Space, Tooltip } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { getRandomColor } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";


const ListProjetos = ({data, onUpdate, onDelete}) => {

    return (
        <React.Fragment>

            {data.length !== 0 ? (
                <List
                    itemLayout="vertical"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item 
                            actions={[
                                <div>
                                    <RenderMembers membros={item.equipe} maxAvatars={3} quantMembros={item.quantidade_membros} /> 
                                </div>
                                
                            ]}
                            style={{
                                padding: '30px', 
                                marginBottom: '20px',
                                borderLeft: `4px solid ${getRandomColor()}`,
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
                                <List.Item.Meta
                                    // avatar={<Avatar style={{backgroundColor: `${getRandomColor()}`}} src={<MdDashboard />} />}
                                    title={
                                        <div 
                                            style={{
                                                width: 'fit-content', 
                                                display: 'flex', 
                                                alignItems: 'baseline', 
                                                gap: '20px'
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '15px', 
                                                fontFamily: 'Poppins, sans-serif'
                                            }}> {item.nome_projeto} </span>

                                            <RenderStatus optionsStatus={optionsStatusProjetos} propStatus={item.status_projeto} />
                                        </div>} 
                                    description={
                                        <>
                                            
                                            <div>
                                                
                                            </div>
                                            <div>{`Fluxo: ${item.nome_fluxo}`}</div>
                                            <div>{`Descrição: ${item.descricao_projeto}`}</div>
                                        </>
                                    }
                                />
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
                >
                </Empty>
            )
        }
        </React.Fragment>
    )
}

export default ListProjetos