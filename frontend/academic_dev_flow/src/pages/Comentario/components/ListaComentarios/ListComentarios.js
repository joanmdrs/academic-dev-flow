import React, { useState } from "react";
import { Avatar, Button, Form, Input, Space, Tooltip } from "antd";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { formatDate, formatDateTime, getRandomColor } from "../../../../services/utils";
import { UserOutlined } from "@ant-design/icons";

const ListComentarios = ({ data, onUpdate, onDelete, userId }) => {
    const [messageComment, setMessageComment] = useState(null);
    const [isUpdateComment, setIsUpdateComment] = useState(false);

    const handleCancelar = () => {
        setMessageComment(null);
        setIsUpdateComment(false);
    };

    const handleEditarComentario = (comment) => {
        setMessageComment(comment);
        setIsUpdateComment(true);
    };

    return (
        <React.Fragment>
            {data.length !== 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid #ddd',
                                padding: '20px',
                                borderRadius: '20px',
                                alignSelf: item.autor === userId ? 'flex-end' : 'flex-start',
                                width: 'fit-content',
                                backgroundColor: item.autor === userId ? '#e6f7ff' : '#f5f5f5'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Avatar
                                        key={index}
                                        style={{
                                            backgroundColor: getRandomColor(),
                                        }}
                                    >
                                        {item?.nome_autor ? item.nome_autor.charAt(0).toUpperCase() : <UserOutlined />}

                                    </Avatar>
                                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}> {item.nome_autor} </span>
                                    <span style={{ fontSize: '12px' }}> {formatDateTime(item.data_hora)} </span>
                                </div>

                                {item.autor === userId && (
                                    <div>
                                        <Tooltip title="Editar">
                                            <a onClick={() => handleEditarComentario(item)}><IoMdCreate /></a>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <a onClick={() => onDelete(item.id)}><IoMdTrash /></a>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>

                            {!isUpdateComment || messageComment?.id !== item.id ? (
                                <div style={{ marginTop: '20px' }}> {item.mensagem} </div>
                            ) : (
                                <Form style={{ marginTop: '20px' }}>
                                    <Form.Item>
                                        <Input.TextArea
                                            value={messageComment.mensagem}
                                            onChange={(e) =>
                                                setMessageComment({ ...messageComment, mensagem: e.target.value })
                                            }
                                            rows={4}
                                        />
                                    </Form.Item>

                                    <Space style={{ display: 'flex', gap: '10px' }}>
                                        <Button
                                            onClick={() => {
                                                onUpdate(item.id, messageComment.mensagem);
                                                setIsUpdateComment(false);
                                            }}
                                            type="primary"
                                        >
                                            Salvar
                                        </Button>

                                        <Button danger onClick={handleCancelar}> Cancelar </Button>
                                    </Space>
                                </Form>
                            )}
                        </div>
                    ))}
                </div>
            ) : null}
        </React.Fragment>
    );
}

export default ListComentarios;
