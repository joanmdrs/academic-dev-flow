import { Avatar, Button, Collapse, Empty, List, Skeleton, Tooltip } from "antd";
import React from "react";
import ListFuncoes from "../ListFuncoes/ListFuncoes";
import { IoMdClose, IoMdTrash } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { getRandomColor } from "../../../../services/utils";
import { UserOutlined } from "@ant-design/icons";
const { Panel } = Collapse;


const ListEquipe = ({data, onAddFunction, onDeleteFunction, onAdd, onDelete, onDisable}) => {

    
    return (
        <React.Fragment>

            <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '20px 0'}}> 
                <Button onClick={onAdd}type="primary" icon={<FaPlus />} > 
                    Adicionar Membro
                </Button>
            </div>

            {data.length !== 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item 
                            style={{
                                padding: '20px', 
                                marginBottom: '10px',
                                borderLeft: `4px solid ${() => getRandomColor()}`,
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }}
                            >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar style={{backgroundColor: getRandomColor()}}>
                                            {item.nome_membro ? item.nome_membro.charAt(0).toUpperCase() : <UserOutlined />}
                                        </Avatar>}
                                    title={
                                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                            <div>{item.nome_membro}</div>
                                            <span 
                                                onClick={() => onDelete(item.id)}
                                                style={{
                                                    backgroundColor: 'rgba(0,0,0,0.1)', 
                                                    borderRadius: '50%',
                                                    padding: '10px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '40px',
                                                    height: '40px',
                                                    cursor: 'pointer'
                                                }}
                                            > 
                                                <Tooltip title="Remover membro">
                                                    <IoMdClose size="20px" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                    }
                                    description={
                                        <>
                                            <div>{`Grupo: ${item.nome_grupo}`}</div>
                                                
                                            
                                            <div style={{marginTop: '10px'}}>
                                                <Collapse bordered={false}>
                                                    <Panel 
                                                        header="Funções" 
                                                        key="1" 
                                                    >
                                                        <div 
                                                            style={{
                                                                width: '100%', 
                                                                display: 'flex', 
                                                                justifyContent: 'flex-end'
                                                            }}
                                                        > 
                                                            <Button
                                                                style={{fontSize: '12px', padding: '15px'}}
                                                                type="primary"
                                                                icon={<FaPlus size="10px" />}
                                                                size="small"
                                                                onClick={() => onAddFunction(item)}
                                                            >
                                                                Adicionar função
                                                            </Button>
                                                        </div>
                                                        <ListFuncoes 
                                                            data={item.funcoes_membro} 
                                                            onDelete={onDeleteFunction} 
                                                            onDisable={onDisable}
                                                        />
                                                    </Panel>
                                                </Collapse>
                                                
                                            </div>
                                        </>
                                    }
                                />
                            </Skeleton>
                        </List.Item>
                     )}
                />

            ) : (
                <Empty
                    description="Nenhum membro para exibir"
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

export default ListEquipe