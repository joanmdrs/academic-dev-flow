import { List, Tooltip } from 'antd';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { CiChat1 } from "react-icons/ci";

const ListChats = ({ data, onEdit, onDelete, onSelect }) => {
    return (
        <List
            style={{ marginTop: '10px' }}
            dataSource={data}
            itemLayout="horizontal"
            renderItem={(item, index) => (
                <List.Item 
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        backgroundColor: "#FFFFFF",
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
                    }}
                    onClick={() => onSelect(item)}
                >
                    {/* Área da esquerda: Avatar + Nome */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CiChat1 size="20px" />
                        <h4 style={{ margin: 0}}>{item.nome}</h4>
                    </div>

                    {/* Área da direita: Botões */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Tooltip title="Editar">
                            <span 
                                style={{ color: 'var(--primary-color)', cursor: 'pointer' }}  
                                onClick={() => onEdit(item)}
                            >
                                <IoMdCreate size={20} />
                            </span>
                        </Tooltip>

                        <Tooltip title="Excluir">
                            <span 
                                style={{ color: 'var(--primary-color)', cursor: 'pointer' }} 
                                onClick={() => onDelete(item.id)}
                            >
                                <IoMdTrash size={20} />
                            </span>
                        </Tooltip>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default ListChats;
