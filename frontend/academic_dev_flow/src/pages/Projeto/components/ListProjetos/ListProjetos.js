import { Empty, List, Skeleton, Dropdown, Collapse, Button, Avatar } from "antd";
import React from "react";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { FaEllipsisH } from "react-icons/fa";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import ListContent from "./ListContent";
import ListHeader from "./ListHeader";

const { Panel } = Collapse;

const ActionDropdown = ({ item, onOpen, onUpdate, onDelete }) => {
    const items = [
        // {
        //     key: 'view',
        //     label: (
        //         <Button style={{border: 'none'}} onClick={() => onOpen(item)}>
        //             Abrir
        //         </Button>
        //     ),
        //     icon: <IoMdFolderOpen size="15px" />
        // },
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
                                display: 'flex',
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
                            <Skeleton 
                                loading={item.loading} 
                                active
                            >
                                <Collapse  bordered={false}>
                                    <Panel
                                        header={
                                            <ListHeader item={item} />
                                        }
                                        key={item.nome_projeto}
                                    >
                                        <ListContent item={item}/>
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
