import { useState } from 'react';
import { List, Tooltip, Button, Avatar, Typography } from 'antd';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';
import { CiChat1 } from "react-icons/ci";

const { Text } = Typography;

const ListChats = ({ 
    data = [], 
    onEdit, 
    onDelete, 
    onSelect, 
    selectedChatId 
}) => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <List
            style={{ marginTop: '10px' }}
            dataSource={data}
            itemLayout="horizontal"
            renderItem={(item) => {
                const isSelected = selectedChatId === item.id;
                const isHovered = hoveredId === item.id;

                return (
                    <List.Item 
                        onClick={() => onSelect(item)}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            padding: '12px',
                            marginTop: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            backgroundColor: isSelected 
                                ? 'rgba(24, 144, 255, 0.08)' 
                                : '#FFFFFF',
                            border: isSelected 
                                ? '1px solid var(--primary-color)' 
                                : '1px solid #F0F0F0',
                            borderLeft: isSelected 
                                ? '5px solid var(--primary-color)' 
                                : '5px solid transparent',
                            boxShadow: isSelected
                                ? 'rgba(24, 144, 255, 0.18) 0px 4px 12px'
                                : isHovered
                                    ? 'rgba(0, 0, 0, 0.12) 0px 4px 10px'
                                    : 'rgba(0, 0, 0, 0.08) 0px 1px 4px',
                            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <div 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                minWidth: 0
                            }}
                        >
                            <Avatar
                                size={38}
                                style={{
                                    backgroundColor: isSelected 
                                        ? 'var(--primary-color)' 
                                        : '#F5F5F5',
                                    color: isSelected 
                                        ? '#FFFFFF' 
                                        : 'var(--primary-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                icon={<CiChat1 size={22} />}
                            />

                            <div style={{ minWidth: 0 }}>
                                <Text
                                    strong
                                    ellipsis
                                    style={{
                                        display: 'block',
                                        maxWidth: '160px',
                                        color: isSelected 
                                            ? 'var(--primary-color)' 
                                            : '#262626',
                                        fontSize: '14px'
                                    }}
                                >
                                    {item.nome}
                                </Text>

                                
                            </div>
                        </div>

                        <div 
                            style={{ 
                                display: 'flex', 
                                gap: '6px',
                                alignItems: 'center'
                            }}
                        >
                            <Tooltip title="Editar">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<IoMdCreate size={19} />}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onEdit(item);
                                    }}
                                    style={{
                                        color: isSelected 
                                            ? 'var(--primary-color)' 
                                            : '#595959'
                                    }}
                                />
                            </Tooltip>

                            <Tooltip title="Excluir">
                                <Button
                                    type="text"
                                    size="small"
                                    style={{
                                        color: isSelected 
                                            ? 'var(--primary-color)' 
                                            : '#595959'
                                    }}
                                    icon={<IoMdTrash size={19} />}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onDelete(item.id);
                                    }}
                                />
                            </Tooltip>
                        </div>
                    </List.Item>
                );
            }}
        />
    );
};

export default ListChats;